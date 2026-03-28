"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { ModelRankingItem } from "@/lib/types";

export function AiRanking() {
  const [rankings, setRankings] = useState<ModelRankingItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const data = await api.getModelRankings();
        setRankings(data);
      } catch (error) {
        console.error("Failed to fetch rankings:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRankings();
  }, []);

  if (isLoading) return <div className="mb-12 text-center text-gray-500">加载排行榜...</div>;

  return (
    <div className="mb-12">
      <h3 className="text-2xl font-bold mb-6">AI模型排行榜</h3>
      <div className="bg-[#1A1D24] rounded-xl border border-white/10 overflow-hidden overflow-x-auto">
        <table className="w-full min-w-[400px]">
          <thead className="bg-white/5">
            <tr>
              <th className="px-4 sm:px-6 py-4 text-left text-sm text-gray-400">排名</th>
              <th className="px-4 sm:px-6 py-4 text-left text-sm text-gray-400">模型</th>
              <th className="px-4 sm:px-6 py-4 text-left text-sm text-gray-400">评分</th>
              <th className="px-4 sm:px-6 py-4 text-left text-sm text-gray-400">能力</th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((item) => (
              <tr key={item.id} className="border-t border-white/10 hover:bg-white/5 transition-colors">
                <td className="px-4 sm:px-6 py-4">
                  <div className={`w-8 h-8 rounded-full ${
                    item.rank === 1 ? "bg-yellow-500" : 
                    item.rank === 2 ? "bg-gray-400" : 
                    item.rank === 3 ? "bg-orange-500" : "bg-blue-400"
                  } flex items-center justify-center text-sm font-medium`}>
                    {item.rank}
                  </div>
                </td>
                <td className="px-4 sm:px-6 py-4">{item.modelName}</td>
                <td className="px-4 sm:px-6 py-4">
                  <span className="text-[#6C63FF]">{item.score}</span>
                </td>
                <td className="px-4 sm:px-6 py-4">
                  <div className="flex gap-2">
                    {item.capabilities.map((cap, i) => (
                      <span key={i} className="px-3 py-1 bg-[#6C63FF]/20 text-[#6C63FF] rounded-full text-xs">
                        {cap}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
