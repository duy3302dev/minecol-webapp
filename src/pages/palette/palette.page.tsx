import { useState } from "react";
import { PaletteCard } from "@/components/molecules/PaletteCard";
import { useSearchListener } from "@/hooks/useSearchListener";
import palette from "../../../data-test/palete.data.json";

export const PalettePage: React.FC = () => {
  const [filteredPalettes, setFilteredPalettes] = useState(palette);

  // Listen for search events
  useSearchListener((params) => {
    console.log("🔍 Search triggered in PalettePage:", params);

    // TODO: Implement actual filtering logic
    // For now, just log the search params
    if (params.colors.length === 0 && params.collections.length === 0) {
      // No filters - show all palettes
      setFilteredPalettes(palette);
    } else {
      // Filter palettes based on search params
      // You can implement your filtering logic here
      // Example: filter by color names, collection tags, etc.
      setFilteredPalettes(palette);
    }
  });

  return (
    <section className="w-full flex relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredPalettes.map((palette, index) => (
          <div key={index}>
            <PaletteCard
              color={palette.colors}
              like={palette.likes}
              createdAt={palette.createdAt as unknown as Date}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
