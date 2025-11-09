import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { FieldRendererProps } from "@/shared/types";
import { memo, type FC } from "react";
import { cn } from "@/shared/lib/utils";

export const SingleStringInput: FC<FieldRendererProps> = memo((props) => {
  const { field, controller, error } = props;

  //Handles
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    controller.onChange(value); // Pass value, not event
    field.onChange && field.onChange(value);
  };

  const handleTouch = (e: React.FocusEvent<HTMLInputElement>) => {
    field.onTouch && field.onTouch(e.target.value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    controller.onBlur();
    field.onBlur && field.onBlur(e.target.value);
  };

  // Style classes
  const defaultInputStyles = `w-full px-3 py-2 border rounded-md shadow-sm transition-colors`;
  const lightStyles = `bg-input text-foreground`;
  const darkStyles = `border-border`;
  const focusStyles = `focus:border-ring focus:ring-2 focus:ring-ring/20`;
  const hoverStyles = `hover:border-ring/50`;
  const errorStyles = error
    ? `border-destructive focus:ring-destructive/20`
    : "";

  return (
    <div>
      {field.label && (
        <Label className="block text-sm font-medium mb-1 text-foreground">
          {field.label}
        </Label>
      )}
      <Input
        {...controller}
        {...field.props}
        placeholder={field.placeholder}
        className={cn(
          defaultInputStyles,
          lightStyles,
          darkStyles,
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
