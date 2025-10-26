import React, { memo } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { FieldRendererProps } from "@/types";
import { cn } from "@/lib/utils";

export const MultiStringInput = memo((props: FieldRendererProps) => {
  const { field, controller, method, error } = props;

  //Handle
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    controller.onChange(value); // Pass value, not event
    field.onChange && field.onChange(value, method);
  };

  const handleTouch = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    field.onTouch && field.onTouch(e.target.value, method);
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    controller.onBlur();
    field.onBlur && field.onBlur(e.target.value, method);
  };

  // Style classes
  const defaultTextareaStyles = `w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm min-h-[100px]`;
  const focusStyles = `focus:ring focus:ring-blue-500 focus:border-blue-500`;
  const hoverStyles = `hover:border-gray-400`;
  const errorStyles = error
    ? `border-red-500 focus:ring-red-500 focus:border-red-500`
    : "";

  return (
    <div>
      {field.label && (
        <Label className="block text-sm font-medium mb-1">{field.label}</Label>
      )}
      <Textarea
        {...controller}
        {...field.props}
        className={cn(
          defaultTextareaStyles,
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
