import { z } from "zod";

export const checkoutSchema = z.object({
  customerName: z.string().min(2, "Введіть ім'я та прізвище"),
  phone: z.string().min(10, "Введіть коректний номер телефону"),
  deliveryAddress: z
    .string()
    .min(5, "Вкажіть місто та номер відділення Нової Пошти"),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
