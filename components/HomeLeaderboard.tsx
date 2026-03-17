import Link from "next/link";
import { TrendingUp } from "lucide-react";

const topModels = [
  { rank: 1, model: "GPT-4", score: 9.8, trend: "+0.2" },
  { rank: 2, model: "Claude 3.5", score: 9.6, trend: "+0.3" },
  { rank: 3, model: "Gemini Pro", score: 9.4, trend: "+0.1" },
  { rank: 4, model: "Llama 3", score: 9.2, trend: "+0.4" },
  { rank: 5, model: "Mistral Large", score: 9.0, trend: "+0.2" },
];

export function HomeLeaderboard() {
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl mb-4">Top AI Models</h2>
          <p className="text-gray-400">当前最强AI模型排行榜</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-[#1A1C24] border border-white/10 rounded-xl overflow-hidden">
            {/* 表头仅在中等以上屏幕显示，避免小屏拥挤 */}
            <div className="hidden sm:grid grid-cols-4 gap-4 p-4 bg-white/5 border-b border-white/10 text-xs sm:text-sm text-gray-400">
              <div>排名</div>
              <div>模型</div>
              <div>评分</div>
              <div>趋势</div>
            </div>
            {topModels.map((model) => (
              <div
                key={model.rank}
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-4 border-b border-white/5 last:border-b-0 hover:bg-white/5 transition-colors text-sm"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                      model.rank === 1
                        ? "bg-gradient-to-br from-[#FFD166] to-[#FF9A00]"
                        : model.rank === 2
                          ? "bg-gradient-to-br from-[#C0C0C0] to-[#808080]"
                          : model.rank === 3
                            ? "bg-gradient-to-br from-[#CD7F32] to-[#8B4513]"
                            : "bg-white/10"
                    }`}
                  >
                    {model.rank}
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="sm:hidden mr-1 text-xs text-gray-500">模型</span>
                  {model.model}
                </div>
                <div className="flex items-center">
                  <span className="sm:hidden mr-1 text-xs text-gray-500">评分</span>
                  <span className="text-[#00FFA3]">{model.score}</span>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center gap-1 text-[#00FFA3]">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-xs sm:text-sm">{model.trend}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center mt-4">
            <Link href="/news" className="text-[#6C63FF] hover:text-[#00D1FF] transition-colors text-sm">
              查看完整排行榜与动态 →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
