import { Schema, model, models, Model } from "mongoose";
import type { IFeed } from "@/types/feed";

const FeedSchema = new Schema<IFeed>(
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
    brand: {
      type: String,
      required: true,
    },
    weightKg: {
      type: Number,
      required: true,
      min: 0.1,
    },
    formula: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
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
  },
  { timestamps: true },
);

export const Feed: Model<IFeed> =
  models.Feed || model<IFeed>("Feed", FeedSchema);
