# DESIGN.md

## 分发策略

使用 ES 和 UMD 格式进行分

区别：
| 格式 | 优点 | 适用 |
|------|------|------|
| ES Module | Tree-shaking、按需加载、现代工具链兼容 | 现代项目 |
| UMD | 零配置、直接引入、兼容旧浏览器 | 传统项目 |

### ES Module（推荐）

现代项目首选，支持 tree-shaking，体积最小。

```typescript
// npm/pnpm 安装
import { Icon } from "dockv-ui";
import "dockv-ui/styles";
```

```javascript
// ES 产物需配合打包器使用（lit / iconify 已外置），
// 无打包器直接 <script> 引入的场景请使用 UMD 产物。
```

**优点**：Tree-shaking、按需加载、现代工具链兼容
**适用**：Vite、Webpack、Rollup 等现代打包工具

### UMD（通用兼容）

兼容传统项目，支持 `<script>` 标签直接引入。

```html
<!-- 全局变量方式（以 dist 目录作为部署根目录） -->
<link rel="stylesheet" href="dockv-ui.css" />
<script src="dockv-ui.umd.js"></script>
<script>
  // 通过全局变量使用
  const button = new DockvUI.Icon();
  document.body.appendChild(button);
</script>
```

**优点**：零配置、直接引入、兼容旧浏览器
**适用**：传统项目、快速原型、离线环境

---

## 构建方式

### 命令总览

| 命令                    | 说明                         | 产物                                                             |
| ----------------------- | ---------------------------- | ---------------------------------------------------------------- |
| `pnpm build`            | 完整构建（类型 + JS + 样式） | `dockv-ui.es.js` / `dockv-ui.umd.js` + `*.d.ts` + `dockv-ui.css` |
| `pnpm build:types`      | 仅生成类型声明               | `dist/*.d.ts`                                                    |
| `pnpm build:components` | 仅构建 JS（ES + UMD）        | `dockv-ui.es.js` / `dockv-ui.umd.js`                             |
| `pnpm build:styles`     | 仅编译样式                   | `dist/dockv-ui.css`（全量汇总）                                  |
| `pnpm build:all`        | JS+类型+样式+文档+Storybook  | 全部产物                                                         |

### 完整构建（默认）

```typescript
// 使用方式
pnpm build
```

```typescript
// 引入所有组件
import { Icon } from "dockv-ui";
import "dockv-ui/styles";
```

> 说明：早期设计过"按组件单独打包"（JS 与样式），后因使用场景少、且每个组件都要重复携带 Lit 运行时、单组件样式还需自包含整套色盘变量导致体积不划算，已移除。JS 统一为 ES + UMD 两种整体格式，样式只保留全量 `dockv-ui.css` 一份。需要极致包体积的开发者可自行通过 npm 安装 + 打包器按需引入。

### 产物结构

```
dist/
├── dockv-ui.es.js                 ← 整体 ES Module（lit / iconify 外置，由 peerDependencies 提供）
├── dockv-ui.umd.js                ← 整体 UMD（自包含 lit + iconify）
├── dockv-ui.css                   ← 全量样式（编译 src/styles/index.scss）
├── index.d.ts                     ← 类型声明（目录结构与 src 对应）
└── components/
    └── dv-icon.d.ts
```

### 配置说明

```typescript
// vite.config.ts（build:components，JS 主构建）
// 通过 --mode 区分两次构建：
//   vite build            → dockv-ui.es.js（external lit / iconify，供 npm 打包器用户）
//   vite build --mode umd → dockv-ui.umd.js（自包含，供 <script> 直引用户）
// lib 模式下 external 对所有 format 全局生效，无法按 format 区分，故拆成两次构建。

// build:types —— tsc -p tsconfig.build.json
// declaration + emitDeclarationOnly，只产出 .d.ts 类型声明

// build:styles —— tsx build-styles.ts
// 使用 sass-embedded 编译 src/styles/index.scss → dist/dockv-ui.css（全量样式）
```

### 使用方式对比

| 场景         | ES Module                         | UMD                  |
| ------------ | --------------------------------- | -------------------- |
| 安装方式     | `pnpm add dockv-ui`               | `<script>` 标签      |
| 引入方式     | `import { Icon } from 'dockv-ui'` | `new DockvUI.Icon()` |
| Tree-shaking | ✅ 支持                           | ❌ 不支持            |
| 类型支持     | ✅ 完整                           | ⚠️ 需要额外配置      |
| 适用环境     | 现代打包工具                      | 传统 HTML 项目       |

---

## 样式策略

### CSS Token 分离

CSS 变量天然穿透 Shadow DOM → 色盘抽离为独立样式文件，组件只含逻辑。

```
src/styles/global/palette.scss      →  裸 HSL 色值
src/styles/global/global.scss       →  功能色变量
dist/dockv-ui.css                   →  编译后的完整样式
```

```html
<!-- 方式1：npm 安装自动引入 -->
<link rel="stylesheet" href="dockv-ui/dist/dockv-ui.css" />

<!-- 方式2：手动引入 -->
<link rel="stylesheet" href="https://unpkg.com/dockv-ui/dist/dockv-ui.css" />
```

**优点**：

- 样式与逻辑分离，易于维护
- 支持主题切换（只需覆盖 CSS 变量）
- 多组件共享样式，减少冗余

**组件内变量引用**：

```scss
.dockv-button {
  background: var(--dockv-color-primary);
  color: var(--dockv-color-text);
}
```

---

## 品牌可见性

MIT 协议不强制展示品牌，但以下方式可自然曝光：

### CSS 变量命名

所有 Token 以 `--dockv-` 为前缀。DevTools 检查元素时天然可见，无需额外操作。

### UMD 全局变量

UMD 构建自动挂载 `window.DockvUI`。这是 UMD 格式的标准行为（jQuery → `window.$`、Lodash → `window._`），社区无争议。

### JS 文件头注释

minify 时保留 `/*! DockV UI vX | MIT | https://... */`，任何拿到文件的开发者都能溯源。

---

## 浏览器支持

支持主流浏览器最新 2 个版本，不支持 IE：

- ✅ Chrome / Chromium / Edge
- ✅ Firefox
- ✅ Safari
- ⚠️ Electron / Tauri / WebView（基于上述内核，自动兼容）
- ❌ IE 及以下版本
