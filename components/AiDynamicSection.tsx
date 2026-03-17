import Link from "next/link";
import { AiRanking } from "./AiRanking";

const newsItems = [
  { type: "news" as const, title: "OpenAI发布GPT-5预览版，推理能力大幅提升", summary: "OpenAI在最新发布会上展示了GPT-5的预览版本，新模型在数学推理、代码生成和多语言理解方面都有显著提升。", source: "OpenAI官方博客", time: "2小时前" },
  { type: "paper" as const, title: "Attention is Still All You Need: 改进的Transformer架构研究", authors: "Zhang et al.", field: "深度学习", time: "1天前" },
  { type: "tool" as const, title: "AI代码助手Cursor Pro上线", description: "支持多模态代码生成，集成Claude 3.5和GPT-4", link: "cursor.sh", time: "3天前" },
  { type: "news" as const, title: "百度文心一言4.0正式发布，支持超长上下文", summary: "百度发布文心一言4.0版本，支持200K token上下文窗口，在中文理解和生成任务上表现优异。", source: "百度AI", time: "5小时前" },
];

export function AiDynamicSection() {
  return (
    <section id="ai-dynamic" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">AI动态</h1>
          <p className="text-gray-400">资讯、论文、工具与社区精选</p>
        </div>

        <AiRanking />

        <h3 className="text-2xl font-bold mb-6">动态精选</h3>
        <div className="grid gap-6">
          {newsItems.map((item, index) => (
            <div
              key={index}
              className="bg-[#1A1D24] p-6 rounded-lg border border-white/10 hover:border-[#6C63FF]/50 transition-all hover:shadow-lg hover:shadow-[#6C63FF]/10"
            >
              {item.type === "news" && (
                <>
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <h4 className="flex-1 font-medium">{item.title}</h4>
                    <span className="px-3 py-1 bg-[#00D1FF]/20 text-[#00D1FF] rounded-full text-xs whitespace-nowrap">新闻</span>
                  </div>
                  <p className="text-gray-400 mb-4 text-sm">{item.summary}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <span>来源: {item.source}</span>
                    <span>•</span>
                    <span>{item.time}</span>
                  </div>
                </>
              )}
              {item.type === "paper" && (
                <>
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <h4 className="flex-1 font-medium">{item.title}</h4>
                    <span className="px-3 py-1 bg-[#8B5CF6]/20 text-[#8B5CF6] rounded-full text-xs whitespace-nowrap">论文</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-2">
                    <span>作者: {item.authors}</span>
                    <span>•</span>
                    <span className="px-2 py-1 bg-white/5 rounded">{item.field}</span>
                  </div>
                  <div className="text-sm text-gray-500">{item.time}</div>
                </>
              )}
              {item.type === "tool" && (
                <>
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <h4 className="flex-1 font-medium">{item.title}</h4>
                    <span className="px-3 py-1 bg-[#06B6D4]/20 text-[#06B6D4] rounded-full text-xs whitespace-nowrap">工具</span>
                  </div>
                  <p className="text-gray-400 mb-3 text-sm">{item.description}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <Link href="#" className="text-[#6C63FF] hover:text-[#00D1FF] transition-colors">
                      访问: {item.link}
                    </Link>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-500">{item.time}</span>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <span className="text-sm text-gray-500">更多动态持续更新</span>
        </div>
      </div>
    </section>
  );
}
