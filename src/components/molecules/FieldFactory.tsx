import { useController, useFormContext } from "react-hook-form";
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
import React, { memo, useCallback, useMemo } from "react";
import { FieldTypeEnum, type FieldConfig } from "@/shared/types";

const inputMap = {
  [FieldTypeEnum.TEXT]: SingleStringInput,
  [FieldTypeEnum.NUMBER]: NumberInput,
  [FieldTypeEnum.CHECKBOX]: CheckboxInput,
  [FieldTypeEnum.RADIO]: RadioInput,
  [FieldTypeEnum.SWITCH]: SwitchInput,
  [FieldTypeEnum.COLOR]: ColorInput,
  [FieldTypeEnum.SELECT]: SingleSelectInput,
  [FieldTypeEnum.MULTISELECT]: MultiSelectInput,
  [FieldTypeEnum.TEXTAREA]: MultiStringInput,
  [FieldTypeEnum.EMAIL]: SingleStringInput,
  [FieldTypeEnum.SUBFORM]: SingleStringInput,
};

type Props = {
  config: FieldConfig;
};

export const FieldFactory = memo(({ config }: Props) => {
  const { control } = useFormContext();
  const Comp = inputMap[config.type];
  if (!Comp) {
    return (
      <div className="h-10 flex items-center justify-center border border-dashed rounded text-muted-foreground">
        Unknown field type: {config.type}
      </div>
    );
  }

  // Dùng useController thay vì Controller
  const {
    field: ctlField,
    fieldState: { error },
  } = useController({
    name: config.name,
    control,
  });

  // Memo hóa props cho input
  const controller = useMemo(
    () => ({
      value: ctlField.value,
      onChange: ctlField.onChange,
      onBlur: ctlField.onBlur,
      name: ctlField.name,
      ref: ctlField.ref,
    }),
    [ctlField.value, ctlField.name, ctlField.ref] // chỉ thay đổi khi value đổi
  );

  return (
    <div className="mb-3">
      <Comp field={config} controller={controller} error={error} />
    </div>
  );
});
