---
title: Tag 标签
---

# Tag 标签

轻量信息标记组件，在有限空间内标出内容的分类、属性或状态。适合列表、卡片、表格、详情页等信息密度高、单个条目可承载空间小的位置。

## 基础用法

使用 `<dv-tag>` 标签，默认使用 `grey` 颜色与 `light` 浅色变体。

<div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
  <dv-tag>默认标签</dv-tag>
  <dv-tag>灰色标签</dv-tag>
</div>

```html
<dv-tag>默认标签</dv-tag>
<dv-tag>灰色标签</dv-tag>
```

## 颜色（color）

使用 `color` 属性定义标签颜色，共 17 种内置预设色盘，默认是 `grey`。

<div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
  <dv-tag color="grey">grey</dv-tag>
  <dv-tag color="blue">blue</dv-tag>
  <dv-tag color="light-blue">light-blue</dv-tag>
  <dv-tag color="cyan">cyan</dv-tag>
  <dv-tag color="teal">teal</dv-tag>
  <dv-tag color="green">green</dv-tag>
  <dv-tag color="light-green">light-green</dv-tag>
  <dv-tag color="lime">lime</dv-tag>
  <dv-tag color="yellow">yellow</dv-tag>
  <dv-tag color="amber">amber</dv-tag>
  <dv-tag color="orange">orange</dv-tag>
  <dv-tag color="red">red</dv-tag>
  <dv-tag color="pink">pink</dv-tag>
  <dv-tag color="purple">purple</dv-tag>
  <dv-tag color="violet">violet</dv-tag>
  <dv-tag color="indigo">indigo</dv-tag>
  <dv-tag color="white">white</dv-tag>
</div>

```html
<dv-tag color="grey">grey</dv-tag>
<dv-tag color="blue">blue</dv-tag>
<dv-tag color="light-blue">light-blue</dv-tag>
<dv-tag color="cyan">cyan</dv-tag>
<dv-tag color="teal">teal</dv-tag>
<dv-tag color="green">green</dv-tag>
<dv-tag color="light-green">light-green</dv-tag>
<dv-tag color="lime">lime</dv-tag>
<dv-tag color="yellow">yellow</dv-tag>
<dv-tag color="amber">amber</dv-tag>
<dv-tag color="orange">orange</dv-tag>
<dv-tag color="red">red</dv-tag>
<dv-tag color="pink">pink</dv-tag>
<dv-tag color="purple">purple</dv-tag>
<dv-tag color="violet">violet</dv-tag>
<dv-tag color="indigo">indigo</dv-tag>
<dv-tag color="white">white</dv-tag>
```

内置预设色盘枚举：`grey`（默认）、`blue`、`light-blue`、`cyan`、`teal`、`green`、`light-green`、`lime`、`yellow`、`amber`、`orange`、`red`、`pink`、`purple`、`violet`、`indigo`、`white`。

### 自定义颜色

`color` 传入**非预设色名**的任意颜色字符串（HEX / RGB / HSL）时，通过 `color-mix()` 混合出自定义颜色。

<div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
  <dv-tag color="#39C5BB">初音未来绿</dv-tag>
  <dv-tag color="rgb(255, 87, 51)" variant="soft">任意 RGB</dv-tag>
  <dv-tag color="hsl(354, 68%, 54%)" variant="outline">重音teto红</dv-tag>
  <dv-tag color="var(--dockv-color-vocaloid-luotianyi)" variant="light">引用其他色盘颜色</dv-tag>
</div>

```html
<dv-tag color="#39C5BB">初音未来绿</dv-tag>
<dv-tag color="rgb(255, 87, 51)" variant="soft">任意 RGB</dv-tag>
<dv-tag color="hsl(354, 68%, 54%)" variant="outline">重音teto红</dv-tag>
<dv-tag color="var(--dockv-color-vocaloid-luotianyi)" variant="light">
  引用其他色盘颜色
</dv-tag>
```

::: warning 注意颜色对比度

采用 `color` 指定的颜色时，各变体的衍生色都由它按比例混合得出。若用作背景的是浅色或低饱和颜色，文本与背景的对比度容易不足（WCAG 要求 12px 小文本的对比度至少 4.5:1）。请肉眼确认可读性，必要时改用更深的色值或 `solid` 变体。

:::

## 状态语义（type）

若需标识系统标准的客观状态，可使用 `type` 属性，直接消费全局功能语义色 Token（`--dockv-color-success` / `--dockv-color-warning` / `--dockv-color-danger`），与 Button、Notification 等全库组件保持严格同源的状态色表现。

<div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
  <dv-tag type="success">成功</dv-tag>
  <dv-tag type="warning">警告</dv-tag>
  <dv-tag type="danger">危险</dv-tag>
</div>

```html
<dv-tag type="success">成功</dv-tag>
<dv-tag type="warning">警告</dv-tag>
<dv-tag type="danger">危险</dv-tag>
```

| 值 | 说明 | 示例 |
| --- | --- | --- |
| `success` | 成功 / 完成 | <dv-tag type="success">成功</dv-tag> |
| `warning` | 警告 / 注意 | <dv-tag type="warning">警告</dv-tag> |
| `danger` | 危险 / 警告 | <dv-tag type="danger">危险</dv-tag> |

::: tip 常规业务分类优先用 `color`

`type` 专职表达全局系统状态（success / warning / danger）且与全库状态色严格对齐；常规业务分类请使用 `color`（预设色或自定义），两者职责清晰分工。

:::

::: info type 与 color 的关系（type 是语法糖）

`type` 本质是「语义便捷色」：只传 `type` 时直接消费系统状态色，等价于填好对应颜色。若同时显式指定 `color` 属性，则 **`color` 优先**，`type` 退居默认态。

```html
<!-- type 生效 -->
<dv-tag type="success">成功</dv-tag>
<!-- color 优先，type 忽略 -->
<dv-tag type="danger" color="blue">蓝色优先</dv-tag>
```

:::

## 变体（variant）

使用 `variant` 属性定义标签的视觉表现层，共 6 档预设，与 `<dv-button>` 变体命名对齐，默认 `light`。

<div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
  <dv-tag variant="light">浅色</dv-tag>
  <dv-tag variant="ghost">无背景</dv-tag>
  <dv-tag variant="soft">浅色+边框</dv-tag>
  <dv-tag variant="outline">描边</dv-tag>
  <dv-tag variant="solid">实心</dv-tag>
  <dv-tag variant="neutral">灰底彩字</dv-tag>
</div>

```html
<dv-tag variant="light">浅色</dv-tag>
<dv-tag variant="ghost">无背景</dv-tag>
<dv-tag variant="soft">浅色+边框</dv-tag>
<dv-tag variant="outline">描边</dv-tag>
<dv-tag variant="solid">实心</dv-tag>
<dv-tag variant="neutral">灰底彩字</dv-tag>
```

| 值 | 说明 | 示例 |
| --- | --- | --- |
| `light` | 浅色背景（默认） | <dv-tag variant="light">浅色</dv-tag> |
| `ghost` | 透明背景（无边框文字感） | <dv-tag variant="ghost">无背景</dv-tag> |
| `soft` | 浅色背景 + 描边 | <dv-tag variant="soft">浅色+边框</dv-tag> |
| `outline` | 透明背景 + 描边 | <dv-tag variant="outline">描边</dv-tag> |
| `solid` | 深色实心填充 + 白字 | <dv-tag variant="solid">实心</dv-tag> |
| `neutral` | 灰底 + 语义色/彩色文字 | <dv-tag variant="neutral">灰底彩字</dv-tag> |

::: tip variant 变体的使用建议

- **`ghost`（无背景）**：在普通卡片、正文这类边界感较弱的场景里，`ghost` 很难被一眼认出是标签，可读性会变差。
- **`solid`（实心色块）**：视觉权重极高、非常抢眼，属于强视觉焦点。建议只用于需要强制吸睛的关键状态，或极少数核心标签；不建议在同一页面大面积使用，否则会打乱正文的视觉层级。此外，较浅的色盘（如 `yellow`、`amber`）搭配 solid 白字时对比度较弱，需特别注意可读性。
- **`neutral`（灰底彩字）**：这是按钮常见的弱化态形态，用于静态只读标签会削弱色彩的分类表达，更适合交互态（checkable）。
- **读不清怎么办**：如果一眼扫过去很难把标签从背景中区分出来，优先尝试增大字号（选 `lg` / `xl`）、改用 `solid`，或换一个更深的 `color`。
  
:::

## 变体 × 颜色组合矩阵

下表一次性列出 **6 档 variant × 17 种 color** 的全部 102 种组合。

> 点击表格中的任意标签即可快速复制对应的标签代码：

<TagMatrix />

## 尺寸（size）

共四档预设，只调整**高度、水平内边距、字号与图标间距**，宽度随内容自适应。

<div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
  <dv-tag size="sm">小</dv-tag>
  <dv-tag size="md">中</dv-tag>
  <dv-tag size="lg">大</dv-tag>
  <dv-tag size="xl">超大</dv-tag>
</div>

```html
<dv-tag size="sm">小</dv-tag>
<dv-tag size="md">中</dv-tag>
<dv-tag size="lg">大</dv-tag>
<dv-tag size="xl">超大</dv-tag>
```

| 值 | min-height | 水平内边距 | 字号 | gap |
| :---: | :---: | :---: | :---: | :---: |
| `sm` | 16px | 4px | 12px (0.75rem) | 2px |
| `md` | 20px | 6px | 12px (0.75rem) | 3px |
| `lg` | 24px | 8px | 12px (0.75rem) | 4px |
| `xl` | 28px | 10px | 14px (0.875rem) | 4px |

::: tip 小尺寸文本的裁剪保护

`sm` 尺寸仅 16px 高，因此文本容器内置了上下裁剪保护区（`padding-block` 搭配负 `margin-block`）。在 `overflow: hidden` 与 `line-height: 1` 的约束下，`y`、`g`、`p`、`q`、`j` 等下伸笔画，`b`、`d`、`h`、`k` 等上伸笔画，以及声调符号，都能完整呈现，既不会被底边截断，也不会被内边距遮挡。

若需要更充裕的上下留白，推荐使用默认的 `md`（20px）尺寸。

:::

::: tip 长文本会自动单行省略

标签内文本始终保持单行，不会换行撑高；宽度受容器或 `max-width` 限制时，超出部分以 `…` 省略。完整的多行或折行展示建议改用其他组件。

:::

## 形状（capsule / round / sharp）

标签默认采用标准微圆角（3px）；`capsule` 为胶囊形，`round` 为标准圆角，`sharp` 为直角：

| 属性 | 圆角取值 | 效果与使用场景 |
| --- | --- | --- |
| *默认* / `round` | `var(--dockv-border-radius-sm)`（3px） | 默认圆角矩形，适合绝大多数常规业务界面 |
| `capsule` | `var(--dockv-border-radius-full)`（9999px） | 胶囊形状（两端全圆），适合分类标记、状态徽标、筛选胶囊 |
| `sharp` | `var(--dockv-border-radius-sq)`（0） | 锐利直角矩形，适合紧凑数据表格、代码风格界面 |

<div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
  <dv-tag size="xl" variant="solid">默认标签</dv-tag>
  <dv-tag size="xl" variant="solid" capsule>胶囊标签</dv-tag>
  <dv-tag size="xl" variant="solid" round>圆角标签</dv-tag>
  <dv-tag size="xl" variant="solid" sharp>直角标签</dv-tag>
</div>

```html
<dv-tag>默认标签</dv-tag>
<dv-tag capsule>胶囊标签</dv-tag>
<dv-tag round>圆角标签</dv-tag>
<dv-tag sharp>直角标签</dv-tag>
```

::: tip 自定义圆角

如需特定数值的圆角，直接通过 CSS 变量覆盖：

<div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
  <dv-tag style="--dockv-tag-border-radius: 6px;">自定义 6px 圆角</dv-tag>
  <dv-tag size="xl" style="--dockv-tag-border-radius: 12px;" color="blue">自定义 12px 圆角</dv-tag>
</div>

```html
<dv-tag style="--dockv-tag-border-radius: 6px;">自定义 6px 圆角</dv-tag>
<dv-tag size="xl" style="--dockv-tag-border-radius: 12px;" color="blue">
  自定义 12px 圆角
</dv-tag>
```

:::

### 尺寸 × 形状组合矩阵

下表展示 **4 档尺寸 × 4 种形状（默认 / round / capsule / sharp）** 的全部 16 种组合。

> 点击表格中的任意标签即可快速复制对应的标签代码：

<TagSizeShapeMatrix />

## 图标与图片

### 矢量图标（prefix-icon / suffix-icon）

使用 `prefix-icon` 与 `suffix-icon` 属性为标签添加前后缀矢量图标。参数接收 Iconify 格式图标名称（`prefix:name`），图标高度默认自适应为字号大小（`1em`），与文本垂直居中对齐。

<div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
  <dv-tag prefix-icon="material-symbols:home" color="blue">首页</dv-tag>
  <dv-tag suffix-icon="material-symbols:chevron-right" color="green">更多</dv-tag>
  <dv-tag prefix-icon="material-symbols:star" suffix-icon="material-symbols:check" color="amber">星级</dv-tag>
</div>

```html
<dv-tag prefix-icon="material-symbols:home" color="blue">首页</dv-tag>
<dv-tag suffix-icon="material-symbols:chevron-right" color="green">更多</dv-tag>
<dv-tag prefix-icon="material-symbols:star" suffix-icon="material-symbols:check" color="amber">
  星级
</dv-tag>
```

### 图片（prefix-image / suffix-image）

使用 `prefix-image` 与 `suffix-image` 属性为标签添加前后缀图片。参数接收图片 URL，图片高度自动匹配标签内部净高（`fit` 填充模式），宽度按图片原始宽高比等比缩放，长方形与正方形图片都不会拉伸变形。

<div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
  <dv-tag prefix-image="https://ui.dockv.cc/logo.png" size="sm">小尺寸头像</dv-tag>
  <dv-tag prefix-image="https://ui.dockv.cc/logo.png" color="blue">默认尺寸头像</dv-tag>
  <dv-tag suffix-image="https://ui.dockv.cc/logo.png" size="lg" color="green">大尺寸后缀图</dv-tag>
</div>

```html
<dv-tag prefix-image="https://ui.dockv.cc/logo.png" size="sm">
  小尺寸头像
</dv-tag>
<dv-tag prefix-image="https://ui.dockv.cc/logo.png" color="blue">
  默认尺寸头像
</dv-tag>
<dv-tag suffix-image="https://ui.dockv.cc/logo.png" size="lg" color="green">
  大尺寸后缀图
</dv-tag>
```

::: info 图标与图片的优先级

同一位置同时配置图片与图标时，组件优先渲染图片（`src > icon`），图标会被覆盖。未配置图片或图片 URL 为空字符串时自动回退渲染图标；两者皆无时，对应位置的 DOM 节点不会渲染。

:::

## 交互

### 可关闭（closable）

设置 `closable` 会在标签尾部显示 `×` 关闭按钮，点击时派发 `dv-close`，默认会自动隐藏标签。点击关闭按钮**不会**触发 `dv-click`，也不会误触外层父容器点击。

<div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
  <dv-tag closable>可关闭</dv-tag>
  <dv-tag closable color="blue">可关闭-蓝</dv-tag>
  <dv-tag closable type="danger" variant="outline">删除确认</dv-tag>
</div>

```html
<dv-tag closable>可关闭</dv-tag>
<dv-tag closable color="blue">可关闭-蓝</dv-tag>
<dv-tag closable type="danger" variant="outline">删除确认</dv-tag>
```

::: warning 阻止自动隐藏

默认点击 `×` 后标签会自动隐藏（置 `invisible = true`）。如需自行决定是否隐藏，可在 `dv-close` 回调中调用 `e.preventDefault()` 阻止自动隐藏，例如删除前弹窗二次确认，用户取消时阻止移除：

```html
<dv-tag closable @dv-close="(e) => { if (!confirm('确定移除该标签？')) e.preventDefault(); }">可关闭</dv-tag>
```

:::

### 可选中（checkable）

设置 `checkable` 后，标签像开关或复选框一样，点击可在选中与未选中之间切换（键盘 `Space` / `Enter` 同样可切换）。只传入 `checked` 时，则作为只读的 [选中状态](#选中-checked) 展示。

<div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
  <dv-tag checkable variant="ghost" color="blue">ghost ⇄ light (未选)</dv-tag>
  <dv-tag checkable checked variant="ghost" color="blue">ghost ⇄ light (已选)</dv-tag>
  <dv-tag checkable variant="outline" color="green">outline ⇄ soft (未选)</dv-tag>
  <dv-tag checkable checked variant="outline" color="green">outline ⇄ soft (已选)</dv-tag>
  <dv-tag checkable variant="neutral" type="danger">neutral ⇄ solid (未选)</dv-tag>
  <dv-tag checkable checked variant="neutral" type="danger">neutral ⇄ solid (已选)</dv-tag>
  <dv-tag checked variant="neutral" type="danger">选中 (只读，不可交互)</dv-tag>
</div>

```html
<!-- ghost ⇄ light 成对翻转 -->
<dv-tag checkable variant="ghost" color="blue">未选 ghost</dv-tag>
<dv-tag checkable checked variant="ghost" color="blue">已选 light</dv-tag>

<!-- outline ⇄ soft 成对翻转 -->
<dv-tag checkable variant="outline" color="green">未选 outline</dv-tag>
<dv-tag checkable checked variant="outline" color="green">已选 soft</dv-tag>

<!-- neutral ⇄ solid 成对翻转 -->
<dv-tag checkable variant="neutral" type="danger">未选 neutral</dv-tag>
<dv-tag checkable checked variant="neutral" type="danger">已选 solid</dv-tag>

<!-- 选中（不可交互） -->
<dv-tag checked variant="neutral" type="danger">选中 (只读，不可交互)</dv-tag>
```

选中状态切换时，样式会在三组配对变体之间翻转：`ghost` ⇄ `light`、`outline` ⇄ `soft`、`neutral` ⇄ `solid`。

::: warning 声明 `variant` 时请填「未选中」的样式

上面的翻转规则意味着：**你在属性里写的 `variant`，是标签「未选中」时的样子**。选中后会跳到这一对的另一档。


 `solid` / `soft` / `light`，**在视觉语义上的「选中」样子**，一旦点选反而跳到 `neutral` / `outline` / `ghost` 这类更弱的形态，与本组件的视觉语义相悖。

因此做筛选、多选这类 `checkable` 场景时，`variant` 请优先使用 `neutral`、`outline` 或 `ghost`，让「未选中低调、选中凸显」的层级关系成立。

:::

切换只改变颜色，不改变尺寸：所有变体都固定带有 1px 边框（`ghost` 等无边框变体用透明边框占位），因此连续点击切换时标签不会左右晃动。

无障碍方面，`checkable` 标签会被读屏软件识别为复选框，支持键盘聚焦与选中；禁用时同样会告知「已禁用」。

::: warning `checkable` 模式下没有 `dv-click`

启用 `checkable` 后，点击标签**只派发 `dv-change`**（切换选中状态），不再派发 `dv-click`。如果业务需要感知「被点击了」，监听 `dv-change` 即可——它在每次点击或键盘操作时都会触发，`detail.checked` 为切换后的新值。

:::

::: warning `closable` 与 `checkable` 互斥，不能同时使用

为严格遵循 WAI-ARIA 规范（严禁在 `role="checkbox"` 内部嵌套可交互的 `<button>`），两者采用互斥设计：

- 声明 `checkable`：宿主挂载 `role="checkbox"`，键盘 `Space` / `Enter` 切换选中；
- 声明 `closable`：尾部渲染原生 `<button>` 关闭按钮，可用键盘 Tab 聚焦；

**降级处理**：若两者同时声明为 `true`，优先按 `checkable` 处理，**不渲染关闭按钮**，并在开发环境输出警告。

:::

### 文本划选（selectable）

标签默认禁止划选（标签是一眼扫过的标记物）。需要复制文本时开启 `selectable`：

<div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
  <dv-tag>不可划选</dv-tag>
  <dv-tag selectable>可划选文本</dv-tag>
</div>

```html
<dv-tag>不可划选</dv-tag>
<dv-tag selectable>可划选文本</dv-tag>
```

## 状态

### 选中（checked）

`checked` 表示标签处于选中态，与 `checkable` 配合使用：

- **交互态**：同时声明 `checkable` 时，点击或按 `Space` / `Enter` 会在选中与未选中之间切换，`checked` 由组件内部自动同步，无需手动维护。
- **只读态**：只声明 `checked` 而不声明 `checkable` 时，标签仅呈现「已选中」的外观，不可点击、不派发事件，适合仅展示状态、无需用户操作的场景。

<div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
  <dv-tag checkable color="blue">可切换 (未选)</dv-tag>
  <dv-tag checkable checked color="blue">可切换 (已选)</dv-tag>
  <dv-tag checked color="green" variant="neutral">只读选中</dv-tag>
</div>

```html
<!-- 可切换：checkable + checked -->
<dv-tag checkable color="blue">可切换 (未选)</dv-tag>
<dv-tag checkable checked color="blue">可切换 (已选)</dv-tag>

<!-- 只读选中：仅声明 checked -->
<dv-tag checked color="green" variant="neutral">只读选中</dv-tag>
```

::: warning 单独声明 `checked` 不等于可交互

`checked` 只描述「当前是否选中」这一状态，不提供任何交互能力。想让用户点击切换必须同时声明 `checkable`；只写 `checked` 的标签与普通标签一样不可点击。

:::

### 禁用（disabled）

只阻断交互：`dv-click`、`dv-change`、`dv-close` 均不派发，且**不改变可见性**。视觉上使用禁用色变量并配合 `cursor: not-allowed`。

<div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
  <dv-tag disabled>禁用标签</dv-tag>
  <dv-tag color="blue" disabled>禁用蓝</dv-tag>
  <dv-tag closable disabled>禁用关闭</dv-tag>
  <dv-tag checkable disabled>禁用选中</dv-tag>
</div>

```html
<dv-tag disabled>禁用标签</dv-tag>
<dv-tag color="blue" disabled>禁用蓝</dv-tag>
<dv-tag closable disabled>禁用关闭</dv-tag>
<dv-tag checkable disabled>禁用选中</dv-tag>
```

::: info 禁用后仍可被键盘找到

禁用时标签依然保留键盘焦点，只额外标记为「已禁用」，而不是让它从 Tab 顺序里消失。这样读屏用户仍能找到它，并知道它当前不可操作。

`disabled` 与 `invisible` 各管一件事：前者只锁交互，后者只锁显隐，互不影响。

:::

### 可见性（invisible）

标签**默认可见**，无需声明任何属性。需要隐藏时加上 `invisible` 即可，遵循 HTML 布尔属性「出现即生效」的惯例，无需写成 `visible="false"`。

`invisible` 会反射为 HTML 属性（`reflect: true`）。`dv-close` 未被拦截时，组件自动将其置为 `true`；隐藏采用 `display: none`，标签不占布局空间，但 DOM 节点保留，随时可恢复显示。

```html
<!-- 可见（默认） -->
<dv-tag>显示</dv-tag>

<!-- 隐藏 -->
<dv-tag invisible>隐藏</dv-tag>
```

```js
// 显式控制显隐，节点保留，可随时恢复
tag.invisible = true; // 隐藏
tag.invisible = false; // 恢复显示
```

::: warning 不要用原生 `hidden` 控制标签显隐

`hidden` 是浏览器内置的全局属性，一旦与 `invisible` 混用，容易出现「设了 `invisible = false` 却仍然不显示」的困惑，而且不会有任何报错。标签的显隐只认 `invisible`。

:::


## 事件

`<dv-tag>` 提供 3 个自定义事件，均支持冒泡（`bubbles: true`、`composed: true`），可在外层父容器统一监听：

| 事件名 | 什么时候触发 | 回调参数（detail） | 能否阻止（preventDefault） |
| --- | --- | --- | --- |
| `dv-click` | 点击标签主体（仅非 `checkable` 模式） | `{ originalEvent, text, checked }` | 否（纯通知，无默认动作可拦截） |
| `dv-close` | 点击关闭按钮（×） | `{ originalEvent, text }` | **是**（阻止后不自动隐藏） |
| `dv-change` | 切换选中状态（点击 / 键盘 `Space`、`Enter`） | `{ originalEvent, checked, text }`，其中 `checked` 为**切换后的新值** | **是**（阻止后不翻转选中） |

**核心规则：**

1. **点关闭不触发点击**：点击 `×` 只会触发 `dv-close`，不会连带触发 `dv-click`。
2. **`checkable` 模式下没有 `dv-click`**：点击只派发 `dv-change`，需要感知点击请监听它。
3. **可拦截默认行为**：在 `dv-close` 或 `dv-change` 回调中调用 `e.preventDefault()`，组件就不会自动隐藏或翻转状态，交由业务代码自行处理。
4. **禁用状态不触发**：标签设为 `disabled` 后，所有点击与事件都会被静默拦截。
5. **`detail.checked` 是切换后的新值**：例如当前未选中时点击，回调中拿到的是 `true`。

### 区分鼠标与键盘触发

`detail.originalEvent` 是原始 DOM 事件；`checkable` 模式下用鼠标点击时为 `PointerEvent` / `MouseEvent`，用键盘操作时为 `KeyboardEvent`。原生 JS 中可直接用 `instanceof` 判断：

```js
tag.addEventListener("dv-change", (e) => {
  const { originalEvent, checked } = e.detail;
  const fromKeyboard = originalEvent instanceof KeyboardEvent;
  console.log(checked ? "已选中" : "已取消", fromKeyboard ? "（键盘）" : "（鼠标）");
});
```

<script setup>
function handleChange(e) {
  alert(`切换选中: ${e.detail.checked}`);
}
</script>

<dv-tag checkable @dv-change="handleChange">点我切换选中</dv-tag>

```html
<dv-tag checkable @dv-change="handleChange">点我切换选中</dv-tag>
```

```js
function handleChange(e) {
  alert(`切换选中: ${e.detail.checked}`);
  // 其他业务逻辑...
}
```

## API

### 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| color | 标签颜色：17 种预设色盘或任意 CSS 颜色（HEX / RGB / HSL / `var(--x)`） | `TagColor` \| `string` | —（回退 `grey`） |
| variant | 视觉变体 | `solid` \| `light` \| `outline` \| `soft` \| `neutral` \| `ghost` | `light` |
| type | 系统状态语义色，消费全局功能色 Token | `success` \| `warning` \| `danger` | — |
| size | 尺寸 | `sm` \| `md` \| `lg` \| `xl` | `md` |
| capsule | 胶囊形状（两端全圆角 9999px） | `boolean` | `false` |
| round | 标准圆角形状（默认 3px） | `boolean` | `false` |
| sharp | 直角形状（无圆角 0px） | `boolean` | `false` |
| prefix-icon | 前缀图标（Iconify `prefix:name`） | `string` | — |
| suffix-icon | 后缀图标（Iconify `prefix:name`） | `string` | — |
| prefix-image | 前缀图片 URL（单张） | `string` | — |
| suffix-image | 后缀图片 URL（单张） | `string` | — |
| closable | 是否可关闭（与 `checkable` 互斥，同时声明时优先 `checkable`） | `boolean` | `false` |
| checkable | 是否可选中（与 `closable` 互斥，点击切换 `checked`） | `boolean` | `false` |
| checked | 选中态（`checkable` 时由 `dv-change` 内部同步） | `boolean` | `false` |
| selectable | 是否允许划选文本 | `boolean` | `false` |
| invisible | 隐藏标签（`display: none`，不占空间、不移除节点）；`dv-close` 未被拦截时自动置 `true` | `boolean` | `false` |
| disabled | 禁用交互，不改变可见性 | `boolean` | `false` |

### 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `dv-click` | 点击标签主体时触发（`checkable` 模式、`disabled` 时均不触发；点关闭按钮不触发） | `CustomEvent<{ originalEvent, text, checked }>` |
| `dv-close` | 点击关闭按钮时触发；`e.preventDefault()` 可阻止自动隐藏 | `CustomEvent<{ originalEvent, text }>` |
| `dv-change` | `checkable` 切换时触发；`checked` 为切换后的新值，`e.preventDefault()` 可阻止内部变更 | `CustomEvent<{ originalEvent, checked, text }>` |

### 插槽

| 插槽名 | 说明 |
| --- | --- |
| default | 默认插槽，传入标签显示的文本内容 |

::: info 推荐使用属性配置图标

默认插槽建议仅放置纯文本。前 / 后缀图标或图片请使用 `prefix-*` / `suffix-*` 属性配置，由组件内部自动完成流式对齐与尺寸约束。

:::

### CSS Parts

| Part 名称 | 说明 |
| --- | --- |
| `tag` | 标签内层根容器元素 |
| `text` | 文本包裹容器元素（负责单行省略与裁剪保护） |
| `prefix` | 前缀容器元素（包含前缀图标或前缀图片） |
| `suffix` | 后缀容器元素（包含后缀图标或后缀图片） |
| `image` | 图片容器元素（配置 `prefix-image` 或 `suffix-image` 时暴露，支持通过 `::part(image)` 实现贴边出血） |
| `close` | 关闭按钮原生 `<button>` 元素 |
