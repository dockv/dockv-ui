## Button 按钮组件

### 定位

`<dv-button>` 是整个 UI 库的按钮入口，承担三个职责：
- **统一的交互入口**：承担用户点击、表单提交、其他触发等核心交互行为
- **样式变体收敛**：通过 `theme` / `variant` 两个正交维度，覆盖绝大多数按钮视觉需求，避免对外暴漏裸 CSS 类名
- **图标与状态的统一调度**：`loading` / `disabled` / `icon` 等属性在组件层统一处理，下游无需关心 `<dv-icon>` 或 loading spinner 的具体渲染细节

### 核心维度：theme + variant

按钮的外观由两个正交属性决定：

```
theme    → 调色板（primary / secondary / tertiary / success / warning / danger）
variant  → 视觉表现层（solid / light / ghost / outline / soft / neutral / skeuo）
```

```
         solid   light   ghost   outline   soft   neutral   skeuo
primary    ✓       ✓       ✓        ✓       ✓       ✓        ✓
secondary  ✓       ✓       ✓        ✓       ✓       ✓        ✓
tertiary   ✓       ✓       ✓        ✓       ✓       ✓        ✓
success    ✓       ✓       ✓        ✓       ✓       ✓        ✓
warning    ✓       ✓       ✓        ✓       ✓       ✓        ✓
danger     ✓       ✓       ✓        ✓       ✓       ✓        ✓
```

- `theme` 决定色值（从全局 CSS 变量 `--dockv-color-{theme}*` 系列中选取）
- `variant` 决定背景形态（填充/边框/透明/混合）

> [!warning]
> `neutral` 变体不读取 `--dockv-color-{theme}-*`，统一使用 `--dockv-color-fill-*` 系列灰度色

### 颜色注入机制

`theme` 的 CSS 变量在 SCSS 层预定义（一类一个色板），运行时通过 `color` 属性动态覆盖：

```html
<dv-button color="#39C5BB">初音未来绿</dv-button>
```

`color` 为非空字符串时，render 中注入内联 `<style>`，使用 `color-mix()` 动态生成 hover / active / focus 态颜色。覆盖范围包括 `solid` / `light` / `ghost` / `outline` / `soft` 五种变体（不包含 `neutral`）。

```
color                     → 直接作为 solid 背景色
color-mix(… 85%, #000)    → solid hover
color-mix(… 75%, #000)    → solid active
color-mix(… 10%, transparent) → light 背景
color-mix(… 20%, transparent) → light hover
color-mix(… 30%, transparent) → light active
color-mix(… 40%, transparent) → focus outline
```

### 图标集成

`icon` 属性直接传递给内部 `<dv-icon>`，格式为 Iconify prefix:name：

```html
<dv-button icon="material-symbols:home">首页</dv-button>
```

- `iconPosition` 控制图标在左（默认）还是右
- `loading` 状态下 `icon` 被覆盖为 `svg-spinners:180-ring`
- 纯图标按钮：不传 slot 内容，仅传 `icon` 属性


### 加载状态

```
loading=true   →  pointer-events: none（CSS 层阻止交互）
               →  图标强制替换为 spinner
               →  按钮仍可 focus（键盘 TAB），但 click 被阻止
```

### 禁用状态

```
disabled=true  →  native button disabled（阻止所有交互）
               →  color: --dockv-color-disabled-text
               →  background: --dockv-color-disabled-bg !important
               →  cursor: not-allowed
               →  focus-visible: outline: none
disabled 优先级高于 loading，两者同时为 true 时显示为禁用态
```

### 事件

- `dv-click`：封装点击事件，`disabled` 或 `loading` 时不触发
- `contextmenu` 事件被 preventDefault 阻止右键菜单

```html
<dv-button @dv-click=${handleClick}>提交</dv-button>
```

### 尺寸系统

五个预设尺寸，仅改变高度 + 水平内边距：

| size | height | padding-x |
|---|---|---|
| extra-small | 24px | 8px |
| small | 28px | 10px |
| medium | 32px | 12px |
| large | 36px | 14px |
| extra-large | 40px | 16px |

通过 CSS 变量 `--dockv-button-{size}-height` 和 `--dockv-button-padding-left/right` 控制，支持外部覆盖。

### 构建策略

策略一中 `<dv-button>` 随组件打包进 IIFE，内部通过 `import './dv-icon'` 引入图标组件。策略二中按钮组件不含图标依赖（外部通过 slot 自行传图标或 `import '@dockv/ui/dv-icon.js'` 单独引入）。
