---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: DockV UI
  text: 不挑框架！一个原生 Web 的 UI 组件库
  image: { src: "logo.png", alt: "" }
  tagline: 轻量、框架无关的原生 Web Components 组件库
  actions:
    - theme: brand
      text: 组件
      link: /components
---

## 开始使用

准备好开始使用 **DockV UI** 了吗？ 让我们快速的安装它吧！

::: code-group

```shell [pnpm]
pnpm add dockv-ui@latest
```

```shell [npm]
npm install dockv-ui@latest
```

```shell [bun]
bun install dockv-ui@latest
```

```shell [yarn]
yarn add dockv-ui@latest
```

:::

## 使用方式

### ES Module（推荐）

```typescript
import { Icon } from "dockv-ui";
import "dockv-ui/styles";
```

### UMD（通用兼容）

```html
<script src="dockv-ui.umd.js"></script>
<link rel="stylesheet" href="dockv-ui.css" />
<script>
  const icon = new DockvUI.Icon()
  document.body.appendChild(icon)
</script>
```

## 构建产物

| 格式      | 文件                  | 适用场景                      |
| --------- | --------------------- | ----------------------------- |
| ES Module | `dockv-ui.es.js`      | 现代打包工具（Vite、Webpack） |
| UMD       | `dockv-ui.umd.js`     | 传统项目、`<script>` 标签引入 |
| CSS       | `dockv-ui.css` | 所有场景都需要引入            |

## 浏览器支持

- ✅ Chrome / Chromium / Edge（最新 2 版）
- ✅ Firefox（最新 2 版）
- ✅ Safari（最新 2 版）
- ⚠️ Electron / Tauri / WebView（自动兼容）
- ❌ IE 及以下版本

<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/64683147?s=200&v=4',
    name: '是一只栗子啊',
    title: '',
    links: [
      { icon: 'github', link: 'https://github.com/chairowell' },
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/297214806?s=200&v=4',
    name: 'DockV',
    title: '',
    links: [
      { icon: 'github', link: 'https://github.com/dockv' },
    ]
  },
]
</script>

## Developer

<VPTeamMembers size="small" :members />
