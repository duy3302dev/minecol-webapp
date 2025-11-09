import { memo, useMemo, useState, useCallback, type FC } from "react";
import { Label } from "@/components/ui/label";
import type { FieldRendererProps } from "@/shared/types";
import { cn } from "@/shared/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Copy } from "lucide-react";
import { Input } from "@/components/ui/input";

export const ColorInput: FC<FieldRendererProps> = memo((props) => {
  const { field, controller, error } = props;

  const modeInput = {
    hex: "Hex",
    rgb: "RGB",
    hsl: "HSL",
  } as const;
  const [modeColorInput, setModeColorInput] =
    useState<keyof typeof modeInput>("hex");

  // Helper functions moved outside to prevent recreation
  const hexToRgb = useCallback(
    (hex: string): string => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgb(${r}, ${g}, ${b})`;
    },
    [controller.value]
  );

  const hexToHsl = useCallback(
    (hex: string): string => {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0,
        s = 0,
        l = (max + min) / 2;

      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
      }

      return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(
        l * 100
      )}%)`;
    },
    [controller.value]
  );

  // Use useMemo to compute color value only when needed
  const colorValue = useMemo(() => {
    if (!controller.value) return "";

    switch (modeColorInput) {
      case "hex":
        return controller.value;
      case "rgb":
        return hexToRgb(controller.value);
      case "hsl":
        return hexToHsl(controller.value);
      default:
        return controller.value;
    }
  }, [modeColorInput, controller.value]);

  //Handles - Use useCallback to prevent recreation on every render
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    controller.onChange(value); // Pass value, not event
    field.onChange?.(value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    controller.onBlur();
    field.onBlur?.(e.target.value);
  };

  const handleTouch = (e: React.FocusEvent<HTMLInputElement>) => {
    field.onTouch?.(e.target.value);
  };

  const handleModeChange = (value: keyof typeof modeInput) => {
    setModeColorInput(value);
  };

  // Style classes (semantic tokens)
  const defaultColorStyles = `h-10 w-20 border-2 rounded-md cursor-pointer transition-colors bg-input`;
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
      <div className="flex items-center">
        <input
          type="color"
          {...controller}
          {...field.props}
          placeholder={field.placeholder}
          className={cn(
            defaultColorStyles,
            focusStyles,
            hoverStyles,
            errorStyles,
            field.props?.className
          )}
          onChange={handleChange}
          onFocus={handleTouch}
          onBlur={handleBlur}
        />
        <div className="ml-4 text-sm text-foreground flex items-center">
          <Select value={modeColorInput} onValueChange={handleModeChange}>
            <SelectTrigger>
              <SelectValue placeholder={modeColorInput} />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(modeInput).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="ml-2 flex items-center gap-1 relative">
            <Input
              className={`bg-muted px-2 py-1 rounded-md border border-border w-[calc(${
                modeColorInput === "hex"
                  ? "8"
                  : modeColorInput === "rgb"
                  ? "14"
                  : "16"
              }ch)]`}
              value={colorValue}
            />
            <Copy
              className="h-4 w-4 absolute right-2"
              onClick={() => navigator.clipboard.writeText(colorValue)}
            />
          </div>
        </div>
      </div>
      {error && (
        <span className="text-destructive text-xs mt-1 font-semibold block">
          {error.message}
        </span>
      )}
    </div>
  );
});
