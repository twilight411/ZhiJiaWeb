export type NewsListItemType = "news" | "paper" | "tool";

export type NewsListItem =
  | {
      type: "news";
      title: string;
      summary: string;
      source: string;
      time: string;
      likes: number;
      category: string;
      color: string;
    }
  | {
      type: "paper";
      title: string;
      summary: string;
      authors: string;
      field: string;
      time: string;
      likes: number;
      category: string;
      color: string;
    }
  | {
      type: "tool";
      title: string;
      summary: string;
      rating: number;
      category: string;
      time: string;
      likes: number;
      color: string;
    };

/** 与 Whuaiplaygroud News.tsx 列表数据一致 */
export const newsListItems: NewsListItem[] = [
  {
    type: "news",
    title: "OpenAI发布GPT-5预览版，性能提升显著",
    summary:
      "OpenAI在今天的发布会上展示了GPT-5的预览版本，在推理能力、代码生成和多模态理解方面都有重大突破...",
    source: "极客公园",
    time: "2小时前",
    likes: 234,
    category: "AI情报",
    color: "from-[#6C63FF] to-[#8B7FFF]",
  },
  {
    type: "paper",
    title: "Attention Is All You Need 2.0: 新一代Transformer架构",
    summary:
      "本文提出了改进的Transformer架构，在保持计算效率的同时提升了长文本处理能力...",
    authors: "Google Research",
    field: "Deep Learning",
    time: "5小时前",
    likes: 189,
    category: "AI情报",
    color: "from-[#00D1FF] to-[#4DE1FF]",
  },
  {
    type: "tool",
    title: "Claude Code Assistant - AI编程助手新选择",
    summary:
      "Anthropic推出的Claude Code Assistant现已对所有开发者开放，提供智能代码补全、重构建议等功能...",
    rating: 9.2,
    category: "AI装备",
    time: "1天前",
    likes: 456,
    color: "from-[#00FFA3] to-[#4DFFBD]",
  },
  {
    type: "news",
    title: "武汉大学发布珞珈AI大模型",
    summary:
      "武汉大学计算机学院今日发布珞珈AI大模型，专注于中文学术场景，在论文写作、文献综述等任务表现优异...",
    source: "武大新闻网",
    time: "1天前",
    likes: 567,
    category: "AI情报",
    color: "from-[#6C63FF] to-[#8B7FFF]",
  },
  {
    type: "paper",
    title: "Multimodal RAG: 融合视觉与文本的检索增强生成",
    summary:
      "提出了一种新的多模态RAG框架，能够同时处理图像和文本信息，在VQA任务上取得SOTA性能...",
    authors: "Stanford University",
    field: "Multimodal Learning",
    time: "2天前",
    likes: 321,
    category: "AI情报",
    color: "from-[#00D1FF] to-[#4DE1FF]",
  },
  {
    type: "tool",
    title: "Midjourney V7 - 图像生成新纪元",
    summary:
      "Midjourney发布V7版本，支持更精确的提示词控制、更高的图像分辨率和更快的生成速度...",
    rating: 9.5,
    category: "AI装备",
    time: "3天前",
    likes: 892,
    color: "from-[#00FFA3] to-[#4DFFBD]",
  },
  {
    type: "news",
    title: "DeepMind发布AlphaCode 3.0编程竞赛AI",
    summary:
      "Google DeepMind发布AlphaCode 3.0，在编程竞赛中达到专业选手水平，解决复杂算法问题...",
    source: "Nature",
    time: "4天前",
    likes: 678,
    category: "AI情报",
    color: "from-[#6C63FF] to-[#8B7FFF]",
  },
  {
    type: "paper",
    title: "Constitutional AI: 让AI更安全可控",
    summary:
      "研究提出了Constitutional AI方法，通过宪法原则约束AI行为，提高AI系统的安全性和可靠性...",
    authors: "Anthropic",
    field: "AI Safety",
    time: "5天前",
    likes: 445,
    category: "AI情报",
    color: "from-[#00D1FF] to-[#4DE1FF]",
  },
];
