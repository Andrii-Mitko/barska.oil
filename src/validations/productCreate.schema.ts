import { z } from "zod";

export const productCreateSchema = z.object({
  sku: z.string().min(1, "Вкажіть артикул"),
  name: z.string().min(1, "Вкажіть назву"),
  slug: z
    .string()
    .min(1, "Slug згенерується автоматично з назви")
    .regex(/^[a-z0-9-]+$/, "Тільки латиниця, цифри й дефіси"),
  category: z.string().min(1, "Оберіть категорію"),
  pressType: z.enum(["refined", "cold-pressed"]),
  volumeMl: z.coerce.number().positive(),
  unitsPerBox: z.coerce.number().int().positive().optional(),
  price: z.coerce.number().nonnegative(),
  inStock: z.boolean(),
  description: z.string().optional(),
});

export type ProductCreateInput = z.infer<typeof productCreateSchema>;
