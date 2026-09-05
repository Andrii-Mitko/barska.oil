import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Order } from "@/models/Order";
import { orderSchema } from "@/validations/order.schema";
import { sendOrderNotification } from "@/lib/telegram/sendOrderNotification";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = orderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Некоректні дані форми", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    await connectToDatabase();

    const order = await Order.create(parsed.data);

    await sendOrderNotification({
      productName: parsed.data.productName,
      customerName: parsed.data.customerName,
      phone: parsed.data.phone,
      comment: parsed.data.comment,
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Помилка створення заявки" },
      { status: 500 },
    );
  }
}
