/**
 * 【文件作用】网站启动入口（网页从这里开始运行）
 *
 * 它只做三件事：
 *   1. 把「网站源码/全部页面代码.tsx」里的页面组件引进来；
 *   2. 把「网站源码/全站样式.css」的全站样式引进来；
 *   3. 把页面渲染到 index.html 里那个 <div id="root"> 上。
 *
 * 换句话说：这是「网页壳子」和「页面内容」之间那根线，真正的页面写在
 * 「网站源码/」里，本文件不要放业务逻辑。
 */
import React from "react";
import { createRoot } from "react-dom/client";
import Page from "../网站源码/全部页面代码";
import "../网站源码/全站样式.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Missing root element");
}

createRoot(root).render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>,
);
