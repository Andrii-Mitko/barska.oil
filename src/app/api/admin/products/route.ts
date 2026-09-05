import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Product } from "@/models/Product";
import { productCreateSchema } from "@/validations/productCreate.schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = productCreateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Некоректні дані", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    await connectToDatabase();

    const existing = await Product.findOne({
      $or: [{ sku: parsed.data.sku }, { slug: parsed.data.slug }],
    });

    if (existing) {
      return NextResponse.json(
        { error: "Товар з таким SKU або slug вже існує" },
        { status: 409 },
      );
    }

    const product = await Product.create({ ...parsed.data, images: [] });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Помилка створення товару" },
      { status: 500 },
    );
  }
}
