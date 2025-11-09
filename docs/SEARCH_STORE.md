# Search Store System

## Overview

The search store system provides centralized search state management with automatic URL synchronization and event-driven search triggering.

## Architecture

### Store: `src/store/search.store.ts`

- **State Management:** Zustand-based store for search tags and mode
- **URL Sync:** Automatic bidirectional sync between store and URL params
- **Event System:** CustomEvent-based search triggers

### Hook: `src/hooks/useSearchListener.ts`

- **Page Integration:** Easy way for pages to listen to search events
- **Auto Sync:** Automatically syncs from URL on mount
- **Type-Safe:** Full TypeScript support

## URL Format

```
?search=color:red,blue,green|collection:nature,abstract,minimal
```

**Structure:**

- `color:` prefix for color tags (comma-separated)
- `collection:` prefix for collection tags (comma-separated)
- `|` separator between color and collection groups

**Examples:**

- Only colors: `?search=color:red,blue`
- Only collections: `?search=collection:nature`
- Both: `?search=color:red,blue|collection:nature,abstract`
- Empty: No `search` param in URL

## Store API

### State

```typescript
interface SearchStore {
  colorTags: string[]; // Selected color tags
  collectionTags: string[]; // Selected collection tags
  mode: "palette" | "color"; // Search mode
}
```

### Actions

#### Add Tags (Auto-triggers search)

```typescript
addColorTag(tag: string)
addCollectionTag(tag: string)
```

#### Remove Tags (Auto-triggers search)

```typescript
removeColorTag(tag: string)
removeCollectionTag(tag: string)
```

#### Batch Set Tags (Auto-triggers search)

```typescript
setColorTags(tags: string[])
setCollectionTags(tags: string[])
```

#### Mode Control

```typescript
setMode(mode: "palette" | "color")
```

#### Clear All

```typescript
clear(); // Clears all tags, resets to PALETTE mode, removes URL params
```

#### Manual Sync (Usually not needed)

```typescript
syncFromURL(); // Read tags from URL
syncToURL(); // Write tags to URL
triggerSearch(); // Emit search event
```

## Usage Examples

### 1. In SearchInput Component

The `SearchInput` component automatically manages the store:

```tsx
import { useSearchStore } from "@/store/search.store";

const addColorTag = useSearchStore((state) => state.addColorTag);
const removeColorTag = useSearchStore((state) => state.removeColorTag);

// When user clicks a color chip
const handleColorToggle = (colorName: string) => {
  if (colorTags.includes(colorName)) {
    removeColorTag(colorName); // Auto-triggers search + URL update
  } else {
    addColorTag(colorName); // Auto-triggers search + URL update
  }
};
```

### 2. In Page Components (Listen to Search)

#### Using `useSearchListener` Hook (Recommended)

```tsx
import { useSearchListener } from "@/hooks/useSearchListener";

export const PalettePage = () => {
  const [data, setData] = useState(allData);

  useSearchListener((params) => {
    console.log("Search triggered:", params);
    // params = { colors: string[], collections: string[], mode: "palette" | "color" }

    // Filter your data
    const filtered = allData.filter((item) => {
      const matchesColor =
        params.colors.length === 0 ||
        params.colors.some((color) => item.colors.includes(color));

      const matchesCollection =
        params.collections.length === 0 ||
        params.collections.includes(item.collection);

      return matchesColor && matchesCollection;
    });

    setData(filtered);
  });

  return <div>{/* Render filtered data */}</div>;
};
```

#### Using Custom Event Listener (Advanced)

```tsx
useEffect(() => {
  const handleSearch = (event: Event) => {
    const { colors, collections, mode } = (event as CustomEvent).detail;
    // Handle search
  };

  window.addEventListener("search:trigger", handleSearch);
  return () => window.removeEventListener("search:trigger", handleSearch);
}, []);
```

### 3. Direct Store Access (Any Component)

```tsx
import { useSearchStore } from "@/store/search.store";

function MyComponent() {
  const colorTags = useSearchStore((state) => state.colorTags);
  const collectionTags = useSearchStore((state) => state.collectionTags);
  const mode = useSearchStore((state) => state.mode);

  return (
    <div>
      Active Colors: {colorTags.join(", ")}
      Active Collections: {collectionTags.join(", ")}
      Mode: {mode}
    </div>
  );
}
```

## Automatic Behaviors

### 1. URL Sync

- **Adding tag** → Updates URL with `replaceState` (no history entry)
- **Removing tag** → Updates URL
- **Clearing all** → Removes `search` param from URL
- **Page load** → Reads tags from URL automatically

### 2. Search Trigger

Every state change automatically:

1. Updates the store
2. Syncs to URL (via `replaceState`)
3. Emits `search:trigger` event
4. Listeners (pages) receive the event
5. Pages can filter/refetch data

### 3. Browser Navigation

- Back/forward buttons work correctly
- URL sharing works (tags are in URL)
- Page refresh preserves search state

## Event System

### Event Name

```typescript
"search:trigger";
```

### Event Detail

```typescript
interface SearchEventDetail {
  colors: string[];
  collections: string[];
  mode: "palette" | "color";
}
```

### Dispatching (Store does this automatically)

```typescript
window.dispatchEvent(
  new CustomEvent("search:trigger", {
    detail: {
      colors: ["red", "blue"],
      collections: ["nature"],
      mode: "palette",
    },
  })
);
```

## Migration from Old Store

### Old API (Deprecated)

```typescript
// ❌ Old way
const colorTag = useSearchStore((state) => state.colorTag); // null | string[]
const setColorTag = useSearchStore((state) => state.setColorTag);

setColorTag(["red", "blue"]); // Manual array management
```

### New API (Current)

```typescript
// ✅ New way
const colorTags = useSearchStore((state) => state.colorTags); // string[]
const addColorTag = useSearchStore((state) => state.addColorTag);
const removeColorTag = useSearchStore((state) => state.removeColorTag);

addColorTag("red"); // Auto-triggers search + URL sync
addColorTag("blue"); // Auto-triggers search + URL sync
removeColorTag("red"); // Auto-triggers search + URL sync
```

## Best Practices

### ✅ DO

- Use `addColorTag`/`removeColorTag` for individual changes
- Use `setColorTags`/`setCollectionTags` for batch updates
- Use `useSearchListener` in page components
- Let the store handle URL sync automatically
- Check for empty arrays before filtering (means "no filter")

### ❌ DON'T

- Don't manually modify URL params (store does this)
- Don't call `syncToURL()` manually (happens automatically)
- Don't use `window.history.pushState` (creates unwanted history)
- Don't forget to check for empty tags (empty = show all)

## Debugging

### Check Current State

```typescript
// In console or component
const store = useSearchStore.getState();
console.log(store.colorTags);
console.log(store.collectionTags);
console.log(store.mode);
```

### Monitor Events

```javascript
// In browser console
window.addEventListener("search:trigger", (e) => {
  console.log("🔍 Search triggered:", e.detail);
});
```

### Check URL Sync

```javascript
// In console
const params = new URLSearchParams(window.location.search);
console.log("Search param:", params.get("search"));
```

## Performance Considerations

### Debouncing (Optional)

If you have expensive filtering, consider debouncing:

```tsx
import { useCallback } from "react";
import { debounce } from "lodash";

const debouncedFilter = useCallback(
  debounce((params) => {
    // Expensive filtering logic
    const filtered = heavyFilter(data, params);
    setFilteredData(filtered);
  }, 300),
  [data]
);

useSearchListener(debouncedFilter);
```

### Memoization

Memoize filtered results to avoid recalculation:

```tsx
const filteredData = useMemo(() => {
  return data.filter((item) => {
    // Filtering logic
  });
}, [data, colorTags, collectionTags]);
```

## Future Enhancements

- [ ] Add search history
- [ ] Add saved searches
- [ ] Add search suggestions
- [ ] Add fuzzy search
- [ ] Add search analytics
- [ ] Add server-side search integration
