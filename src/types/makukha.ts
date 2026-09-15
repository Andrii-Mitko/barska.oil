export interface IMakukha {
  _id: string;
  name: string;
  pricePerKg: number;
  inStock: boolean;
  image?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
