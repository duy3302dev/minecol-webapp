import type { Palette } from "./palette.dto";
import type { UserDto } from "./user.dto";

export type CollectionPalette = {
  id: string;
  created_at: string;
  user_id: string;
  palette: Palette;
  user: UserDto;
};
