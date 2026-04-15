import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WorksView } from "@/components/works/WorksView";
import {
  isPlaygroundRole,
  type PlaygroundRole,
  PLAYGROUND_ROLES,
} from "@/lib/playground-session";

type Props = { params: Promise<{ role: string }> };

export function generateStaticParams() {
  return PLAYGROUND_ROLES.map((role) => ({ role }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { role: raw } = await params;
  const titles: Record<PlaygroundRole, string> = {
    browse: "随便看看",
    studio: "创作者视角",
    formal: "正式作品集",
  };
  if (!isPlaygroundRole(raw)) return { title: "作品" };
  return {
    title: `作品 · ${titles[raw]} | WHU AI Playground`,
    description: "按视角浏览作品展示",
  };
}

export default async function WorksRolePage({ params }: Props) {
  const { role: raw } = await params;
  if (!isPlaygroundRole(raw)) notFound();
  return <WorksView role={raw} />;
}
