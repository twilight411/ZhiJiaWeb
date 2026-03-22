"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Newspaper, TrendingUp, FileText, Wrench, ThumbsUp, ExternalLink, Clock } from "lucide-react";
import { newsListItems, type NewsListItem } from "@/lib/news-list";

const tabs = [
  { id: "all", label: "全部" },
  { id: "news", label: "AI新闻" },
  { id: "papers", label: "AI论文" },
  { id: "tools", label: "AI工具" },
] as const;

function filterItems(activeTab: string, items: NewsListItem[]): NewsListItem[] {
  if (activeTab === "all") return items;
  if (activeTab === "papers") return items.filter((i) => i.type === "paper");
  if (activeTab === "tools") return items.filter((i) => i.type === "tool");
  if (activeTab === "news") return items.filter((i) => i.type === "news");
  return items;
}

export function NewsListSection() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredItems = useMemo(() => filterItems(activeTab, newsListItems), [activeTab]);

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
          {filteredItems.map((item) => {
            const globalIndex = newsListItems.indexOf(item);
            return (
              <Link
                key={`${item.type}-${globalIndex}`}
                href={`/news/${item.type}/${globalIndex}`}
                className="group relative block"
              >
                <div className="relative h-full p-6 rounded-xl bg-[#1A1C24] border border-white/10 hover:border-white/20 transition-all overflow-hidden hover:-translate-y-2 duration-200">
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${item.color} bg-opacity-20 mb-4`}
                  >
                    {item.type === "news" && <Newspaper className="w-3 h-3" />}
                    {item.type === "paper" && <FileText className="w-3 h-3" />}
                    {item.type === "tool" && <Wrench className="w-3 h-3" />}
                    <span className="text-xs">{item.category}</span>
                  </div>

                  <h3 className="text-lg mb-3 line-clamp-2 group-hover:text-[#6C63FF] transition-colors">{item.title}</h3>

                  <p className="text-sm text-gray-400 mb-4 line-clamp-3">{item.summary}</p>

                  <div className="space-y-2 mb-4">
                    {item.type === "news" && <div className="text-xs text-gray-500">来源: {item.source}</div>}
                    {item.type === "paper" && (
                      <div className="space-y-1">
                        <div className="text-xs text-gray-500">作者: {item.authors}</div>
                        <div className="text-xs text-gray-500">领域: {item.field}</div>
                      </div>
                    )}
                    {item.type === "tool" && (
                      <div className="flex items-center gap-2">
                        <div className="text-sm text-[#00FFA3]">★ {item.rating}</div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{item.time}</span>
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
            );
          })}
        </div>

        <div className="text-center mt-12">
          <button
            type="button"
            className="px-8 py-3 border border-white/20 rounded-lg hover:bg-white/5 transition-all"
          >
            加载更多
          </button>
        </div>
      </div>
    </div>
  );
}
