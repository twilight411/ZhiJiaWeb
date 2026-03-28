"use client";

import { Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { PromoBanner } from "@/lib/types";

export function ActivityBanner() {
  const [promo, setPromo] = useState<PromoBanner | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    /** 获取首页活动推广位数据 */
    const fetchPromo = async () => {
      try {
        const data = await api.getPromoBanner();
        setPromo(data);
      } catch (error) {
        console.error("Failed to fetch promo banner:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPromo();
  }, []);

  const handleRegister = () => {
    if (promo?.link) {
      window.open(promo.link, "_blank");
    } else {
      window.alert("报名即将开启，请先加入社群");
    }
  };

  if (isLoading) return null; // 或者显示骨架屏

  // 如果没有推广活动，显示默认的筹备中内容（或后端返回的默认值）
  const displayTitle = promo?.title || "WHU AI Agent 大赛（筹备中）";
  const displaySubtitle = promo?.subtitle || "探索AI Agent的无限可能";

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-[#6C63FF]/20 via-[#00D1FF]/20 to-[#00FFA3]/20 border border-white/20 overflow-hidden">
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFD166]/20 border border-[#FFD166]/30 mb-6">
              <Trophy className="w-4 h-4 text-[#FFD166]" />
              <span className="text-sm text-[#FFD166]">火热报名中</span>
            </div>

            <h2 className="text-3xl sm:text-4xl mb-4">{displayTitle}</h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-8">{displaySubtitle}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <div className="text-2xl sm:text-3xl mb-2 bg-gradient-to-r from-[#FFD166] to-[#FF9A00] bg-clip-text text-transparent">
                  ¥50,000
                </div>
                <div className="text-sm text-gray-400">总奖金池</div>
              </div>
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <div className="text-2xl sm:text-3xl mb-2 text-[#00FFA3]">100+</div>
                <div className="text-sm text-gray-400">参赛队伍</div>
              </div>
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <div className="text-2xl sm:text-3xl mb-2 text-[#00D1FF]">3个月</div>
                <div className="text-sm text-gray-400">比赛周期</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <button
                type="button"
                onClick={handleRegister}
                className="px-8 py-4 bg-gradient-to-r from-[#6C63FF] to-[#00D1FF] rounded-lg hover:shadow-xl hover:shadow-[#6C63FF]/50 transition-all"
              >
                立即报名
              </button>
              <button
                type="button"
                className="px-8 py-4 border border-white/20 rounded-lg hover:bg-white/5 transition-all"
              >
                查看详情
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
