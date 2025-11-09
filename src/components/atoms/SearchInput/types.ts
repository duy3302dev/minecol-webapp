export interface ColorTag {
  name: string;
  color: string;
}

export interface TagItem {
  type: "color" | "collection";
  name: string;
}

export interface SearchInputProps {
  onSearch?: (selectedColors: string[], selectedCollections: string[]) => void;
  className?: string;
  maxVisibleTags?: number;
}
