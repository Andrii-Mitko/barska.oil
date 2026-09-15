import { z } from "zod";

export const makukhaCreateSchema = z.object({
  name: z.string().min(1, "Вкажіть назву"),
  pricePerKg: z.coerce.number().nonnegative("Ціна не може бути від'ємною"),
  inStock: z.boolean(),
  description: z.string().optional(),
});

export type MakukhaCreateInput = z.infer<typeof makukhaCreateSchema>;
