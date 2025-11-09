import type { BaseDto } from "./base.dto";

export type Color = BaseDto & {
  name: string;
  hexCode: string;
  rating: number;
};
