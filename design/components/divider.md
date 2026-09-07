## Divider 分割线组件

### 定位

`<dv-divider>` 是内容区块之间的分隔线，属于**原子级布局组件**：本身不承载内容，只在区块之间提供一道视觉分割，让读者一眼判断「上一块讲完了，下一块换话题」，与图标、按钮这类「承载内容 / 交互」的组件职责天然不同。

### 参考与范围

| 参考库                    | 借鉴点                                    |
| ------------------------- | ----------------------------------------- |
| Element Plus / Ant Design | 基础用法、内容位置 |
| Arco / Semi / Kungal      | 竖向分隔、工具栏场景                      |
| shadcn           | 语义化、最小 API 面（只保留必要属性）     |

### 属性

| 属性              | 类型                              | 默认值       | 说明                               |
| ----------------- | --------------------------------- | ------------ | ---------------------------------- |
| `direction`       | `'horizontal' \| 'vertical'`      | `horizontal` | 分隔方向                           |
| `contentPosition` | `'left' \| 'center' \| 'right'`   | `center`     | 内容位置，仅**横向且有内容**时生效 |
| `borderStyle`     | `'solid' \| 'dashed' \| 'dotted'` | `solid`      | 线型                               |
| `color`           | `string`                          | `''`         | 自定义线色，覆盖默认结构色 token   |

### 插槽

| 插槽名    | 说明                                  |
| --------- | ------------------------------------- |
| `default` | 夹在分割线中间的内容（文字 / 图标等） |

### 横向实现

宿主 `display: flex; align-items: center`，占满可用宽度，整体呈现「线-内容-线」：

```
--------  [内容]  --------
```

- 左右两段线由两个 `span` 承担，各以 `border-top` 作为视觉线，`flex: 1` 撑开剩余宽度。
- 有内容时内容层显示，中间夹入 slot；**无内容时内容层 `display: none`**（不占盒模型），两段 `flex: 1` 的线紧贴拼成一条完整线，不会在中间撑出缝隙。

#### 内容位置（contentPosition）

采用「左右两端始终有线、只改长短」的形态，通过调节左右两段线的伸缩比例实现，而非移动内容本身：

```
center   →  左 span flex:1     [内容]  右 span flex:1   （两侧对称）
left     →  左 span 缩为固定短宽 [内容]  右 span flex:1  （内容靠左，左线较短）
right    →  左 span flex:1     [内容]  右 span 缩为固定短宽（内容靠右，右线较短）
```

靠左 / 靠右时，临近端线段不是收成 0，而是缩为固定占比（由 `--dockv-divider-min-line` 控制，默认 `15%`），保证左右两端始终有线、文字始终被两段线夹着，只是靠近的那段较短（参照 Element / Ant 的做法）。

> [!WARNING]
>
> #### 两侧线不等比伸缩是核心机制
>
> `contentPosition` 依赖左右两段 `span` 的 `flex` 比例不同，实现时用靠边那一端 `flex: 0 0 <短宽>` 收窄、另一端保持 `flex: 1` 撑满，不要用「内容自身的 `margin-left/right` 或 `text-align`」，否则内容居中对齐和线长会脱节。

`contentPosition` **仅在横向且有内容时生效**；无内容时无所谓位置，竖向时夹文字无意义。

### 竖向实现

用于工具栏、按钮组之间的行内分隔：

```
display: inline-flex;
一根 border-left 构成的细竖线
```

- 宿主 `display: inline-flex`，一条 `border-left` 竖线即可，高度默认 `1em`（跟随宿主字号）。
- 放入高度受限容器（如 flex 的 `align-items: stretch`）时，可被拉伸到与相邻元素同高，适配按钮组场景。
- **竖向通常不夹文字**，`contentPosition` 在竖向时被忽略。

> [!WARNING]
>
> #### 竖向不要复用横向的 flex 伸缩
>
> 竖向若照搬横向那套「两段线 + flex 伸缩」会出现嵌套伸缩，拉高布局成本。竖向实现为：宿主自身用 `border-left` 构成一条独立竖线，内部「线-内容-线」结构整体 `display: none`，不再渲染中间节点。

### 线型（borderStyle）

线本体是 1px 的 border：横向为 `border-top`，竖向为 `border-left`。因此线型直接映射到 `border-style`：

```
solid   →  border-style: solid
dashed  →  border-style: dashed
dotted  →  border-style: dotted
```

颜色与线型统一走 CSS 变量（见「颜色」），便于外部覆盖。

### 颜色（color）

默认线色用全局结构色 token `--dockv-color-border`（亮 / 暗主题自动切换），机制沿用 Icon / Button 组的做法：

- `color` 为空时：线色 `var(--dockv-divider-color, var(--dockv-color-border))`，只读结构色 token。
- `color` 非空时：在 render 中注入内联 `<style>`，定义 `--dockv-divider-color: <color>`，覆盖默认值。

```scss
// divider.scss（线色统一走该变量）
border-color: var(--dockv-divider-color, var(--dockv-color-border));
```

> [!NOTE]
>
> #### 线色固定后不再随主题切换
>
> 一旦指定 `color`，`--dockv-divider-color` 就固定成该值，覆盖结构色 token 后，亮 / 暗切换不会再影响这条线。

### 间距策略

- **内容 ↔ 线**：左右缝隙内置为 `1em`，**不开放成属性、不设 CSS 变量开关**。实现上这层 1em 加在包裹 slot 的 `.dockv-divider-content`（`div`）的 `padding-inline` 上。
  > [!NOTE]
  >
  > #### 缝隙必须加在 wrapper div，而非 slot / ::slotted
  >
  > `<slot>` 是透传节点，自身盒模型不顶用（设 padding 不产生布局效果）；`::slotted(*)` 又只匹配「元素」，对裸文本（如 `<dv-divider>或</dv-divider>`）选择器落空。只有把 slot 包进一层真实 `div` 并在其上加 `padding-inline`，才能保证元素与纯文本都能稳定撑出缝隙。
  >
  > 内容容器设 `display: inline-flex; align-items: center`，使 slot 里多个元素（如图标 + 文字 + 图标）水平排成一行；若用块级容器，块级子元素（如 `<p>`）会各自换行。
- **线外围**（与上下 / 左右内容的间距）：**不提供属性**，交给外层布局用原生 `margin`、flex `gap` 或未来 Space 组件统一控制，避免多个间距源叠加。间距本就是 `padding` / `margin` 两个原生属性就能自由解决的事，无需再加开关。

### 线宽（CSS 变量）

线宽由 `--dockv-divider-width` 控制，默认 `1px`。线宽对实线影响不大，但虚线与点线的「断点」在 `1px` 下几乎不可见，需放大到 `3px` 以上才能看出断点：

```html
<dv-divider borderStyle="dashed" style="--dockv-divider-width: 3px">虚线 3px</dv-divider>
```

线宽通过 `border-top-width`（横向）/ `border-left-width`（竖向）接入，实线、虚线、点线均随线宽放缩断点。

### 事件

`<dv-divider>` 为纯展示组件，**不派发任何自定义事件**，也不拦截任何原生事件。
