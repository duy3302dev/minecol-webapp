import { useCopy } from "@/hooks/useCopy";
import { useState } from "react";

export const ColorSwatch: React.FC<{ color: string }> = ({ color }) => {
  const { copyToClipboard } = useCopy();
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="flex flex-col items-center relative">
      <div
        className="w-48 h-48 rounded border border-border"
        style={{ backgroundColor: color }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      {isHovered && (
        <span
          onClick={() => copyToClipboard(color)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="absolute text-card-foreground text-sm bg-muted opacity-90 px-1 rounded-tr-md bottom-0 left-0 cursor-pointer hover:opacity-100"
        >
          {color}
        </span>
      )}
    </div>
  );
};
