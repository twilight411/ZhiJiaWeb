import { notFound } from "next/navigation";
import { NewsDetailView } from "@/components/NewsDetailView";
import type { NewsDetailType } from "@/lib/news-detail";

const validTypes: NewsDetailType[] = ["news", "paper", "tool"];

type PageProps = {
  params: Promise<{ type: string; id: string }>;
};

export default async function NewsDetailPage({ params }: PageProps) {
  const { type, id } = await params;

  if (!validTypes.includes(type as NewsDetailType)) {
    notFound();
  }

  const numericId = Number.parseInt(id, 10);
  if (Number.isNaN(numericId) || numericId < 0) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <NewsDetailView type={type as NewsDetailType} />
    </main>
  );
}
