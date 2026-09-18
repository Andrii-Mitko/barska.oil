import type { MetadataRoute } from "next";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Product } from "@/models/Product";
import { Feed } from "@/models/Feed";
import type { IProduct } from "@/types/product";
import type { IFeed } from "@/types/feed";
import { SITE_URL } from "@/lib/seo/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connectToDatabase();

  const products = (await Product.find()
    .select("slug updatedAt")
    .lean()) as unknown as Pick<IProduct, "slug" | "updatedAt">[];

  const feedItems = (await Feed.find()
    .select("slug updatedAt")
    .lean()) as unknown as Pick<IFeed, "slug" | "updatedAt">[];

  // олія — основний товар, найвищий пріоритет
  const productUrls: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/product/${product.slug}`,
    lastModified: product.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // додаткова продукція — нижчий пріоритет, не конкурує з олією
  const feedUrls: MetadataRoute.Sitemap = feedItems.map((feed) => ({
    url: `${SITE_URL}/feed/${feed.slug}`,
    lastModified: feed.updatedAt,
    changeFrequency: "weekly",
    priority: 0.4,
  }));

  const now = new Date();

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/catalog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...productUrls,
    {
      url: `${SITE_URL}/makukha`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/feed`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.4,
    },
    ...feedUrls,
  ];
}
