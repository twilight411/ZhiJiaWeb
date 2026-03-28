"use client";

import Link from "next/link";
import { Sparkles, Users, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { HomeConfig } from "@/lib/types";

export function HeroSection() {
  const [config, setConfig] = useState<HomeConfig | null>(null);

  useEffect(() => {
    /** 获取首页配置 */
    const fetchConfig = async () => {
      try {
        const data = await api.getHomeConfig();
        setConfig(data);
      } catch (error) {
        console.error("Failed to fetch home config:", error);
      }
    };
    fetchConfig();
  }, []);

  const title = config?.hero.title || "WHU AI Playground";
  const subtitle = config?.hero.subtitle || "武汉大学AI探索入口";
  const description = config?.hero.description || "资讯 · 技术 · 资源 · 活动";
  const primaryText = config?.hero.primaryCta?.text || "探索AI";
  const primaryLink = config?.hero.primaryCta?.link || "#ai-map";
  const secondaryText = config?.hero.secondaryCta?.text || "加入社群";

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-[#6C63FF] rounded-full blur-[120px] opacity-20 animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#00D1FF] rounded-full blur-[120px] opacity-20 animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00FFA3] rounded-full blur-[120px] opacity-10 animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6C63FF]/10 border border-[#6C63FF]/30 mb-6">
              <Sparkles className="w-4 h-4 text-[#6C63FF]" />
              <span className="text-sm text-gray-300">武汉大学OPC AI生态平台</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6">
              <span className="bg-gradient-to-r from-[#6C63FF] via-[#00D1FF] to-[#00FFA3] bg-clip-text text-transparent">
                {title}
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-300 mb-4">{subtitle}</p>
            <p className="text-base sm:text-lg text-gray-400 mb-8">{description}</p>

            <div className="flex flex-wrap gap-4">
              <Link
                href={primaryLink}
                className="px-8 py-4 bg-gradient-to-r from-[#6C63FF] to-[#00D1FF] rounded-lg hover:shadow-xl hover:shadow-[#6C63FF]/50 transition-all flex items-center gap-2 group"
              >
                <span>{primaryText}</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                type="button"
                className="px-8 py-4 border border-white/20 rounded-lg hover:bg-white/5 transition-all flex items-center gap-2"
              >
                <Users className="w-5 h-5" />
                <span>{secondaryText}</span>
              </button>
            </div>

            <div className="flex gap-6 mt-12">
              <div className="text-center">
                <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-lg mb-2 flex items-center justify-center">
                  <span className="text-2xl text-gray-500">QQ</span>
                </div>
                <p className="text-sm text-gray-400">QQ群</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-lg mb-2 flex items-center justify-center">
                  <span className="text-2xl text-gray-500">WX</span>
                </div>
                <p className="text-sm text-gray-400">微信群</p>
              </div>
            </div>
          </div>

          <div className="relative h-[400px] lg:h-[500px] hidden lg:block" aria-hidden>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-4 h-4 rounded-full bg-gradient-to-br from-[#6C63FF] to-[#00D1FF] opacity-50 animate-pulse"
                    style={{
                      top: `${(i * 12 + 10) % 80}%`,
                      left: `${(i * 15 + 10) % 80}%`,
                      animationDelay: `${i * 0.3}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
