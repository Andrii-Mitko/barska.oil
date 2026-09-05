import { z } from "zod";

export const productCreateSchema = z.object({
  sku: z.string().min(1, "Вкажіть SKU"),
  name: z.string().min(1, "Вкажіть назву"),
  slug: z
    .string()
    .min(1, "Вкажіть slug")
    .regex(/^[a-z0-9-]+$/, "Тільки латиниця, цифри й дефіси"),
  category: z.string().min(1, "Оберіть категорію"),
  pressType: z.enum(["refined", "cold-pressed"]),
  volumeMl: z.coerce.number().positive(),
  price: z.coerce.number().nonnegative(),
  inStock: z.boolean(),
  description: z.string().optional(),
});

export type ProductCreateInput = z.infer<typeof productCreateSchema>;
