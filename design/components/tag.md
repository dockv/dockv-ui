## Tag 标签组件

### 定位

`<dv-tag>` 是**轻量信息标记组件**：在有限空间内标出一条内容的分类、属性或状态。适合列表、卡片、表格、详情页等信息密度高、单个条目可承载空间小的位置。

增删、输入新建、拖拽排序、折叠 `+N`、可选集合管理等功能留给未来的 `<dv-tag-group>`。

### 视觉变体（variant）

视觉表现层由 `variant` 决定，全量保留 6 档预设，与 `<dv-button>` 变体命名对齐：

| variant | 视觉效果 | 交互对称分组（灭活态 ⇄ 激活态） |
| :--- | :--- | :--- |
| `light` | 浅色背景（**默认**） | `ghost` ⇄ `light`（激活态） |
| `ghost` | 透明背景（无边框文字感） | `ghost` ⇄ `light`（灭活态） |
| `soft` | 浅色背景 + 描边 | `outline` ⇄ `soft`（激活态） |
| `outline` | 透明背景 + 描边 | `outline` ⇄ `soft`（灭活态） |
| `solid` | 深色实心填充 + 白字 | `neutral` ⇄ `solid`（激活态） |
| `neutral` | 灰底 + 语义色/彩色文字 | `neutral` ⇄ `solid`（灭活态） |

> [!NOTE] 为什么此前曾考虑排除 `ghost` 与 `neutral`？
>
> 在纯静态只读展示场景下：
>
> - `ghost` 无底色也无描边，缺乏明确的视觉边界，容易被误认为普通正文；
> - `neutral` 灰底彩色字是按钮常用的弱化操作件形态，在静态标签中灰底会削弱色彩的分类表达。
>
> 但在交互态（`checkable`）下，两者的价值成立：
>
> `ghost` 恰好是不抢视线的“未选中态”；`neutral` 恰好是实心色块在“未选中”时自然的灰底弱化态。引入交互维度后，6 种变体恰好形成 3 组零尺寸跳动的对称交互模型。

> [!NOTE] 为什么对 `type` 进行裁剪简化（移除了 `primary` / `secondary` / `tertiary`）？
>
> 1. **`primary` 违背轻量定位**：高饱和主色属于核心操作引导，大面积用于信息标签会过分抢眼、破坏视觉层级；
> 2. **操作权重不属于信息标记**：`secondary` / `tertiary` 是按钮的操作层级心智，标签只有分类与状态，没有“次级操作”概念；
> 3. **职责清晰分工**：常规业务分类使用 `color`（预设色或自定义）；`type` 专职表达全局系统状态（`success` / `warning` / `danger`），与全库状态色严格对齐。

### 颜色系统（color / 预设色盘）

标签支持 **17 种内置预设色盘** 与 **任意自定义 CSS 颜色**。默认颜色为 `grey`（基础中性灰，低调不抢占正文注意力）。

内置预设色盘枚举：

`grey`（默认）、`blue`、`light-blue`、`cyan`、`teal`、`green`、`light-green`、`lime`、`yellow`、`amber`、`orange`、`red`、`pink`、`purple`、`violet`、`indigo`、`white`。

> [!TIP] 状态语义快捷属性（type）
> 若需标识系统标准的客观状态，可传入 `type="success" | "warning" | "danger"`。组件直接消费全局功能语义色 Token（`--dockv-color-success` / `--dockv-color-warning` / `--dockv-color-danger`），与 Button、Notification 等全库组件保持严格同源的状态色表现。

#### 预设色实现（SCSS 循环注入）

预设色不走 JS 冗余计算，直接由 SCSS 循环生成 `.dockv-tag-color-#{$name}` 类并引用全局双主题 Token。

#### 自定义颜色（color-mix 原生插值）

当 `color` 为非预设色名的任意颜色字符串（如 `#39C5BB`、`rgb(255, 87, 51)`）时，组件通过 `color-mix()` 原生计算各变体与状态。

```html
<dv-tag color="#39C5BB">初音未来绿</dv-tag>
<dv-tag color="rgb(255, 87, 51)" variant="soft">任意 RGB</dv-tag>
<dv-tag color="var(--dockv-color-vocaloid-luotianyi)">引用其他色盘颜色</dv-tag>
```

##### 自定义颜色动态推送的架构实现与演进方案

###### 原有写法：全量变体变量并行推送（Baseline）

在组件一次性挂载所有 6 档变体及选中态的独立色板变量（共 20 余条），完全交由各变体类在 CSS 内部决定读取哪一组：

```ts
private _getInlineStyle(): string {
  const parts: string[] = [];
  if (this.color && !TAG_COLORS.includes(this.color as TagColor)) {
    const c = this.color;
    parts.push(
      `--dockv-tag-focus-color: ${c}`,
      // solid 深色填充
      "--dockv-tag-solid-font-color: var(--dockv-color-white)",
      `--dockv-tag-solid-bg-color: ${c}`,
      "--dockv-tag-solid-border-color: transparent",
      // light 浅色填充
      `--dockv-tag-light-font-color: ${c}`,
      `--dockv-tag-light-bg-color: color-mix(in srgb, ${c} 14%, transparent)`,
      "--dockv-tag-light-border-color: transparent",
      // ghost 无背景
      `--dockv-tag-ghost-font-color: ${c}`,
      "--dockv-tag-ghost-bg-color: transparent",
      "--dockv-tag-ghost-border-color: transparent",
      // outline 透明背景 + 边框
      `--dockv-tag-outline-font-color: ${c}`,
      "--dockv-tag-outline-bg-color: transparent",
      `--dockv-tag-outline-border-color: ${c}`,
      // soft 浅色背景 + 边框
      `--dockv-tag-soft-font-color: ${c}`,
      `--dockv-tag-soft-bg-color: color-mix(in srgb, ${c} 14%, transparent)`,
      `--dockv-tag-soft-border-color: ${c}`,
      // neutral 灰底 + 彩色文字
      `--dockv-tag-neutral-font-color: ${c}`,
      "--dockv-tag-neutral-bg-color: var(--dockv-color-fill-0)",
      "--dockv-tag-neutral-border-color: transparent",
      // 选中态：白字 + 深色底（同 solid 规则）
      "--dockv-tag-checked-font-color: var(--dockv-color-white)",
      `--dockv-tag-checked-bg-color: ${c}`,
      "--dockv-tag-checked-border-color: transparent",
    );
  }
  return parts.join(";");
}
```

*特点*：无需关注变体状态流转，由 CSS 类自发层叠命中；但行内样式体量偏大（约 600 字节），存在 90% 未命中变体的闲置变量。

###### 演进方案一：查表映射法（组件层按需直出最终变量）

剥离中间层 `-solid-` / `-light-` 的壳，JS 查表直接将当前变体所需的 3 个最终消费变量 + 1 个聚焦色写入内联样式（由 20+ 条骤降至 4 条，代码仅约 15 行）：

```ts
private _getInlineStyle(): string {
  if (!this.color || TAG_COLORS.includes(this.color as TagColor)) {
    return "";
  }

  const c = this.color;
  // 激活且选中时强制走 solid 样式（深底白字），否则走当前声明的 variant
  const activeVariant = this.checkable && this.checked ? "solid" : this.variant;

  // 6 档变体的色彩映射表：按需直出 [文字, 背景, 边框] 最终消费值
  const variantMap: Record<TagVariant, [string, string, string]> = {
    solid:   ["var(--dockv-color-white)", c, "transparent"],
    light:   [c, `color-mix(in srgb, ${c} 14%, transparent)`, "transparent"],
    ghost:   [c, "transparent", "transparent"],
    outline: [c, "transparent", c],
    soft:    [c, `color-mix(in srgb, ${c} 14%, transparent)`, c],
    neutral: [c, "var(--dockv-color-fill-0)", "transparent"],
  };

  const [font, bg, border] = variantMap[activeVariant] || variantMap.light;

  return [
    `--dockv-tag-focus-color: ${c}`,
    `--dockv-tag-font-color: ${font}`,
    `--dockv-tag-bg-color: ${bg}`,
    `--dockv-tag-border-color: ${border}`,
  ].join(";");
}
```

###### 方案二：种子变量驱动法（将派生计算完全归还 CSS，当前采用规范）

组件 JS 侧仅写入种子变量 `--dockv-tag-color`（及联动聚焦色），变体类无需重构中转架构，而是直接在读取 `--dockv-tag-{variant}-*` 时通过 `var(target, fallback)` 挂载原生回退表达式。预设色直接命中第一参数，自定义色未命中预设变量时无缝滑入第二参数完成动态派生：

1. **JS 侧（极简输出）**：
   ```ts
   private _getInlineStyle(): string {
     if (this.color && !TAG_COLORS.includes(this.color as TagColor)) {
       const c = this.color;
       return `--dockv-tag-color: ${c}; --dockv-tag-focus-color: ${c}`;
     }
     return "";
   }
   ```
2. **SCSS 侧（多层级回退闭环）**：
   ```scss
   // 视觉变体（优先消费预设色/Type注入的变量，未命中时基于 --dockv-tag-color 种子变量原生回退）
   .dockv-tag-light {
     --dockv-tag-font-color: var(--dockv-tag-light-font-color, var(--dockv-tag-color));
     --dockv-tag-bg-color: var(--dockv-tag-light-bg-color, color-mix(in srgb, var(--dockv-tag-color) 14%, transparent));
     --dockv-tag-border-color: var(--dockv-tag-light-border-color, transparent);
   }
   .dockv-tag-ghost {
     --dockv-tag-font-color: var(--dockv-tag-ghost-font-color, var(--dockv-tag-color));
     --dockv-tag-bg-color: var(--dockv-tag-ghost-bg-color, transparent);
     --dockv-tag-border-color: var(--dockv-tag-ghost-border-color, transparent);
   }
   .dockv-tag-soft {
     --dockv-tag-font-color: var(--dockv-tag-soft-font-color, var(--dockv-tag-color));
     --dockv-tag-bg-color: var(--dockv-tag-soft-bg-color, color-mix(in srgb, var(--dockv-tag-color) 14%, transparent));
     --dockv-tag-border-color: var(--dockv-tag-soft-border-color, var(--dockv-tag-color));
   }
   .dockv-tag-outline {
     --dockv-tag-font-color: var(--dockv-tag-outline-font-color, var(--dockv-tag-color));
     --dockv-tag-bg-color: var(--dockv-tag-outline-bg-color, transparent);
     --dockv-tag-border-color: var(--dockv-tag-outline-border-color, var(--dockv-tag-color));
   }
   .dockv-tag-solid {
     --dockv-tag-font-color: var(--dockv-tag-solid-font-color, var(--dockv-color-white));
     --dockv-tag-bg-color: var(--dockv-tag-solid-bg-color, var(--dockv-tag-color));
     --dockv-tag-border-color: var(--dockv-tag-solid-border-color, transparent);
     --dockv-tag-font-weight: var(--dockv-font-weight-bold);
   }
   .dockv-tag-neutral {
     --dockv-tag-font-color: var(--dockv-tag-neutral-font-color, var(--dockv-tag-color));
     --dockv-tag-bg-color: var(--dockv-tag-neutral-bg-color, var(--dockv-color-fill-0));
     --dockv-tag-border-color: var(--dockv-tag-neutral-border-color, transparent);
   }

   // 选中态：多层兜底（checked 专用色 -> solid 风格 -> 种子色）
   .dockv-tag.dockv-tag-checked {
     --dockv-tag-font-color: var(--dockv-tag-checked-font-color, var(--dockv-tag-solid-font-color, var(--dockv-color-white)));
     --dockv-tag-bg-color: var(--dockv-tag-checked-bg-color, var(--dockv-tag-solid-bg-color, var(--dockv-tag-color)));
     --dockv-tag-border-color: var(--dockv-tag-checked-border-color, var(--dockv-tag-solid-border-color, transparent));
     --dockv-tag-font-weight: var(--dockv-font-weight-bold);
   }
   ```
---
### 尺寸系统（size）

四档预设，只改 **高度 + 水平内边距 + 字号 + 区块间距**，宽度由内容自适应：

| size | min-height | padding-x | font-size | line-height | gap |
| :---: | :---: | :---: | :---: | :---: | :---: |
| `sm` | 16px | 4px | 12px (0.75rem) | 1 | 2px |
| `md` | 20px | 6px | 12px (0.75rem) | 1 | 3px |
| `lg` | 24px | 8px | 12px (0.75rem) | 1 | 4px |
| `xl` | 28px | 10px | 14px (0.875rem) | 1 | 4px |

字号复用 Token：`sm` / `md` / `lg` 取 `--dockv-font-size-xs`（0.75rem），`xl` 取 `--dockv-font-size-md`（0.875rem）。高度严格使用 `min-height`（非硬定高），字号随无障碍缩放 200% 时自动自然撑开，遵循 WCAG 1.4.4 规范。

行高固定为 `1`（`--dockv-tag-line-height: 1`），行长盒紧贴字形，垂直方向完全由 `:host` flex 居中与 `padding` 协调，彻底规避中文字体在 16px 下的基线偏移与溢出。

图标与图片尺寸按档位推导：

```scss
--dockv-tag-icon-size: 1em; // 默认图标跟字号

// fit 模式：图片高度 = 标签高度 - 描边 × 2 - 上下内边距 × 2
--dockv-tag-image-size: calc(
  var(--dockv-tag-height) - var(--dockv-tag-border-width, 1px) * 2 - var(--dockv-tag-padding-block, 0px) * 2
);

// 图片圆角跟随标签圆角，可单独覆盖
--dockv-tag-image-radius: var(--dockv-tag-border-radius);
```

变量与 Button 同构，外部可覆盖：

```scss
:host {
  --dockv-tag-sm-height: 16px;
  --dockv-tag-md-height: 20px;
  --dockv-tag-lg-height: 24px;
  --dockv-tag-xl-height: 28px;
  --dockv-tag-height: var(--dockv-tag-md-height); // 默认 md
}
```

### 圆角与形状（capsule / round / sharp）

标签默认采用标准微圆角（`var(--dockv-border-radius-sm)`，3px），与 `<dv-button>` 默认圆角完全一致。

通过布尔属性可以快捷切换特殊形状（胶囊对应 `capsule`，圆角对应 `round`，直角对应 `sharp`）：

| 属性 | 圆角取值 | 效果与使用场景 |
| :--- | :--- | :--- |
| *(默认)* / `round` | `var(--dockv-border-radius-sm)`（`3px`） | 默认圆角矩形，适合绝大多数常规业务界面 |
| `capsule` | `var(--dockv-border-radius-full)`（`9999px`） | 胶囊形状（两端全圆），适合分类标记、状态徽标、筛选胶囊 |
| `sharp` | `var(--dockv-border-radius-sq)`（`0`） | 锐利直角矩形，适合紧凑数据表格、代码风格界面 |

```html
<!-- 默认圆角（round，3px） -->
<dv-tag>默认标签</dv-tag>
<dv-tag round>圆角标签</dv-tag>

<!-- 胶囊全圆角（capsule，9999px） -->
<dv-tag capsule>胶囊标签</dv-tag>

<!-- 直角（sharp，0） -->
<dv-tag sharp>直角标签</dv-tag>
```

如需特定数值圆角，直接在外部通过 CSS 变量覆盖：
```css
dv-tag {
  --dockv-tag-border-radius: 6px;
}
```
### 内容插槽

#### 文本内容（默认 slot）

所有文本均包含在默认插槽（slot）内。

```html
<dv-tag>标签内容</dv-tag>
```

#### 文本溢出防御（单行省略号）

标签宽度完全由内容自适应（`max-width: 100%`），组件本体不定宽、不定字符上限。容器空间不足时由 CSS 自动截断出省略号。

> [!NOTE] 当前实现尚未补挂原生 `title`
>
> 文本被省略后，鼠标悬停无法看到完整内容。后续可在 `_handleSlotChange` 中比对 `scrollWidth > clientWidth`，懒测后补挂原生 `title` 兜底（详见文末「未实现清单」）。

> [!NOTE] 为什么不定字符上限、也不设 `max-width` 属性？
>
> - **字符数控制不了宽度**：中西文等长不等宽（6 个 `i` ≈ 18px，6 个汉字 ≈ 72px）；且 JS 截断会打断 slot 富文本，读屏只能读出残缺内容——CSS 仅视觉截断，DOM 文本保持完整可读。
> - **定宽是宿主布局的事**：宽度定得小时文本区可能只剩一串省略号，识别归零；占多宽应由外部容器（Flex wrap / Grid / 内联 `style`）宏观控制。

组件内部的文本防御骨架：

```scss
.dockv-tag {
  min-width: 0;
  max-width: 100%; // 允许整体在父容器受压时自然收缩
  box-sizing: border-box;
}

.dockv-tag-text {
  display: block; // 必须块级，ellipsis 才稳定生效
  min-width: 0;
  overflow: hidden;
  white-space: nowrap; // 永远单行，绝不撑高
  text-overflow: ellipsis;
  // 文本裁剪防护区：预留上下裁剪保护区，避免单行省略号时 line-height: 1 导致 y、g、p、q、j 等下延字符被裁切或被内边距/底边遮挡
  padding-block: 0.25em;
  margin-block: -0.25em;
}
```

#### 前缀 / 后缀：图标与图片

```
prefix-icon   前缀图标（Iconify `prefix:name`），内部交给前缀 <dv-icon icon>
suffix-icon   后缀图标，内部交给后缀 <dv-icon icon>
prefix-image  前缀图片 URL（单张），内部由前缀 <dv-icon src> 渲染
suffix-image  后缀图片 URL（单张），内部由后缀 <dv-icon src> 渲染
```

**同时设置 icon 与 image 时的处理机制：**

Shadow DOM 内部仅维护两个 `<dv-icon>`（前缀与后缀各至多一个），直接将 `prefix-image` 与 `prefix-icon` 透传给同一个 `<dv-icon .src=${...} .icon=${...}>`（后缀同理）。具体的渲染表现完全复用 `<dv-icon>` 的底层优先级：
$$\text{src（图片）} > \text{icon（矢量图标）}$$

- **图片优先覆盖**：当配置了 `image`（URL 非空）时，`<dv-icon>` 内部优先渲染 `<img>` 标签，此时 `icon` 会被自然覆盖；
- **图标自动兜底**：当未配置 `image` 或动态传入的图片 URL 为空串 `""` 时，`<dv-icon>` 自动回退渲染 `icon` 对应的 Iconify SVG；
- **两者皆无时不渲染**：若两者均未提供，则不挂载对应的 `<dv-icon>` DOM 节点。

> [!NOTE] 属性化前/后缀方案
>
> 组件不设 `prefix` / `suffix` 具名插槽，统一使用 `prefix-*` / `suffix-*` 属性配置图标与图片：
> - **标准化流式对齐**：由外层 flex 盒与 `--dockv-tag-gap` 自动居中并消除中文字体基线偏移；
> - **聚焦纯文本内容**：默认插槽专职承载纯文本内容，避免在插槽内放置图标或自定义节点导致行高断裂、图片拉伸与基线对齐不一致问题。

**与关闭按钮（`closable`）的排布共存：**

当同时存在后缀内容与关闭按钮时，布局顺序固定为：  
`[前缀 dv-icon] [文本 slot] [后缀 dv-icon] [关闭按钮 ×]`  
关闭按钮永远定位于最右外侧（视觉操作终点）。
且所有元素处在同一水平轴线上，保持一致的垂直居中对齐。

> [!NOTE] 自定义图片统一走 `<dv-icon src>`
> `<dv-icon>` 已内置图片渲染能力（`src` 属性），支持 SVG / PNG / JPG / WebP 等所有图片格式，并自带统一的尺寸约束。标签的前/后缀图片（`prefix-image` / `suffix-image`）内部直接复用 `<dv-icon src>` 渲染，与图标走同一套流式居中管道。

图片高度自动匹配标签净高（减去上下 padding），宽度按原图比例自适应（支持长方形、正方形等任意宽高比），垂直方向居中对齐，不产生拉伸变形。

#### 文本划选与交互安全

```scss
.dockv-tag {
  user-select: none;
} // 默认禁止划选
.dockv-tag.dockv-tag-selectable {
  user-select: text;
}
```

- `selectable`（`boolean`，默认 `false`）：开启后文本可选中复制。默认关闭的原因：标签是「一眼扫过」的标记物，鼠标划选时拖出一串彩色块既难看又会让相邻标签一起被选中；需要复制的长文本本就不该做成标签。
- **防误拖拽与交互安全**：前/后缀图片与图标均由 `<dv-icon>` 统一渲染，防拖拽（`-webkit-user-drag: none`）及选区保护由 `<dv-icon>` 底层统一定义，确保图片与矢量图标的行为表现完全对齐。
- **默认插槽边界**：默认 slot 内用户自带的图片不在组件 Shadow DOM 管辖内，由业务使用侧自行处理（同 Button 仅管辖自带图标的边界一致）。

### 交互特性与事件

#### 可关闭 `closable`

设置 `closable` 会在标签尾部显示 `×` 关闭按钮。点击时派发 `dv-close`，默认会自动隐藏标签。

```html
<!-- 常见场景：删除前弹窗二次确认，用户取消时阻止自动隐藏 -->
<dv-tag closable @dv-close=${(e: CustomEvent) => {
  if (!confirm("确定移除该标签？")) e.preventDefault();
}}>可关闭</dv-tag>
```

> [!NOTE] 点击隔离
> 点击关闭按钮只触发关闭逻辑，内部会 `stopPropagation()` 阻止事件继续向外传播，**绝不会误触发标签本身的点击事件（`dv-click`）**。
>
> 需要注意：`stopPropagation()` 会同时**阻止该次点击冒泡到外层父容器**，例如表格整行点击、卡片点击在点 `×` 时不会触发。若业务确实需要「点关闭时行依然响应」，应由业务侧在行点击处理中放行，或用 `dv-close` 自行衔接。

#### 可选中 `checkable` / `checked`

设置 `checkable` 使标签像开关/复选框一样，点击可以在选中与未选中之间切换；仅传入 `checked` 时则作为只读的选中状态展示。

```html
<dv-tag checkable checked>默认选中</dv-tag>
<dv-tag checkable @dv-change=${(e: CustomEvent) => console.log("当前选中:", e.detail.checked)}>
  筛选条件
</dv-tag>
```

- **变体成对翻转**：切换选中时，色彩在预设的两种变体间成对翻转（`ghost` ⇄ `light`、`outline` ⇄ `soft`、`neutral` ⇄ `solid`）。
- **零尺寸跳动（Zero Layout Shift）**：所有变体均恒定具有 1px 物理边框（`outline` / `soft` 赋予实体色，`solid` / `light` / `neutral` / `ghost` 以 `transparent` 透明占位）。切换选中时只改变颜色、绝不改动边框尺寸，且不追加勾选图标，确保整排标签连续点击切换时位置纹丝不动。

#### 事件一览

标签支持以下 3 个自定义事件（均支持冒泡，可在外层父容器统一监听）：

| 事件名 | 什么时候触发 | 回调参数（`detail`） | 能否阻止（`preventDefault`） |
| :--- | :--- | :--- | :--- |
| `dv-click` | 点击标签主体（**仅非 `checkable` 模式**） | `{ originalEvent, text, checked }` | 否（纯通知点击，无默认动作可拦截） |
| `dv-close` | 点击关闭按钮（`×`） | `{ originalEvent, text }` | **是**（阻止后标签不会自动隐藏） |
| `dv-change` | 切换选中状态（点击 / 键盘 `Space`、`Enter`） | `{ originalEvent, checked, text }`，`checked` 为**切换后的新值** | **是**（阻止后不会自动更新选中状态） |

**核心规则：**
1. **点关闭不触发点击**：点 `×` 只会触发 `dv-close`，不会连带触发 `dv-click`。
2. **`checkable` 模式下没有 `dv-click`**：点击只派发 `dv-change`，业务若要感知点击请监听它。
3. **支持拦截默认行为**：在 `dv-close` 或 `dv-change` 回调里调用 `e.preventDefault()`，组件就不会自动隐藏或翻转状态，由业务代码自己全权决定怎么处理。
4. **禁用状态不触发**：标签一旦设为 `disabled`，所有点击和事件均被静默拦截。
5. **`detail.checked` 是切换后的新值**：未选中状态下点击，回调中拿到的是 `true`。
6. **`originalEvent` 类型不固定**：鼠标点击为 `MouseEvent` / `PointerEvent`，键盘操作为 `KeyboardEvent`，可用 `instanceof KeyboardEvent` 区分来源，无需额外字段。

### 显隐与禁用

| 属性 | 类型 | 默认 | 说明 |
| :--- | :--- | :--- | :--- |
| `invisible` | `boolean`（`reflect: true`） | `false` | 隐藏标签。采用「出现即隐藏」的正向语义，无需写成 `visible="false"`。样式用 `:host([invisible]) { display: none }` 判定：**不占布局空间，但 DOM 节点保留**，随时可恢复显示（业务若需彻底移除节点，由业务侧决定）。`dv-close` 未被拦截时组件自动置 `true` |
| `disabled` | `boolean` | `false` | 只阻断交互（`dv-click` / `dv-change` / `dv-close` 均不派发），**不改变可见性**；视觉走禁用色变量 + `cursor: not-allowed` |

> [!NOTE] 为什么从 `visible` 改为 `invisible`
>
> 1. **布尔属性应「出现即生效」**：`disabled` / `hidden` / `checked` 均遵循此惯例，而 `visible` 需要写 `visible="false"` 或不写属性才能表达隐藏，反直觉。
> 2. **消除双重否定**：`visible` + `reflect: true` 时，`false` 表现为属性被移除，用户很难分清「没写 `visible`」是「显示」还是「隐藏」。
> 3. **与原生 `hidden` 心智对齐**：迁移成本低，`hidden` → `invisible` 近乎一一对应。
> 4. **不闪隐**：`visible` 默认 `true` 且反射，首次更新前 `:host(:not([visible]))` 会命中一次，导致标签「闪一下再出现」；改为 `invisible` 默认 `false` 后天然规避该问题。

> [!WARNING] 不要用原生 `hidden` 控制标签显隐
> `hidden` 是全局原生属性，`display: none !important` 由 UA 样式表决定，一旦外部框架把它和组件 `invisible` 混用，会出现「设了 `invisible = false` 仍然不显示」且无任何报错。显隐只认 `invisible`。

> [!IMPORTANT] `closable` 与 `checkable` 互斥规范（二选一）
> 为严格遵循 WAI-ARIA 规范（严禁在 `role="checkbox"` 内部嵌套可交互 `<button>`），`closable` 与 `checkable` 采用互斥设计：
> - **过滤筛选场景**：声明 `checkable`，宿主挂载 `role="checkbox"`，键盘 `Space` / `Enter` 切换选中；
> - **已选/移除场景**：声明 `closable`，尾部渲染原生 `<button>` 关闭按钮，键盘 Tab 键可聚焦；
> - **降级处理**：若两者同时声明为 `true`，优先作为 `checkable`（可选中）模式处理，**不渲染关闭按钮**，并通过 `console.warn` 输出警告（**任何环境都会输出**，未做开发/生产环境判断）。

> [!NOTE] 禁用与键盘可达性
>
> `disabled` 时内部根节点写 `aria-disabled="true"` 而不是直接摘掉 `tabindex`：可聚焦但明确报「已禁用」，读屏用户能用 Tab 找到它并知道状态；直接摘 `tabindex` 会让标签从 Tab 序列里凭空消失，用户不知道少了什么。`disabled` 与 `invisible` 互不干涉：前者只锁交互，后者只锁显隐。

### 无障碍（A11y）

| 场景 | 结构 / 属性 | 理由 |
| :--- | :--- | :--- |
| 纯展示标签 | 根节点**不设** **`role`**、不可聚焦（无 `tabindex`） | 标签是内容的一部分，读屏应作为普通文本读出。原型的 `role="status"` 会把它注册成实时区域（live region），任何文本变动都会被主动播报；标签列表里密集出现会造成播报风暴，必须去掉 |
| 可选中标签（`checkable`） | 宿主挂载 `role="checkbox"` + `tabindex="0"` + `aria-checked`（+ 禁用时 `aria-disabled="true"`） | 明确多选开关语义；单选模式由未来的 `<dv-tag-group mode="radio">` 动态下发 `role="radio"`。无内部关闭按钮，规避 ARIA 嵌套交互控件违规 |
| 可关闭标签（`closable`） | 宿主不设 `role`，尾部原生 `<button type="button" tabindex="0">` + `aria-label` | 传统单次 Tab Stop 进入关闭按钮，`Space` / `Enter` 触发关闭，关闭后焦点安全归还父级容器 |
| 键盘激活与滚页拦截 | `checkable` 下在 `keydown` 中监听 `Space` 与 `Enter` 并触发切换；必须就地调用 `e.preventDefault()` | 拦截浏览器 Space 键的默认 Page Down 滚页行为以及 Enter 键潜在的表单提交 |
| 聚焦可见 | `:focus-visible { outline: 2px solid var(--dockv-tag-focus-color); outline-offset: 0.5px; }`（关闭按钮为 `0px`） | 近乎贴边的细外环，聚焦环颜色跟随 tag 颜色；未声明 color/type 时回退 primary 主题色 |
| 前缀图标 / 图片 | 前缀 / 后缀容器整体 `aria-hidden="true"`，图片由 `<dv-icon>` 渲染为 `alt=""` | 装饰性内容不入朗读流；有信息量的图标应由使用者通过文本表达 |
| 颜色对比 | `solid` 深底白字，`light` / `soft` / `outline` 用主题对应的功能色 | 依赖全局双色盘自动明暗；`forced-colors` 下强制映射 Highlight 保持可感知性 |

`part` 最小白名单（精准暴露语义角色）：`tag`、`text`、`prefix`、`suffix`、`close`、`image`。

```css
dv-tag::part(close) {
  opacity: 1;
}
```

### API

#### 属性

| 属性 | 说明 | 类型 | 默认值 |
| :--- | :--- | :--- | :--- |
| `color` | 标签颜色：17 种预设色盘或任意 CSS 颜色（HEX / RGB / HSL / `var(--x)`）。传入非法颜色值时 `console.error` 提示并回退默认灰色 | `TagColor` \| `string` | —（回退 `"grey"`） |
| `variant` | 视觉变体 | `solid` \| `light` \| `outline` \| `soft` \| `neutral` \| `ghost` | `light` |
| `type` | 系统状态语义属性，消费全局功能状态色 Token (`--dockv-color-#{$type}`) | `success` \| `warning` \| `danger` | — |
| `size` | 尺寸 | `sm` \| `md` \| `lg` \| `xl` | `md` |
| `capsule` | 胶囊形状（两端全圆角 9999px） | `boolean` | `false` |
| `round` | 标准圆角形状（默认 3px） | `boolean` | `false` |
| `sharp` | 直角形状（无圆角 0px） | `boolean` | `false` |
| `prefix-icon` | 前缀图标（Iconify 格式），内部传给前缀 `<dv-icon icon>`；同时配置 `prefix-image` 时由图片优先覆盖 | `string` | — |
| `suffix-icon` | 后缀图标（Iconify 格式），内部传给后缀 `<dv-icon icon>`；同时配置 `suffix-image` 时由图片优先覆盖 | `string` | — |
| `prefix-image` | 前缀图片 URL（单张），内部传给前缀 `<dv-icon src>`；同时配置时优先级高于 `prefix-icon` | `string` | — |
| `suffix-image` | 后缀图片 URL（单张），内部传给后缀 `<dv-icon src>`；同时配置时优先级高于 `suffix-icon` | `string` | — |
| `closable` | 是否可关闭（与 `checkable` 互斥，同时声明时优先 `checkable`） | `boolean` | `false` |
| `checkable` | 是否可选中（与 `closable` 互斥，点击切换 `checked`） | `boolean` | `false` |
| `checked` | 选中态（`checkable` 时由 `dv-change` 内部同步） | `boolean` | `false` |
| `selectable` | 是否允许划选文本 | `boolean` | `false` |
| `invisible` | 隐藏标签（`display: none`，不占空间、不移除节点）；`dv-close` 未被拦截时自动置 `true` | `boolean` | `false` |
| `disabled` | 禁用交互，不改变可见性 | `boolean` | `false` |


#### 事件

| 事件名 | 说明 | 回调参数 |
| :--- | :--- | :--- |
| `dv-click` | 点击标签主体时触发（`disabled` 时不触发；点关闭按钮不触发） | `CustomEvent<{ originalEvent, text, checked }>` |
| `dv-close` | 点击关闭按钮时触发；`e.preventDefault()` 可阻止自动隐藏 | `CustomEvent<{ originalEvent, text }>` |
| `dv-change` | `checkable` 切换时触发；`e.preventDefault()` 可阻止内部 `checked` 变更 | `CustomEvent<{ originalEvent, checked, text }>` |

#### 插槽
| 插槽名 | 说明 |
| :--- | :--- |
| `default` | 默认插槽，传入标签展示的纯文本内容 |

组件仅提供单个默认插槽（不设任何具名插槽），前/后缀图标与图片通过属性规范化传入。

#### CSS 变量

尺寸与盒模型：

| 变量 | 默认值 | 说明 |
| :--- | :--- | :--- |
| `--dockv-tag-{sm\|md\|lg\|xl}-height` | `16/20/24/28px` | 全局档位预设高度槽 |
| `--dockv-tag-padding-inline-start` / `-end` | `6px`（md） | 逻辑水平内边距（尺寸类逐档覆盖 `4/6/8/10px`，RTL 自动镜像） |
| `--dockv-tag-gap` | `3px`（md） | 各区块间距（尺寸类逐档覆盖 `2/3/4/4px`） |
| `--dockv-tag-font-size` | `var(--dockv-font-size-xs)` | 字号（`xl` 档为 `--dockv-font-size-md`，rem 单位响应无障碍） |
| `--dockv-tag-line-height` | `1` | 行高固定为 1，消除中文字体基线偏移 |
| `--dockv-tag-font-weight` | `var(--dockv-font-weight-normal)` | 字重默认值 |

造型与圆角：

| 变量 | 默认值 | 说明 |
| :--- | :--- | :--- |
| `--dockv-tag-border-radius` | `var(--dockv-border-radius-sm)` | 默认微圆角（3px），开启 `capsule` 时为 9999px，开启 `sharp` 时为 0 |
| `--dockv-tag-border-width` | `1px` | 物理描边宽度（全变体恒定生效，无边框变体以 `transparent` 透明占位） |
| `--dockv-tag-icon-size` | `1em` | 图标高度 |
| `--dockv-tag-image-size` | `calc(var(--dockv-tag-height) - var(--dockv-tag-border-width, 1px) * 2 - var(--dockv-tag-padding-block, 0px) * 2)` | `fit` 模式图片高度（标签高度减去描边与上下内边距） |
| `--dockv-tag-image-radius` | `var(--dockv-tag-border-radius)` | 图片圆角，默认跟随标签圆角，可单独覆盖 |

颜色（按 `variant` × 角色展开）：

| 变量 | 说明 |
| :--- | :--- |
| `--dockv-tag-solid-font-color` / `-bg-color` / `-border-color` | `solid` 色板 |
| `--dockv-tag-light-font-color` / `-bg-color` / `-border-color` | `light` 色板 |
| `--dockv-tag-outline-font-color` / `-bg-color` / `-border-color` | `outline` 色板 |
| `--dockv-tag-soft-font-color` / `-bg-color` / `-border-color` | `soft` 色板 |
| `--dockv-tag-neutral-font-color` / `-bg-color` / `-border-color` | `neutral` 色板（灰阶底色 + 语义色/彩色文字） |
| `--dockv-tag-ghost-font-color` / `-bg-color` / `-border-color` | `ghost` 色板（透明底色 + 语义色/彩色文字） |
| `--dockv-tag-checked-font-color` / `-bg-color` / `-border-color` | 选中态：`type` 类预置为「白字 + 语义色底」（同 `solid` 组），`color` 注入时按同规则派生；样式处再留 `var(…, var(--dockv-tag-solid-*))` 兜底，防只覆盖部分变量时塌成透明 |
| `--dockv-tag-disabled-font-color` / `-bg-color` / `-border-color` | 禁用态 |
| `--dockv-tag-focus-color` | 聚焦环颜色（跟随 tag 自身颜色；未声明 color/type 时回退 primary 主题色） |
| `--dockv-tag-color` | 自定义色种子（`color` 属性写入，派生变量全部基于它 `color-mix`） |

中间层（由 `variant` / `checked` / `disabled` 写入，`.dockv-tag` 只读这三个）：

| 变量 | 说明 |
| :--- | :--- |
| `--dockv-tag-font-color` | 当前生效的文字色 |
| `--dockv-tag-bg-color` | 当前生效的背景色 |
| `--dockv-tag-border-color` | 当前生效的描边色 |
| `--dockv-tag-font-weight` | 当前生效的字重（`solid` 升为 bold） |

外部一般只覆盖上层的 `--dockv-tag-{variant}-{role}` 或禁用 / 选中组，中间层留给状态机自己写；直接写中间层会同时打穿所有 `variant`，只在「强制统一某枚标签颜色」时用。

禁用态兜底值（同 Button，全局 token 存在时被覆盖）：

```scss
--dockv-tag-disabled-font-color: var(--dockv-color-text-3);
--dockv-tag-disabled-bg-color: var(--dockv-color-fill-0);
--dockv-tag-disabled-border-color: var(--dockv-color-border);
```
