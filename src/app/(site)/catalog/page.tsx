import Link from "next/link";
import type { Metadata } from "next";

import { connectToDatabase } from "@/lib/db/mongodb";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import type { ICategory } from "@/types/category";
import type { IProduct } from "@/types/product";
import ProductCard from "@/components/product/ProductCard/ProductCard";

import styles from "./catalog.module.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Продукція",
  description:
    "Продукція Барської Олії — соняшникова олія, соняшникова макуха та комбікорм власного виробництва.",
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

          <h1 className={styles.title}>Продукція</h1>

          <p className={styles.description}>
            Соняшникова олія власного виробництва та додаткова продукція.
          </p>
        </header>

        <section className={styles.productTypes} aria-label="Види продукції">
          <Link href="/catalog" className={styles.productType}>
            <span className={styles.productTypeIcon}>🟡</span>

            <span>
              <strong className={styles.productTypeTitle}>
                Соняшникова олія
              </strong>

              <span className={styles.productTypeDescription}>
                Рафінована та холодного пресування
              </span>
            </span>
          </Link>

          <Link href="/makukha" className={styles.productType}>
            <span className={styles.productTypeIcon}>🌻</span>

            <span>
              <strong className={styles.productTypeTitle}>
                Соняшникова макуха
              </strong>

              <span className={styles.productTypeDescription}>
                Корм власного виробництва
              </span>
            </span>
          </Link>

          <Link href="/feed" className={styles.productType}>
            <span className={styles.productTypeIcon}>🌾</span>

            <span>
              <strong className={styles.productTypeTitle}>Комбікорм</strong>

              <span className={styles.productTypeDescription}>
                Кормові суміші для тварин та птиці
              </span>
            </span>
          </Link>
        </section>

        <section className={styles.oilCatalog}>
          <div className={styles.oilHeader}>
            <p className={styles.oilEyebrow}>ОСНОВНА ПРОДУКЦІЯ</p>

            <h2 className={styles.oilTitle}>Соняшникова олія</h2>
          </div>

          <nav
            className={styles.categories}
            aria-label="Категорії соняшникової олії"
          >
            <Link
              href="/catalog"
              className={
                !categorySlug ? styles.activeCategory : styles.category
              }
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
        </section>
      </div>
    </main>
  );
}
