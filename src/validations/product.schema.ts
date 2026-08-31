import { z } from "zod";

export const productSchema = z.object({
  sku: z.string().min(1),
  name: z.string().min(1),
  slug: z.string().min(1),
  category: z.string().min(1),
  pressType: z.enum(["refined", "cold-pressed"]),
  volumeMl: z.number().positive(),
  price: z.number().nonnegative(),
  inStock: z.boolean(),
  images: z.array(z.string().url()).default([]),
  description: z.string().optional(),
  vitaminE: z.boolean().optional(),
});

export type ProductInput = z.infer<typeof productSchema>;
