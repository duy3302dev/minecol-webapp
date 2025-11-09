import { useState, useRef, useEffect, type FC } from "react";
import { cn } from "@/shared/lib/utils";
import { SearchInputContainer } from "./SearchInputContainer";
import { SearchPopover } from "./SearchPopover";
import { COLORS, COLLECTIONS } from "./constants";
import type { SearchInputProps } from "./types";
import { ModeSelector } from "./ModeSelector";
import { useSearchStore } from "@/shared/store/search.store";

export const SearchInput: FC<SearchInputProps> = ({
  onSearch,
  className,
  maxVisibleTags = 6,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Get state and actions from store
  const mode = useSearchStore((state) => state.mode);
  const setMode = useSearchStore((state) => state.setMode);
  const colorTags = useSearchStore((state) => state.colorTags);
  const collectionTags = useSearchStore((state) => state.collectionTags);
  const addColorTag = useSearchStore((state) => state.addColorTag);
  const removeColorTag = useSearchStore((state) => state.removeColorTag);
  const addCollectionTag = useSearchStore((state) => state.addCollectionTag);
  const removeCollectionTag = useSearchStore(
    (state) => state.removeCollectionTag
  );
  const clear = useSearchStore((state) => state.clear);
  const syncFromURL = useSearchStore((state) => state.syncFromURL);

  // Sync from URL on mount
  useEffect(() => {
    syncFromURL();
  }, [syncFromURL]);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsPopoverOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Notify parent of changes (optional backward compatibility)
  useEffect(() => {
    onSearch?.(colorTags, collectionTags);
  }, [colorTags, collectionTags, onSearch]);

  const handleColorToggle = (colorName: string) => {
    if (colorTags.includes(colorName)) {
      removeColorTag(colorName);
    } else {
      addColorTag(colorName);
    }
  };

  const handleCollectionToggle = (collection: string) => {
    if (collectionTags.includes(collection)) {
      removeCollectionTag(collection);
    } else {
      addCollectionTag(collection);
    }
  };

  const handleRemoveColor = (colorName: string) => {
    removeColorTag(colorName);
  };

  const handleRemoveCollection = (collection: string) => {
    removeCollectionTag(collection);
  };

  const handleInputFocus = () => {
    setIsPopoverOpen(true);
  };

  const handleClearAll = () => {
    clear();
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
    handleInputFocus();
  };

  // Combine all selected tags
  const allSelectedTags = [
    ...colorTags.map((name) => ({ type: "color" as const, name })),
    ...collectionTags.map((name) => ({
      type: "collection" as const,
      name,
    })),
  ];

  const visibleTags = allSelectedTags.slice(0, maxVisibleTags);
  const hiddenTags = allSelectedTags.slice(maxVisibleTags);
  const hasSelectedTags = colorTags.length > 0 || collectionTags.length > 0;

  return (
    <div className={cn("relative w-full", className)}>
      <div className="flex gap-0">
        <SearchInputContainer
          containerRef={containerRef}
          inputRef={inputRef}
          isPopoverOpen={isPopoverOpen}
          visibleTags={visibleTags}
          hiddenTags={hiddenTags}
          colors={COLORS}
          inputValue={inputValue}
          hasSelectedTags={hasSelectedTags}
          onInputChange={setInputValue}
          onInputFocus={handleInputFocus}
          onContainerClick={handleContainerClick}
          onRemoveColor={handleRemoveColor}
          onRemoveCollection={handleRemoveCollection}
          onClearAll={handleClearAll}
        />
        <ModeSelector mode={mode} setMode={setMode} />
      </div>

      <SearchPopover
        isOpen={isPopoverOpen}
        popoverRef={popoverRef}
        colors={COLORS}
        collections={COLLECTIONS}
        selectedColors={colorTags}
        selectedCollections={collectionTags}
        onColorToggle={handleColorToggle}
        onCollectionToggle={handleCollectionToggle}
      />
    </div>
  );
};
