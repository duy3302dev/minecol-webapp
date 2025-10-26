import type { MultiSelectOption } from "@/components/ui/multi-select";
import type {
  ControllerRenderProps,
  FieldError,
  UseFormReturn,
} from "react-hook-form";
import { z } from "zod";

export const FieldTypeEnum = {
  TEXT: "text",
  EMAIL: "email",
  NUMBER: "number",
  SELECT: "select",
  CHECKBOX: "checkbox",
  TEXTAREA: "textarea",
  SUBFORM: "subform",
  RADIO: "radio",
  MULTISELECT: "multiselect",
  SWITCH: "switch",
  COLOR: "color",
} as const;

export type FieldType = (typeof FieldTypeEnum)[keyof typeof FieldTypeEnum];

export type Option = {
  label: string;
  value: string | number;
  leftIcon?: React.ReactNode;
  style?: React.CSSProperties;
};

export type FieldConfig = {
  name: string;
  label?: string;
  placeholder?: string;
  type?: FieldType;
  defaultValue?: any;
  options?: Option[] | MultiSelectOption[]; // for select
  component?: any; // override component (React component)
  // for subform
  subformId?: string;
  // pass extra props to component
  props?: Record<string, any>;

  //callback
  onChange?: (value: any, methods?: UseFormReturn<any>) => void;
  onBlur?: (value: any, methods?: UseFormReturn<any>) => void;
  onTouch?: (value: any, methods?: UseFormReturn<any>) => void;
};

export type FormConfig = FieldConfig[];

export type AnyZod = z.ZodTypeAny;

export type FieldRendererProps = {
  field: FieldConfig;
  controller: ControllerRenderProps<any, string>;
  method: UseFormReturn<any>;
  error?: FieldError;
};
