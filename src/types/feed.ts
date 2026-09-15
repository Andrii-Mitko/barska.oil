export interface IFeed {
  _id: string;
  sku: string;
  name: string;
  slug: string;
  brand: string;
  weightKg: number;
  formula: string;
  price: number;
  inStock: boolean;
  images: string[];
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
