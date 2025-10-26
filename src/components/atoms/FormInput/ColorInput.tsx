import { memo } from "react";
import { Label } from "@/components/ui/label";
import type { FieldRendererProps } from "@/types";
import { cn } from "@/lib/utils";

export const ColorInput = memo((props: FieldRendererProps) => {
  const { field, controller, method, error } = props;

  //Handles
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    controller.onChange(value); // Pass value, not event
    field.onChange && field.onChange(value, method);
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    controller.onBlur();
    field.onBlur && field.onBlur(e.target.value, method);
  };
  const handleTouch = (e: React.FocusEvent<HTMLInputElement>) => {
    field.onTouch && field.onTouch(e.target.value, method);
  };

  // Style classes
  const defaultColorStyles = `h-10 w-20 border-2 border-gray-300 rounded-md cursor-pointer`;
  const focusStyles = `focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`;
  const hoverStyles = `hover:border-blue-400`;
  const errorStyles = error ? `border-red-500 focus:ring-red-500` : "";

  return (
    <div>
      {field.label && (
        <Label className="block text-sm font-medium mb-1">{field.label}</Label>
      )}
      <input
        type="color"
        {...controller}
        {...field.props}
        className={cn(
          defaultColorStyles,
          focusStyles,
          hoverStyles,
          errorStyles,
          field.props?.className
        )}
        onChange={handleChange}
        onFocus={handleTouch}
        onBlur={handleBlur}
      />
      {error && (
        <span className="text-red-400 text-xs mt-1 font-[600]">
          {error.message}
        </span>
      )}
    </div>
  );
});
