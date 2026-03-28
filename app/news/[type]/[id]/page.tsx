import { notFound } from "next/navigation";
import { NewsDetailView } from "@/components/NewsDetailView";
import type { TrendType } from "@/lib/types";

const validTypes: string[] = ["news", "paper", "tool", "picked"];

type PageProps = {
  params: Promise<{ type: string; id: string }>;
};

export default async function NewsDetailPage({ params }: PageProps) {
  const { type, id } = await params;

  if (!validTypes.includes(type)) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <NewsDetailView type={type as TrendType} id={id} />
    </main>
  );
}
