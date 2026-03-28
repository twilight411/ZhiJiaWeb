import { NextRequest, NextResponse } from "next/server";

const TARGET_API_BASE = "https://whuaihub.ziqiang.net.cn/api";

/**
 * 组装代理目标地址
 * @param pathSegments 动态路由路径片段
 * @param search 原始查询字符串
 * @returns 拼接完成的上游 API URL
 */
function buildTargetUrl(pathSegments: string[], search: string): string {
  const safePath = pathSegments.map(encodeURIComponent).join("/");
  return `${TARGET_API_BASE}/${safePath}${search}`;
}

/**
 * 统一转发请求到后端 API
 * @param request Next.js 请求对象
 * @param params 动态路由参数
 * @returns 上游响应透传结果
 */
async function proxy(request: NextRequest, params: { path: string[] }): Promise<NextResponse> {
  const { path } = params;
  const targetUrl = buildTargetUrl(path, request.nextUrl.search);

  // 暂时忽略证书校验
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  const upstreamResponse = await fetch(targetUrl, {
    method: request.method,
    headers: {
      "Content-Type": request.headers.get("content-type") ?? "application/json",
      Authorization: request.headers.get("authorization") ?? "",
    },
    body: request.method === "GET" || request.method === "HEAD" ? undefined : await request.text(),
    cache: "no-store",
  });

  const contentType = upstreamResponse.headers.get("content-type") ?? "application/json";
  const text = await upstreamResponse.text();

  return new NextResponse(text, {
    status: upstreamResponse.status,
    headers: {
      "content-type": contentType,
    },
  });
}

/**
 * 处理 GET 代理请求
 * @param request 请求对象
 * @param context 路由上下文
 * @returns 代理响应
 */
export async function GET(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const params = await context.params;
  return proxy(request, params);
}

/**
 * 处理 POST 代理请求
 * @param request 请求对象
 * @param context 路由上下文
 * @returns 代理响应
 */
export async function POST(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const params = await context.params;
  return proxy(request, params);
}

/**
 * 处理 PUT 代理请求
 * @param request 请求对象
 * @param context 路由上下文
 * @returns 代理响应
 */
export async function PUT(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const params = await context.params;
  return proxy(request, params);
}

/**
 * 处理 PATCH 代理请求
 * @param request 请求对象
 * @param context 路由上下文
 * @returns 代理响应
 */
export async function PATCH(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const params = await context.params;
  return proxy(request, params);
}

/**
 * 处理 DELETE 代理请求
 * @param request 请求对象
 * @param context 路由上下文
 * @returns 代理响应
 */
export async function DELETE(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const params = await context.params;
  return proxy(request, params);
}
