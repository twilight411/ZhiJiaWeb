"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Database,
  Star,
  Users,
  Download,
  ExternalLink,
  TrendingUp,
  GitBranch,
} from "lucide-react";
import { api } from "@/lib/api";
import type { ResourceItem } from "@/lib/types";

const tabs = [
  { id: "opensource", label: "项目仓库" },
  { id: "dataset", label: "数据集" },
  { id: "github", label: "GitHub精选" },
  { id: "tool", label: "AI工具" },
  { id: "skills", label: "Skills技能树" },
];

export function ResourcesSection() {
  const [activeTab, setActiveTab] = useState("opensource");
  const [items, setItems] = useState<ResourceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchResources = useCallback(async (type: string) => {
    if (type === "skills") {
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    try {
      const data = await api.getResources({ type: type as any, size: 50 });
      setItems(data.list);
    } catch (error) {
      console.error("Failed to fetch resources:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchResources(activeTab);
  }, [activeTab, fetchResources]);

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00FFA3]/10 border border-[#00FFA3]/30 mb-4">
            <Database className="w-4 h-4 text-[#00FFA3]" />
            <span className="text-sm text-gray-300">AI数据库</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">资源仓库</h1>
          <p className="text-lg sm:text-xl text-gray-400">学生AI开发的GitHub</p>
        </div>

        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-[#00FFA3] to-[#00D1FF] text-black shadow-lg"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="text-center py-20 text-gray-500 text-xl">加载中...</div>
        ) : activeTab !== "skills" ? (
          <div className="space-y-4">
            {items.length > 0 ? (
              items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => window.open(item.url, "_blank")}
                  className="group p-6 rounded-xl bg-[#1A1C24] border border-white/10 hover:border-white/20 transition-all"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        {item.type === "github" && <GitBranch className="w-5 h-5 text-gray-400 shrink-0" />}
                        <h3 className="text-xl group-hover:text-[#00FFA3] transition-colors">{item.title}</h3>
                        {item.stars > 1000 && (
                          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#FFD166]/20 border border-[#FFD166]/30">
                            <TrendingUp className="w-3 h-3 text-[#FFD166]" />
                            <span className="text-xs text-[#FFD166]">Hot</span>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-400 mb-4">{item.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.tags.map((tag, i) => (
                          <span key={i} className="px-2 py-1 rounded-full bg-white/5 text-xs text-gray-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          <span>{item.stars.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <Clock className="w-4 h-4" />
                          <span>更新于 {new Date(item.updatedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 text-gray-500 bg-white/5 rounded-xl border border-white/10">暂无资源</div>
            )}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500 bg-white/5 rounded-xl border border-white/10">
            Skills 技能树即将上线，请关注技术路线图。
          </div>
        )}
      </div>
    </div>
  );
}

const Clock = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);
