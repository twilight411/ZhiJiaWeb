export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface PagedResult<T> {
  list: T[];
  total: number;
  page: number;
  size: number;
}

// Config
export interface HomeConfig {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    primaryCta: { text: string; link: string };
    secondaryCta: { text: string; link: string };
  };
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  link: string;
  order: number;
}

export interface FooterConfig {
  about: string;
  links: Array<{
    title: string;
    items: Array<{ label: string; link: string }>;
  }>;
  copyright: string;
}

// Trends
export type TrendType = "news" | "paper" | "tool" | "picked";

export interface TrendItem {
  id: string;
  type: TrendType;
  title: string;
  summary: string;
  source: string;
  sourceUrl: string;
  publishTime: string;
  coverImage: string;
  tags: string[];
  likes: number;
  views: number;
}

export interface TrendDetail extends TrendItem {
  content: string;
}

// Rankings
export interface ModelRankingItem {
  id: string;
  rank: number;
  modelName: string;
  score: number;
  capabilities: string[];
  detailUrl: string;
  trend: string;
}

// Tech
export interface TechPathNode {
  id: string;
  name: string;
  children?: TechPathNode[];
}

export interface TechCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface TutorialItem {
  id: string;
  title: string;
  summary: string;
  coverImage: string;
  categoryId: string;
  publishTime: string;
}

export interface TutorialDetail extends TutorialItem {
  author?: string;
  content: string;
  contentFormat?: string;
}

// Resources
export interface ResourceCategory {
  id: string;
  name: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  url: string;
  categoryId: string;
  type: "opensource" | "github" | "dataset" | "tool";
  tags: string[];
  stars: number;
  updatedAt: string;
}

// Activities
export type ActivityType = "whu" | "wuhan" | "contest";

export interface ActivityItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  startTime: string;
  endTime: string;
  location: string;
  type: ActivityType;
  registerUrl: string;
  content: string;
}

export interface PromoBanner {
  activityId?: string;
  title: string;
  subtitle: string;
  description?: string;
  image?: string;
  imageUrl?: string;
  link: string;
  buttonText?: string;
}
