import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchMode } from "@/shared/store/search.store";
import { PaintBucket, Palette } from "lucide-react";

interface ModeSelectorProps {
  mode: (typeof SearchMode)[keyof typeof SearchMode];
  setMode: (newMode: (typeof SearchMode)[keyof typeof SearchMode]) => void;
}

export const ModeSelector = (props: ModeSelectorProps) => {
  const { mode, setMode } = props;

  return (
    <Select
      value={mode}
      onValueChange={setMode}
      defaultValue={SearchMode.PALETTE}
    >
      <SelectTrigger
        className="min-w-[60px] p-2 rounded-r-full border border-border
        bg-input text-foreground hover:bg-accent/30 focus:ring-none transition-colors"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={SearchMode.PALETTE}>
          <Palette className="h-10" /> Palette
        </SelectItem>
        <SelectItem value={SearchMode.COLOR}>
          <PaintBucket className="h-10" /> Color
        </SelectItem>
      </SelectContent>
    </Select>
  );
};
