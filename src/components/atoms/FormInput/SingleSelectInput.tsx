import { memo, type FC } from "react";
import { Label } from "@/components/ui/label";
import type { FieldRendererProps } from "@/shared/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/shared/lib/utils";

export const SingleSelectInput: FC<FieldRendererProps> = memo((props) => {
  const { field, controller, error } = props;

  //Handles
  const handleChange = (value: string) => {
    controller.onChange(value);
    field.onChange && field.onChange(value);
  };
  const handleTouch = () => {
    field.onTouch && field.onTouch(controller.value);
  };

  // Style classes (semantic tokens)
  const defaultSelectStyles = `w-full border rounded-md shadow-sm transition-colors bg-input text-foreground`;
  const focusStyles = `focus:ring focus:ring-ring/20 focus:border-ring`;
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
      <Select
        onValueChange={handleChange}
        value={controller.value}
        onOpenChange={handleTouch}
        {...field.props}
      >
        <SelectTrigger
          className={cn(
            defaultSelectStyles,
            focusStyles,
            hoverStyles,
            errorStyles,
            field.props?.className
          )}
        >
          <SelectValue placeholder={field.placeholder || "Select an option"} />
        </SelectTrigger>
        <SelectContent className="bg-card">
          {field?.options?.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value as string}
              className="hover:bg-accent data-[state=checked]:bg-accent/80"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && (
        <span className="text-destructive text-xs mt-1 block font-semibold">
          {error.message}
        </span>
      )}
    </div>
  );
});
