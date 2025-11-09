import type { BaseDto } from "./base.dto";
import type { CollectionColor } from "./collection.color.dto";

export type Folder = BaseDto & {
  user_id: string;
  name: string;
  collection_colors: CollectionColor[];
};
