# SearchInput Component

## Overview

Advanced search component with multi-tag selection and mode switching between Palette and Color search.

## Features

✅ **Dual Mode Search**: Switch between Palette and Color modes
✅ **Multi-Tag Selection**: Add multiple tags to refine search
✅ **Auto-Complete Popover**: Shows filtered tag suggestions on focus
✅ **Keyboard Navigation**:

- `Enter` to add custom tags
- `Backspace` to remove last tag when input is empty
  ✅ **Click Outside to Close**: Popover closes when clicking outside
  ✅ **Semantic Colors**: Uses theme tokens for consistent styling
  ✅ **Responsive**: Adapts to container width with flexible tag layout

## Usage

```tsx
import { SearchInput } from "@/components/atoms/SearchInput";

function MyComponent() {
  const handleSearch = (tags: string[], mode: "palette" | "color") => {
    console.log("Searching:", { tags, mode });
    // Implement your search logic here
  };

  return <SearchInput onSearch={handleSearch} />;
}
```

## Props

| Prop        | Type                                                   | Default | Description                          |
| ----------- | ------------------------------------------------------ | ------- | ------------------------------------ |
| `onSearch`  | `(tags: string[], mode: "palette" \| "color") => void` | -       | Callback when tags or mode changes   |
| `className` | `string`                                               | -       | Additional CSS classes for container |

## Mock Data

Currently uses mock data for tags:

**Palette Tags:**

- Minimal, Vibrant, Pastel, Dark, Light, Gradient, Monochrome
- Nature, Sunset, Ocean, Forest
- Autumn, Spring, Winter, Summer

**Color Tags:**

- Red, Blue, Green, Yellow, Purple, Orange, Pink
- Cyan, Magenta, Brown, Gray
- Black, White, Gold, Silver

**TODO**: Replace with actual data from API/store.

## Component Structure

```
SearchInput
├── Mode Selector (Palette/Color)
└── Search Input Container
    ├── Search Icon
    ├── Selected Tag Badges (removable)
    ├── Input Field
    └── Popover (on focus)
        └── Filtered Tag List
```

## Styling

Uses semantic color tokens:

- `bg-input` - Input background
- `border-border` - Default border
- `border-ring` - Focus border
- `bg-chip` / `text-chip-foreground` - Tag badges
- `bg-popover` / `border-popover-border` - Popover
- `hover:bg-accent` - Hover states

## Keyboard Shortcuts

| Key         | Action                                  |
| ----------- | --------------------------------------- |
| `Enter`     | Add current input as tag (if not empty) |
| `Backspace` | Remove last tag (when input is empty)   |
| `Escape`    | Close popover (browser default)         |

## States

### Default

- Input with placeholder
- Border: `border-border`
- Background: `bg-input`

### Hover

- Border: `border-ring/50`
- Background: `bg-accent/30`

### Focus

- Border: `border-ring`
- Background: `bg-background`
- Ring: `ring-3 ring-ring/15`
- Popover visible

## Integration Examples

### With React Router

```tsx
import { useNavigate } from "react-router-dom";
import { SearchInput } from "@/components/atoms/SearchInput";

function Header() {
  const navigate = useNavigate();

  const handleSearch = (tags: string[], mode: "palette" | "color") => {
    const params = new URLSearchParams();
    params.set("mode", mode);
    tags.forEach((tag) => params.append("tag", tag));
    navigate(`/search?${params.toString()}`);
  };

  return <SearchInput onSearch={handleSearch} />;
}
```

### With State Management (Zustand)

```tsx
import { useSearchStore } from "@/store/search.store";
import { SearchInput } from "@/components/atoms/SearchInput";

function SearchBar() {
  const setSearch = useSearchStore((state) => state.setSearch);

  const handleSearch = (tags: string[], mode: "palette" | "color") => {
    setSearch({ tags, mode });
  };

  return <SearchInput onSearch={handleSearch} />;
}
```

## Customization

### Custom Tag Data

Replace the mock data with your actual tags:

```tsx
// In SearchInput.tsx
const paletteTags = usePaletteTags(); // Custom hook
const colorTags = useColorTags(); // Custom hook
```

### Custom Styling

```tsx
<SearchInput className="max-w-2xl mx-auto" onSearch={handleSearch} />
```

## Accessibility

- ✅ Keyboard navigable
- ✅ Focus indicators
- ✅ ARIA labels (can be enhanced)
- ✅ Screen reader friendly badges
- ⚠️ **TODO**: Add proper ARIA attributes for popover

## Performance

- Uses `useRef` to avoid unnecessary re-renders
- Debounced filtering (via `useEffect`)
- Click outside handler with cleanup
- Memoized tag filtering

## Known Limitations

1. **No debouncing on input**: May cause performance issues with large tag lists
2. **Fixed tag list**: Should fetch from API
3. **No tag validation**: Accepts any custom tag
4. **No max tags limit**: Can add unlimited tags
5. **No persistence**: Tags are lost on unmount

## Future Enhancements

- [ ] Add debounce to input filtering
- [ ] Fetch tags from API
- [ ] Add tag validation rules
- [ ] Add max tags limit (configurable)
- [ ] Add recent searches history
- [ ] Add keyboard navigation in popover (arrow keys)
- [ ] Add "Clear all" button
- [ ] Add tag suggestions based on current selection
- [ ] Add loading state for async tag fetching
- [ ] Add empty state when no tags match

---

**Last Updated**: 2025-11-05  
**Version**: 1.0  
**Author**: @duy3302dev
