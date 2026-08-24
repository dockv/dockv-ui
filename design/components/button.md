## Button 按钮组件

### 定位

`<dv-button>` 是整个 UI 库的按钮入口，承担三个职责：

- **统一的交互入口**：承担用户点击、表单提交、其他触发等核心交互行为
- **样式变体收敛**：通过 `type` / `variant` 两个正交维度，覆盖绝大多数按钮视觉需求，避免对外暴漏裸 CSS 类名
- **图标与状态的统一调度**：`loading` / `disabled` / `icon` 等属性在组件层统一处理，下游无需关心 `<dv-icon>` 或 loading spinner 的具体渲染细节

### 核心维度：type + variant

按钮的外观由两个正交属性决定：

```
type     → 调色板（primary / secondary / tertiary / success / warning / danger）
variant  → 视觉表现层（solid / light / ghost / outline / soft / neutral）
```

```
         solid   light   ghost   outline   soft   neutral
primary    ✓       ✓       ✓        ✓       ✓       ✓
secondary  ✓       ✓       ✓        ✓       ✓       ✓
tertiary   ✓       ✓       ✓        ✓       ✓       ✓
success    ✓       ✓       ✓        ✓       ✓       ✓
warning    ✓       ✓       ✓        ✓       ✓       ✓
danger     ✓       ✓       ✓        ✓       ✓       ✓
```

- `type` 决定色值（从全局 CSS 变量 `--dockv-color-{type}*` 系列中选取）
- `variant` 决定背景形态（填充/边框/透明/混合）

### 设计边界

`variant` 只承载基础视觉表现层。高度定制的视觉风格（如拟物 skeuo）**不进入基础组件**，改由上层 `dockv-ui-pro` 或应用案例通过组合基础组件实现。基础组件保持最小职责，避免变体无限膨胀导致难以维护。

### 颜色注入机制

`type` 的 CSS 变量在 SCSS 层预定义（一类一个色板），运行时通过 `color` 属性动态覆盖：

```html
<dv-button color="#39C5BB">初音未来绿</dv-button>
```

自定义颜色使用 `color` 属性。`color` 为非空字符串时，render 中注入内联 `<style>`，使用 `color-mix()` 动态生成 hover / active / focus 态颜色。

```
color                         → 直接作为 solid 背景色
color-mix(… 85%, #000)        → solid hover
color-mix(… 75%, #000)        → solid active
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

- `iconPosition` 控制图标在左（默认）还是右。
- `loading` 状态下 `icon` 被覆盖为 `svg-spinners:180-ring`。
- 纯图标按钮：不传 slot 内容，仅传 `icon` 属性。

还可以直接使用 `<dv-icon>` 组件，无需通过 `icon` 属性。

```html
<dv-button>
  <dv-icon icon="material-symbols:home" size="xl" color="var(--dockv-color-primary)"></dv-icon>
  直接使用图标组件
</dv-button>
```

### 图标按钮的内边距与形状

**纯图标判定**：`slot` 内容留空（仅设置 `icon` 属性），或 `slot` 内只包含 `<dv-icon>`，即为纯图标按钮。图标自身形状决定按钮宽度（长方形图标自然撑开，正方形图标自动为正方形）。

**`square`**：强制标准正方形尺寸（宽 = 高），防止特殊尺寸图标破坏按钮形状。

```html
<dv-button icon="logos:sqlite" square></dv-button>
```

### 加载状态

```
loading=true   →  JS 层拦截 click（_handleClick 中 disabled / loading 均不派发 dv-click）。
               →  图标强制替换为 spinner。
               →  CSS 显示 cursor: wait 提示"处理中"。
               →  按钮仍可 focus（键盘 TAB），但 click 被阻止。
```

> [!note] 为什么不用 pointer-events: none
> 早期用 `pointer-events: none` 在 CSS 层阻止交互，但它会让光标**穿透**按钮，
> `cursor: wait` 无法生效。故现改为 JS 层拦截 + CSS 负责光标与造型，二者各司其职。

### 禁用状态

```
disabled=true  →  native button disabled（阻止所有交互）
               →  color: --dockv-color-disabled-text
               →  background: --dockv-color-disabled-bg !important
               →  cursor: not-allowed
               →  focus-visible: outline: none
disabled 优先级高于 loading，两者同时为 true 时显示为禁用态。
```

### 事件

- `dv-click`：封装点击事件，`disabled` 或 `loading` 时不触发。
- `contextmenu` 事件被 preventDefault 阻止右键菜单。

```html
<dv-button @dv-click="${handleClick}">提交</dv-button>
```

### 表单行为（native-type）

外层 `type` 只承载颜色语义，内层原生 `<button>` 的表单行为由独立的 `native-type` 属性控制（默认 `button`）。两者互不干扰，且**禁止互相透传**。

```html
<dv-button type="primary" native-type="submit">提交</dv-button>
<dv-button type="danger">删除</dv-button>
```

> [!warning] 实现硬性规则
> 原生 `<button>` 的 `type` 只认 `submit` / `reset` / `button` 三个值。其他任意值（如 `primary`）都会被浏览器按 HTML 规范**静默当作 submit 处理**，可能导致表单意外提交且难以排查。因此：
>
> 1. 内层原生按钮的 `type` 只能读取 `native-type` 的值，默认 `button`；
> 2. **禁止**把外层 `type` 属性透传给内层 `<button>`，在组件层做校验处理。

| 属性          | 取值                                                        | 用途                   |
| ------------- | ----------------------------------------------------------- | ---------------------- |
| `type`        | primary / secondary / tertiary / success / warning / danger | 颜色语义               |
| `native-type` | submit / reset / button                                     | 内层原生按钮的表单行为 |

### 尺寸系统

五个预设尺寸，仅改变高度 + 水平内边距：

| size | height | padding-x |
| ---- | ------ | --------- |
| xs   | 24px   | 8px       |
| sm   | 28px   | 10px      |
| md   | 32px   | 12px      |
| lg   | 36px   | 14px      |
| xl   | 40px   | 16px      |

通过 CSS 变量 `--dockv-button-{size}-height` 和 `--dockv-button-padding-left/right` 控制，支持外部覆盖。

### 形状与圆角（square / circle / borderRadius）

**`square`**：强制宽 = 高（正方形），防止特殊尺寸图标破坏按钮形状。不处理圆角。

**`circle`**：正圆按钮，隐含 `square`（宽 = 高）+ 全圆角，一个属性即可。

> [!note] 内容判定优先级（square / circle）
> `square` / `circle` 是紧凑形状，用于图标或单个字符。渲染内容按优先级取其一：
>
> 1. slot 中的 `<dv-icon>`（最高，覆盖属性 `icon`）
> 2. `icon` 属性（此时 slot 文字被忽略）
> 3. 纯文字：只渲染第一个字符（如 `<dv-button circle>保存</dv-button>` 显示为「保」）
>
> 有图标（无论属性还是 slot）时只渲染图标，不渲染文字；slot 图标优先级高于属性图标。实现上需在 `slotchange` 时判定 slot 内容类型（图标 / 文字 / 空）。

```html
<dv-button icon="material-symbols:close" circle></dv-button>
```

> [!warning] 圆角取值用确定数值，不用 `50%`
> `border-radius` 的百分比按元素**宽、高各自计算**：宽高不等时 `50%` 得到的是椭圆，不是正圆。改用大数值（如 `9999px`）时，浏览器会将其**钳制为短边的一半**——正方形得到正圆，非正方形至少是胶囊，绝不会出现椭圆。因此 `circle` 内部固定使用 `border-radius: 9999px`，而非 `50%`。

**`borderRadius`**：自定义任意圆角（CSS 长度），覆盖默认圆角。

```html
<dv-button borderRadius="0">直角</dv-button> <dv-button borderRadius="9999px">胶囊</dv-button>
```

圆角优先级：`borderRadius`（显式指定） > `circle`（9999px） > 默认 `--dockv-button-border-radius`。
