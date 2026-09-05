import { z } from "zod";

export const productUpdateSchema = z.object({
  price: z.coerce.number().nonnegative(),
  inStock: z.boolean(),
  description: z.string().optional(),
  images: z.array(z.string().url()).optional(),
});

export type ProductUpdateInput = z.infer<typeof productUpdateSchema>;
