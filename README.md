<div align="center">
  <img src="./docs/public/logo.png" alt="DockV UI" width="120" />
</div>

<h1 align="center">DockV UI</h1>

<div align="center">
  <a href="https://github.com/dockv/dockv-ui/actions/workflows/deploy.yml">
    <img alt="Build" src="https://github.com/dockv/dockv-ui/actions/workflows/deploy.yml/badge.svg?branch=main" />
  </a>
  <a href="LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-blue.svg" />
  </a>
  <a href="https://github.com/dockv/dockv-ui/discussions">
    <img alt="Discussions" src="https://img.shields.io/github/discussions/dockv/dockv-ui?label=Discussions&color=green&logo=github&logoColor=white" />
  </a>
  <a href="https://github.com/dockv/dockv-ui/issues">
    <img alt="Issues" src="https://img.shields.io/github/issues/dockv/dockv-ui?label=Issues&color=red&logo=github&logoColor=white" />
  </a>
  <a href="https://github.com/dockv/dockv-ui">
    <img alt="GitHub" src="https://img.shields.io/badge/GitHub-dockv%2Fdockv--ui-181717?logo=github&logoColor=white" />
  </a>
</div>

<hr>

基于 [Lit](https://lit.dev/) Web Components 的现代化 UI 组件库，无框架依赖，可在任意前端项目中使用。

## 特性

- **框架无关**：原生 Web Components，可在 Vue、React、Angular 或纯 HTML 项目中使用。
- **开箱即用**：安装即可使用，无需额外配置或构建步骤。
- **主题变量**：内置完整的设计令牌体系（色盘、字体、圆角、间距），一处定义，全局生效。
- **亮暗主题**：基于 CSS 变量，一键切换亮色 / 暗色主题。

## 安装

```bash
# pnpm
pnpm add dockv-ui

# npm
npm install dockv-ui

# bun
bun add dockv-ui

# yarn
yarn add dockv-ui
```

## 快速开始

### 引入组件

```ts
import { Icon } from "dockv-ui";
import "dockv-ui/styles";
```

#### 在 原生 HTML 中使用
```html
<dv-icon icon="material-symbols:home" size="lg"></dv-icon>
```

#### 在 Vue 中使用

```vue
<script setup>
import "dockv-ui";
import "dockv-ui/styles";
</script>

<template>
  <dv-icon icon="material-symbols:home" size="lg"></dv-icon>
</template>
```

#### 在 React 中使用

```tsx
import "dockv-ui";
import "dockv-ui/styles";

export default function App() {
  return <dv-icon icon="material-symbols:home" size="lg"></dv-icon>;
}
```

### UMD 方式引入

无需构建工具，通过 `<script>` 标签引入即可，自定义元素会自动注册：

```html
<link rel="stylesheet" href="https://unpkg.com/dockv-ui/dist/dockv-ui.css" />
<script src="https://unpkg.com/dockv-ui/dist/dockv-ui.umd.js"></script>

<dv-icon icon="mdi:heart" color="red"></dv-icon>
```

UMD 引入后可通过全局变量 `DockvUI` 访问组件。

## 浏览器支持

最新 2 个版本的 Chrome / Chromium / Edge / Firefox / Safari

不支持 IE

## 项目结构

```text
dockv-ui/
├── src/                          # 组件源码
│   ├── components/               # 组件实现
│   │   ├── icon.ts
│   │   └── ...
│   ├── stories/                  # Storybook stories（测试目标）
│   │   ├── icon.stories.ts
│   │   └── ...
│   ├── styles/
│   │   ├── components/           # 组件样式
│   │   │   ├── icon.scss
│   │   │   └── ...
│   │   ├── global/               # 全局样式（色盘、变量）
│   │   │   ├── global.scss
│   │   │   ├── palette.scss
│   │   │   ├── variable.scss
│   │   │   └── ...
│   │   └── index.scss            # 样式汇总入口
│   └── index.ts                  # 组件导出入口
├── docs/                         # VitePress 文档站
│   ├── .vitepress/               # 文档站配置与辅助组件
│   ├── components/               # 组件文档
│   │   ├── index.md
│   │   ├── icon.md
│   │   └── ...
│   ├── public/                   # 静态资源（logo 等）
│   │   └── logo.png
│   ├── index.md
│   ├── tokens.md                 # 设计令牌文档
│   └── global-config.md
├── design/                       # 设计文档
│   ├── DESIGN.md
│   └── components/               # 组件设计文档
│       ├── icon.md
│       └── ...
├── test/                         # 手动测试页
│   └── index.html
├── .github/workflows/            # CI 工作流
│   └── deploy.yml
├── .storybook/                   # Storybook 配置
├── AGENTS.md                     # 项目规则
├── build-styles.ts               # 样式构建脚本
├── package.json                  # 包配置与命令脚本
├── tsconfig.json                 # TypeScript 配置
├── tsconfig.build.json           # 类型声明构建配置
├── vite.config.ts                # Vite 构建配置（ES + UMD）
├── vitest.config.ts              # Vitest 测试配置（Storybook 集成）
└── README.md
```

## 文档

完整文档见 [ui.dockv.cc](https://ui.dockv.cc/)

## 许可证

MIT License
