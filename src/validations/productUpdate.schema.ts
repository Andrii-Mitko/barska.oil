import { z } from "zod";

export const productUpdateSchema = z.object({
  price: z.coerce.number().nonnegative(),
  inStock: z.boolean(),
  description: z.string().optional(),
  images: z
    .array(z.string())
    .optional()
    .transform((images) =>
      (images ?? []).filter((url) => url.trim().length > 0),
    ),
});

export type ProductUpdateInput = z.infer<typeof productUpdateSchema>;
