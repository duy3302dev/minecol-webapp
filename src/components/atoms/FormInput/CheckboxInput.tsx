import { memo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { FieldRendererProps } from "@/types";
import { cn } from "@/lib/utils";

export const CheckboxInput = memo((props: FieldRendererProps) => {
  const { field, controller, method, error } = props;

  //Handle
  const handleChange = (value: boolean) => {
    console.log("Checkbox value:", value);
    controller.onChange(value);
    field.onChange && field.onChange(value, method);
  };

  const handleTouch = () => {
    field.onTouch && field.onTouch(controller.value, method);
  };

  // Style classes
  const defaultCheckboxStyles = `h-4 w-4 text-blue-600 border-gray-300 rounded`;
  const focusStyles = `focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`;
  const hoverStyles = `hover:border-blue-400`;
  const errorStyles = error ? `border-red-500 focus:ring-red-500` : "";

  return (
    <div className="flex items-center">
      <Checkbox
        checked={controller.value}
        {...field.props}
        className={cn(
          defaultCheckboxStyles,
          focusStyles,
          hoverStyles,
          errorStyles,
          field.props?.className
        )}
        onCheckedChange={handleChange}
        onFocus={handleTouch}
      />
      {field.label && (
        <Label className="ml-2 text-sm font-medium">{field.label}</Label>
      )}
      {error && (
        <span className="text-red-400 text-xs mt-1 ml-2 font-[600]">
          {error.message}
        </span>
      )}
    </div>
  );
});
