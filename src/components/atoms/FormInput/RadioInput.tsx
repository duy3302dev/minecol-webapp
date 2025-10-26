import { memo } from "react";
import { Label } from "@/components/ui/label";
import type { FieldRendererProps, Option } from "@/types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

export const RadioInput = memo((props: FieldRendererProps) => {
  const { field, controller, method, error } = props;

  // Handlers
  const handleChange = (value: string) => {
    controller.onChange(value); // RadioGroup onValueChange passes value directly
    field.onChange && field.onChange(value, method);
  };

  // Style classes
  const defaultRadioStyles = `h-4 w-4 text-blue-600 border-gray-300`;
  const focusStyles = `focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`;
  const hoverStyles = `hover:border-blue-400`;
  const errorStyles = error ? `border-red-500 focus:ring-red-500` : "";

  return (
    <RadioGroup
      value={controller.value}
      onValueChange={handleChange}
      {...field.props}
    >
      {field.label && (
        <Label className="block text-sm font-medium mb-2">{field.label}</Label>
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
              className="ml-2 cursor-pointer"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </div>
      {error && (
        <span className="text-red-400 text-xs mt-1 block font-[600]">
          {error.message}
        </span>
      )}
    </RadioGroup>
  );
});
