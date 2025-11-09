import { PaletteSwatch } from "../atoms/PaletteSwatch";
import { Button } from "../ui/button";
import { HiOutlineHeart } from "react-icons/hi";
import { formatDistanceToNow } from "date-fns";
import _ from "lodash";

type PaletteCardProps = {
  color: string[];
  like: number;
  createdAt: Date;
};

export const PaletteCard: React.FC<PaletteCardProps> = (
  props: PaletteCardProps
) => {
  const { color, like, createdAt } = props;
  return (
    <div
      className="flex gap-2 max-w-70 relative"
      style={{ flexDirection: "column" }}
    >
      <PaletteSwatch colors={color} />
      <div className="flex justify-between items-center">
        <Button
          variant={"outline"}
          className="shadow-gray-400 shadow-sm h-8"
          style={{ border: "none" }}
        >
          <HiOutlineHeart />
          {like}
        </Button>
        <div className="text-sm pr-1 font-semibold text-muted-foreground">
          {_.replace(
            _.replace(formatDistanceToNow(createdAt), "over", ""),
            "almost",
            ""
          )}
        </div>
      </div>
    </div>
  );
};
