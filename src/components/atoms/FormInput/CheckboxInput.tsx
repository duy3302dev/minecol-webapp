import { memo, type FC } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/shared/lib/utils";
import type { FieldRendererProps } from "@/shared/types";

export const CheckboxInput: FC<FieldRendererProps> = memo((props) => {
  const { field, controller, error } = props;

  //Handle
  const handleChange = (value: boolean) => {
    controller.onChange(value);
    field.onChange && field.onChange(value);
  };

  const handleTouch = () => {
    field.onTouch && field.onTouch(controller.value);
  };

  // Style classes (semantic tokens)
  const defaultCheckboxStyles = `h-4 w-4 border border-border rounded bg-input`;
  const focusStyles = `focus:ring-2 focus:ring-ring/20 focus:border-ring`;
  const hoverStyles = `hover:border-ring/50`;
  const errorStyles = error
    ? `border-destructive focus:ring-destructive/20`
    : "";

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
        <Label className="ml-2 text-sm font-medium text-foreground">
          {field.label}
        </Label>
      )}
      {error && (
        <span className="text-destructive text-xs mt-1 ml-2 font-semibold">
          {error.message}
        </span>
      )}
    </div>
  );
});
