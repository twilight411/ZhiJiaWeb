"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Sparkles, ArrowRight, LayoutGrid, Code2, Briefcase } from "lucide-react";
import {
  type PlaygroundRole,
  writeSession,
} from "@/lib/playground-session";

const ROLE_OPTIONS: {
  id: PlaygroundRole;
  title: string;
  desc: string;
  icon: typeof LayoutGrid;
}[] = [
  {
    id: "browse",
    title: "随便看看",
    desc: "大图卡片流，快速扫一眼 Demo",
    icon: LayoutGrid,
  },
  {
    id: "studio",
    title: "创作者视角",
    desc: "项目格与技术栈，偏工程向",
    icon: Code2,
  },
  {
    id: "formal",
    title: "正式作品集",
    desc: "履历式时间线，适合完整展示",
    icon: Briefcase,
  },
];

export default function LoginPage() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [role, setRole] = useState<PlaygroundRole>("browse");

  const handleEnter = () => {
    const trimmed = nickname.trim();
    const displayName = trimmed.length > 0 ? trimmed : "访客";
    writeSession({
      displayName,
      role,
      loggedInAt: Date.now(),
    });
    router.push(`/works/${role}`);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 flex flex-col items-center">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-24 left-10 w-72 h-72 bg-[#6C63FF] rounded-full blur-[100px] opacity-15" />
        <div className="absolute bottom-32 right-10 w-72 h-72 bg-[#00D1FF] rounded-full blur-[100px] opacity-15" />
      </div>

      <div className="relative z-10 w-full max-w-lg">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-white transition-colors">
            首页
          </Link>
          <span className="text-gray-600">/</span>
          <span className="text-gray-300">进入作品</span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#1A1D24]/80 backdrop-blur-xl p-6 sm:p-8 shadow-xl shadow-black/40">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#6C63FF]/10 border border-[#6C63FF]/25 mb-4">
            <Sparkles className="w-4 h-4 text-[#6C63FF]" />
            <span className="text-xs text-gray-300">无需密码 · 选个视角即可</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-2">看看作品</h1>
          <p className="text-sm text-gray-400 mb-8">
            称呼可随便填或直接跳过；选好角色后点登录，会进入对应布局的作品页。
          </p>

          <label className="block text-sm text-gray-300 mb-2">怎么称呼（可选）</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="例如：路过的卡门"
            maxLength={32}
            className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/50 focus:border-[#6C63FF]/40 mb-8"
          />

          <p className="text-sm text-gray-300 mb-3">选择视角</p>
          <div className="grid gap-3 mb-8">
            {ROLE_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              const active = role === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setRole(opt.id)}
                  className={`text-left flex gap-4 p-4 rounded-xl border transition-all ${
                    active
                      ? "border-[#6C63FF]/60 bg-gradient-to-r from-[#6C63FF]/15 to-[#00D1FF]/10 ring-1 ring-[#6C63FF]/30"
                      : "border-white/10 bg-white/[0.03] hover:border-white/20"
                  }`}
                >
                  <div
                    className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                      active ? "bg-[#6C63FF]/30 text-[#C4BEFF]" : "bg-white/5 text-gray-400"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-medium text-white">{opt.title}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{opt.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleEnter}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#00D1FF] text-white font-medium hover:shadow-lg hover:shadow-[#6C63FF]/30 transition-all flex items-center justify-center gap-2 group"
          >
            登录并进入作品
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
