import { cn } from "@/shared/lib/utils";
import { memo, type FC } from "react";

interface CollectionTagProps {
  collection: string;
  isSelected: boolean;
  onToggle: (collection: string) => void;
}

export const CollectionTag: FC<CollectionTagProps> = memo(
  ({ collection, isSelected, onToggle }) => {
    return (
      <button
        type="button"
        onClick={() => onToggle(collection)}
        className={cn(
          "px-3 py-1.5 rounded-full text-sm transition-all",
          "border hover:scale-105",
          isSelected
            ? "bg-chip text-chip-foreground border-ring"
            : "bg-background border-border hover:border-ring/50"
        )}
      >
        {collection}
      </button>
    );
  }
);

CollectionTag.displayName = "CollectionTag";
