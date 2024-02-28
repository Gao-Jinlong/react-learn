import type { Color } from "./color";

export interface HSL {
  h: number | string;
  s: number | string;
  l: number | string;
}

export interface RGB {
  r: number | string;
  g: number | string;
  b: number | string;
}

export interface HSLA extends HSL {
  a: number | string;
}

export interface RGBA extends RGB {
  a: number | string;
}

export type ColorType = Color | string | number | HSL | RGB | HSLA | RGBA;
