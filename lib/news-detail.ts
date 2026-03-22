/** 与 Whuaiplaygroud NewsDetail.tsx 正文模板一致（按 type 展示） */
export type NewsDetailType = "news" | "paper" | "tool";

export const newsDetailByType = {
  news: {
    title: "OpenAI 发布 GPT-4o 多模态模型",
    subtitle: "支持语音、图像与文本实时交互",
    date: "2026年3月",
    source: "OpenAI Blog",
    author: "OpenAI Team",
    content: `
        <h2>概述</h2>
        <p>OpenAI今天正式发布了GPT-4o，这是一个真正的多模态AI模型，能够原生地处理和生成文本、图像和音频。GPT-4o代表了人工智能领域的重大突破。</p>
        
        <h2>核心能力</h2>
        <h3>多模态交互</h3>
        <p>GPT-4o可以同时理解和生成语音、图像和文本，实现了真正的多模态对话。用户可以通过语音、文字或图片与AI进行自然交流，AI也能以相应的形式回应。</p>
        
        <h3>响应速度更快</h3>
        <p>相比GPT-4 Turbo，GPT-4o的响应速度提升了2倍，平均延迟降低到320毫秒，接近人类的对话反应速度。这使得实时对话体验更加流畅自然。</p>
        
        <h3>支持实时对话</h3>
        <p>GPT-4o支持真正的实时语音对话，可以捕捉语气、情感和上下文，提供更加人性化的交互体验。在演示中，GPT-4o能够识别用户的情绪变化并做出相应调整。</p>
        
        <h2>技术突破</h2>
        <p>GPT-4o采用了全新的端到端训练方法，将文本、视觉和音频的处理统一到一个神经网络中，而不是使用多个独立的模型。这种架构使得模型能够更好地理解不同模态之间的关联。</p>
        
        <h2>应用场景</h2>
        <ul>
          <li>教育：实时语音辅导，支持多语言学习</li>
          <li>客服：智能客服系统，支持语音和文字</li>
          <li>创作：多模态内容创作助手</li>
          <li>无障碍：为视障和听障人士提供辅助功能</li>
        </ul>
        
        <h2>未来展望</h2>
        <p>OpenAI计划在未来几个月内逐步向所有用户开放GPT-4o的完整功能，并持续优化模型性能。这标志着AI助手正在向更加自然、更加智能的方向发展。</p>
      `,
    likes: 2341,
    views: 15678,
  },
  paper: {
    title: "Attention Is All You Need",
    subtitle: "Transformer架构的奠基之作",
    date: "2017年6月",
    source: "arXiv",
    author: "Google Research",
    field: "大模型 / Transformer",
    content: `
        <h2>论文摘要</h2>
        <p>本文提出了Transformer架构，一种完全基于注意力机制的序列转换模型。与传统的循环神经网络不同，Transformer完全摒弃了递归和卷积，仅依靠自注意力机制来计算输入和输出的表示。</p>
        
        <h2>研究背景</h2>
        <p>在Transformer之前，序列建模和转换任务主要依赖于循环神经网络（RNN）和长短期记忆网络（LSTM）。这些模型在处理长序列时面临计算效率低下和梯度消失等问题。</p>
        
        <h2>核心创新</h2>
        <h3>自注意力机制</h3>
        <p>Transformer引入了多头自注意力机制（Multi-Head Self-Attention），允许模型同时关注序列中的不同位置，捕捉长距离依赖关系。</p>
        
        <h3>位置编码</h3>
        <p>由于Transformer不包含递归或卷积，为了利用序列的顺序信息，模型引入了位置编码（Positional Encoding）。</p>
        
        <h3>并行计算</h3>
        <p>与RNN的顺序处理不同，Transformer的架构允许并行处理整个序列，大大提高了训练效率。</p>
        
        <h2>实验结果</h2>
        <p>Transformer在机器翻译任务上取得了当时的最优性能，在WMT 2014英德翻译任务上BLEU分数达到28.4，在英法翻译任务上达到41.8，同时训练时间大幅减少。</p>
        
        <h2>深远影响</h2>
        <p>Transformer架构成为了现代大语言模型（如GPT、BERT、T5等）的基础，彻底改变了自然语言处理领域。它不仅在NLP领域取得成功，还被应用到计算机视觉（如Vision Transformer）、语音识别等多个领域。</p>
        
        <h2>关键要点</h2>
        <ul>
          <li>完全基于注意力机制，摒弃了RNN和CNN</li>
          <li>多头自注意力捕捉不同层次的特征</li>
          <li>并行计算提高训练效率</li>
          <li>奠定了现代大模型的基础架构</li>
        </ul>
      `,
    likes: 5678,
    views: 23456,
  },
  tool: {
    title: "Cursor IDE",
    subtitle: "AI原生代码编辑器",
    date: "2024年",
    source: "Cursor Team",
    author: "Cursor",
    rating: 9.2,
    content: `
        <h2>产品简介</h2>
        <p>Cursor是一款专为AI时代设计的代码编辑器，基于VS Code构建，深度集成了GPT-4等大语言模型，为开发者提供前所未有的编程体验。</p>
        
        <h2>核心功能</h2>
        <h3>智能补全</h3>
        <p>Cursor提供上下文感知的代码补全功能，不仅能预测下一行代码，还能理解你的意图，生成整个函数或代码块。相比传统的代码补全工具，Cursor的建议更加智能和准确。</p>
        
        <h3>代码生成</h3>
        <p>通过自然语言描述你想要实现的功能，Cursor可以生成完整的代码实现。支持多种编程语言，包括Python、JavaScript、TypeScript、Go等。</p>
        
        <h3>上下文理解</h3>
        <p>Cursor能够理解整个项目的上下文，在生成代码时会考虑项目结构、依赖关系和代码风格，确保生成的代码与现有代码库保持一致。</p>
        
        <h3>智能重构</h3>
        <p>AI可以帮助你重构代码，提高代码质量和可维护性。只需描述你想要的改进，Cursor就能自动完成重构。</p>
        
        <h3>Bug修复</h3>
        <p>当遇到错误时，Cursor可以分析错误信息和代码上下文，提供修复建议或直接生成修复代码。</p>
        
        <h2>使用场景</h2>
        <ul>
          <li><strong>快速原型开发：</strong>通过自然语言快速搭建项目框架</li>
          <li><strong>学习新技术：</strong>AI可以解释代码，帮助理解新的框架和库</li>
          <li><strong>代码审查：</strong>AI辅助发现潜在问题和改进空间</li>
          <li><strong>文档生成：</strong>自动生成函数和类的文档注释</li>
        </ul>
        
        <h2>定价方案</h2>
        <p>Cursor提供免费版和专业版：</p>
        <ul>
          <li><strong>免费版：</strong>基础的代码补全和生成功能</li>
          <li><strong>专业版($20/月)：</strong>无限制使用GPT-4，更快的响应速度，优先支持</li>
        </ul>
        
        <h2>用户评价</h2>
        <p>开发者社区对Cursor评价极高，许多用户表示Cursor显著提升了他们的开发效率。有开发者称"Cursor让我的编程速度提升了3倍，尤其是在处理重复性任务时"。</p>
        
        <h2>开始使用</h2>
        <p>访问Cursor官网下载最新版本，支持Windows、macOS和Linux系统。安装后可以导入VS Code的设置和插件，快速迁移到Cursor。</p>
      `,
    likes: 892,
    views: 5432,
  },
} as const;
