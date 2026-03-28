import type { ApiResponse, PagedResult, HomeConfig, Partner, FooterConfig, TrendItem, TrendDetail, ModelRankingItem, TechPathNode, TechCategory, TutorialItem, TutorialDetail, ResourceCategory, ResourceItem, ActivityItem, PromoBanner, TrendType } from "./types";

const API_BASE_URL = "/api/proxy";

/**
 * 归一化动态列表项字段，兼容后端可选字段。
 * @param item 原始动态对象
 * @returns 前端稳定可用的动态结构
 */
function normalizeTrendItem(item: Record<string, unknown>): TrendItem {
  return {
    id: String(item.id ?? ""),
    type: (item.type as TrendType) ?? "news",
    title: String(item.title ?? ""),
    summary: String(item.summary ?? ""),
    source: String(item.source ?? ""),
    sourceUrl: String(item.sourceUrl ?? ""),
    publishTime: String(item.publishTime ?? ""),
    coverImage: String(item.coverImage ?? ""),
    tags: Array.isArray(item.tags) ? (item.tags as string[]) : [],
    likes: Number(item.likes ?? 0),
    views: Number(item.views ?? 0),
  };
}

/**
 * 归一化模型排行榜字段，补齐缺失 id 与 trend。
 * @param item 原始排行对象
 * @param index 当前项索引
 * @returns 前端排行榜结构
 */
function normalizeRankingItem(item: Record<string, unknown>, index: number): ModelRankingItem {
  const rank = Number(item.rank ?? index + 1);
  const modelName = String(item.modelName ?? "");
  return {
    id: String(item.id ?? `${modelName}-${rank}`),
    rank,
    modelName,
    score: Number(item.score ?? 0),
    capabilities: Array.isArray(item.capabilities) ? (item.capabilities as string[]) : [],
    detailUrl: String(item.detailUrl ?? ""),
    trend: String(item.trend ?? "+0.0"),
  };
}

/**
 * 归一化教程列表字段。
 * @param item 原始教程对象
 * @returns 前端教程列表结构
 */
function normalizeTutorialItem(item: Record<string, unknown>): TutorialItem {
  return {
    id: String(item.id ?? ""),
    title: String(item.title ?? ""),
    summary: String(item.summary ?? ""),
    coverImage: String(item.coverImage ?? ""),
    categoryId: String(item.categoryId ?? ""),
    publishTime: String(item.publishTime ?? item.createdAt ?? ""),
  };
}

/**
 * 归一化教程详情字段。
 * @param item 原始教程详情对象
 * @returns 前端教程详情结构
 */
function normalizeTutorialDetail(item: Record<string, unknown>): TutorialDetail {
  return {
    ...normalizeTutorialItem(item),
    author: item.author ? String(item.author) : undefined,
    content: String(item.content ?? ""),
    contentFormat: item.contentFormat ? String(item.contentFormat) : undefined,
  };
}

/**
 * 归一化资源字段，兼容 name/summary 与 title/description 双结构。
 * @param item 原始资源对象
 * @returns 前端资源结构
 */
function normalizeResourceItem(item: Record<string, unknown>): ResourceItem {
  return {
    id: String(item.id ?? ""),
    title: String(item.title ?? item.name ?? ""),
    description: String(item.description ?? item.summary ?? ""),
    url: String(item.url ?? ""),
    categoryId: String(item.categoryId ?? ""),
    type: (item.type as ResourceItem["type"]) ?? "opensource",
    tags: Array.isArray(item.tags) ? (item.tags as string[]) : [],
    stars: Number(item.stars ?? 0),
    updatedAt: String(item.updatedAt ?? item.publishTime ?? ""),
  };
}

/**
 * 归一化技术分类字段，兼容 icon URL 与图标名称。
 * @param item 原始分类对象
 * @returns 前端分类结构
 */
function normalizeTechCategory(item: Record<string, unknown>): TechCategory {
  const icon = String(item.icon ?? "");
  return {
    id: String(item.id ?? ""),
    name: String(item.name ?? ""),
    icon: icon.startsWith("http") ? "Code" : icon,
    description: String(item.description ?? ""),
  };
}

/**
 * 基础请求封装。
 * @param path API 路径（不含 base）
 * @param options fetch 参数
 * @returns 解析后的 data 字段
 */
async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${path}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Request failed: ${response.status} ${response.statusText}`);
  }

  const result: ApiResponse<T> = await response.json();
  
  if (result.code !== 0) {
    throw new Error(`API Error: ${result.message} (code: ${result.code})`);
  }

  return result.data;
}

export const api = {
  // Config
  getHomeConfig: () => apiRequest<HomeConfig>("/config/home"),
  getPartners: () => apiRequest<Partner[]>("/config/partners"),
  getFooterConfig: () => apiRequest<FooterConfig>("/config/footer"),

  // Trends
  getTrends: async (params: { type?: TrendType; page?: number; size?: number; sort?: string } = {}) => {
    const query = new URLSearchParams();
    if (params.type) query.append("type", params.type);
    if (params.page) query.append("page", params.page.toString());
    if (params.size) query.append("size", params.size.toString());
    if (params.sort) query.append("sort", params.sort);
    
    const queryString = query.toString();
    const data = await apiRequest<PagedResult<Record<string, unknown>>>(`/trends${queryString ? `?${queryString}` : ""}`);
    return {
      ...data,
      list: Array.isArray(data.list) ? data.list.map(normalizeTrendItem) : [],
    };
  },
  getTrendDetail: async (id: string) => {
    const data = await apiRequest<Record<string, unknown>>(`/trends/${id}`);
    return {
      ...normalizeTrendItem(data),
      content: String(data.content ?? ""),
    } as TrendDetail;
  },

  // Rankings
  getModelRankings: async () => {
    const data = await apiRequest<Record<string, unknown>[]>("/rankings/models");
    return Array.isArray(data) ? data.map(normalizeRankingItem) : [];
  },

  // Tech
  getTechPaths: () => apiRequest<TechPathNode[]>("/tech/paths"),
  getTechCategories: async () => {
    const data = await apiRequest<Record<string, unknown>[]>("/tech/categories");
    return Array.isArray(data) ? data.map(normalizeTechCategory) : [];
  },
  getTutorials: async (params: { categoryId?: string; pathId?: string; page?: number; size?: number; sort?: string } = {}) => {
    const query = new URLSearchParams();
    if (params.categoryId) query.append("categoryId", params.categoryId);
    if (params.pathId) query.append("pathId", params.pathId);
    if (params.page) query.append("page", params.page.toString());
    if (params.size) query.append("size", params.size.toString());
    if (params.sort) query.append("sort", params.sort);
    
    const queryString = query.toString();
    const data = await apiRequest<PagedResult<Record<string, unknown>>>(`/tech/tutorials${queryString ? `?${queryString}` : ""}`);
    return {
      ...data,
      list: Array.isArray(data.list) ? data.list.map(normalizeTutorialItem) : [],
    };
  },
  getTutorialDetail: async (id: string) => {
    const data = await apiRequest<Record<string, unknown>>(`/tech/tutorials/${id}`);
    return normalizeTutorialDetail(data);
  },

  // Resources
  getResourceCategories: () => apiRequest<ResourceCategory[]>("/resources/categories"),
  getResources: async (params: { categoryId?: string; type?: string; page?: number; size?: number; sort?: string } = {}) => {
    const query = new URLSearchParams();
    if (params.categoryId) query.append("categoryId", params.categoryId);
    if (params.type) query.append("type", params.type);
    if (params.page) query.append("page", params.page.toString());
    if (params.size) query.append("size", params.size.toString());
    if (params.sort) query.append("sort", params.sort);
    
    const queryString = query.toString();
    const data = await apiRequest<PagedResult<Record<string, unknown>>>(`/resources${queryString ? `?${queryString}` : ""}`);
    return {
      ...data,
      list: Array.isArray(data.list) ? data.list.map(normalizeResourceItem) : [],
    };
  },

  // Activities
  getPromoBanner: () => apiRequest<PromoBanner>("/activities/promo"),
  getActivities: (params: { type?: string; page?: number; size?: number; sort?: string } = {}) => {
    const query = new URLSearchParams();
    if (params.type) query.append("type", params.type);
    if (params.page) query.append("page", params.page.toString());
    if (params.size) query.append("size", params.size.toString());
    if (params.sort) query.append("sort", params.sort);
    
    const queryString = query.toString();
    return apiRequest<PagedResult<ActivityItem>>(`/activities${queryString ? `?${queryString}` : ""}`);
  },
  getActivityDetail: (id: string) => apiRequest<ActivityItem>(`/activities/${id}`),

  // Search
  search: (q: string, scope: string = "all", page: number = 1, size: number = 20) => {
    return apiRequest<PagedResult<any>>(`/search?q=${encodeURIComponent(q)}&scope=${scope}&page=${page}&size=${size}`);
  },
};
