import Link from "next/link";
import { Zap, Lightbulb, Database, Calendar, ChevronRight } from "lucide-react";

const aiMapCards = [
  { title: "AI情报中心", subtitle: "AI动态", description: "AI世界发生了什么", icon: Zap, path: "/news", color: "from-[#6C63FF] to-[#8B7FFF]", glow: "#6C63FF" },
  { title: "AI实验室", subtitle: "AI技术", description: "AI可以做什么", icon: Lightbulb, path: "/tech", color: "from-[#00D1FF] to-[#4DE1FF]", glow: "#00D1FF" },
  { title: "AI数据库", subtitle: "资源仓库", description: "AI开发资源", icon: Database, path: "/resources", color: "from-[#00FFA3] to-[#4DFFBD]", glow: "#00FFA3" },
  { title: "AI任务大厅", subtitle: "AI活动", description: "武汉AI生态", icon: Calendar, path: "/events", color: "from-[#FFD166] to-[#FFDD8C]", glow: "#FFD166" },
];

export function AiMapSection() {
  return (
    <section id="ai-map" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl mb-4">探索AI世界</h2>
          <p className="text-gray-400">进入AI探索游戏大厅</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {aiMapCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.path}
                href={card.path}
                className="block group relative p-8 rounded-2xl bg-[#1A1C24] border border-white/10 hover:border-white/30 transition-all overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity blur-xl"
                  style={{ background: `radial-gradient(circle at 50% 50%, ${card.glow}33, transparent 70%)` }}
                />
                <div className="relative z-10">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${card.color} mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="mb-2">
                    <span className="text-sm text-gray-400">{card.subtitle}</span>
                  </div>
                  <h3 className="text-2xl mb-2">{card.title}</h3>
                  <p className="text-gray-400 mb-4">{card.description}</p>
                  <div className="flex items-center gap-2 text-gray-400 group-hover:text-white transition-colors">
                    <span>进入</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
