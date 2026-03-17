import { ExternalLink } from "lucide-react";

const ecosystemCards = [
  { name: "自强Studio", description: "武大技术开发组织", color: "from-[#6C63FF] to-[#8B7FFF]", href: "#" },
  { name: "Web3区块链组织", description: "区块链技术探索", color: "from-[#00D1FF] to-[#4DE1FF]", href: "#" },
  { name: "智珈中心", description: "AI研究与应用", color: "from-[#00FFA3] to-[#4DFFBD]", href: "#" },
  { name: "AI企业", description: "产学研合作", color: "from-[#FFD166] to-[#FFDD8C]", href: "#" },
];

export function AllianceStrip() {
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl mb-4">WHU-OPC AI生态</h2>
          <p className="text-gray-400">连接武汉AI生态的各方力量</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ecosystemCards.map((card) => (
            <a
              key={card.name}
              href={card.href}
              className="group relative p-6 rounded-xl bg-[#1A1C24] border border-white/10 hover:border-white/20 transition-all overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
              <div className="relative z-10">
                <h3 className="text-lg mb-2">{card.name}</h3>
                <p className="text-sm text-gray-400">{card.description}</p>
                <ExternalLink className="w-5 h-5 text-gray-500 group-hover:text-white mt-4 transition-colors" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
