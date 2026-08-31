import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Category } from "@/models/Category";

export async function GET() {
  try {
    await connectToDatabase();
    const categories = await Category.find().sort({ order: 1 }).lean();

    return NextResponse.json({ categories });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Помилка отримання категорій" },
      { status: 500 },
    );
  }
}
