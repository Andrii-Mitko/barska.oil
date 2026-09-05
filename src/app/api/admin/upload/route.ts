import { cloudinary } from "@/lib/cloudinary/cloudinary";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Файл не передано" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await new Promise<{ secure_url: string }>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "barska-oliya/products" },
          (error, uploadResult) => {
            if (error || !uploadResult) {
              reject(error);
              return;
            }
            resolve(uploadResult);
          },
        );
        uploadStream.end(buffer);
      },
    );

    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Помилка завантаження файлу" },
      { status: 500 },
    );
  }
}
