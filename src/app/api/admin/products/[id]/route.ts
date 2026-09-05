import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Product } from "@/models/Product";
import { productUpdateSchema } from "@/validations/productUpdate.schema";
import { revalidatePath } from "next/cache";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = productUpdateSchema.safeParse(body);

    if (!parsed.success) {
      console.error(
        "Validation error:",
        JSON.stringify(parsed.error.flatten(), null, 2),
      );
      return NextResponse.json(
        { error: "Некоректні дані", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    await connectToDatabase();
    const updatedProduct = await Product.findByIdAndUpdate(id, parsed.data, {
      new: true,
    });

    if (!updatedProduct) {
      return NextResponse.json({ error: "Товар не знайдено" }, { status: 404 });
    }

    revalidatePath("/catalog");
    revalidatePath(`/product/${updatedProduct.slug}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Помилка оновлення товару" },
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
    await Product.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Помилка видалення товару" },
      { status: 500 },
    );
  }
}
