import Link from "next/link";
import { Lightbulb, Brain, MessageSquare, Images, Zap, Code } from "lucide-react";

const learningPaths = [
  { name: "Prompt工程", icon: MessageSquare, color: "from-[#6C63FF] to-[#8B5CF6]", steps: ["Prompt基础", "Prompt技巧", "Prompt案例"] },
  { name: "RAG系统", icon: Brain, color: "from-[#00D1FF] to-[#06B6D4]", steps: ["RAG原理", "向量数据库", "检索优化"] },
  { name: "AI Agent", icon: Zap, color: "from-[#A78BFA] to-[#6C63FF]", steps: ["Agent架构", "工具调用", "多Agent协作"] },
  { name: "多模态AI", icon: Images, color: "from-[#00D1FF] to-[#00E5FF]", steps: ["图像理解", "视频生成", "跨模态融合"] },
];

const categories = [
  { name: "Prompt Engineering", icon: MessageSquare, description: "学习如何编写高效的提示词", articleCount: 15, color: "bg-[#6C63FF]/10 text-[#6C63FF] border-[#6C63FF]/30" },
  { name: "LLM开发", icon: Code, description: "大语言模型应用开发实战", articleCount: 23, color: "bg-[#00D1FF]/10 text-[#00D1FF] border-[#00D1FF]/30" },
  { name: "RAG", icon: Brain, description: "检索增强生成技术详解", articleCount: 18, color: "bg-[#8B5CF6]/10 text-[#8B5CF6] border-[#8B5CF6]/30" },
  { name: "AI Agent", icon: Zap, description: "智能代理系统构建指南", articleCount: 12, color: "bg-[#06B6D4]/10 text-[#06B6D4] border-[#06B6D4]/30" },
  { name: "多模态AI", icon: Images, description: "图文音视频的AI处理技术", articleCount: 20, color: "bg-[#A78BFA]/10 text-[#A78BFA] border-[#A78BFA]/30" },
  { name: "AI应用", icon: Lightbulb, description: "AI实际应用案例与实践", articleCount: 25, color: "bg-[#00E5FF]/10 text-[#00E5FF] border-[#00E5FF]/30" },
];

const featuredTutorials = [
  { title: "从零开始构建RAG系统：完整实战指南", description: "学习如何使用LangChain和向量数据库构建一个完整的RAG应用。", level: "中级", duration: "45分钟", tags: ["RAG", "LangChain", "向量数据库"] },
  { title: "Prompt工程实战：ChatGPT高级技巧", description: "掌握高级Prompt技巧，包括Few-shot学习、思维链、角色扮演等方法。", level: "入门", duration: "30分钟", tags: ["Prompt", "ChatGPT", "技巧"] },
  { title: "AI Agent开发：使用AutoGPT构建智能助手", description: "深入了解AI Agent的工作原理，学习如何构建能够自主规划和执行任务的智能代理。", level: "高级", duration: "60分钟", tags: ["AI Agent", "AutoGPT", "自动化"] },
  { title: "多模态AI应用：图文并茂的AI生成", description: "探索多模态大模型的应用，学习如何结合文本和图像创建丰富的AI应用。", level: "中级", duration: "40分钟", tags: ["多模态", "DALL-E", "Midjourney"] },
];

export function AiTechSection() {
  return (
    <section id="ai-tech" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-[#6C63FF]/20 to-[#00D1FF]/20 py-12 rounded-2xl mb-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">AI技术学习中心</h2>
            <p className="text-lg sm:text-xl text-gray-300">系统化学习AI技术，从入门到精通</p>
          </div>
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold mb-8">AI学习路径</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {learningPaths.map((path) => {
            const Icon = path.icon;
            return (
              <div
                key={path.name}
                className="bg-[#1A1D24] rounded-xl border border-white/10 overflow-hidden hover:border-transparent transition-all group"
              >
                <div className={`p-6 bg-gradient-to-br ${path.color} relative`}>
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="relative">
                    <Icon className="w-10 h-10 mb-3" />
                    <h4 className="text-xl">{path.name}</h4>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {path.steps.map((step, index) => (
                      <Link
                        key={index}
                        href="/tech"
                        className="block p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group/step"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-[#6C63FF]/20 text-[#6C63FF] flex items-center justify-center text-sm">
                            {index + 1}
                          </div>
                          <span className="text-sm group-hover/step:text-[#6C63FF] transition-colors">{step}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold mb-8">技术分类</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.name}
                href="/tech"
                className={`group p-6 rounded-xl border ${category.color} hover:shadow-lg transition-all`}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-current/10 rounded-lg">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="mb-2">{category.name}</h4>
                    <p className="text-sm text-gray-400 mb-3">{category.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{category.articleCount} 篇教程</span>
                      <span className="text-sm group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold mb-8">精选教程</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {featuredTutorials.map((tutorial, index) => (
            <Link
              key={index}
              href="/tech"
              className="bg-[#1A1D24] p-6 rounded-xl border border-white/10 hover:border-[#6C63FF]/50 transition-all hover:shadow-lg hover:shadow-[#6C63FF]/10 group"
            >
              <h4 className="mb-3 group-hover:text-[#6C63FF] transition-colors">{tutorial.title}</h4>
              <p className="text-gray-400 mb-4 text-sm">{tutorial.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {tutorial.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-[#6C63FF]/10 text-[#6C63FF] rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="px-2 py-1 bg-white/5 rounded">{tutorial.level}</span>
                <span>•</span>
                <span>{tutorial.duration}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
