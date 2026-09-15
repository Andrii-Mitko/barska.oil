import { notFound } from "next/navigation";

import { connectToDatabase } from "@/lib/db/mongodb";
import { Feed } from "@/models/Feed";
import type { IFeed } from "@/types/feed";

import FeedEditForm from "@/components/admin/FeedEditForm/FeedEditForm";

interface AdminFeedEditPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminFeedEditPage({
  params,
}: AdminFeedEditPageProps) {
  const { id } = await params;

  await connectToDatabase();

  const feed = (await Feed.findById(id).lean()) as unknown as IFeed | null;

  if (!feed) {
    notFound();
  }

  return <FeedEditForm feed={JSON.parse(JSON.stringify(feed))} />;
}
