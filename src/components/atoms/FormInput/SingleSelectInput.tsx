import { memo } from "react";
import { Label } from "@/components/ui/label";
import type { FieldRendererProps } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export const SingleSelectInput = memo((props: FieldRendererProps) => {
  const { field, controller, method, error } = props;

  //Handles
  const handleChange = (value: string) => {
    controller.onChange(value);
    field.onChange && field.onChange(value, method);
  };
  const handleTouch = () => {
    field.onTouch && field.onTouch(controller.value, method);
  };

  // Style classes
  const defaultSelectStyles = `w-full border border-gray-300 rounded-md shadow-sm`;
  const focusStyles = `focus:ring focus:ring-blue-500 focus:border-blue-500`;
  const hoverStyles = `hover:border-gray-400`;
  const errorStyles = error ? `border-red-500 focus:ring-red-500` : "";

  return (
    <div>
      {field.label && (
        <Label className="block text-sm font-medium mb-1">{field.label}</Label>
      )}
      <Select
        onValueChange={handleChange}
        value={controller.value}
        onOpenChange={handleTouch}
        {...field.props}
      >
        <SelectTrigger
          className={cn(
            defaultSelectStyles,
            focusStyles,
            hoverStyles,
            errorStyles,
            field.props?.className
          )}
        >
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          {field?.options?.map((option) => (
            <SelectItem key={option.value} value={option.value as string}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && (
        <span className="text-red-400 text-xs mt-1 block font-[600]">
          {error.message}
        </span>
      )}
    </div>
  );
});
