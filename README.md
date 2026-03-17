This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## 部署到 Vercel

### 方式一：Vercel CLI（推荐）

1. 安装并登录（首次需要）：
   ```bash
   pnpm dlx vercel login
   ```
   按提示在浏览器中完成登录。

2. 在项目根目录执行部署：
   ```bash
   cd whuaiplayground
   pnpm dlx vercel
   ```
   首次会询问 Link to existing project? 选 `N`，Project name 可直接回车用默认名，其余可回车用默认。完成后会给出预览 URL。

3. 正式上线（生产环境）：
   ```bash
   pnpm dlx vercel --prod
   ```

### 方式二：Git + Vercel 控制台

1. 将代码推送到 GitHub（若仓库根目录是 `AAAweb`，在 Vercel 里把 **Root Directory** 设为 `whuaiplayground`）。
2. 打开 [vercel.com/new](https://vercel.com/new)，Import 你的 GitHub 仓库。
3. 若根目录不是项目目录，在设置中填写 **Root Directory**: `whuaiplayground`，**Build Command**: `pnpm run build`，**Install Command**: `pnpm install`。
4. 点击 Deploy，等待构建完成即可。
