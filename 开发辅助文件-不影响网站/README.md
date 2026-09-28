# `开发辅助文件-不影响网站/` —— 开发辅助文件

这一目录里的文件**不参与网站构建和上线**。线上网站
（<https://2913800552.github.io/aed-platform/>）由根目录下的
`网站源码/` + `网站发布入口/` + `打包发布配置.ts` 构建，与此目录无关。

> 子文件夹按"是干什么的"分了类，下面这张表把每个文件都解释了一遍。

| 子目录 | 里面的文件 | 是什么 |
|---|---|---|
| `Codex生成工具的配置/` | `hosting.json` | OpenAI Codex 生成工具留下的托管配置（project_id 等），网站不读它 |
| `没被使用的代码/` | `layout.tsx` | 网站标题 / 描述 / 分享卡片元数据。**实测不进构建**——线上发布入口是 `网站发布入口/index.html`，不走 Next.js 的 layout。想让分享卡片生效，把里面的 openGraph 段挪进 `网站发布入口/index.html` 的 `<head>` |
| `没被使用的代码/` | `chatgpt-auth.ts` | Codex 生成的 ChatGPT 登录辅助代码，全仓库无引用，属死代码 |
| `示例代码/` | `d1/app/api/notes/route.ts`、`d1/db/schema.ts` | Cloudflare D1 数据库的示例接口代码，纯示例，没有任何地方引用 |
| `数据库相关-网站用不到/` | `db/index.ts`、`db/schema.ts`、`drizzle.config.ts`、`drizzle/meta/_journal.json` | Drizzle 数据库的表结构定义、迁移配置与记录。网站是纯静态页，**不用数据库** |
| `Cloudflare后台代码-线上没用/` | `index.ts` | Cloudflare Worker 后台入口。线上跑的是 GitHub Pages，**不是 Worker** |
| `本地开发配置-已经跑不起来/` | `vite.config.ts`、`next.config.ts` | 本地开发用的配置。`vite.config.ts` 引用了仓库里不存在的 `build/sites-vite-plugin`，所以 `npm run dev` 本来就跑不起来；发布用的是根目录的 `打包发布配置.ts`，不是它们 |
| `代码检查规则/` | `eslint.config.mjs` | ESLint 代码检查规则，只影响 `npm run lint` |
| `自动测试脚本/` | `rendered-html.test.mjs` | 构建产物 HTML 渲染测试。⚠️ 项目最初脚手架留下的，测的是模板自带骨架屏，当前跑不通，仅作历史参考 |
| （本目录根） | `README.md` | 本说明 |

> 如果以后要恢复本地 Cloudflare 开发环境：把 `本地开发配置-已经跑不起来/` 里的
> `vite.config.ts`、`next.config.ts` 移回仓库根目录，并把 `数据库相关-网站用不到/`、
> `Codex生成工具的配置/`、`Cloudflare后台代码-线上没用/` 里的文件也移回去，
> 同时补齐缺失的 `build/sites-vite-plugin` 目录。
