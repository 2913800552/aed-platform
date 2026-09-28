/**
 * 【文件作用】上线打包配置（原文件名 vite.pages.config.ts）
 *
 * 运行 `npm run build:pages` 时，打包工具读的就是这个文件，它规定：
 *   - base   ：网站挂在 /aed-platform/ 这个子路径下（GitHub Pages 项目页规则）；
 *   - root   ：从「网站发布入口/」这个文件夹开始打包；
 *   - input  ：入口是「网站发布入口/index.html」；
 *   - outDir ：结果输出到 pages-dist/，推送到 gh-pages 分支即上线。
 *
 * 注意：本地开发用的 vite.config.ts 已挪到「开发辅助文件-不影响网站/」，两者别搞混。
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  base: "/aed-platform/",
  root: resolve(__dirname, "网站发布入口"),
  publicDir: false,
  plugins: [react()],
  build: {
    outDir: resolve(__dirname, "pages-dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, "网站发布入口/index.html"),
    },
  },
});
