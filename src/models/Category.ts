import { Schema, model, models, Model } from "mongoose";
import type { ICategory } from "@/types/category";

const CategorySchema = new Schema<ICategory>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      enum: ["sunflower-refined", "sunflower-cold-pressed", "rapeseed"],
    },
    name: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true },
);

export const Category: Model<ICategory> =
  models.Category || model<ICategory>("Category", CategorySchema);
