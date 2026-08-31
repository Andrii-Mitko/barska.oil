import { connectToDatabase } from "@/lib/db/mongodb";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import type { IProduct } from "@/types/product";
import type { ICategory } from "@/types/category";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

interface CatalogPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const { category: categorySlug } = await searchParams;

  await connectToDatabase();

  const categories = (await Category.find()
    .sort({ order: 1 })
    .lean()) as unknown as ICategory[];

  const filter: Record<string, unknown> = {};
  if (categorySlug) {
    const activeCategory = categories.find((c) => c.slug === categorySlug);
    if (activeCategory) {
      filter.category = activeCategory._id;
    }
  }

  const products = (await Product.find(filter).lean()) as unknown as IProduct[];

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Каталог</h1>

      <div className="flex gap-3 mb-8">
        <Link
          href="/catalog"
          className={
            !categorySlug ? "font-semibold underline" : "text-gray-500"
          }
        >
          Всі
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/catalog?category=${cat.slug}`}
            className={
              categorySlug === cat.slug
                ? "font-semibold underline"
                : "text-gray-500"
            }
          >
            {cat.name}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </main>
  );
}
