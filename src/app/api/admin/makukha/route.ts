// src/app/api/admin/makukha/route.ts
import { NextResponse } from "next/server";

import { connectToDatabase } from "@/lib/db/mongodb";
import { Makukha } from "@/models/Makukha";
import { makukhaCreateSchema } from "@/validations/makukhaCreate.schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parsed = makukhaCreateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Некоректні дані",
          details: parsed.error.flatten(),
        },
        { status: 400 },
      );
    }

    await connectToDatabase();

    const existing = await Makukha.findOne();

    if (existing) {
      return NextResponse.json(
        { error: "Позиція макухи вже існує" },
        { status: 409 },
      );
    }

    const makukha = await Makukha.create(parsed.data);

    return NextResponse.json({ makukha }, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Помилка створення макухи" },
      { status: 500 },
    );
  }
}
