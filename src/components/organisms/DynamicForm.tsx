// src/components/DynamicForm.tsx
import { useEffect, useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AnyZod, FormConfig } from "@/types";
import formRegistry from "@/lib/form/formRegistry";
import { FieldFactory } from "../molecules/FieldFactory";
import { Button } from "../ui/button";
import { FieldTypeEnum } from "@/types";

type Props<T extends AnyZod> = {
  id: string;
  schema: T;
  config: FormConfig;
  onSubmit?: (values: any) => void;
  defaultValues?: Partial<any>;
  className?: string;
};

// Helper function to get default value based on field type
const getDefaultValueForField = (field: FormConfig[number]): any => {
  if (field.defaultValue !== undefined) {
    return field.defaultValue;
  }

  switch (field.type) {
    case FieldTypeEnum.NUMBER:
      return 0;
    case FieldTypeEnum.CHECKBOX:
    case FieldTypeEnum.SWITCH:
      return false;
    case FieldTypeEnum.MULTISELECT:
      return [];
    case FieldTypeEnum.COLOR:
      return "#000000";
    case FieldTypeEnum.TEXT:
    case FieldTypeEnum.EMAIL:
    case FieldTypeEnum.TEXTAREA:
    case FieldTypeEnum.SELECT:
    case FieldTypeEnum.RADIO:
    default:
      return "";
  }
};

export function DynamicForm<T extends AnyZod>({
  id,
  schema,
  config,
  onSubmit,
  defaultValues = {},
  className,
}: Props<T>) {
  // Initialize default values for all fields to prevent uncontrolled to controlled warnings
  const initialValues = useMemo(() => {
    const values: Record<string, any> = {};
    config.forEach((field) => {
      values[field.name] =
        defaultValues[field.name] ?? getDefaultValueForField(field);
    });
    return values;
  }, [config, defaultValues]);

  const methods = useForm<any>({
    resolver: zodResolver(schema as any),
    defaultValues: initialValues,
    mode: "onChange",
  });

  const { handleSubmit, control, register, watch } = methods;

  useEffect(() => {
    // register instance in registry
    formRegistry.register(id, methods);

    // subscribe watch to emit registry changes so external hooks re-render through zustand
    const subscription = watch(() => {
      formRegistry.emit();
    });

    return () => {
      // cleanup
      subscription.unsubscribe?.();
      formRegistry.unregister(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleFormSubmit = (data: any) => {
    console.log("Form is valid, submitting with data:", data);
    if (onSubmit) {
      onSubmit(data);
    }
  };

  const handleFormError = (errors: any) => {
    console.log("Form validation errors:", errors);
  };

  return (
    <FormProvider {...methods}>
      <form
        className={className}
        onSubmit={handleSubmit(handleFormSubmit, handleFormError)}
      >
        {config.map((field) => (
          <FieldFactory
            key={field.name}
            config={field}
            register={register}
            control={control}
            method={methods}
          />
        ))}
        {onSubmit && (
          <Button type="submit" className="mt-4 w-full">
            Submit
          </Button>
        )}
      </form>
    </FormProvider>
  );
}
