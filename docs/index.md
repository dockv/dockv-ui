---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "DockV UI"
  text: "一个原生 Web 的 UI 组件库"
  image: { src: "logo.png", alt: "" }
  tagline: 
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

<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/64683147?v=4',
    name: '是一只栗子啊',
    title: '',
    links: [
      { icon: 'github', link: 'https://github.com/chairowell' },
    ]
  },
]
</script>

## Developer

<VPTeamMembers size="small" :members />