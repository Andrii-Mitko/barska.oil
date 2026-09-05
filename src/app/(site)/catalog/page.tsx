import Link from "next/link";

import { connectToDatabase } from "@/lib/db/mongodb";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import type { ICategory } from "@/types/category";
import type { IProduct } from "@/types/product";
import ProductCard from "@/components/product/ProductCard/ProductCard";
import type { Metadata } from "next";
import styles from "./catalog.module.css";

export const metadata: Metadata = {
  title: "Каталог",
  description:
    "Каталог соняшникової олії Барська Олія — рафінована та холодного пресування, різні об'єми, гуртові ціни.",
};

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
    const activeCategory = categories.find(
      (category) => category.slug === categorySlug,
    );

    if (activeCategory) {
      filter.category = activeCategory._id;
    }
  }

  const products = (await Product.find(filter).lean()) as unknown as IProduct[];

  return (
    <main className={styles.catalog}>
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>БАРСЬКА ОЛІЯ</p>

          <h1 className={styles.title}>Каталог продукції</h1>

          <p className={styles.description}>
            Соняшникова олія власного виробництва
          </p>
        </header>

        <nav className={styles.categories} aria-label="Категорії продукції">
          <Link
            href="/catalog"
            className={!categorySlug ? styles.activeCategory : styles.category}
          >
            Всі
          </Link>

          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/catalog?category=${category.slug}`}
              className={
                categorySlug === category.slug
                  ? styles.activeCategory
                  : styles.category
              }
            >
              {category.name}
            </Link>
          ))}
        </nav>

        {products.length > 0 ? (
          <div className={styles.products}>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p className={styles.empty}>Товарів у цій категорії поки немає.</p>
        )}
      </div>
    </main>
  );
}
