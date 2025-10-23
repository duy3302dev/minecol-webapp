// src/components/DynamicForm.tsx
import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AnyZod, FormConfig } from "@/types";
import formRegistry from "@/lib/form/formRegistry";
import { FieldFactory } from "../molecules/FieldFactory";

type Props<T extends AnyZod> = {
  id: string;
  schema: T;
  config: FormConfig;
  onSubmit?: (values: any) => void;
  defaultValues?: Partial<any>;
  className?: string;
};

export function DynamicForm<T extends AnyZod>({
  id,
  schema,
  config,
  onSubmit,
  defaultValues = {},
  className,
}: Props<T>) {
  const methods = useForm<any>({
    resolver: zodResolver(schema as any),
    defaultValues,
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

  return (
    <FormProvider {...methods}>
      <form
        className={className}
        onSubmit={handleSubmit(onSubmit ?? (() => {}))}
      >
        {config.map((field) => (
          <FieldFactory
            key={field.name}
            config={field}
            register={register}
            control={control}
          />
        ))}
        {/* Note: The submit button can be provided externally or included here */}
      </form>
    </FormProvider>
  );
}
