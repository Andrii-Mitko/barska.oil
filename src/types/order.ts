export type OrderStatus = "new" | "processed" | "cancelled";

export interface OrderItem {
  productName: string;
  boxQuantity: number;
  unitsPerBox: number;
  pricePerUnit: number;
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
