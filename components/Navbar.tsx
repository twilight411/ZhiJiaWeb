 "use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, UserCircle, Plus, Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { name: "首页", path: "/" },
  { name: "AI动态", path: "/news" },
  { name: "AI技术", path: "/tech" },
  { name: "资源仓库", path: "/resources" },
  { name: "AI活动", path: "/events" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0F1117]/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 group" onClick={handleNavClick}>
            <div className="relative">
              <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-[#6C63FF] group-hover:text-[#00D1FF] transition-colors" />
            </div>
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-[#6C63FF] to-[#00D1FF] bg-clip-text text-transparent">
              WHU AI Playground
            </span>
          </Link>

          {/* 桌面导航 */}
          <div className="hidden md:flex items-center gap-4 sm:gap-8">
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

          {/* 右侧按钮（桌面端） */}
          <div className="hidden md:flex items-center gap-2 sm:gap-4">
            <button
              type="button"
              className="px-3 py-2 text-gray-300 hover:text-white transition-colors flex items-center gap-1 sm:gap-2 text-sm"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Submit</span>
            </button>
            <Link
              href="/login"
              className="px-4 py-2 sm:px-6 sm:py-2 bg-gradient-to-r from-[#6C63FF] to-[#00D1FF] rounded-lg hover:shadow-lg hover:shadow-[#6C63FF]/50 transition-all flex items-center gap-2 text-sm text-white"
            >
              <UserCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Login</span>
            </Link>
          </div>

          {/* 移动端菜单按钮 */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-white/10 bg-black/20 hover:bg-white/5 transition-colors"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="打开导航菜单"
          >
            {isOpen ? <X className="w-5 h-5 text-gray-100" /> : <Menu className="w-5 h-5 text-gray-100" />}
          </button>
        </div>

        {/* 移动端抽屉导航 */}
        {isOpen && (
          <div className="md:hidden mt-3 pb-3 border-t border-white/10">
            <div className="flex flex-col gap-1 pt-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={handleNavClick}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm ${
                    isActive(item.path) ? "bg-white/10 text-white" : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
            <div className="mt-3 flex flex-col gap-2">
              <button
                type="button"
                className="w-full px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Submit</span>
              </button>
              <Link
                href="/login"
                onClick={handleNavClick}
                className="w-full px-3 py-2 bg-gradient-to-r from-[#6C63FF] to-[#00D1FF] rounded-lg hover:shadow-lg hover:shadow-[#6C63FF]/50 transition-all flex items-center justify-center gap-2 text-sm text-white"
              >
                <UserCircle className="w-4 h-4" />
                <span>Login</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
