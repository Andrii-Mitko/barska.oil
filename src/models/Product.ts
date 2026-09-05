import { Schema, model, models, Model } from "mongoose";
import type { IProduct } from "@/types/product";
import "@/models/Category";

const ProductSchema = new Schema<IProduct>(
  {
    sku: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    pressType: {
      type: String,
      enum: ["refined", "cold-pressed"],
      required: true,
    },
    volumeMl: {
      type: Number,
      required: true,
    },
    unitsPerBox: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Boolean,
      required: true,
      default: true,
    },
    images: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
    },
    vitaminE: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const Product: Model<IProduct> =
  models.Product || model<IProduct>("Product", ProductSchema);
