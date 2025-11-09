import { create } from "zustand";

export const SearchMode = {
  PALETTE: "palette",
  COLOR: "color",
} as const;

type Mode = (typeof SearchMode)[keyof typeof SearchMode];

interface SearchStore {
  // State
  colorTags: string[];
  collectionTags: string[];
  mode: Mode;

  // Actions
  addColorTag: (tag: string) => void;
  removeColorTag: (tag: string) => void;
  setColorTags: (tags: string[]) => void;

  addCollectionTag: (tag: string) => void;
  removeCollectionTag: (tag: string) => void;
  setCollectionTags: (tags: string[]) => void;

  setMode: (newMode: Mode) => void;
  clear: () => void;

  // Search trigger
  triggerSearch: () => void;

  // URL sync
  syncFromURL: () => void;
  syncToURL: () => void;
}

// Helper: Parse search params from URL
const parseSearchParams = (): {
  colors: string[];
  collections: string[];
} => {
  const params = new URLSearchParams(window.location.search);
  const searchParam = params.get("search");

  if (!searchParam) {
    return { colors: [], collections: [] };
  }

  const colors: string[] = [];
  const collections: string[] = [];

  // Format: search=color:red,blue|collection:nature,abstract
  const parts = searchParam.split("|");

  parts.forEach((part) => {
    if (part.startsWith("color:")) {
      const colorStr = part.replace("color:", "");
      if (colorStr) {
        colors.push(...colorStr.split(",").filter(Boolean));
      }
    } else if (part.startsWith("collection:")) {
      const collectionStr = part.replace("collection:", "");
      if (collectionStr) {
        collections.push(...collectionStr.split(",").filter(Boolean));
      }
    }
  });

  return { colors, collections };
};

// Helper: Build search param string
const buildSearchParam = (colors: string[], collections: string[]): string => {
  const parts: string[] = [];

  if (colors.length > 0) {
    parts.push(`color:${colors.join(",")}`);
  }

  if (collections.length > 0) {
    parts.push(`collection:${collections.join(",")}`);
  }

  return parts.join("|");
};

export const useSearchStore = create<SearchStore>((set, get) => ({
  // Initial state
  colorTags: [],
  collectionTags: [],
  mode: SearchMode.PALETTE,

  // Color tag actions
  addColorTag: (tag) => {
    const state = get();
    if (state.colorTags.includes(tag)) return;

    const newColorTags = [...state.colorTags, tag];
    set({ colorTags: newColorTags });

    // Auto sync to URL and trigger search
    setTimeout(() => {
      get().syncToURL();
      get().triggerSearch();
    }, 0);
  },

  removeColorTag: (tag) => {
    const state = get();
    const newColorTags = state.colorTags.filter((t) => t !== tag);
    set({ colorTags: newColorTags });

    // Auto sync to URL and trigger search
    setTimeout(() => {
      get().syncToURL();
      get().triggerSearch();
    }, 0);
  },

  setColorTags: (tags) => {
    set({ colorTags: tags });

    // Auto sync to URL and trigger search
    setTimeout(() => {
      get().syncToURL();
      get().triggerSearch();
    }, 0);
  },

  // Collection tag actions
  addCollectionTag: (tag) => {
    const state = get();
    if (state.collectionTags.includes(tag)) return;

    const newCollectionTags = [...state.collectionTags, tag];
    set({ collectionTags: newCollectionTags });

    // Auto sync to URL and trigger search
    setTimeout(() => {
      get().syncToURL();
      get().triggerSearch();
    }, 0);
  },

  removeCollectionTag: (tag) => {
    const state = get();
    const newCollectionTags = state.collectionTags.filter((t) => t !== tag);
    set({ collectionTags: newCollectionTags });

    // Auto sync to URL and trigger search
    setTimeout(() => {
      get().syncToURL();
      get().triggerSearch();
    }, 0);
  },

  setCollectionTags: (tags) => {
    set({ collectionTags: tags });

    // Auto sync to URL and trigger search
    setTimeout(() => {
      get().syncToURL();
      get().triggerSearch();
    }, 0);
  },

  // Mode action
  setMode: (newMode) => {
    set({ mode: newMode });
  },

  // Clear all
  clear: () => {
    set({
      colorTags: [],
      collectionTags: [],
      mode: SearchMode.PALETTE,
    });

    // Clear URL params
    setTimeout(() => {
      const url = new URL(window.location.href);
      url.searchParams.delete("search");
      window.history.replaceState({}, "", url.toString());
      get().triggerSearch();
    }, 0);
  },

  // Trigger search (can be subscribed to by pages)
  triggerSearch: () => {
    // Emit custom event that pages can listen to
    window.dispatchEvent(
      new CustomEvent("search:trigger", {
        detail: {
          colors: get().colorTags,
          collections: get().collectionTags,
          mode: get().mode,
        },
      })
    );
  },

  // Sync from URL (call on page mount)
  syncFromURL: () => {
    const { colors, collections } = parseSearchParams();
    set({
      colorTags: colors,
      collectionTags: collections,
    });
  },

  // Sync to URL (call after state changes)
  syncToURL: () => {
    const state = get();
    const searchParam = buildSearchParam(state.colorTags, state.collectionTags);

    const url = new URL(window.location.href);

    if (searchParam) {
      url.searchParams.set("search", searchParam);
    } else {
      url.searchParams.delete("search");
    }

    // Use replaceState to avoid creating browser history entries
    window.history.replaceState({}, "", url.toString());
  },
}));
