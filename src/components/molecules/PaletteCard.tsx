import { PaletteSwatch } from "../atoms/PaletteSwatch";
import { Button } from "../ui/button";
import { HiOutlineHeart } from "react-icons/hi";
import { formatDistanceToNow } from "date-fns";

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
      className="flex gap-1.5 max-w-80 relative"
      style={{ flexDirection: "column" }}
    >
      <PaletteSwatch color={color} />
      <div className="flex justify-between items-center">
        <Button
          variant={"outline"}
          className="shadow-gray-400"
          style={{ border: "none" }}
        >
          <HiOutlineHeart />
          {like}
        </Button>
        <div className="text-sm pr-1">
          {formatDistanceToNow(createdAt, { addSuffix: true }).replace(
            "over",
            ""
          )}
        </div>
      </div>
    </div>
  );
};
