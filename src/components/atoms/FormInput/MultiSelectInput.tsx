import { memo, type FC } from "react";
import { Label } from "@/components/ui/label";
import type { FieldRendererProps } from "@/shared/types";
import {
  MultiSelect,
  type MultiSelectOption,
} from "@/components/ui/multi-select";
import { cn } from "@/shared/lib/utils";

export const MultiSelectInput: FC<FieldRendererProps> = memo((props) => {
  const { field, controller, error } = props;

  //Handle
  const handleChange = (values: string[]) => {
    controller.onChange(values);
    field.onChange && field.onChange(values);
  };
  const handleTouch = () => {
    field.onTouch && field.onTouch(controller.value);
  };

  // Style classes (semantic tokens)
  const defaultMultiSelectStyles = `w-full border rounded-md shadow-sm transition-colors bg-input text-foreground`;
  const focusStyles = `focus:ring focus:ring-ring/20 focus:border-ring`;
  const hoverStyles = `hover:border-ring/50`;
  const errorStyles = error
    ? `border-destructive focus:ring-destructive/20`
    : `border-border`;

  return (
    <div>
      {field.label && (
        <Label className="block text-sm font-medium mb-1 text-foreground">
          {field.label}
        </Label>
      )}
      <MultiSelect
        value={controller.value}
        {...field.props}
        placeholder={field.placeholder || "Select options"}
        className={cn(
          defaultMultiSelectStyles,
          focusStyles,
          hoverStyles,
          errorStyles,
          field.props?.className
        )}
        onValueChange={handleChange}
        onFocus={handleTouch}
        options={field?.options as MultiSelectOption[]}
        hideSelectAll
        searchable={false}
      />
      {error && (
        <span className="text-destructive text-xs mt-1 block font-semibold">
          {error.message}
        </span>
      )}
    </div>
  );
});
