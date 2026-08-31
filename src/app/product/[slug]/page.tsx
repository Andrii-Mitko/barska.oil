import { notFound } from "next/navigation";
import type { JSX } from "react";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Product } from "@/models/Product";
import type { IProduct } from "@/types/product";
import type { ICategory } from "@/types/category";
import BuyButton from "@/components/BuyButton/BuyButton";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({
  params,
}: ProductPageProps): Promise<JSX.Element> {
  const { slug } = await params;

  await connectToDatabase();

  const product = (await Product.findOne({ slug })
    .populate("category")
    .lean()) as unknown as (IProduct & { category: ICategory }) | null;

  if (!product) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          className="w-full aspect-square"
          style={{ backgroundColor: "#f3f4f6" }}
        >
          {product.images[0] && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div>
          <span className="text-sm text-gray-500">{product.category.name}</span>
          <h1 className="text-2xl font-semibold mt-1">{product.name}</h1>
          <span className="block text-sm text-gray-500 mt-1">
            {product.volumeMl} мл
          </span>

          <div className="mt-4 text-3xl font-bold">{product.price} ₴</div>

          <div className="mt-2">
            {product.inStock ? (
              <span className="text-green-600 text-sm">
                Готово до відправки
              </span>
            ) : (
              <span className="text-red-500 text-sm">Немає в наявності</span>
            )}
          </div>

          {product.description && (
            <p className="mt-4 text-gray-700">{product.description}</p>
          )}

          <BuyButton productName={product.name} inStock={product.inStock} />
        </div>
      </div>
    </main>
  );
}
