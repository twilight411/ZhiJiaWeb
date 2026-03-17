"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, UserCircle, Plus } from "lucide-react";

const navItems = [
  { name: "首页", path: "/" },
  { name: "AI动态", path: "/news" },
  { name: "AI技术", path: "/tech" },
  { name: "资源仓库", path: "/resources" },
  { name: "AI活动", path: "/events" },
];

export function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0F1117]/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Sparkles className="w-8 h-8 text-[#6C63FF] group-hover:text-[#00D1FF] transition-colors" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#6C63FF] to-[#00D1FF] bg-clip-text text-transparent">
              WHU AI Playground
            </span>
          </Link>

          <div className="flex items-center gap-4 sm:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`relative px-3 py-2 rounded-lg transition-all text-sm sm:text-base ${
                  isActive(item.path) ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {isActive(item.path) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#6C63FF]/20 to-[#00D1FF]/20 rounded-lg border border-[#6C63FF]/30" />
                )}
                <span className="relative z-10">{item.name}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              type="button"
              className="px-3 py-2 text-gray-300 hover:text-white transition-colors flex items-center gap-1 sm:gap-2 text-sm"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Submit</span>
            </button>
            <button
              type="button"
              className="px-4 py-2 sm:px-6 sm:py-2 bg-gradient-to-r from-[#6C63FF] to-[#00D1FF] rounded-lg hover:shadow-lg hover:shadow-[#6C63FF]/50 transition-all flex items-center gap-2 text-sm"
            >
              <UserCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Login</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
