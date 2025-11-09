import { memo, useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

const PRESET_COLORS = [
  "#000000",
  "#FFFFFF",
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
  "#FFA500",
  "#800080",
  "#008000",
  "#FFC0CB",
  "#A52A2A",
  "#808080",
  "#FFD700",
];

interface CustomColorPickerProps {
  /** Current selected color value (hex format) */
  value?: string;
  /** Callback when color changes */
  onChange?: (color: string) => void;
  /** Custom trigger button (optional) */
  trigger?: React.ReactNode;
  /** Popover alignment */
  align?: "start" | "center" | "end";
  /** Disable the picker */
  disabled?: boolean;
}

export const CustomColorPicker = memo((props: CustomColorPickerProps) => {
  const {
    value = "#000000",
    onChange,
    trigger,
    align = "start",
    disabled = false,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [localColor, setLocalColor] = useState(value);

  const handleColorChange = useCallback(
    (color: string) => {
      setLocalColor(color);
      onChange?.(color);
    },
    [onChange]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleColorChange(e.target.value);
    },
    [handleColorChange]
  );

  const handlePresetClick = useCallback(
    (color: string) => {
      handleColorChange(color);
      setIsOpen(false);
    },
    [handleColorChange]
  );

  const currentColor = localColor || value;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild disabled={disabled}>
        {trigger || (
          <Button
            type="button"
            variant="outline"
            className="w-10 h-10 p-0 border-2 border-gray-300 dark:border-gray-700 rounded"
            style={{ backgroundColor: currentColor }}
            aria-label="Pick color"
          />
        )}
      </PopoverTrigger>

      <PopoverContent
        className="w-64 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700"
        align={align}
      >
        <div className="space-y-3">
          {/* Preset Colors Grid */}
          <div>
            <p className="text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">
              Preset Colors
            </p>
            <div className="grid grid-cols-5 gap-2">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => handlePresetClick(color)}
                  className="w-10 h-10 rounded border-2 border-gray-300 dark:border-gray-700 hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
          </div>

          {/* Native Color Picker */}
          <div>
            <p className="text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">
              Custom Color
            </p>
            <input
              type="color"
              value={currentColor}
              onChange={handleInputChange}
              className="w-full h-10 rounded border-2 border-gray-300 dark:border-gray-700 cursor-pointer"
            />
          </div>

          {/* Hex Input */}
          <div>
            <p className="text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">
              Hex Value
            </p>
            <Input
              type="text"
              value={currentColor}
              onChange={handleInputChange}
              placeholder="#000000"
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
              maxLength={7}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
});

CustomColorPicker.displayName = "CustomColorPicker";
