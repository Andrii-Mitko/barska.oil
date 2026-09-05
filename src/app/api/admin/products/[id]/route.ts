import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Product } from "@/models/Product";
import { productUpdateSchema } from "@/validations/productUpdate.schema";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = productUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Некоректні дані", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    await connectToDatabase();
    await Product.findByIdAndUpdate(id, parsed.data);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Помилка оновлення товару" },
      { status: 500 },
    );
  }
}
