export type OrderStatus = "new" | "processed" | "cancelled";

export interface IOrder {
  _id: string;
  productName: string;
  productSlug: string;
  customerName: string;
  phone: string;
  comment?: string;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}
