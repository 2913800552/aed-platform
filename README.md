# AED 使用平台

一个面向公众的 AED 急救服务网站：AED 地图查找、设备认识、使用教学和心脏健康知识。

- **在线访问**：<https://2913800552.github.io/aed-platform/>
- **AED 地图**：<https://2913800552.github.io/aed-map/>

> ⚠️ 遇到紧急情况请立即拨打 **120**。本项目用于公众急救知识展示，
> 不能替代正规急救培训、专业医疗判断或现场急救调度指引。

---

## 📁 仓库只有两个区

### ✅ 根目录 —— 网站核心（改这里才会影响网站）

| 文件 / 目录 | 作用 |
|---|---|
| `app/page.tsx` | **网站全部页面代码**（首页 / 查找 / 认识 / 使用说明 / 健康生活 五个模块都在这一个文件里） |
| `app/globals.css` | 全站样式（Tailwind 4） |
| `app/layout.tsx` | HTML 外壳（标题、描述、字体） |
| `github-pages/` | **发布入口**（`index.html` + `main.tsx`），上线就从这两个文件开始打包 |
| `vite.pages.config.ts` | **发布构建配置**，`npm run build:pages` 读的就是它 |
| `postcss.config.mjs` | 样式编译配置，构建必需，**别挪走** |
| `tsconfig.json` / `next-env.d.ts` | TypeScript 配置 |
| `package.json` / `package-lock.json` | 依赖清单与命令脚本 |
| `README.md` | 本文件 |

### 📦 `_dev-only/` —— 开发辅助（动了也不影响网站上线）

| 目录 / 文件 | 是什么 | 为什么不影响网站 |
|---|---|---|
| `openai/` | OpenAI Codex 生成工具的托管配置 | 只是元数据，网站不读它 |
| `examples/` | 数据库示例代码 | 纯示例，没有任何地方引用 |
| `tests/` | 自动化测试脚本 | 只在本地 `npm test` 时用到 |
| `db/` + `drizzle.config.ts` + `drizzle/` | 数据库结构定义与迁移 | 网站是纯静态页，**不用数据库** |
| `worker/` | Cloudflare Worker 后台代码 | 线上跑的是 GitHub Pages，**不是 Worker** |
| `vite.config.ts` / `next.config.ts` | 本地开发用配置 | 发布用的是 `vite.pages.config.ts`，不是它们 |
| `eslint.config.mjs` | 代码检查规则 | 只影响 `npm run lint` |
| `chatgpt-auth.ts` | 生成工具遗留的死代码 | 全仓库没有任何地方引用它 |

---

## 🚀 常用命令

需要 Node.js `>=22.13.0`。

```bash
npm install          # 第一次使用：安装依赖
npm run build:pages  # 构建发布版，输出到 pages-dist/
npm run preview      # 本地预览构建结果
```

**发布方式**：把 `pages-dist/` 里的内容推送到 `gh-pages` 分支即可上线。

---

## 📌 已知注意事项

- **图片素材不在本仓库**，托管在外部地址 `aed-platform.well-scout-7253.chatgpt.site`，
  这个域名一旦失效全站图片都会挂。
- 「健康生活」页的 3 张图片（`health-smoke` / `health-diet` / `health-move`）当前加载失败，页面上是空白卡片。
- AED 点位数据在另一个仓库：`2913800552/aed-map`。
- 想本地起 Cloudflare/Worker 开发环境的话，需要把 `_dev-only/` 里的 `vite.config.ts`、`next.config.ts`
  移回根目录，并补上缺失的 `build/sites-vite-plugin` 目录（这个目录原本就没提交进仓库，`npm run dev` 本来就跑不起来）。
