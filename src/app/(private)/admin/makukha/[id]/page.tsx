import { notFound } from "next/navigation";

import { connectToDatabase } from "@/lib/db/mongodb";
import { Makukha } from "@/models/Makukha";
import type { IMakukha } from "@/types/makukha";
import MakukhaEditForm from "../../MakukhaEditForm/MakukhaEditForm";

interface AdminMakukhaEditPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminMakukhaEditPage({
  params,
}: AdminMakukhaEditPageProps) {
  const { id } = await params;

  await connectToDatabase();

  const makukha = (await Makukha.findById(
    id,
  ).lean()) as unknown as IMakukha | null;

  if (!makukha) {
    notFound();
  }

  return <MakukhaEditForm makukha={JSON.parse(JSON.stringify(makukha))} />;
}
