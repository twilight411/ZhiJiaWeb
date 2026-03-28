"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { TutorialDetail } from "@/lib/types";

type Props = {
  id: string;
};

/**
 * 教程详情展示组件。
 * @param id 教程唯一标识
 * @returns 教程详情视图
 */
export function TutorialDetailView({ id }: Props) {
  const [data, setData] = useState<TutorialDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    /**
     * 拉取教程详情并更新页面状态。
     * @returns Promise<void>
     */
    async function fetchDetail() {
      setIsLoading(true);
      setError(null);
      try {
        const detail = await api.getTutorialDetail(id);
        setData(detail);
      } catch (err) {
        // 关键失败路径需要记录日志，便于定位接口或数据问题。
        console.error("Failed to fetch tutorial detail:", err);
        setError("获取教程详情失败，请稍后重试");
      } finally {
        setIsLoading(false);
      }
    }

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
        <Link href="/tech" className="text-[#6C63FF] hover:underline">
          返回技术中心
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Link
          href="/tech"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>返回 AI技术</span>
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {data.title}
          </h1>
          <p className="text-xl text-gray-400 mb-6">{data.summary}</p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>发布时间：{data.publishTime ? new Date(data.publishTime).toLocaleDateString() : "未知"}</span>
            </div>
            {data.author && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>作者：{data.author}</span>
              </div>
            )}
          </div>
        </div>

        <div className="prose prose-invert prose-lg max-w-none">
          <div className="article-content" dangerouslySetInnerHTML={{ __html: data.content }} />
        </div>
      </div>
    </div>
  );
}
