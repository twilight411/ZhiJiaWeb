"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, ExternalLink, ThumbsUp, Share2, Bookmark } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { TrendDetail, TrendType } from "@/lib/types";

const relatedItems = [
  { title: "Claude 3 发布", type: "AI新闻", href: "/news/news/0" },
  { title: "Gemini 1.5 更新", type: "AI新闻", href: "/news/news/0" },
  { title: "DeepSeek 新模型", type: "AI新闻", href: "/news/news/0" },
];

type Props = {
  type: TrendType;
  id: string;
};

export function NewsDetailView({ type, id }: Props) {
  const [data, setData] = useState<TrendDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    /** 根据 ID 获取动态详情 */
    const fetchDetail = async () => {
      setIsLoading(true);
      try {
        const result = await api.getTrendDetail(id);
        setData(result);
      } catch (err) {
        console.error("Failed to fetch trend detail:", err);
        setError("获取详情失败，请稍后重试");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
        <div className="text-xl text-gray-500">加载中...</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center">
        <div className="text-xl text-red-500 mb-4">{error || "资源不存在"}</div>
        <Link href="/news" className="text-[#6C63FF] hover:underline">返回列表</Link>
      </div>
    );
  }

  const getLabelByType = (t: string) => {
    switch (t) {
      case "news": return "AI新闻";
      case "paper": return "AI论文";
      case "tool": return "AI工具";
      case "picked": return "社区精选";
      default: return "动态";
    }
  };

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
              {getLabelByType(data.type)}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {data.title}
          </h1>

          <p className="text-xl text-gray-400 mb-6">{data.summary}</p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>发布时间：{new Date(data.publishTime).toLocaleDateString()}</span>
            </div>
            <div>来源：{data.source}</div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
            >
              <ThumbsUp className="w-4 h-4" />
              <span>{data.likes}</span>
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
          <div 
            className="article-content" 
            dangerouslySetInnerHTML={{ __html: data.content }} 
          />
        </div>

        {data.sourceUrl && (
          <div className="flex flex-wrap gap-4 mb-12">
            <button
              type="button"
              onClick={() => window.open(data.sourceUrl, "_blank")}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#6C63FF] to-[#00D1FF] rounded-lg hover:shadow-lg hover:shadow-[#6C63FF]/50 transition-all"
            >
              <ExternalLink className="w-5 h-5" />
              <span>查看原文</span>
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
