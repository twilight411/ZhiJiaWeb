import Link from "next/link";
import { Github, Twitter, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#1A1C24] border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg mb-4 text-white">WHU AI Playground</h3>
            <p className="text-gray-400 text-sm">
              武汉大学AI探索入口
              <br />
              资讯 · 技术 · 资源 · 活动
            </p>
            <p className="text-gray-500 text-xs mt-2">大学生为爱发电中</p>
          </div>

          <div>
            <h4 className="text-sm mb-4 text-white">快速链接</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/news" className="hover:text-[#6C63FF] transition-colors">
                  AI动态
                </Link>
              </li>
              <li>
                <Link href="/tech" className="hover:text-[#6C63FF] transition-colors">
                  AI技术
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-[#6C63FF] transition-colors">
                  资源仓库
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-[#6C63FF] transition-colors">
                  AI活动
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm mb-4 text-white">合作伙伴</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>自强Studio</li>
              <li>Web3区块链组织</li>
              <li>智珈中心</li>
              <li>武汉政府</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm mb-4 text-white">社交媒体</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-[#6C63FF]/20 border border-white/10 flex items-center justify-center transition-all hover:border-[#6C63FF]/50"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 text-gray-400" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-[#00D1FF]/20 border border-white/10 flex items-center justify-center transition-all hover:border-[#00D1FF]/50"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-gray-400" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-[#00FFA3]/20 border border-white/10 flex items-center justify-center transition-all hover:border-[#00FFA3]/50"
                aria-label="社群"
              >
                <MessageCircle className="w-5 h-5 text-gray-400" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>© 2026 WHU-OPC AI Playground. 连接武汉AI生态.</p>
          <p className="mt-1">Made with ❤️ by WHU AI Community</p>
        </div>
      </div>
    </footer>
  );
}
