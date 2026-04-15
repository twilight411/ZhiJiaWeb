"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { LogOut } from "lucide-react";
import {
  type PlaygroundRole,
  readSession,
  clearSession,
} from "@/lib/playground-session";

type Piece = { title: string; tag: string; blurb: string };

const GALLERY: Record<PlaygroundRole, { headline: string; pieces: Piece[] }> = {
  browse: {
    headline: "精选 Demo · 轻松浏览",
    pieces: [
      {
        title: "珞珈 Agent 原型",
        tag: "Demo",
        blurb: "校园场景多工具编排，对话即可查课表与空教室。",
      },
      {
        title: "课程知识图谱",
        tag: "可视化",
        blurb: "把章节拆成可点击的概念节点，支持跳转讲义。",
      },
      {
        title: "本地 RAG 笔记",
        tag: "工具",
        blurb: "Markdown + 向量检索，离线也能问自己的文献库。",
      },
    ],
  },
  studio: {
    headline: "项目与技术栈",
    pieces: [
      {
        title: "whuai-playground",
        tag: "Next.js · TS",
        blurb: "App Router + Tailwind，门户与内容路由。",
      },
      {
        title: "实验性 Eval Pipeline",
        tag: "Python",
        blurb: "批量跑用例、对比 prompt 版本，导出 JSON 报告。",
      },
      {
        title: "CLI 小工具集",
        tag: "Node",
        blurb: "脚手架、环境检查、一键起本地依赖容器。",
      },
    ],
  },
  formal: {
    headline: "代表作与时间线",
    pieces: [
      {
        title: "2025 · OPC 开放活动站",
        tag: "全栈",
        blurb: "活动报名、日程与资料归档，峰值 QPS 下稳定发布。",
      },
      {
        title: "2024 · 科研助手 MVP",
        tag: "RAG",
        blurb: "院系试点，支持引文校验与多文档对比阅读。",
      },
      {
        title: "2023 · 数据标注平台",
        tag: "平台",
        blurb: "多人协作标注、质检流与导出格式可配置。",
      },
    ],
  },
};

export function WorksView({ role }: { role: PlaygroundRole }) {
  const [displayName, setDisplayName] = useState("访客");

  useEffect(() => {
    const s = readSession();
    if (s?.displayName) setDisplayName(s.displayName);
  }, []);

  const section = useMemo(() => GALLERY[role], [role]);

  const layout = {
    browse: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
    studio: "grid grid-cols-1 md:grid-cols-2 gap-5",
    formal: "flex flex-col gap-4 max-w-3xl",
  }[role];

  const cardClass = {
    browse:
      "rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-white/[0.07] to-transparent p-6 min-h-[200px] flex flex-col hover:border-[#6C63FF]/35 transition-colors",
    studio:
      "rounded-xl border border-white/10 bg-[#151821] p-5 hover:border-[#00D1FF]/30 transition-colors",
    formal:
      "rounded-lg border-l-4 border-l-[#6C63FF] border border-white/10 bg-[#14161c] p-5 pl-6",
  }[role];

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="text-sm text-[#00D1FF] mb-1">已为你匹配视角</p>
            <h1 className="text-3xl sm:text-4xl font-semibold text-white">
              {displayName}，欢迎来看作品
            </h1>
            <p className="text-gray-400 mt-2">{section.headline}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg border border-white/15 text-sm text-gray-300 hover:bg-white/5"
            >
              换角色
            </Link>
            <button
              type="button"
              onClick={() => {
                clearSession();
                window.location.href = "/";
              }}
              className="px-4 py-2 rounded-lg border border-white/15 text-sm text-gray-300 hover:bg-white/5 inline-flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              退出
            </button>
          </div>
        </div>

        <div className={layout}>
          {section.pieces.map((p) => (
            <article key={p.title} className={cardClass}>
              <div className="text-xs uppercase tracking-wide text-[#6C63FF] mb-2">{p.tag}</div>
              <h2 className="text-lg font-medium text-white mb-2">{p.title}</h2>
              <p className="text-sm text-gray-400 leading-relaxed flex-1">{p.blurb}</p>
            </article>
          ))}
        </div>

        <p className="text-center text-xs text-gray-600 mt-16">
          以上为占位文案，可在 <code className="text-gray-500">components/works/WorksView.tsx</code>{" "}
          中替换为你的真实作品与链接。
        </p>
      </div>
    </div>
  );
}
