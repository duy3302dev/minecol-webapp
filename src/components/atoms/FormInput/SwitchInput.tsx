import { memo, type FC } from "react";
import { Label } from "@/components/ui/label";
import type { FieldRendererProps } from "@/shared/types";
import { Switch } from "@/components/ui/switch";

export const SwitchInput: FC<FieldRendererProps> = memo((props) => {
  const { field, controller, error } = props;

  // Handlers
  const handleChange = (checked: boolean) => {
    controller.onChange(checked);
    field.onChange && field.onChange(checked);
  };
  const handleTouch = () => {
    field.onTouch && field.onTouch(controller.value);
  };
  const handleBlur = () => {
    controller.onBlur();
    field.onBlur && field.onBlur(controller.value);
  };

  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={controller.value}
        onCheckedChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleTouch}
        {...field.props}
      />
      {field.label && (
        <Label className="text-sm text-foreground cursor-pointer">
          {field.label}
        </Label>
      )}
      {error && (
        <span className="text-destructive text-xs font-semibold block w-full mt-1">
          {error.message}
        </span>
      )}
    </div>
  );
});
