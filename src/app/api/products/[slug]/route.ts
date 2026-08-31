import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Product } from "@/models/Product";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    await connectToDatabase();
    const { slug } = await params;

    const product = await Product.findOne({ slug }).populate("category").lean();

    if (!product) {
      return NextResponse.json({ error: "Товар не знайдено" }, { status: 404 });
    }

    return NextResponse.json({ product });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Помилка отримання товару" },
      { status: 500 },
    );
  }
}
