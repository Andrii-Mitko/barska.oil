import { z } from "zod";

export const feedCreateSchema = z.object({
  sku: z.string().min(1, "Вкажіть артикул"),
  name: z.string().min(1, "Вкажіть назву"),
  brand: z.string().min(1, "Вкажіть виробника"),
  weightKg: z.coerce.number().positive("Вага повинна бути більшою за 0"),
  formula: z.string().min(1, "Вкажіть рецептуру"),
  price: z.coerce.number().nonnegative(),
  inStock: z.boolean(),
  description: z.string().optional(),
  images: z.array(z.string()).default([]),
});

export type FeedCreateInput = z.infer<typeof feedCreateSchema>;
