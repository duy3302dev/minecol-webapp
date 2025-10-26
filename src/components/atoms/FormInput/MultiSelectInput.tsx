import { memo } from "react";
import { Label } from "@/components/ui/label";
import type { FieldRendererProps } from "@/types";
import {
  MultiSelect,
  type MultiSelectOption,
} from "@/components/ui/multi-select";
import { cn } from "@/lib/utils";

export const MultiSelectInput = memo((props: FieldRendererProps) => {
  const { field, controller, method, error } = props;

  //Handle
  const handleChange = (values: string[]) => {
    controller.onChange(values);
    field.onChange && field.onChange(values, method);
  };
  const handleTouch = () => {
    field.onTouch && field.onTouch(controller.value, method);
  };

  // Style classes
  const defaultMultiSelectStyles = `w-full border border-gray-300 rounded-md shadow-sm`;
  const focusStyles = `focus:ring-2 focus:ring-blue-500 focus:border-blue-500`;
  const hoverStyles = `hover:border-gray-400`;
  const errorStyles = error ? `border-red-500 focus:ring-red-500` : "";

  return (
    <div>
      {field.label && (
        <Label className="block text-sm font-medium mb-1">{field.label}</Label>
      )}
      <MultiSelect
        value={controller.value}
        {...field.props}
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
        <span className="text-red-400 text-xs mt-1 block font-[600]">
          {error.message}
        </span>
      )}
    </div>
  );
});
