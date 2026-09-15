import { z } from "zod";

export const feedUpdateSchema = z.object({
  price: z.coerce.number().nonnegative(),

  inStock: z.boolean(),

  weightKg: z.coerce.number().positive("Вага повинна бути більшою за 0"),

  formula: z.string().min(1, "Вкажіть рецептуру"),

  description: z.string().optional(),

  images: z.array(z.string()).default([]),
});

export type FeedUpdateInput = z.infer<typeof feedUpdateSchema>;
