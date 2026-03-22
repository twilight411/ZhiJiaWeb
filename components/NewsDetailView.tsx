"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, ExternalLink, ThumbsUp, Share2, Bookmark } from "lucide-react";
import { newsDetailByType, type NewsDetailType } from "@/lib/news-detail";

const relatedItems = [
  { title: "Claude 3 发布", type: "AI新闻", href: "/news/news/0" },
  { title: "Gemini 1.5 更新", type: "AI新闻", href: "/news/news/0" },
  { title: "DeepSeek 新模型", type: "AI新闻", href: "/news/news/0" },
];

type Props = {
  type: NewsDetailType;
};

export function NewsDetailView({ type }: Props) {
  const currentData =
    type === "paper" ? newsDetailByType.paper : type === "tool" ? newsDetailByType.tool : newsDetailByType.news;

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>返回 AI动态</span>
        </Link>

        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6C63FF]/10 border border-[#6C63FF]/30 mb-4">
            <span className="text-sm text-[#6C63FF]">
              {type === "paper" ? "AI论文" : type === "tool" ? "AI工具" : "AI新闻"}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {currentData.title}
          </h1>

          {"subtitle" in currentData && currentData.subtitle && (
            <p className="text-xl text-gray-400 mb-6">{currentData.subtitle}</p>
          )}

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>发布时间：{currentData.date}</span>
            </div>
            <div>来源：{currentData.source}</div>
            {type === "paper" && "field" in currentData && currentData.field && (
              <div>研究方向：{currentData.field}</div>
            )}
            {type === "tool" && "rating" in currentData && currentData.rating != null && (
              <div className="flex items-center gap-1">
                <span className="text-[#FFD166]">★</span>
                <span>评分：{currentData.rating}</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
            >
              <ThumbsUp className="w-4 h-4" />
              <span>{currentData.likes}</span>
            </button>
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span>分享</span>
            </button>
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
            >
              <Bookmark className="w-4 h-4" />
              <span>收藏</span>
            </button>
          </div>
        </div>

        <div className="prose prose-invert prose-lg max-w-none mb-12">
          <div className="article-content" dangerouslySetInnerHTML={{ __html: currentData.content }} />
        </div>

        {type === "paper" && (
          <div className="flex flex-wrap gap-4 mb-12">
            <button
              type="button"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#6C63FF] to-[#00D1FF] rounded-lg hover:shadow-lg hover:shadow-[#6C63FF]/50 transition-all"
            >
              <ExternalLink className="w-5 h-5" />
              <span>查看论文</span>
            </button>
            <button
              type="button"
              className="flex items-center gap-2 px-6 py-3 border border-white/20 rounded-lg hover:bg-white/5 transition-all"
            >
              <ExternalLink className="w-5 h-5" />
              <span>GitHub代码</span>
            </button>
          </div>
        )}

        {type === "tool" && (
          <div className="flex flex-wrap gap-4 mb-12">
            <button
              type="button"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00FFA3] to-[#00D1FF] text-black rounded-lg hover:shadow-lg hover:shadow-[#00FFA3]/50 transition-all font-medium"
            >
              <ExternalLink className="w-5 h-5" />
              <span>访问官网</span>
            </button>
            <button
              type="button"
              className="flex items-center gap-2 px-6 py-3 border border-white/20 rounded-lg hover:bg-white/5 transition-all"
            >
              <ExternalLink className="w-5 h-5" />
              <span>查看教程</span>
            </button>
          </div>
        )}

        <div className="border-t border-white/10 pt-12">
          <h2 className="text-2xl mb-6">相关推荐</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="block p-4 rounded-lg bg-[#1A1C24] border border-white/10 hover:border-white/20 transition-all hover:-translate-y-1"
              >
                <div className="text-xs text-gray-500 mb-2">{item.type}</div>
                <h3 className="text-sm hover:text-[#6C63FF] transition-colors">{item.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
