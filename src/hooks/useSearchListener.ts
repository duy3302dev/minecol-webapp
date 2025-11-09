import { useEffect } from "react";
import { useSearchStore } from "@/shared/store/search.store";

interface SearchEventDetail {
  colors: string[];
  collections: string[];
  mode: "palette" | "color";
}

/**
 * Hook to listen for search triggers from the SearchInput component.
 * Automatically syncs from URL on mount and listens for search events.
 *
 * @param onSearch - Callback function that receives search parameters
 *
 * @example
 * ```tsx
 * useSearchListener((params) => {
 *   console.log('Search triggered:', params);
 *   // Filter your data based on params.colors and params.collections
 * });
 * ```
 */
export const useSearchListener = (
  onSearch: (params: SearchEventDetail) => void
) => {
  const syncFromURL = useSearchStore((state) => state.syncFromURL);
  const colorTags = useSearchStore((state) => state.colorTags);
  const collectionTags = useSearchStore((state) => state.collectionTags);
  const mode = useSearchStore((state) => state.mode);

  // Sync from URL on mount
  useEffect(() => {
    syncFromURL();
  }, [syncFromURL]);

  // Listen for search events
  useEffect(() => {
    const handleSearch = (event: Event) => {
      const customEvent = event as CustomEvent<SearchEventDetail>;
      onSearch(customEvent.detail);
    };

    window.addEventListener("search:trigger", handleSearch);
    return () => window.removeEventListener("search:trigger", handleSearch);
  }, [onSearch]);

  // Also trigger on initial load if there are tags
  useEffect(() => {
    if (colorTags.length > 0 || collectionTags.length > 0) {
      onSearch({ colors: colorTags, collections: collectionTags, mode });
    }
  }, []); // Only on mount
};
