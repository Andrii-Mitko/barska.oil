import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import BackButton from "@/components/ui/BackButton/BackButton";
import BuyButton from "@/components/ui/BuyButton/BuyButton";
import AddToCart from "@/components/product/AddToCart/AddToCart";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Feed } from "@/models/Feed";
import type { IFeed } from "@/types/feed";
import { SITE_NAME, SITE_URL } from "@/lib/seo/config";

import styles from "./feed-product.module.css";

export const dynamic = "force-dynamic";

interface FeedPageProps {
  params: Promise<{ slug: string }>;
}

const DEFAULT_FEED_IMAGE = "/images/feed-placeholder.jpg";

function getFeedDescription(
  feed: Pick<IFeed, "name" | "weightKg" | "formula" | "description">,
): string {
  return (
    feed.description?.trim() ||
    `${feed.name} — комбікорм вагою ${feed.weightKg} кг. Рецептура: ${feed.formula}.`
  );
}

function getImageUrl(image: string): string {
  return new URL(image, SITE_URL).toString();
}

function getFeedJsonLd(feed: IFeed) {
  const description = getFeedDescription(feed);

  const images = feed.images.filter(Boolean).map(getImageUrl);
  const productUrl = `${SITE_URL}/feed/${feed.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: feed.name,
    description,
    image: images,
    sku: feed.sku,
    brand: {
      "@type": "Brand",
      name: feed.brand,
    },
    category: "Комбікорм",
    weight: {
      "@type": "QuantitativeValue",
      value: feed.weightKg,
      unitCode: "KGM",
    },
    offers: {
      "@type": "Offer",
      url: productUrl,
      price: feed.price,
      priceCurrency: "UAH",
      availability: feed.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
      },
    },
  };
}

export async function generateMetadata({
  params,
}: FeedPageProps): Promise<Metadata> {
  const { slug } = await params;

  await connectToDatabase();

  const feed = (await Feed.findOne({ slug }).lean()) as unknown as IFeed | null;

  if (!feed) {
    return {
      title: "Комбікорм не знайдено",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description = getFeedDescription(feed);
  const productUrl = `${SITE_URL}/feed/${feed.slug}`;
  const image = feed.images[0] || DEFAULT_FEED_IMAGE;
  const imageUrl = getImageUrl(image);

  return {
    title: feed.name,
    description,

    alternates: {
      canonical: productUrl,
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      type: "website",
      locale: "uk_UA",
      siteName: SITE_NAME,
      title: feed.name,
      description,
      url: productUrl,
      images: [
        {
          url: imageUrl,
          alt: feed.name,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: feed.name,
      description,
      images: [imageUrl],
    },
  };
}

export default async function FeedProductPage({ params }: FeedPageProps) {
  const { slug } = await params;

  await connectToDatabase();

  const feed = (await Feed.findOne({ slug }).lean()) as unknown as IFeed | null;

  if (!feed) {
    notFound();
  }

  const feedJsonLd = getFeedJsonLd(feed);

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(feedJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className={styles.container}>
        <BackButton fallbackHref="/feed" label="Назад до комбікорму" />

        <div className={styles.product}>
          <div className={styles.imageWrapper}>
            {feed.images[0] ? (
              <Image
                src={feed.images[0]}
                alt={feed.name}
                fill
                sizes="(max-width: 767px) 100vw, 50vw"
                className={styles.image}
                priority
              />
            ) : (
              <div className={styles.imagePlaceholder}>
                Зображення товару відсутнє
              </div>
            )}
          </div>

          <div className={styles.info}>
            <p className={styles.category}>КОМБІКОРМ</p>

            <h1 className={styles.title}>{feed.name}</h1>

            <p className={styles.brand}>{feed.brand}</p>

            <div className={styles.details}>
              <div className={styles.detail}>
                <span className={styles.detailLabel}>Вага</span>
                <span className={styles.detailValue}>{feed.weightKg} кг</span>
              </div>

              <div className={styles.detail}>
                <span className={styles.detailLabel}>Рецептура</span>
                <span className={styles.detailValue}>{feed.formula}</span>
              </div>
            </div>

            <p className={styles.price}>{feed.price} ₴</p>

            <div className={styles.stock}>
              {feed.inStock ? (
                <span className={styles.inStock}>В наявності</span>
              ) : (
                <span className={styles.outOfStock}>Немає в наявності</span>
              )}
            </div>

            {feed.description && (
              <p className={styles.description}>{feed.description}</p>
            )}

            <div className={styles.buy}>
              <BuyButton productName={feed.name} inStock={feed.inStock} />
            </div>

            <div className={styles.orderForm}>
              <AddToCart
                productSlug={feed.slug}
                productName={feed.name}
                pricePerUnit={feed.price}
                inStock={feed.inStock}
                image={feed.images[0]}
                unit="кг"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
