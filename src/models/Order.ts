import { IOrder } from "@/types/order";
import { Schema, model, models, Model } from "mongoose";

const OrderSchema = new Schema<IOrder>(
  {
    productName: {
      type: String,
      required: true,
    },
    productSlug: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
    },
    status: {
      type: String,
      enum: ["new", "processed", "cancelled"],
      default: "new",
    },
  },
  { timestamps: true },
);

export const Order: Model<IOrder> =
  models.Order || model<IOrder>("Order", OrderSchema);
