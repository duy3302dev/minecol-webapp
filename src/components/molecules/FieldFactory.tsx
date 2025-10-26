import {
  Controller,
  type ControllerFieldState,
  type ControllerRenderProps,
  type FieldValues,
  type UseFormReturn,
} from "react-hook-form";
import { FieldTypeEnum, type FieldConfig } from "@/types";
import {
  CheckboxInput,
  ColorInput,
  MultiSelectInput,
  MultiStringInput,
  NumberInput,
  RadioInput,
  SingleSelectInput,
  SingleStringInput,
  SwitchInput,
} from "../atoms/FormInput";

type Props = {
  config: FieldConfig;
  register: any;
  control: any;
  method: UseFormReturn<any>;
  index?: number;
};

export const FieldFactory = ({ config, register, control, method }: Props) => {
  // If custom component provided, use Controller wrapper
  const { type, component } = config;

  const renderField = (
    field: ControllerRenderProps<FieldValues, string>,
    fieldState: ControllerFieldState
  ) => {
    if (component) {
      const CustomComponent = component;
      return (
        <CustomComponent
          field={config}
          controller={field}
          method={method}
          error={fieldState.error}
        />
      );
    }

    switch (type) {
      case FieldTypeEnum.TEXT:
        return (
          <SingleStringInput
            field={config}
            controller={field}
            method={method}
            error={fieldState.error}
          />
        );

      case FieldTypeEnum.NUMBER:
        return (
          <NumberInput
            field={config}
            controller={field}
            method={method}
            error={fieldState.error}
          />
        );

      case FieldTypeEnum.CHECKBOX:
        return (
          <CheckboxInput
            field={config}
            controller={field}
            method={method}
            error={fieldState.error}
          />
        );

      case FieldTypeEnum.RADIO:
        return (
          <RadioInput
            field={config}
            controller={field}
            method={method}
            error={fieldState.error}
          />
        );

      case FieldTypeEnum.SWITCH:
        return (
          <SwitchInput
            field={config}
            controller={field}
            method={method}
            error={fieldState.error}
          />
        );

      case FieldTypeEnum.COLOR:
        return (
          <ColorInput
            field={config}
            controller={field}
            method={method}
            error={fieldState.error}
          />
        );

      case FieldTypeEnum.SELECT:
        return (
          <SingleSelectInput
            field={config}
            controller={field}
            method={method}
            error={fieldState.error}
          />
        );

      case FieldTypeEnum.MULTISELECT:
        return (
          <MultiSelectInput
            field={config}
            controller={field}
            method={method}
            error={fieldState.error}
          />
        );

      case FieldTypeEnum.TEXTAREA:
        return (
          <MultiStringInput
            field={config}
            controller={field}
            method={method}
            error={fieldState.error}
          />
        );

      default:
        return (
          <div className="h-10 w-full flex items-center justify-center border border-dashed rounded-sm border-red-500 bg-red-50 text-red-600">
            Unknown field type: {type}
          </div>
        );
    }
  };

  // default: simple input (text/email/number)
  return (
    <div className="mb-3">
      <Controller
        name={config.name}
        control={control}
        {...register(config.name)}
        render={({ field, fieldState }) => renderField(field, fieldState)}
      />
    </div>
  );
};
