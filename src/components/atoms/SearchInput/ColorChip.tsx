import { memo, type FC } from "react";
import { cn } from "@/shared/lib/utils";
import type { ColorTag } from "./types";

interface ColorChipProps {
  color: ColorTag;
  isSelected: boolean;
  onToggle: (colorName: string) => void;
}

export const ColorChip: FC<ColorChipProps> = memo(
  ({ color, isSelected, onToggle }) => {
    return (
      <button
        type="button"
        onClick={() => onToggle(color.name)}
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all",
          "border hover:scale-105",
          isSelected
            ? "bg-chip text-chip-foreground border-ring"
            : "bg-background border-border hover:border-ring/50"
        )}
      >
        <span
          className="w-4 h-4 rounded-full shrink-0"
          style={{
            backgroundColor: color.color,
            border: color.name === "White" ? "1px solid #E0E0E0" : "none",
          }}
        />
        <span>{color.name}</span>
      </button>
    );
  }
);

ColorChip.displayName = "ColorChip";
