import type { Types } from "mongoose";

export type PressType = "refined" | "cold-pressed";

export interface IProduct {
  _id: string;
  sku: string;
  name: string;
  slug: string;
  category: Types.ObjectId;
  pressType: PressType;
  volumeMl: number;
  price: number;
  inStock: boolean;
  images: string[];
  description?: string;
  vitaminE?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
