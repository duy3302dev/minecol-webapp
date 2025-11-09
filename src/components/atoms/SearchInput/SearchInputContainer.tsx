import { memo, type FC } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { TagBadge } from "./TagBadge";
import { MoreTagsIndicator } from "./MoreTagsIndicator";
import type { TagItem, ColorTag } from "./types";

interface SearchInputContainerProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  inputRef: React.RefObject<HTMLInputElement | null>;
  isPopoverOpen: boolean;
  visibleTags: TagItem[];
  hiddenTags: TagItem[];
  colors: ColorTag[];
  inputValue: string;
  hasSelectedTags: boolean;
  onInputChange: (value: string) => void;
  onInputFocus: () => void;
  onContainerClick: () => void;
  onRemoveColor: (name: string) => void;
  onRemoveCollection: (name: string) => void;
  onClearAll: () => void;
}

export const SearchInputContainer: FC<SearchInputContainerProps> = memo(
  ({
    containerRef,
    inputRef,
    isPopoverOpen,
    visibleTags,
    hiddenTags,
    colors,
    inputValue,
    hasSelectedTags,
    onInputChange,
    onInputFocus,
    onContainerClick,
    onRemoveColor,
    onRemoveCollection,
    onClearAll,
  }) => {
    return (
      <div
        ref={containerRef}
        className={cn(
          "flex items-center gap-2 px-3 py-1 border rounded-l-full transition-all w-[85%]",
          "bg-input border-border",
          "hover:border-ring/50 hover:bg-accent/30",
          isPopoverOpen && " bg-background"
        )}
        onClick={onContainerClick}
      >
        <Search className="h-4 w-4 text-muted-foreground shrink-0" />

        {/* Selected Tags */}
        <div className="flex items-center gap-1 flex-nowrap flex-grow overflow-hidden">
          {visibleTags.map((tag) => {
            const colorData =
              tag.type === "color"
                ? colors.find((c) => c.name === tag.name)
                : undefined;

            return (
              <TagBadge
                key={`${tag.type}-${tag.name}`}
                name={tag.name}
                type={tag.type}
                colorData={colorData}
                onRemove={
                  tag.type === "color" ? onRemoveColor : onRemoveCollection
                }
              />
            );
          })}

          {/* "+X more" indicator */}
          <MoreTagsIndicator hiddenTags={hiddenTags} colors={colors} />

          {/* Hidden Input Field */}
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            onFocus={onInputFocus}
            style={{
              visibility: "hidden",
            }}
            className="absolute inset-0 w-full h-full p-2 border rounded-md"
          />
        </div>

        {/* Clear All Button */}
        {hasSelectedTags && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClearAll();
            }}
            className="ml-2 hover:text-destructive transition-colors"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>
    );
  }
);

SearchInputContainer.displayName = "SearchInputContainer";
