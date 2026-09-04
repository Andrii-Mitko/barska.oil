import { z } from "zod";

export const orderSchema = z.object({
  productName: z.string().min(1),
  productSlug: z.string().min(1),
  customerName: z.string().min(2, "Введіть ім'я"),
  phone: z.string().min(10, "Введіть коректний номер телефону"),
  comment: z.string().optional(),
});

export type OrderInput = z.infer<typeof orderSchema>;
