# `_dev-only/` —— 开发辅助文件

这一目录里的文件**不参与网站构建和上线**。线上网站
（<https://2913800552.github.io/aed-platform/>）由根目录下的
`app/` + `github-pages/` + `vite.pages.config.ts` 构建，与此目录无关。

| 文件 / 目录 | 说明 |
|---|---|
| `openai/hosting.json` | OpenAI Codex 生成工具留下的托管配置（project_id 等） |
| `layout.tsx` | 网站标题 / 描述 / 分享卡片元数据。**实测不进构建**——线上发布入口是 `github-pages/index.html`，不走 Next.js 的 layout。想让分享卡片生效，把里面的 openGraph 段挪进 `github-pages/index.html` 的 `<head>` |
| `chatgpt-auth.ts` | Codex 生成的 ChatGPT 登录辅助代码，全仓库无引用，属死代码 |
| `examples/d1/` | Cloudflare D1 数据库示例路由 |
| `db/` | Drizzle 数据库 schema 定义 |
| `drizzle.config.ts` + `drizzle/` | Drizzle 数据库迁移配置与元数据 |
| `worker/index.ts` | Cloudflare Worker 入口（线上未使用） |
| `vite.config.ts` | 本地开发配置，引用了仓库里不存在的 `build/sites-vite-plugin` |
| `next.config.ts` | Next.js 配置（本项目实际用 vinext + Vite 构建 Pages） |
| `eslint.config.mjs` | ESLint 检查规则 |
| `tests/rendered-html.test.mjs` | 构建产物 HTML 渲染测试 |

> 如果以后要恢复本地 Cloudflare 开发环境：把 `vite.config.ts`、`next.config.ts`
> 移回仓库根目录，并把 `db/`、`drizzle/`、`worker/`、`openai/` 也移回去，
> 同时补齐缺失的 `build/sites-vite-plugin` 目录。
