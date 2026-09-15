import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/db/mongodb";
import { Order } from "@/models/Order";
import type { OrderStatus } from "@/types/order";

const ORDER_STATUSES: OrderStatus[] = ["new", "processed", "cancelled"];

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { status } = await request.json();

    if (!ORDER_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: "Некоректний статус заявки" },
        { status: 400 },
      );
    }

    await connectToDatabase();

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedOrder) {
      return NextResponse.json(
        { error: "Заявку не знайдено" },
        { status: 404 },
      );
    }

    revalidatePath("/admin/orders");

    return NextResponse.json({
      success: true,
      status: updatedOrder.status,
    });
  } catch (error) {
    console.error("Order status update error:", error);

    return NextResponse.json(
      { error: "Помилка оновлення статусу" },
      { status: 500 },
    );
  }
}
