import { useCopy } from "@/hooks/useCopy";
import { useState, type FC } from "react";

type PaletteSwatchProps = {
  colors: string[];
};

export const PaletteSwatch: FC<PaletteSwatchProps> = (props) => {
  const { colors } = props;

  const { copyToClipboard } = useCopy();

  const [hoveredColor, setHoveredColor] = useState<string | null>(null);
  let isHovered = (col: string) => hoveredColor === col;

  return (
    <div className="rounded-lg overflow-hidden shadow-sm max-w-70 max-h-70 h-70 w-70 border border-border">
      <div className="h-70">
        {colors.map((col: string, index) => (
          <div
            key={index}
            className="relative"
            style={{
              backgroundColor: col,
              height: `${280 / colors.length}px`,
            }}
            onMouseEnter={() => setHoveredColor(col)}
            onMouseLeave={() => {
              setHoveredColor("");
            }}
            onClick={() => copyToClipboard(col)}
          >
            {isHovered(col) && (
              <span className="absolute text-card-foreground text-sm bg-muted opacity-90 px-1 rounded-tr-md bottom-0 left-0  cursor-pointer">
                {col}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
