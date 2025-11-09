import { memo, type FC } from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ColorTag } from "./types";

interface TagBadgeProps {
  name: string;
  type: "color" | "collection";
  colorData?: ColorTag;
  onRemove: (name: string) => void;
}

export const TagBadge: FC<TagBadgeProps> = memo(
  ({ name, type, colorData, onRemove }) => {
    return (
      <Badge
        variant="secondary"
        className="bg-chip text-chip-foreground hover:bg-chip/80 transition-colors shrink-0"
      >
        {type === "color" && colorData && (
          <span
            className="w-3 h-3 rounded-full mr-1 inline-block"
            style={{ backgroundColor: colorData.color }}
          />
        )}
        {name}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(name);
          }}
          className="ml-1 hover:text-destructive transition-colors"
        >
          <X className="h-3 w-3" />
        </button>
      </Badge>
    );
  }
);

TagBadge.displayName = "TagBadge";
