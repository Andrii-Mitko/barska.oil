import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/db/mongodb";
import { Feed } from "@/models/Feed";
import { feedUpdateSchema } from "@/validations/feedUpdate.schema";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const parsed = feedUpdateSchema.safeParse(body);

    if (!parsed.success) {
      console.error(
        "Validation error:",
        JSON.stringify(parsed.error.flatten(), null, 2),
      );

      return NextResponse.json(
        {
          error: "Некоректні дані",
          details: parsed.error.flatten(),
        },
        { status: 400 },
      );
    }

    await connectToDatabase();

    const updatedFeed = await Feed.findByIdAndUpdate(id, parsed.data, {
      new: true,
    });

    if (!updatedFeed) {
      return NextResponse.json(
        { error: "Комбікорм не знайдено" },
        { status: 404 },
      );
    }

    revalidatePath("/feed");
    revalidatePath(`/feed/${updatedFeed.slug}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Помилка оновлення комбікорму" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    await connectToDatabase();

    const deletedFeed = await Feed.findByIdAndDelete(id);

    if (!deletedFeed) {
      return NextResponse.json(
        { error: "Комбікорм не знайдено" },
        { status: 404 },
      );
    }

    revalidatePath("/feed");
    revalidatePath(`/feed/${deletedFeed.slug}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Помилка видалення комбікорму" },
      { status: 500 },
    );
  }
}
