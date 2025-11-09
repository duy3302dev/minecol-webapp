import { memo, type FC } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/shared/lib/utils";
import type { FieldRendererProps, Option } from "@/shared/types";

export const RadioInput: FC<FieldRendererProps> = memo((props) => {
  const { field, controller, error } = props;

  // Handlers
  const handleChange = (value: string) => {
    controller.onChange(value); // RadioGroup onValueChange passes value directly
    field.onChange && field.onChange(value);
  };

  // Style classes (semantic tokens)
  const defaultRadioStyles = `h-4 w-4 border border-border bg-input text-foreground`;
  const focusStyles = `focus:ring-2 focus:ring-ring/20 focus:border-ring`;
  const hoverStyles = `hover:border-ring/50`;
  const errorStyles = error
    ? `border-destructive focus:ring-destructive/20`
    : "";

  return (
    <RadioGroup
      value={controller.value}
      onValueChange={handleChange}
      {...field.props}
    >
      {field.label && (
        <Label className="block text-sm font-medium mb-2 text-foreground">
          {field.label}
        </Label>
      )}
      <div className="flex flex-col space-y-2">
        {field?.options?.map((option: Option) => (
          <div key={option.value} className="flex items-center">
            <RadioGroupItem
              className={cn(
                defaultRadioStyles,
                focusStyles,
                hoverStyles,
                errorStyles
              )}
              value={option.value as string}
              id={option.value as string}
            />
            <Label
              htmlFor={option.value as string}
              className="ml-2 cursor-pointer text-foreground"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </div>
      {error && (
        <span className="text-destructive text-xs mt-1 block font-semibold">
          {error.message}
        </span>
      )}
    </RadioGroup>
  );
});
