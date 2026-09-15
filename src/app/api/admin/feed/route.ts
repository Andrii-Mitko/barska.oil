import { NextResponse } from "next/server";

import { connectToDatabase } from "@/lib/db/mongodb";
import { createSlug } from "@/lib/slug";
import { Feed } from "@/models/Feed";
import { feedCreateSchema } from "@/validations/feedCreate.schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = feedCreateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Некоректні дані",
          details: parsed.error.flatten(),
        },
        { status: 400 },
      );
    }

    const slug = createSlug(parsed.data.name);

    if (!slug) {
      return NextResponse.json(
        { error: "Не вдалося створити slug з назви" },
        { status: 400 },
      );
    }

    await connectToDatabase();

    const existing = await Feed.findOne({
      $or: [{ sku: parsed.data.sku }, { slug }],
    });

    if (existing) {
      return NextResponse.json(
        { error: "Комбікорм з таким SKU або slug вже існує" },
        { status: 409 },
      );
    }

    const feed = await Feed.create({
      ...parsed.data,
      slug,
      images: [],
    });

    return NextResponse.json({ feed }, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Помилка створення комбікорму" },
      { status: 500 },
    );
  }
}
