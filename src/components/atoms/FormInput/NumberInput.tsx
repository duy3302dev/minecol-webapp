import React, { memo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { FieldRendererProps } from "@/types";
import { cn } from "@/lib/utils";

export const NumberInput = memo((props: FieldRendererProps) => {
  const { field, controller, method, error } = props;

  //Handles
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber || 0;
    controller.onChange(value); // Pass number value, not event
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
  const defaultInputStyles = `w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm`;
  const focusStyles = `focus:ring-2 focus:ring-blue-500 focus:border-blue-500`;
  const hoverStyles = `hover:border-gray-400`;
  const errorStyles = error
    ? `border-red-500 focus:ring-red-500 focus:border-red-500`
    : "";

  return (
    <div>
      {field.label && (
        <Label className="block text-sm font-medium mb-1">{field.label}</Label>
      )}
      <Input
        type="number"
        {...controller}
        {...field.props}
        className={cn(
          defaultInputStyles,
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
