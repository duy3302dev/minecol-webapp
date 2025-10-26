import { memo } from "react";
import { Label } from "@/components/ui/label";
import type { FieldRendererProps } from "@/types";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export const SwitchInput = memo((props: FieldRendererProps) => {
  const { field, controller, method, error } = props;

  // Handlers
  const handleChange = (checked: boolean) => {
    controller.onChange(checked);
    field.onChange && field.onChange(checked, method);
  };
  const handleTouch = () => {
    field.onTouch && field.onTouch(controller.value, method);
  };
  const handleBlur = () => {
    controller.onBlur();
    field.onBlur && field.onBlur(controller.value, method);
  };

  // Style classes
  const defaultSwitchStyles = `h-4 w-4 text-blue-600 border-gray-300`;
  const hoverStyles = `hover:bg-blue-100`;
  const focusStyles = `focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`;
  const errorStyles = error ? `border-red-500 focus:ring-red-500` : "";

  return (
    <div className="flex items-center">
      <Switch
        className={cn(
          defaultSwitchStyles,
          hoverStyles,
          focusStyles,
          errorStyles,
          field.props?.className
        )}
        checked={controller.value}
        onCheckedChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleTouch}
        {...field.props}
      />
      {field.label && <Label className="ml-2">{field.label}</Label>}
      {error && (
        <span className="text-red-400 text-xs mt-1 font-[600]">
          {error.message}
        </span>
      )}
    </div>
  );
});
