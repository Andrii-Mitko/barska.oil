import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import type { CategorySlug } from "@/types/category";

export async function GET(request: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get("category");

    const filter: Record<string, unknown> = {};

    if (categorySlug) {
      const category = await Category.findOne({
        slug: categorySlug as CategorySlug,
      }).lean();

      if (!category) {
        return NextResponse.json({ products: [] });
      }

      filter.category = category._id;
    }

    const products = await Product.find(filter).populate("category").lean();

    return NextResponse.json({ products });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Помилка отримання товарів" },
      { status: 500 },
    );
  }
}
