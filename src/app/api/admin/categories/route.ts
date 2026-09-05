import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Category } from "@/models/Category";

export async function GET() {
  await connectToDatabase();
  const categories = await Category.find().sort({ order: 1 }).lean();
  return NextResponse.json({ categories });
}
