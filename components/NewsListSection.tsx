"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Newspaper, TrendingUp, FileText, Wrench, ThumbsUp, ExternalLink, Clock } from "lucide-react";
import { api } from "@/lib/api";
import type { TrendItem, TrendType } from "@/lib/types";
import { AiRanking } from "@/components/AiRanking";

const tabs = [
  { id: "all", label: "全部" },
  { id: "news", label: "AI新闻" },
  { id: "paper", label: "AI论文" },
  { id: "tool", label: "AI工具" },
] as const;

export function NewsListSection() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [items, setItems] = useState<TrendItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchItems = useCallback(async (pageNum: number, tab: string, append = false) => {
    setIsLoading(true);
    try {
      const typeParam = tab === "all" ? undefined : (tab as TrendType);
      const data = await api.getTrends({ type: typeParam, page: pageNum, size: 9 });
      
      if (append) {
        setItems(prev => [...prev, ...data.list]);
      } else {
        setItems(data.list);
      }
      
      setHasMore(data.list.length === 9 && items.length + data.list.length < data.total);
    } catch (error) {
      console.error("Failed to fetch trends:", error);
    } finally {
      setIsLoading(false);
    }
  }, [items.length]);

  useEffect(() => {
    setPage(1);
    fetchItems(1, activeTab, false);
  }, [activeTab]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchItems(nextPage, activeTab, true);
  };

  const getColorByType = (type: string) => {
    switch (type) {
      case "news": return "from-[#6C63FF] to-[#8B7FFF]";
      case "paper": return "from-[#00D1FF] to-[#4DE1FF]";
      case "tool": return "from-[#00FFA3] to-[#4DFFBD]";
      case "picked": return "from-[#FFD166] to-[#FF9A00]";
      default: return "from-gray-500 to-gray-700";
    }
  };

  const getLabelByType = (type: string) => {
    switch (type) {
      case "news": return "AI新闻";
      case "paper": return "AI论文";
      case "tool": return "AI工具";
      case "picked": return "社区精选";
      default: return "动态";
    }
  };

  const formatTime = (timeStr: string) => {
    try {
      const date = new Date(timeStr);
      const now = new Date();
      const diff = now.getTime() - date.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      if (hours < 1) return "刚刚";
      if (hours < 24) return `${hours}小时前`;
      const days = Math.floor(hours / 24);
      if (days < 30) return `${days}天前`;
      return date.toLocaleDateString();
    } catch (e) {
      return timeStr;
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6C63FF]/10 border border-[#6C63FF]/30 mb-4">
            <TrendingUp className="w-4 h-4 text-[#6C63FF]" />
            <span className="text-sm text-gray-300">AI情报中心</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">AI动态</h1>
          <p className="text-lg sm:text-xl text-gray-400">探索AI世界的最新动态</p>
        </div>

        <AiRanking />

        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-[#6C63FF] to-[#00D1FF] text-white shadow-lg"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/news/${item.type}/${item.id}`}
              className="group relative block"
            >
              <div className="relative h-full p-6 rounded-xl bg-[#1A1C24] border border-white/10 hover:border-white/20 transition-all overflow-hidden hover:-translate-y-2 duration-200">
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${getColorByType(item.type)} bg-opacity-20 mb-4`}
                >
                  {item.type === "news" && <Newspaper className="w-3 h-3" />}
                  {item.type === "paper" && <FileText className="w-3 h-3" />}
                  {item.type === "tool" && <Wrench className="w-3 h-3" />}
                  <span className="text-xs">{getLabelByType(item.type)}</span>
                </div>

                <h3 className="text-lg mb-3 line-clamp-2 group-hover:text-[#6C63FF] transition-colors">{item.title}</h3>

                <p className="text-sm text-gray-400 mb-4 line-clamp-3">{item.summary}</p>

                <div className="space-y-2 mb-4">
                  <div className="text-xs text-gray-500">来源: {item.source}</div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{formatTime(item.publishTime)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-3 h-3" />
                      <span>{item.likes}</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-[#6C63FF] transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {isLoading && (
          <div className="text-center mt-12 text-gray-500">加载中...</div>
        )}

        {!isLoading && hasMore && (
          <div className="text-center mt-12">
            <button
              type="button"
              onClick={handleLoadMore}
              className="px-8 py-3 border border-white/20 rounded-lg hover:bg-white/5 transition-all"
            >
              加载更多
            </button>
          </div>
        )}

        {!isLoading && items.length === 0 && (
          <div className="text-center mt-12 text-gray-500">暂无相关动态</div>
        )}
      </div>
    </div>
  );
}
