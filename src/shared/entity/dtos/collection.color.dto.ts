import type { Color } from "./color.dto";
import type { UserDto } from "./user.dto";

export type CollectionColor = {
  id: string;
  created_at: string;
  user_id: string;
  color: Color;
  user: UserDto;
  folder_id?: string;
};
