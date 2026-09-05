import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Order } from "@/models/Order";
import { orderSchema } from "@/validations/order.schema";
import { sendOrderNotification } from "@/lib/telegram/sendOrderNotification";
import { calculateLineTotal } from "@/lib/pricing/priceTiers";

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

    const totalSum = parsed.data.items.reduce((sum, item) => {
      const { total } = calculateLineTotal(
        item.productSlug,
        item.quantity,
        item.pricePerUnit,
      );
      return sum + total;
    }, 0);

    await connectToDatabase();

    const order = await Order.create({ ...parsed.data, totalSum });

    await sendOrderNotification({
      customerName: parsed.data.customerName,
      phone: parsed.data.phone,
      deliveryAddress: parsed.data.deliveryAddress,
      items: parsed.data.items,
      totalSum,
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
