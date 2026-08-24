---
title: Button 按钮
---

# Button 按钮

常用的操作按钮，提供语义色、视觉变体、尺寸、图标、贴边、形状、状态与表单行为等完整能力。

## 基础用法

使用 `<dv-button>` 标签，默认是 primary 语义色 + solid 实心样式。

<div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
  <dv-button>按钮</dv-button>
  <dv-button type="primary" variant="solid">相同效果</dv-button>
</div>

```html
<dv-button>按钮</dv-button>
<dv-button type="primary" variant="solid">相同效果</dv-button>
```

## 类型（type）

使用 `type` 属性定义按钮的语义色，决定按钮"是什么含义"。

<div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
  <dv-button type="primary">主要</dv-button>
  <dv-button type="secondary">次要</dv-button>
  <dv-button type="tertiary">第三</dv-button>
  <dv-button type="success">成功</dv-button>
  <dv-button type="warning">警告</dv-button>
  <dv-button type="danger">危险</dv-button>
</div>

```html
<dv-button type="primary">主要</dv-button>
<dv-button type="secondary">次要</dv-button>
<dv-button type="tertiary">第三</dv-button>
<dv-button type="success">成功</dv-button>
<dv-button type="warning">警告</dv-button>
<dv-button type="danger">危险</dv-button>
```

| 值          | 说明             | 示例                                         |
| ----------- | ---------------- | -------------------------------------------- |
| `primary`   | 主要操作（默认） | <dv-button type="primary">主要</dv-button>   |
| `secondary` | 次要操作         | <dv-button type="secondary">次要</dv-button> |
| `tertiary`  | 第三层操作       | <dv-button type="tertiary">第三</dv-button>  |
| `success`   | 成功 / 完成      | <dv-button type="success">成功</dv-button>   |
| `warning`   | 警告 / 注意      | <dv-button type="warning">警告</dv-button>   |
| `danger`    | 危险 / 删除      | <dv-button type="danger">危险</dv-button>    |

## 变体（variant）

使用 `variant` 属性定义按钮的视觉表现层，决定按钮"长什么样"。

<div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
  <dv-button variant="solid">深色填充</dv-button>
  <dv-button variant="light">浅色填充</dv-button>
  <dv-button variant="ghost">无背景</dv-button>
  <dv-button variant="outline">边框</dv-button>
  <dv-button variant="soft">浅色+边框</dv-button>
  <dv-button variant="neutral">灰底彩字</dv-button>
</div>

```html
<dv-button variant="solid">深色填充</dv-button>
<dv-button variant="light">浅色填充</dv-button>
<dv-button variant="ghost">无背景</dv-button>
<dv-button variant="outline">边框</dv-button>
<dv-button variant="soft">浅色+边框</dv-button>
<dv-button variant="neutral">灰底彩字</dv-button>
```

| 值        | 说明                       | 示例                                              |
| --------- | -------------------------- | ------------------------------------------------- |
| `solid`   | 深色实心填充（默认）       | <dv-button variant="solid">深色填充</dv-button>   |
| `light`   | 浅色填充                   | <dv-button variant="light">浅色填充</dv-button>   |
| `ghost`   | 无背景，悬浮时才出现灰色底 | <dv-button variant="ghost">无背景</dv-button>     |
| `outline` | 透明背景 + 描边            | <dv-button variant="outline">边框</dv-button>     |
| `soft`    | 浅色背景 + 描边            | <dv-button variant="soft">浅色+边框</dv-button>   |
| `neutral` | 灰底 + 语义色文字          | <dv-button variant="neutral">灰底彩字</dv-button> |

## 组合矩阵（6 × 6）

`type` 与 `variant` 自由组合，可以覆盖绝大多数按钮场景。

6 种 `type` × 6 种 `variant`，共 36 种组合。

| type \ variant |                            solid                             |                            light                             |                            ghost                             |                            outline                             |                            soft                             |                            neutral                             |
| :------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------------------------------------------------------------: | :---------------------------------------------------------: | :------------------------------------------------------------: |
|  **primary**   |  <dv-button type="primary" variant="solid">主要</dv-button>  |  <dv-button type="primary" variant="light">主要</dv-button>  |  <dv-button type="primary" variant="ghost">主要</dv-button>  |  <dv-button type="primary" variant="outline">主要</dv-button>  |  <dv-button type="primary" variant="soft">主要</dv-button>  |  <dv-button type="primary" variant="neutral">主要</dv-button>  |
| **secondary**  | <dv-button type="secondary" variant="solid">次要</dv-button> | <dv-button type="secondary" variant="light">次要</dv-button> | <dv-button type="secondary" variant="ghost">次要</dv-button> | <dv-button type="secondary" variant="outline">次要</dv-button> | <dv-button type="secondary" variant="soft">次要</dv-button> | <dv-button type="secondary" variant="neutral">次要</dv-button> |
|  **tertiary**  | <dv-button type="tertiary" variant="solid">第三</dv-button>  | <dv-button type="tertiary" variant="light">第三</dv-button>  | <dv-button type="tertiary" variant="ghost">第三</dv-button>  | <dv-button type="tertiary" variant="outline">第三</dv-button>  | <dv-button type="tertiary" variant="soft">第三</dv-button>  | <dv-button type="tertiary" variant="neutral">第三</dv-button>  |
|  **success**   |  <dv-button type="success" variant="solid">成功</dv-button>  |  <dv-button type="success" variant="light">成功</dv-button>  |  <dv-button type="success" variant="ghost">成功</dv-button>  |  <dv-button type="success" variant="outline">成功</dv-button>  |  <dv-button type="success" variant="soft">成功</dv-button>  |  <dv-button type="success" variant="neutral">成功</dv-button>  |
|  **warning**   |  <dv-button type="warning" variant="solid">警告</dv-button>  |  <dv-button type="warning" variant="light">警告</dv-button>  |  <dv-button type="warning" variant="ghost">警告</dv-button>  |  <dv-button type="warning" variant="outline">警告</dv-button>  |  <dv-button type="warning" variant="soft">警告</dv-button>  |  <dv-button type="warning" variant="neutral">警告</dv-button>  |
|   **danger**   |  <dv-button type="danger" variant="solid">危险</dv-button>   |  <dv-button type="danger" variant="light">危险</dv-button>   |  <dv-button type="danger" variant="ghost">危险</dv-button>   |  <dv-button type="danger" variant="outline">危险</dv-button>   |  <dv-button type="danger" variant="soft">危险</dv-button>   |  <dv-button type="danger" variant="neutral">危险</dv-button>   |

## 尺寸（size）

使用 `size` 属性定义按钮大小，共五个预设。

<div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
  <dv-button size="xs">超小</dv-button>
  <dv-button size="sm">小</dv-button>
  <dv-button size="md">中</dv-button>
  <dv-button size="lg">大</dv-button>
  <dv-button size="xl">超大</dv-button>
</div>

```html
<dv-button size="xs">超小</dv-button>
<dv-button size="sm">小</dv-button>
<dv-button size="md">中</dv-button>
<dv-button size="lg">大</dv-button>
<dv-button size="xl">超大</dv-button>
```

|  值  | 高度 | 水平内边距 | 说明         | 示例                                  |
| :--: | :--: | :--------: | ------------ | ------------------------------------- |
| `xs` | 24px |    8px     | 超小         | <dv-button size="xs">超小</dv-button> |
| `sm` | 28px |    10px    | 小           | <dv-button size="sm">小</dv-button>   |
| `md` | 32px |    12px    | 中等（默认） | <dv-button size="md">中</dv-button>   |
| `lg` | 36px |    14px    | 大           | <dv-button size="lg">大</dv-button>   |
| `xl` | 40px |    16px    | 超大         | <dv-button size="xl">超大</dv-button> |

> [!tip] 关于尺寸与宽度
> 尺寸同时控制 **高度** 与 **水平内边距**；宽度随内容自适应，不受尺寸影响。
>
> 需要固定或自定义宽度时，用 `width` 属性（任意 CSS 长度），或类样式均可：
>
> <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
>   <dv-button size="md" width="120px">120px</dv-button>
>   <dv-button size="md" width="10rem">10rem</dv-button>
>   <dv-button size="md" width="50%">50%</dv-button>
>   <dv-button size="md" style="width:300px;">CSS</dv-button>
> </div>
>
> ```html
> <dv-button size="md" width="120px">120px</dv-button>
> <dv-button size="md" class="fixed-width">CSS</dv-button>
> ```
>
> ```css
> .fixed-width {
>   width: 300px;
> }
> ```

## 颜色（color）

支持 `HEX`、`RGB`、`HSL` 三种格式，以及预设颜色变量。

悬浮、按下、聚焦等交互态颜色由 `color-mix()` 自动生成，无需手动配置：

<div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
  <dv-button color="#39C5BB">初音未来绿</dv-button>
  <dv-button color="rgb(255, 165, 0)" variant="light">镜音铃橙</dv-button>
  <dv-button color="hsl(354, 68%, 54%)" variant="outline">重音teto红</dv-button>
  <dv-button color="#4CAF50" variant="soft">自定义绿</dv-button>
  <dv-button color="var(--dockv-color-vocaloid-luotianyi)" variant="soft">使用预设色盘 - 洛天依蓝</dv-button>
  <dv-button color="#0479b4" variant="neutral">DockV 蓝</dv-button>
</div>

```html
<dv-button color="#39C5BB">初音未来绿</dv-button>
<dv-button color="rgb(255, 165, 0)" variant="light">镜音铃橙</dv-button>
<dv-button color="hsl(354, 68%, 54%)" variant="outline">重音teto红</dv-button>
<dv-button color="#4CAF50" variant="soft">自定义绿</dv-button>
<dv-button color="var(--dockv-color-vocaloid-luotianyi)" variant="soft">
  使用预设色盘 - 洛天依蓝
</dv-button>
<dv-button color="#0479b4" variant="neutral">DockV 蓝</dv-button>
```

> [!info] 原理
> 这好比把"主题色"换成了你指定的颜色，hover / active / focus 的颜色是基于这个颜色按百分比混出来的，换色不用改任何样式代码。

## 图标（icon）

使用 `icon` 属性为按钮添加图标，格式为 Iconify `prefix:name`，通过 `iconPosition` 控制图标位置。

### 图标位置

- **靠左（默认）**

<div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
  <dv-button icon="material-symbols:home">首页</dv-button>
  <dv-button icon="material-symbols:search" iconPosition="left">搜索</dv-button>
  <dv-button icon="material-symbols:delete" type="danger">删除</dv-button>
</div>

```html
<dv-button icon="material-symbols:home">首页</dv-button>
<dv-button icon="material-symbols:search" iconPosition="left">搜索</dv-button>
<dv-button icon="material-symbols:delete" type="danger">删除</dv-button>
```

- **靠右**

<div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
  <dv-button icon="material-symbols:arrow-forward" iconPosition="right">下一步</dv-button>
  <dv-button icon="material-symbols:open-in-new" iconPosition="right" variant="outline">打开</dv-button>
</div>

```html
<dv-button icon="material-symbols:arrow-forward" iconPosition="right">
  下一步
</dv-button>
<dv-button icon="material-symbols:open-in-new" iconPosition="right">
  打开
</dv-button>
```

### 纯图标按钮

不传内容时即为纯图标按钮。

<div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
  <dv-button icon="material-symbols:settings"></dv-button>
  <dv-button icon="material-symbols:add" variant="outline"></dv-button>
  <dv-button icon="material-symbols:close" type="danger" variant="soft"></dv-button>
</div>

```html
<dv-button icon="material-symbols:settings"></dv-button>
<dv-button icon="material-symbols:add" variant="outline"></dv-button>
<dv-button icon="material-symbols:close" type="danger" variant="soft"></dv-button>
```

### 直接使用图标组件

也可以在 slot 中直接使用 `<dv-icon>` 组件，图标尺寸可自由控制：

<div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
  <dv-button>
    <dv-icon icon="material-symbols:home"></dv-icon>
    直接使用图标组件
  </dv-button>
  <dv-button iconPosition="right">
    直接使用图标组件
    <dv-icon icon="material-symbols:home"></dv-icon>
  </dv-button>
  <dv-button>
    <dv-icon icon="material-symbols:home"></dv-icon>
  </dv-button>
</div>

```html
<dv-button>
  <dv-icon icon="material-symbols:home"></dv-icon>
  直接使用图标组件
</dv-button>
<dv-button iconPosition="right">
  直接使用图标组件
  <dv-icon icon="material-symbols:home"></dv-icon>
</dv-button>
<dv-button>
  <dv-icon icon="material-symbols:home"></dv-icon>
</dv-button>
```

## 形状（square / circle）

使用 `square` 得到正方形按钮，使用 `circle` 得到正圆按钮（隐含 `square` + 全圆角）。

<div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
  <dv-button icon="material-symbols:settings" square></dv-button>
  <dv-button icon="material-symbols:close" circle></dv-button>
  <dv-button circle type="danger" icon="material-symbols:delete"></dv-button>
</div>

```html
<dv-button icon="material-symbols:settings" square></dv-button>
<dv-button icon="material-symbols:close" circle></dv-button>
<dv-button circle type="danger" icon="material-symbols:delete"></dv-button>
```

> [!info] 内容判定优先级（square / circle）
> 紧凑形状下渲染内容按优先级取其一：
>
> 1. slot 中的 `<dv-icon>`（最高，覆盖属性 `icon`）
> 2. `icon` 属性（此时 slot 文字被忽略）
> 3. 纯文字：只渲染第一个字符
>
> 有图标（无论属性还是 slot）时只渲染图标；纯文字时只显示首字符，避免文字在正方形 / 正圆内挤成一团。

纯文字在紧凑形状下只显示第一个字符：

<div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
  <dv-button circle>保存</dv-button>
  <dv-button square>删</dv-button>
  <dv-button circle type="warning">?</dv-button>
</div>

```html
<dv-button circle>保存</dv-button>
<dv-button square>删</dv-button>
<dv-button circle type="warning">?</dv-button>
```

## 圆角（borderRadius）

使用 `borderRadius` 属性自定义圆角，支持任意 CSS 长度。

<div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
  <dv-button borderRadius="0">直角</dv-button>
  <dv-button borderRadius="0.75rem">小圆角</dv-button>
  <dv-button borderRadius="9999px">胶囊</dv-button>
</div>

```html
<dv-button borderRadius="0">直角</dv-button>
<dv-button borderRadius="0.75rem">小圆角</dv-button>
<dv-button borderRadius="9999px">胶囊</dv-button>
```

圆角优先级：`borderRadius`（显式指定） > `circle`（9999px） > 默认值。

除直接写 CSS 长度外，也可引用全局圆角 token（定义于 `global/variable.scss`），统一风格、支持主题覆盖：

| 预设 token                   | 值       | 说明                                             |
| ---------------------------- | -------- | ------------------------------------------------ |
| `--dockv-border-radius-sm`   | `3px`    | 小圆角（按钮默认圆角）                           |
| `--dockv-border-radius-md`   | `6px`    | 中圆角                                           |
| `--dockv-border-radius-lg`   | `10px`   | 大圆角                                           |
| `--dockv-border-radius-xl`   | `12px`   | 特大圆角                                         |
| `--dockv-border-radius-sq`   | `0`      | 直角                                             |
| `--dockv-border-radius-cl`   | `50%`    | 圆 / 半圆（宽高不等时是椭圆，正圆请用 `circle`） |
| `--dockv-border-radius-full` | `9999px` | 全胶囊 / 正圆                                    |

<div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
  <dv-button borderRadius="var(--dockv-border-radius-sm)">小圆角</dv-button>
  <dv-button borderRadius="var(--dockv-border-radius-md)">中圆角</dv-button>
  <dv-button borderRadius="var(--dockv-border-radius-lg)">大圆角</dv-button>
  <dv-button borderRadius="var(--dockv-border-radius-xl)">特大圆角</dv-button>
  <dv-button borderRadius="var(--dockv-border-radius-sq)">直角</dv-button>
  <dv-button borderRadius="var(--dockv-border-radius-full)">胶囊</dv-button>
</div>

```html
<dv-button borderRadius="var(--dockv-border-radius-sm)">小圆角</dv-button>
<dv-button borderRadius="var(--dockv-border-radius-md)">中圆角</dv-button>
<dv-button borderRadius="var(--dockv-border-radius-lg)">大圆角</dv-button>
<dv-button borderRadius="var(--dockv-border-radius-xl)">特大圆角</dv-button>
<dv-button borderRadius="var(--dockv-border-radius-sq)">直角</dv-button>
<dv-button borderRadius="var(--dockv-border-radius-full)">胶囊</dv-button>
```

> [!warning] 关于 `--dockv-border-radius-cl`
> 它的值是 `50%`，`border-radius` 的百分比按元素宽、高各自计算——宽高不等时得到的是**椭圆**，不是正圆。
> 需要**正圆**按钮请使用 `circle` 属性（内部固定用 `9999px`，宽高相等即得正圆），而非该 token。

### 批量修改圆角

按钮默认圆角走的是 CSS 变量（`--dockv-button-border-radius`，默认引用 `--dockv-border-radius-sm`），CSS 变量可穿透 Shadow DOM 继承，因此批量修改**无需改动组件代码**，二选一即可：

**路 A：改全局底层 token（全站圆角体系一起变）**

```css
:root {
  --dockv-border-radius-sm: 4px; /* 按钮默认圆角 */
  --dockv-border-radius-md: 8px;
}
```

按钮默认圆角读取 `--dockv-border-radius-sm`，改它即让所有按钮默认圆角集体变化；代价是其他用到该 token 的组件（卡片、输入框等）也会同步。

**路 B：只改按钮（不影响其他组件）**

```css
dv-button {
  --dockv-button-border-radius: 8px !important;
}
```

> 为何要 `!important`：组件内部 `:host` 已把默认值定在宿主上，优先级是类级别（0,1,0），裸写 `dv-button`（元素级别 0,0,1）压不住，需 `!important` 或更高优先级的选择器。

**优先级（细 → 粗）**：单按钮 `borderRadius="…"` 属性 > `circle`（9999px）> CSS 变量覆盖（路 A / 路 B）> 默认 `--dockv-border-radius-sm`。

## 加载与禁用（loading / disabled）

### 加载状态

使用 `loading` 属性让按钮进入加载中状态，图标被替换为 spinner，且不可点击：

<div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
  <dv-button loading>加载中</dv-button>
  <dv-button loading variant="outline">提交中</dv-button>
  <dv-button loading type="danger" icon="material-symbols:delete">删除中</dv-button>
</div>

```html
<dv-button loading>加载中</dv-button>
<dv-button loading variant="outline">提交中</dv-button>
<dv-button loading type="danger" icon="material-symbols:delete">删除中</dv-button>
```

> [!warning] `loading` 只会替换 `icon` 属性的图标
> `loading` 仅对通过 `icon` 属性传入的图标生效——它会强制替换为 spinner。
>
> 通过 slot 传入的图标（`<dv-icon>` 或自定义元素）**不会被替换**。因为 slot 内容不可预知
> （可能两个图标、可能与文字混排），组件无法安全决定该隐藏哪一个，故交由使用侧自行处理。
>
> <dv-button loading>
>   <dv-icon icon="material-symbols:home"></dv-icon>
> </dv-button>
>
> 需要让 slot 里的图标在 loading 时消失，可用 CSS 精准隐藏，侵入性最小。`loading` 是反射属性，
> 加载时宿主元素会带上 `loading` 特性，选择器据此判定：
>
> ```css
> /* loading 时隐藏按钮 slot 里的图标，spinner / 文字保留 */
> dv-button[loading] .slot-icon {
>   display: none;
> }
> ```
>
> 若确实希望 loading 自动换成 spinner，优先走 `icon` 属性路径，而非 slot。

### 禁用状态

使用 `disabled` 属性禁用按钮，阻止所有交互：

<div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
  <dv-button disabled>禁用按钮</dv-button>
  <dv-button type="danger" variant="outline" disabled>禁用危险按钮</dv-button>
  <dv-button variant="light" disabled loading>禁用加载按钮</dv-button>
</div>

```html
<dv-button disabled>禁用按钮</dv-button>
<dv-button type="danger" variant="outline" disabled>禁用危险按钮</dv-button>
<dv-button variant="light" disabled loading>禁用加载按钮</dv-button>
```

> [!info] 禁用与加载的优先级
> 禁用状态（`disabled`）优先级高于加载状态（`loading`）。当两者同时为 `true` 时，按钮显示为禁用态。

## 表单行为（native-type）

`type` 属性只承载颜色语义，内层原生 `<button>` 的表单行为由独立的 `native-type` 属性控制（默认 `button`）。两者互不干扰。

| 属性          | 取值                                                        | 用途                   |
| ------------- | ----------------------------------------------------------- | ---------------------- |
| `type`        | primary / secondary / tertiary / success / warning / danger | 颜色语义               |
| `native-type` | submit / reset / button                                     | 内层原生按钮的表单行为 |

<div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
  <dv-button type="primary" native-type="submit">提交</dv-button>
  <dv-button type="success" native-type="reset">重置</dv-button>
</div>

```html
<dv-button type="primary" native-type="submit">提交</dv-button>
<dv-button type="success" native-type="reset">重置</dv-button>
```

> [!danger] 不要用 `type` 控制表单提交
> 原生 `<button>` 的 `type` 只认 `submit` / `reset` / `button` 三个值。其他任意值（如 `primary`）都会被浏览器按 HTML 规范静默当作 `submit` 处理，可能导致表单意外提交。因此颜色语义 `type` 与表单行为 `native-type` 完全分离。

## 事件

`<dv-button>` 默认派发自定义事件 `dv-click`，`disabled` 或 `loading` 时不触发。

<script setup>
function handleClick() {
  alert("dv-click 触发");
}
</script>

<dv-button @dv-click="handleClick">点我</dv-button>

```html
<dv-button @dv-click="handleClick">点我</dv-button>
```

```js
function handleClick() {
  alert("dv-click 触发");
  // 其他业务逻辑...
}
```

## API

### 属性

| 属性         | 说明                             | 类型                                                                         | 默认值    |
| ------------ | -------------------------------- | ---------------------------------------------------------------------------- | --------- |
| type         | 按钮类型（语义色）               | `primary` \| `secondary` \| `tertiary` \| `success` \| `warning` \| `danger` | `primary` |
| variant      | 按钮变体（视觉表现层）           | `solid` \| `light` \| `ghost` \| `outline` \| `soft` \| `neutral`            | `solid`   |
| size         | 按钮尺寸                         | `xs` \| `sm` \| `md` \| `lg` \| `xl`                                         | `md`      |
| color        | 自定义颜色，覆盖 `type` 默认色值 | `string`                                                                     | —         |
| icon         | 图标名称，格式 `prefix:name`     | `string`                                                                     | —         |
| iconPosition | 图标位置                         | `left` \| `right`                                                            | `left`    |
| square       | 正方形按钮（宽 = 高）            | `boolean`                                                                    | `false`   |
| circle       | 正圆按钮（隐含 square + 全圆角） | `boolean`                                                                    | `false`   |
| borderRadius | 自定义圆角                       | `string`                                                                     | —         |
| width        | 自定义按钮宽度                   | `string`                                                                     | —         |
| disabled     | 是否禁用                         | `boolean`                                                                    | `false`   |
| loading      | 加载中状态                       | `boolean`                                                                    | `false`   |
| native-type  | 原生按钮的表单行为               | `button` \| `submit` \| `reset`                                              | `button`  |

### 事件

| 事件名   | 说明                                          | 回调参数      |
| -------- | --------------------------------------------- | ------------- |
| dv-click | 点击按钮时触发（disabled / loading 时不触发） | `CustomEvent` |

### 插槽

| 插槽名  | 说明                                       |
| ------- | ------------------------------------------ |
| default | 按钮内容，可放文字、`<dv-icon>` 或任意元素 |
