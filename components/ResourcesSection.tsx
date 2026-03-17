"use client";

import { useState } from "react";
import {
  Database,
  Star,
  Users,
  Download,
  ExternalLink,
  TrendingUp,
  GitBranch,
} from "lucide-react";

const tabs = [
  { id: "projects", label: "项目仓库" },
  { id: "skills", label: "Skills技能树" },
  { id: "datasets", label: "数据集" },
  { id: "github", label: "GitHub精选" },
];

const projects = [
  { name: "AI论文助手", description: "基于RAG的学术论文阅读与写作助手，支持文献检索、自动总结、引文管理", stars: 1234, author: "WHU-CS-2021", language: "Python", topics: ["RAG", "LangChain", "Academic"], color: "text-blue-400" },
  { name: "AI课程助手", description: "智能课程学习伴侣，提供个性化学习路径、知识点梳理、练习题生成", stars: 856, author: "WHU-AI-Lab", language: "TypeScript", topics: ["Education", "GPT-4", "Personalization"], color: "text-yellow-400" },
  { name: "校园Agent", description: "武大校园生活AI助手，集成课表查询、图书馆预约、食堂推荐等功能", stars: 2341, author: "WHU-OPC", language: "Python", topics: ["Agent", "Campus", "Multi-tool"], color: "text-blue-400" },
  { name: "珞珈ChatBot", description: "专为武大学生定制的对话机器人，了解校园文化、提供学习建议", stars: 567, author: "WHU-NLP", language: "Python", topics: ["Chatbot", "Fine-tuning", "Local"], color: "text-blue-400" },
  { name: "Code Review Agent", description: "AI代码审查工具，自动检测代码问题、提供优化建议、生成测试用例", stars: 1456, author: "WHU-DevTeam", language: "JavaScript", topics: ["Code Review", "Testing", "DevOps"], color: "text-yellow-400" },
  { name: "科研数据分析平台", description: "面向科研场景的数据分析工具，支持可视化、统计分析、报告生成", stars: 789, author: "WHU-Data-Lab", language: "Python", topics: ["Data Analysis", "Visualization", "Research"], color: "text-blue-400" },
];

const skills = [
  { name: "Prompt Engineering", level: "基础", progress: 100, description: "掌握提示词设计技巧，有效与AI对话", prerequisites: [] as string[], resources: 12, color: "from-green-500 to-emerald-500" },
  { name: "RAG开发", level: "进阶", progress: 75, description: "构建检索增强生成系统，处理知识库", prerequisites: ["Prompt Engineering"], resources: 8, color: "from-blue-500 to-cyan-500" },
  { name: "AI Agent构建", level: "进阶", progress: 60, description: "开发智能Agent，实现自主任务执行", prerequisites: ["Prompt Engineering", "RAG开发"], resources: 15, color: "from-purple-500 to-pink-500" },
  { name: "Fine-tuning", level: "高级", progress: 40, description: "微调大模型，适配特定场景需求", prerequisites: ["Prompt Engineering", "RAG开发"], resources: 10, color: "from-orange-500 to-red-500" },
  { name: "多模态AI", level: "高级", progress: 30, description: "处理图像、音频、视频等多模态数据", prerequisites: ["RAG开发", "AI Agent构建"], resources: 7, color: "from-pink-500 to-rose-500" },
  { name: "AI安全与对齐", level: "专家", progress: 20, description: "确保AI系统安全可控，符合价值观", prerequisites: ["Fine-tuning", "AI Agent构建"], resources: 5, color: "from-red-500 to-orange-500" },
];

const datasets = [
  { name: "WHU学术论文数据集", description: "包含武大各学科10万篇学术论文的元数据和摘要", size: "2.5 GB", downloads: 456, format: "JSON", license: "CC BY 4.0" },
  { name: "中文对话数据集", description: "高质量中文对话数据，适合对话模型训练", size: "1.2 GB", downloads: 1234, format: "JSONL", license: "MIT" },
  { name: "Code-Review数据集", description: "GitHub代码审查数据，包含代码、评论、修改建议", size: "3.8 GB", downloads: 678, format: "Parquet", license: "Apache 2.0" },
  { name: "校园场景QA数据", description: "武大校园相关问答对，涵盖学习生活各方面", size: "150 MB", downloads: 892, format: "CSV", license: "CC BY-SA 4.0" },
];

const githubProjects = [
  { name: "Awesome AI Resources", description: "精选的AI学习资源、工具、论文合集", stars: 15600, forks: 2300, language: "", trending: true },
  { name: "LangChain", description: "构建LLM应用的强大框架", stars: 78900, forks: 12400, language: "Python", trending: true },
  { name: "AutoGPT", description: "自主AI Agent实验项目", stars: 45600, forks: 8700, language: "Python", trending: false },
  { name: "LlamaIndex", description: "LLM的数据框架，构建RAG应用", stars: 34200, forks: 4500, language: "Python", trending: true },
];

export function ResourcesSection() {
  const [activeTab, setActiveTab] = useState("projects");

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

        {activeTab === "projects" && (
          <div className="space-y-4">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group p-6 rounded-xl bg-[#1A1C24] border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-xl group-hover:text-[#00FFA3] transition-colors">{project.name}</h3>
                      <span className={`px-2 py-1 rounded text-xs ${project.color} bg-white/5`}>{project.language}</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.topics.map((topic, i) => (
                        <span key={i} className="px-2 py-1 rounded-full bg-white/5 text-xs text-gray-300">
                          {topic}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        <span>{project.stars}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{project.author}</span>
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-500 group-hover:text-[#00FFA3] transition-colors shrink-0" />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "skills" && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <p className="text-gray-400">学习AI开发的完整技能路径</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="relative h-full p-6 rounded-xl bg-[#1A1C24] border border-white/10 hover:border-white/20 transition-all overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs bg-gradient-to-r ${skill.color} text-white`}>
                      {skill.level}
                    </span>
                    <span className="text-xs text-gray-500">{skill.resources} 资源</span>
                  </div>
                  <h3 className="text-xl mb-2 group-hover:text-[#00FFA3] transition-colors">{skill.name}</h3>
                  <p className="text-sm text-gray-400 mb-4">{skill.description}</p>
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                      <span>学习进度</span>
                      <span>{skill.progress}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${skill.color} transition-all duration-500`}
                        style={{ width: `${skill.progress}%` }}
                      />
                    </div>
                  </div>
                  {skill.prerequisites.length > 0 && (
                    <div>
                      <div className="text-xs text-gray-500 mb-2">前置技能:</div>
                      <div className="flex flex-wrap gap-2">
                        {skill.prerequisites.map((prereq, i) => (
                          <span key={i} className="px-2 py-1 rounded bg-white/5 text-xs text-gray-300">
                            {prereq}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <button type="button" className="mt-4 w-full py-2 border border-white/20 rounded-lg hover:bg-white/5 transition-all text-sm">
                    开始学习
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "datasets" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {datasets.map((dataset, index) => (
              <div
                key={index}
                className="relative h-full p-6 rounded-xl bg-[#1A1C24] border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl mb-2 group-hover:text-[#00FFA3] transition-colors">{dataset.name}</h3>
                    <p className="text-sm text-gray-400 mb-4">{dataset.description}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <div className="text-gray-500 mb-1">大小</div>
                    <div className="text-white">{dataset.size}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 mb-1">格式</div>
                    <div className="text-white">{dataset.format}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 mb-1">下载次数</div>
                    <div className="text-white flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      {dataset.downloads}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 mb-1">许可证</div>
                    <div className="text-white">{dataset.license}</div>
                  </div>
                </div>
                <button type="button" className="w-full py-2 bg-gradient-to-r from-[#00FFA3] to-[#00D1FF] text-black rounded-lg hover:shadow-lg transition-all">
                  下载数据集
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "github" && (
          <div className="space-y-4">
            {githubProjects.map((project, index) => (
              <div
                key={index}
                className="group p-6 rounded-xl bg-[#1A1C24] border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <GitBranch className="w-5 h-5 text-gray-400 shrink-0" />
                      <h3 className="text-xl group-hover:text-[#00FFA3] transition-colors">{project.name}</h3>
                      {project.trending && (
                        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#FFD166]/20 border border-[#FFD166]/30">
                          <TrendingUp className="w-3 h-3 text-[#FFD166]" />
                          <span className="text-xs text-[#FFD166]">Trending</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                      {project.language && (
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-blue-400" />
                          <span>{project.language}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        <span>{project.stars.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitBranch className="w-4 h-4" />
                        <span>{project.forks.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-500 group-hover:text-[#00FFA3] transition-colors shrink-0" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
