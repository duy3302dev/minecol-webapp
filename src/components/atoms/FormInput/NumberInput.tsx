import React, { memo, type FC } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { FieldRendererProps } from "@/shared/types";
import { cn } from "@/shared/lib/utils";

export const NumberInput: FC<FieldRendererProps> = memo((props) => {
  const { field, controller, error } = props;

  //Handles
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber || 0;
    controller.onChange(value); // Pass number value, not event
    field.onChange && field.onChange(value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    controller.onBlur();
    field.onBlur && field.onBlur(e.target.value);
  };

  const handleTouch = (e: React.FocusEvent<HTMLInputElement>) => {
    field.onTouch && field.onTouch(e.target.value);
  };

  // Style classes (use semantic tokens)
  const defaultInputStyles = `w-full px-3 py-2 border rounded-md shadow-sm transition-colors bg-input text-foreground`;
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
      <Input
        type="number"
        {...controller}
        {...field.props}
        placeholder={field.placeholder}
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
        <span className="text-destructive text-xs mt-1 font-semibold block">
          {error.message}
        </span>
      )}
    </div>
  );
});
