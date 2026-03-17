const rankings = [
  { rank: 1, model: "GPT-4", score: 9.8, ability: "LLM", color: "bg-yellow-500" },
  { rank: 2, model: "Claude", score: 9.6, ability: "LLM", color: "bg-gray-400" },
  { rank: 3, model: "Gemini", score: 9.4, ability: "多模态", color: "bg-orange-500" },
  { rank: 4, model: "DeepSeek", score: 9.3, ability: "编程", color: "bg-blue-400" },
  { rank: 5, model: "Llama", score: 9.1, ability: "开源", color: "bg-green-500" },
];

export function AiRanking() {
  return (
    <div className="mb-12">
      <h3 className="text-2xl font-bold mb-6">AI模型排行榜</h3>
      <div className="bg-[#1A1D24] rounded-xl border border-white/10 overflow-hidden overflow-x-auto">
        <table className="w-full min-w-[400px]">
          <thead className="bg-white/5">
            <tr>
              <th className="px-4 sm:px-6 py-4 text-left text-sm text-gray-400">排名</th>
              <th className="px-4 sm:px-6 py-4 text-left text-sm text-gray-400">模型</th>
              <th className="px-4 sm:px-6 py-4 text-left text-sm text-gray-400">评分</th>
              <th className="px-4 sm:px-6 py-4 text-left text-sm text-gray-400">能力</th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((item) => (
              <tr key={item.rank} className="border-t border-white/10 hover:bg-white/5 transition-colors">
                <td className="px-4 sm:px-6 py-4">
                  <div className={`w-8 h-8 rounded-full ${item.color} flex items-center justify-center text-sm font-medium`}>
                    {item.rank}
                  </div>
                </td>
                <td className="px-4 sm:px-6 py-4">{item.model}</td>
                <td className="px-4 sm:px-6 py-4">
                  <span className="text-[#6C63FF]">{item.score}</span>
                </td>
                <td className="px-4 sm:px-6 py-4">
                  <span className="px-3 py-1 bg-[#6C63FF]/20 text-[#6C63FF] rounded-full text-sm">
                    {item.ability}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
