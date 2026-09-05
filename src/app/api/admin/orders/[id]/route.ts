import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Order } from "@/models/Order";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { status } = await request.json();

    await connectToDatabase();

    await Order.findByIdAndUpdate(id, { status });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Помилка оновлення статусу" },
      { status: 500 },
    );
  }
}
