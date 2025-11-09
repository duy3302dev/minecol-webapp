import { Heart, Plus } from "lucide-react";
import { ColorSwatch } from "../atoms/ColorSwatch";
import { Button } from "../ui/button";
import { useState } from "react";

export const ColorCard: React.FC<{
  color: string;
  label: string;
  likes?: number;
  onAddToPalette?: () => void;
}> = ({ color, likes, onAddToPalette }) => {
  const [liked, setLiked] = useState(false);
  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="flex flex-col items-center w-48">
      <ColorSwatch color={color} />
      <div className="flex w-full items-center justify-between mt-1">
        <Button
          variant={"ghost"}
          size={"sm"}
          onClick={onAddToPalette}
          className="flex w-fit items-center bg-accent cursor-pointer hover:bg-accent/30"
        >
          <Plus className="mr-1" />
          <span className="text-xs font-semibold text-foreground">Add</span>
        </Button>
        <Button
          className="bg-accent shadow-2xs shadow-accent hover:shadow-md hover:shadow-accent/50"
          variant="ghost"
          size="sm"
          onClick={handleLike}
        >
          {liked ? (
            <Heart className="mr-2 h-4 w-4" />
          ) : (
            <Heart className="mr-2 h-4 w-4 opacity-50" />
          )}
          {liked ? (likes ?? 0) + 1 : likes ?? 0}
        </Button>
      </div>
    </div>
  );
};
