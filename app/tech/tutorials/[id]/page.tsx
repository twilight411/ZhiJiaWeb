import { TutorialDetailView } from "@/components/TutorialDetailView";

type PageProps = {
  params: Promise<{ id: string }>;
};

/**
 * 教程详情页路由入口。
 * @param params 动态路由参数，包含教程 id
 * @returns 教程详情页面
 */
export default async function TutorialDetailPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <main className="min-h-screen">
      <TutorialDetailView id={id} />
    </main>
  );
}
