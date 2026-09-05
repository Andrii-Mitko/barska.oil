export interface CartItem {
  productSlug: string;
  productName: string;
  pricePerUnit: number;
  quantity: number;
  image?: string;
}
