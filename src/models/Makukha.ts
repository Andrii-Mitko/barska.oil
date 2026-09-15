import { Schema, model, models, Model } from "mongoose";
import type { IMakukha } from "@/types/makukha";

const MakukhaSchema = new Schema<IMakukha>(
  {
    name: {
      type: String,
      required: true,
      default: "Соняшникова макуха",
    },

    pricePerKg: {
      type: Number,
      required: true,
      min: 0,
    },

    inStock: {
      type: Boolean,
      required: true,
      default: true,
    },

    image: {
      type: String,
    },

    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Makukha: Model<IMakukha> =
  models.Makukha || model<IMakukha>("Makukha", MakukhaSchema);
