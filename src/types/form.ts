import type { FieldValues, UseFormReturn } from "react-hook-form";
import { z } from "zod";

export type FieldType =
  | "text"
  | "email"
  | "number"
  | "select"
  | "checkbox"
  | "textarea"
  | "subform";

export type Option = { label: string; value: string | number };

export type FieldConfig = {
  name: string;
  label?: string;
  placeholder?: string;
  type?: FieldType;
  defaultValue?: any;
  options?: Option[]; // for select
  component?: any; // override component (React component)
  // for subform
  subformId?: string;
  // pass extra props to component
  props?: Record<string, any>;
  onChange?: (value: any, methods?: UseFormReturn<any>) => void;
  onBlur?: (value: any, methods?: UseFormReturn<any>) => void;
  onTouch?: (value: any, methods?: UseFormReturn<any>) => void;
};

export type FormConfig = FieldConfig[];

export type AnyZod = z.ZodTypeAny;
