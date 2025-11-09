import { useState } from "react";
import colors from "../../../data-test/color.data.json";
import { ColorCard } from "../../components/molecules/ColorCard";
import { PaletteSwatch } from "@/components/atoms/PaletteSwatch";
import type { ColorPalette } from "@/types/color";
import { Button } from "@/components/ui/button";
import _ from "lodash";
import { CustomColorPicker } from "@/components/atoms/CustomColorpicker";
import { Pencil } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { useSearchListener } from "@/hooks/useSearchListener";

export const ColorPage: React.FC = () => {
  const [currentPalette, setCurrentPalette] = useState<ColorPalette[]>([]);
  const [filteredColors, setFilteredColors] = useState(colors.data);

  // Listen for search events
  useSearchListener((params) => {
    console.log("🔍 Search triggered in ColorPage:", params);

    // TODO: Implement actual filtering logic
    // For now, just log the search params
    if (params.colors.length === 0 && params.collections.length === 0) {
      // No filters - show all colors
      setFilteredColors(colors.data);
    } else {
      // Filter colors based on search params
      // You can implement your filtering logic here
      setFilteredColors(colors.data);
    }
  });

  const handleRemoveFromPalette = (color: string) => {
    const newPalette = currentPalette.filter((c) => c.color !== color);
    setCurrentPalette(newPalette);
  };

  const openColorPicker = (color: string) => {
    const element = document.getElementById(`color-picker-${color}`);
    if (element) {
      element.click();
    }
  };

  const handleAddToPalette = (color: string) => {
    if (currentPalette.find((c) => c.color === color && c.isUserAdded)) return;
    if (_.isEmpty(currentPalette)) {
      setCurrentPalette([{ color, isUserAdded: true }]);
    } else if (!_.isEmpty(currentPalette)) {
      if (currentPalette.find((c) => c.color === color && c.isUserAdded)) {
        return;
      } else if (
        !currentPalette.find((c) => c.color === color && c.isUserAdded)
      ) {
        setCurrentPalette([...currentPalette, { color, isUserAdded: true }]);
      }
    }
  };
  return (
    <div className="flex justify-between relative">
      <div className="grid grid-cols-4 gap-4">
        {filteredColors?.map((color) => (
          <ColorCard
            key={color.hex}
            color={color.hex}
            label={color.color}
            likes={color.like}
            onAddToPalette={() => handleAddToPalette(color.hex)}
          />
        ))}
      </div>
      <div className="w-2/7 ml-8 max-h-screen sticky top-0 right-0 p-4 border border-border rounded-md overflow-y-auto">
        <div className="flex space-x-2 flex-col items-center">
          <div className="">
            <PaletteSwatch colors={currentPalette.map((c) => c.color)} />
          </div>
          <div className="flex flex-col ml-4 space-y-2 mt-4">
            {currentPalette.map((c) => (
              <div
                key={c.color}
                className="flex items-center justify-between space-x-2"
              >
                <CustomColorPicker
                  value={c.color}
                  trigger={
                    <span
                      className="w-10 h-10 rounded-md border border-border"
                      style={{
                        background: c.color,
                      }}
                      onClick={() => openColorPicker(c.color)}
                    >
                      <span
                        className={cn(
                          "flex items-center justify-center h-full w-full opacity-0 hover:opacity-100 cursor-pointer",
                          `${
                            c.color === "#FFFFFF"
                              ? "text-foreground/80"
                              : "text-card-foreground/80"
                          }`
                        )}
                      >
                        <Pencil />
                      </span>
                    </span>
                  }
                  onChange={(newColor) => {
                    const updatedPalette = currentPalette.map((item) =>
                      item.color === c.color
                        ? { ...item, color: newColor }
                        : item
                    );
                    setTimeout(() => {
                      setCurrentPalette(updatedPalette);
                    }, 100);
                  }}
                />
                <input
                  type="text"
                  value={c.color}
                  readOnly
                  className="w-18 bg-transparent text-foreground text-sm text-center"
                />
                {c.isUserAdded && (
                  <Button
                    variant="destructive"
                    onClick={() => handleRemoveFromPalette(c.color)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
          </div>
          <div className="flex flex-row ml-4 space-y-2 space-x-2">
            <Button variant="outline" className="shadow-gray-300 shadow-sm">
              Save Palette
            </Button>
            <Button
              variant="outline"
              className="shadow-gray-400"
              onClick={() => setCurrentPalette([])}
            >
              Clear Palette
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
