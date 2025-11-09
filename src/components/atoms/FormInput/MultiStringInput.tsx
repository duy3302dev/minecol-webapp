import React, { memo, type FC } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { FieldRendererProps } from "@/shared/types";
import { cn } from "@/shared/lib/utils";

export const MultiStringInput: FC<FieldRendererProps> = memo((props) => {
  const { field, controller, error } = props;

  //Handle
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    controller.onChange(value); // Pass value, not event
    field.onChange && field.onChange(value);
  };

  const handleTouch = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    field.onTouch && field.onTouch(e.target.value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    controller.onBlur();
    field.onBlur && field.onBlur(e.target.value);
  };

  // Style classes
  const defaultTextareaStyles = `w-full px-3 py-2 border rounded-md shadow-sm min-h-[100px] transition-colors bg-input text-foreground`;
  const focusStyles = `focus:ring-2 focus:ring-ring/20 focus:border-ring`;
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
      <Textarea
        {...controller}
        {...field.props}
        placeholder={field.placeholder}
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
        <span className="text-destructive text-xs mt-1 font-semibold block">
          {error.message}
        </span>
      )}
    </div>
  );
});
