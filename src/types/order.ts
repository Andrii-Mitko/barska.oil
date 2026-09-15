export type OrderStatus = "new" | "processed" | "cancelled";

export type OrderItemUnit = "шт" | "кг";

export interface OrderItem {
  productSlug: string;
  productName: string;
  quantity: number;
  pricePerUnit: number;
  unit?: OrderItemUnit;
}

export interface IOrder {
  _id: string;
  customerName: string;
  phone: string;
  deliveryAddress: string;
  items: OrderItem[];
  totalSum: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}
