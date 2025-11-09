import { memo, type FC } from "react";
import { cn } from "@/shared/lib/utils";
import { ColorChip } from "./ColorChip";
import { CollectionTag } from "./CollectionTag";
import type { ColorTag } from "./types";

interface SearchPopoverProps {
  isOpen: boolean;
  popoverRef: React.RefObject<HTMLDivElement | null>;
  colors: ColorTag[];
  collections: string[];
  selectedColors: string[];
  selectedCollections: string[];
  onColorToggle: (colorName: string) => void;
  onCollectionToggle: (collection: string) => void;
}

export const SearchPopover: FC<SearchPopoverProps> = memo(
  ({
    isOpen,
    popoverRef,
    colors,
    collections,
    selectedColors,
    selectedCollections,
    onColorToggle,
    onCollectionToggle,
  }) => {
    if (!isOpen) return null;

    return (
      <div
        ref={popoverRef}
        className={cn(
          "absolute z-50 w-full mt-2 p-4 rounded-md shadow-lg border",
          "bg-popover text-popover-foreground border-popover-border",
          "max-h-[500px] overflow-y-auto"
        )}
      >
        {/* Colors Section */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-foreground mb-3">Colors</h3>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <ColorChip
                key={color.name}
                color={color}
                isSelected={selectedColors.includes(color.name)}
                onToggle={onColorToggle}
              />
            ))}
          </div>
        </div>

        {/* Collections Section */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-3">
            Collections
          </h3>
          <div className="flex flex-wrap gap-2">
            {collections.map((collection) => (
              <CollectionTag
                key={collection}
                collection={collection}
                isSelected={selectedCollections.includes(collection)}
                onToggle={onCollectionToggle}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
);

SearchPopover.displayName = "SearchPopover";
