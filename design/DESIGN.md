# DESIGN.md

## 分发策略

两种并行策略，用户按需选择。

### 策略一：独立 IIFE（新手优先）

每个组件自包含，单 `<script>` 引入即用，零依赖。

```
dockv-button.min.js    ← Lit ~5KB + palette ~3KB + 组件逻辑 ~2KB = ~10KB
dockv-switch.min.js
dockv-input.min.js
```

```html
<script src="dockv-button.min.js"></script>
<dv-button>按钮</dv-button>
```

**优点**：零工具链、离线可用、新手友好
**代价**：每个组件体积含 palette 冗余（10 组件 ≈ 100KB，gzip ≈ 15KB）

### 策略二：CSS Token 分离

CSS 变量天然穿透 Shadow DOM → 色盘抽离为独立样式文件，组件只含逻辑。

```
dockv-tokens.css        ← 一次性引入，包含完整色盘 + 功能色 + 排版等
dockv-button.min.js     ← Lit ~5KB + 组件逻辑 ~2KB = ~7KB（不含 palette）
dockv-switch.min.js
dockv-input.min.js
```

```html
<link rel="stylesheet" href="dockv-tokens.css">
<script src="dockv-button.min.js"></script>
<script src="dockv-input.min.js"></script>
```

**优点**：10 组件 ≈ 35KB（CSS 去重）
**代价**：必须引入 `tokens.css`，组件内每个变量需要 fallback 值

### 体积对比

| | 策略一 | 策略二 |
|---|---|---|
| 首个组件 | ~10KB | tokens 5KB + 7KB |
| 每 +1 组件 | ~10KB | ~7KB |
| 10 组件 | ~100KB | ~40KB |

---

## 构建方式

两种策略共用同一套 Vite lib 配置，通过参数切换。

**策略一（自包含）：**

```ts
// vite.config.ts
build: {
  lib: {
    entry: { 'dockv-button': 'src/dv-button.ts', ... },
    formats: ['iife'],
  },
  rollupOptions: {
    output: {
      // 不 external 任何内容，全部打包进组件
    }
  }
}
```

组件 SCSS 通过 `@use` 内联 palette，最终编译产物包含完整色盘。

**策略二（CSS 分离）：**

先构建 `tokens.css`：

```
src/styles/global/global.scss → dockv-tokens.css
```

组件构建时 `vite.config.external = ['lit', 'lit/decorators.js']`（可选，如需进一步拆分运行时），palette 和功能色不打入 JS，由 `tokens.css` 通过 CSS 变量继承提供。组件内所有变量引用使用 `var(--dockv-xxx, fallback)` 模式。

---

```
palette.scss           →  裸 HSL 色值  "216,100%,49%"
global.scss            →  功能色       "--dockv-color-primary: hsla(...)"
组件 SCSS              →  消费变量     "background: var(--dockv-color-primary)"
```

- 策略一：`palette` + `global` 在组件 `@use` 时内联编译
- 策略二：`palette` + `global` 编译为 `tokens.css`，组件不再 `@use` 色盘

---

## 品牌可见性

MIT 协议不强制展示品牌，但以下方式可在不引发反感的前提下自然曝光：

### CSS 变量命名

所有 Token 以 `--dockv-` 为前缀。DevTools 检查元素时天然可见，无需额外操作。

### IIFE 全局变量

策略一的 IIFE 构建自动挂载 `window.DockV`。这是 IIFE 格式的标准行为（jQuery → `window.$`、Lodash → `window._`、Alpine → `window.Alpine`），社区无争议。npm `import` 用户不受影响。

### JS 文件头注释

minify 时保留 `/*! DockV vX | MIT | https://... */`，任何拿到文件的开发者都能溯源。
