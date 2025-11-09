import { memo, useState, type FC } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/shared/lib/utils";
import type { TagItem, ColorTag } from "./types";

interface MoreTagsIndicatorProps {
  hiddenTags: TagItem[];
  colors: ColorTag[];
}

export const MoreTagsIndicator: FC<MoreTagsIndicatorProps> = memo(
  ({ hiddenTags, colors }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    if (hiddenTags.length === 0) return null;

    return (
      <div className="relative shrink-0">
        <Badge
          variant="outline"
          className="bg-accent/50 text-foreground border-border cursor-pointer hover:bg-accent transition-colors"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          +{hiddenTags.length} more
        </Badge>

        {/* Tooltip with hidden tags */}
        {showTooltip && (
          <div
            className={cn(
              "absolute z-[100] top-full left-0 mt-2 p-3 rounded-md shadow-lg border",
              "bg-popover text-popover-foreground border-popover-border",
              "min-w-[200px] max-w-[300px]"
            )}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <div className="text-xs text-muted-foreground mb-2">
              Hidden tags:
            </div>
            <div className="flex flex-wrap gap-1">
              {hiddenTags.map((tag) => {
                const colorData =
                  tag.type === "color"
                    ? colors.find((c) => c.name === tag.name)
                    : undefined;

                return (
                  <Badge
                    key={`hidden-${tag.type}-${tag.name}`}
                    variant="secondary"
                    className="bg-chip text-chip-foreground"
                  >
                    {colorData && (
                      <span
                        className="w-3 h-3 rounded-full mr-1 inline-block"
                        style={{ backgroundColor: colorData.color }}
                      />
                    )}
                    {tag.name}
                  </Badge>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
);

MoreTagsIndicator.displayName = "MoreTagsIndicator";
