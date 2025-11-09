import type { BaseDto } from "./base.dto";

type PaletteColor = {
  palette_id: string;
  color_id: string;
  sort_order: number;
};

type PaletteStyle = {
  palette_id: string;
  style_id: string;
};

export type Palette = BaseDto & {
  name: string;
  palette_colors: PaletteColor[]; // array of PaletteColor objects
  palette_styles?: PaletteStyle[];
  rating: number;
};
