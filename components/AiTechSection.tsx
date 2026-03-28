"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Lightbulb, Brain, MessageSquare, Images, Zap, Code, ChevronRight, BookOpen } from "lucide-react";
import { api } from "@/lib/api";
import type { TechPathNode, TechCategory, TutorialItem } from "@/lib/types";

const iconMap: Record<string, any> = {
  MessageSquare,
  Brain,
  Zap,
  Images,
  Code,
  Lightbulb,
  BookOpen
};

export function AiTechSection() {
  const [paths, setPaths] = useState<TechPathNode[]>([]);
  const [categories, setCategories] = useState<TechCategory[]>([]);
  const [tutorials, setTutorials] = useState<TutorialItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [pathsData, categoriesData, tutorialsData] = await Promise.all([
          api.getTechPaths(),
          api.getTechCategories(),
          api.getTutorials({ size: 6 })
        ]);
        setPaths(pathsData);
        setCategories(categoriesData);
        setTutorials(tutorialsData.list);
      } catch (error) {
        console.error("Failed to fetch tech data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center text-gray-500">
        加载中...
      </div>
    );
  }

  return (
    <section id="ai-tech" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-[#6C63FF]/20 to-[#00D1FF]/20 py-12 rounded-2xl mb-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">AI技术学习中心</h2>
            <p className="text-lg sm:text-xl text-gray-300">系统化学习AI技术，从入门到精通</p>
          </div>
        </div>

        {paths.length > 0 && (
          <>
            <h3 className="text-2xl sm:text-3xl font-bold mb-8">AI学习路径</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {paths.map((path, idx) => {
                const colors = [
                  "from-[#6C63FF] to-[#8B5CF6]",
                  "from-[#00D1FF] to-[#06B6D4]",
                  "from-[#A78BFA] to-[#6C63FF]",
                  "from-[#00D1FF] to-[#00E5FF]"
                ];
                const colorClass = colors[idx % colors.length];
                return (
                  <div
                    key={path.id}
                    className="bg-[#1A1D24] rounded-xl border border-white/10 overflow-hidden hover:border-transparent transition-all group"
                  >
                    <div className={`p-6 bg-gradient-to-br ${colorClass} relative`}>
                      <div className="absolute inset-0 bg-black/40" />
                      <div className="relative">
                        <BookOpen className="w-10 h-10 mb-3" />
                        <h4 className="text-xl">{path.name}</h4>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="space-y-3">
                        {path.children?.slice(0, 3).map((step, index) => (
                          <Link
                            key={step.id}
                            href={`/tech?pathId=${step.id}`}
                            className="block p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group/step"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-6 h-6 rounded-full bg-[#6C63FF]/20 text-[#6C63FF] flex items-center justify-center text-sm">
                                {index + 1}
                              </div>
                              <span className="text-sm group-hover/step:text-[#6C63FF] transition-colors">{step.name}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {categories.length > 0 && (
          <>
            <h3 className="text-2xl sm:text-3xl font-bold mb-8">技术分类</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
              {categories.map((category) => {
                const Icon = iconMap[category.icon] || Code;
                return (
                  <Link
                    key={category.id}
                    href={`/tech?categoryId=${category.id}`}
                    className="group p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-[#6C63FF]/20 text-[#6C63FF] rounded-lg">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="mb-2 text-white group-hover:text-[#6C63FF] transition-colors">{category.name}</h4>
                        <p className="text-sm text-gray-400 mb-3 line-clamp-2">{category.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">探索分类</span>
                          <span className="text-sm group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}

        {tutorials.length > 0 && (
          <>
            <h3 className="text-2xl sm:text-3xl font-bold mb-8">精选教程</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {tutorials.map((tutorial) => (
                <Link
                  key={tutorial.id}
                  href={`/tech/tutorials/${tutorial.id}`}
                  className="bg-[#1A1D24] p-6 rounded-xl border border-white/10 hover:border-[#6C63FF]/50 transition-all hover:shadow-lg hover:shadow-[#6C63FF]/10 group"
                >
                  <h4 className="mb-3 group-hover:text-[#6C63FF] transition-colors">{tutorial.title}</h4>
                  <p className="text-gray-400 mb-4 text-sm line-clamp-2">{tutorial.summary}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(tutorial.publishTime).toLocaleDateString()}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

const Calendar = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
);
