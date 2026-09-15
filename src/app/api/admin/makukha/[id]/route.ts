import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/db/mongodb";
import { Makukha } from "@/models/Makukha";
import { z } from "zod";

const makukhaUpdateSchema = z.object({
  name: z.string().min(1, "Вкажіть назву"),
  pricePerKg: z.coerce.number().nonnegative("Ціна не може бути від'ємною"),
  inStock: z.boolean(),
  image: z.string().optional(),
  description: z.string().optional(),
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const parsed = makukhaUpdateSchema.safeParse(body);

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

    const updatedMakukha = await Makukha.findByIdAndUpdate(id, parsed.data, {
      new: true,
    });

    if (!updatedMakukha) {
      return NextResponse.json(
        { error: "Макуху не знайдено" },
        { status: 404 },
      );
    }

    revalidatePath("/");
    revalidatePath("/makukha");

    return NextResponse.json({
      success: true,
      makukha: updatedMakukha,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Помилка оновлення макухи" },
      { status: 500 },
    );
  }
}
