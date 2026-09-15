import { z } from "zod";

export const productCreateSchema = z.object({
  sku: z.string().min(1, "Вкажіть артикул"),
  name: z.string().min(1, "Вкажіть назву"),

  category: z.string().min(1, "Оберіть категорію"),
  pressType: z.enum(["refined", "cold-pressed"]),
  volumeMl: z.coerce.number().positive(),
  unitsPerBox: z.coerce.number().int().positive().optional(),
  price: z.coerce.number().nonnegative(),
  inStock: z.boolean(),
  description: z.string().optional(),
});

export type ProductCreateInput = z.infer<typeof productCreateSchema>;
