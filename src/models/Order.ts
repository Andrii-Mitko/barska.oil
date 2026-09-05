import { Schema, model, models, Model } from "mongoose";
import type { IOrder } from "@/types/order";

const OrderItemSchema = new Schema(
  {
    productSlug: { type: String, required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    pricePerUnit: { type: Number, required: true },
  },
  { _id: false },
);

const OrderSchema = new Schema<IOrder>(
  {
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    deliveryAddress: { type: String, required: true },
    items: { type: [OrderItemSchema], required: true },
    totalSum: { type: Number, required: true },
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
