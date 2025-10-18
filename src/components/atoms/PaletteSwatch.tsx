import { useState } from "react";

type PaletteSwatchProps = {
  color: string[];
};

export const PaletteSwatch: React.FC<PaletteSwatchProps> = (
  props: PaletteSwatchProps
) => {
  const { color } = props;

  const [hoveredColor, setHoveredColor] = useState<string | null>(null);
  let isHovered = (col: string) => hoveredColor === col;

  const handleCopy = (color: string) => {
    navigator.clipboard
      .writeText(color)
      .then(() => {
        alert(`Copied ${color} to clipboard!`);
      })
      .catch((err) => {
        console.error("Failed to copy color:", err);
      });
  };

  return (
    <div className="rounded-lg overflow-hidden shadow-gray-400 max-w-80 max-h-80 h-80 w-80">
      <div className="h-80">
        {color.map((col, index) => (
          <div
            key={index}
            className="relative"
            style={{
              backgroundColor: col,
              height: `${320 / color.length}px`,
            }}
            onMouseEnter={() => setHoveredColor(col)}
            onMouseLeave={() => {
              setHoveredColor("");
            }}
            onClick={() => handleCopy(col)}
          >
            {isHovered(col) && (
              <span className="absolute text-white text-sm bg-gray-400 opacity-90 px-1 rounded-tr-md bottom-0 left-0">
                {col}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
