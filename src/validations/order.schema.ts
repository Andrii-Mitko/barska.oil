import { z } from "zod";

const orderItemSchema = z.object({
  productSlug: z.string().min(1),
  productName: z.string().min(1),
  quantity: z.coerce.number().int().min(1),
  pricePerUnit: z.number().nonnegative(),
});

export const orderSchema = z.object({
  customerName: z.string().min(2, "Введіть ім'я та прізвище"),
  phone: z.string().min(10, "Введіть коректний номер телефону"),
  deliveryAddress: z
    .string()
    .min(5, "Вкажіть місто та номер відділення Нової Пошти"),
  items: z.array(orderItemSchema).min(1, "Кошик порожній"),
});

export type OrderInput = z.infer<typeof orderSchema>;
