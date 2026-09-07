# Divider 分割线

区分间隔内容的细线，用于把上下或左右的内容区块分开。

## 基础用法

默认是一根横向（`horizontal`）分割线，把上、下两块内容隔开：

<dv-divider></dv-divider>

::: details 示例

<p>上面的内容：比如某段简介或说明文字。</p>
<dv-divider></dv-divider>
<p>下面的内容：比如某段补充或者另一项资料。</p>

```html
<p>上面的内容：比如某段简介或说明文字。</p>
<dv-divider></dv-divider>
<p>下面的内容：比如某段补充或者另一项资料。</p>
```

:::

## 带内容（slot）

在 `<dv-divider>` 中间放入文字或图标，线就会「夹」住这段内容，常用于场景切换：

<dv-divider>或</dv-divider>

```html
<dv-divider>或</dv-divider>
```

::: details 使用例

<div style="display: flex; flex-direction: column; align-items: center; justify-content: center">
  <dv-button>邮箱登录</dv-button>
  <dv-divider style="margin: 12px 0;">或</dv-divider>
  <dv-button>手机登录</dv-button>
</div>

```html
<dv-button>邮箱登录</dv-button>
<dv-divider style="margin: 12px 0;">或</dv-divider>
<dv-button>手机登录</dv-button>
```

:::

也可以夹图标：

<dv-divider><dv-icon icon="material-symbols:info-outline-rounded"></dv-icon></dv-divider>

```html
<dv-divider>
  <dv-icon icon="material-symbols:info-outline-rounded"></dv-icon>
</dv-divider>
```

::: details 使用例
<dv-divider>
<dv-icon icon="material-symbols:sailing-outline-rounded"></dv-icon>

  <p>已经划到世界尽头了哦</p>
  <dv-icon icon="material-symbols:sailing-outline-rounded"></dv-icon>
</dv-divider>

```html
<dv-divider>
  <dv-icon icon="material-symbols:sailing-outline-rounded"></dv-icon>
  <p>已经划到世界尽头了哦</p>
  <dv-icon icon="material-symbols:sailing-outline-rounded"></dv-icon>
</dv-divider>
```

:::

## 内容位置（contentPosition）

带内容时，可以通过 `contentPosition` 指定内容在这条线上的位置，默认居中：

<dv-divider contentPosition="left">靠左</dv-divider>
<dv-divider>居中</dv-divider>
<dv-divider contentPosition="center">居中</dv-divider>
<dv-divider contentPosition="right">靠右</dv-divider>

```html
<dv-divider contentPosition="left">靠左</dv-divider> <dv-divider>居中</dv-divider>
<!-- 默认居中 -->
<dv-divider contentPosition="center">居中</dv-divider>
<dv-divider contentPosition="right">靠右</dv-divider>
```

| 值       | 说明             |
| -------- | ---------------- |
| `left`   | 内容靠左         |
| `center` | 内容居中（默认） |
| `right`  | 内容靠右         |

> [!WARNING] 该属性仅在 横向 + 有内容 时生效
>
> `contentPosition` 只在**横向分割线且夹了内容**时才起作用。竖向分割线一般只用来做行内分隔，夹文字没有意义（文字得竖着排），所以竖向时该属性被忽略。

「靠左」或「靠右」时，内容所靠的那一端的线不会完全消失，而是保留一小段（默认占整宽 `15%`），这样分割线左右两端始终有线、有包裹感。

这段短线的占比由 CSS 变量 `--dockv-divider-min-line` 控制，可按需覆盖：

<div style="display: flex; flex-direction: column; gap: 8px; margin: 8px 0;">
  <dv-divider contentPosition="left">默认 15%</dv-divider>
  <dv-divider contentPosition="left" style="--dockv-divider-min-line: 30%">靠左（30%）</dv-divider>
</div>

```html
<dv-divider contentPosition="left">靠左</dv-divider>
<dv-divider contentPosition="left" style="--dockv-divider-min-line: 30%">靠左（30%）</dv-divider>
```

> [!TIP] 15% 一般够用
>
> 默认 `15%` 在大多数容器宽度下都合适，一般无需改动。只有当容器特别宽、而你觉得靠端那一段短线太「单薄」时，再调大这个值。

## 方向（direction）

使用 `direction="vertical"` 得到竖向分割线，常用于工具栏、按钮组之间：

<div style="display: flex; gap: 8px; align-items: center">
  <dv-button variant="ghost">首页</dv-button>
  <dv-divider direction="vertical"></dv-divider>
  <dv-button variant="ghost">文档</dv-button>
  <dv-divider direction="vertical"></dv-divider>
  <dv-button variant="ghost">关于</dv-button>
</div>

```html
<div style="display: flex; align-items: center">
  <dv-button>首页</dv-button>
  <dv-divider direction="vertical"></dv-divider>
  <dv-button>文档</dv-button>
  <dv-divider direction="vertical"></dv-divider>
  <dv-button>关于</dv-button>
</div>
```

## 线的样式（borderStyle）

用 `borderStyle` 切换线的样式，支持实线、虚线、点线三种：

<dv-divider>实线</dv-divider>
<dv-divider borderStyle="dashed">虚线</dv-divider>
<dv-divider borderStyle="dotted">点线</dv-divider>

```html
<dv-divider>实线</dv-divider>
<dv-divider borderStyle="dashed">虚线</dv-divider>
<dv-divider borderStyle="dotted">点线</dv-divider>
```

| 值       | 说明         |
| -------- | ------------ |
| `solid`  | 实线（默认） |
| `dashed` | 虚线         |
| `dotted` | 点线         |

#### 线宽

默认线宽是 `1px`，虚线和点线样式在分割线较细的情况下不明显，需要把线加粗。线宽由 CSS 变量 `--dockv-divider-width` 控制：

<dv-divider borderStyle="dashed">虚线 1px</dv-divider>
<dv-divider borderStyle="dashed" style="--dockv-divider-width: 3px">虚线 3px</dv-divider>
<dv-divider borderStyle="dotted" style="--dockv-divider-width: 4px">点线 4px</dv-divider>

```html
<dv-divider borderStyle="dashed">虚线 1px</dv-divider>
<dv-divider borderStyle="dashed" style="--dockv-divider-width: 3px">虚线 3px</dv-divider>
<dv-divider borderStyle="dotted" style="--dockv-divider-width: 4px">点线 4px</dv-divider>
```

## 颜色（color）

默认线的颜色用的是全局结构色 token（`--dockv-color-border`），跟随亮 / 暗主题自动切换，无需手动配置。

需要自定义时，用 `color` 属性指定任意 CSS 颜色，机制与按钮一致：

<dv-divider color="var(--dockv-color-vocaloid-miku)">初音未来</dv-divider>
<dv-divider color="var(--dockv-color-vocaloid-luka)">巡音流歌</dv-divider>
<dv-divider color="#66CCFF">自定义蓝</dv-divider>

```html
<dv-divider color="var(--dockv-color-vocaloid-miku)">初音未来</dv-divider>
<dv-divider color="var(--dockv-color-vocaloid-luka)">巡音流歌</dv-divider>
<dv-divider color="#66CCFF">自定义蓝</dv-divider>
```

## 间距控制

分割线的间距分两层看：**线与外层内容的间距**不自带任何属性，用原生 `margin` / `padding` 控制；而**内容与两段线之间**默认内置一小段留白。组件尽量精简，把控制权交给你。

<dv-divider></dv-divider>

### 上下间距（横向分割线）

直接在 `<dv-divider>` 上加 `margin` 即可，下面这根线上、下各留了 24px：

<p>上段内容</p>
  <dv-divider style="margin: 24px 0">上下内容和分割线间距24px</dv-divider>
<p>下段内容</p>

```html
<p>上段内容</p>
<dv-divider style="margin: 24px 0">上下内容和分割线间距24px</dv-divider>
<p>下段内容</p>
```

上下想不对称，就拆成 `margin-top` / `margin-bottom` 分着写。

<dv-divider></dv-divider>

### 左右间距（竖向分割线）

竖向分割线用 `margin-inline`（左右各 12px），或在外层 flex 里用 `gap`：

<div style="display: flex; align-items: center">
  <span>首页</span>
  <dv-divider direction="vertical" style="margin-inline: 12px"></dv-divider>
  <span>文档</span>
</div>

```html
<div style="display: flex; align-items: center">
  <span>首页</span>
  <dv-divider direction="vertical" style="margin-inline: 12px"></dv-divider>
  <span>文档</span>
</div>
```

<dv-divider></dv-divider>

### 内容与线之间的留白（横向分割线）

默认时，内容与两段线之间内置 `1em` 的留白。想让缝隙更宽松，给 slot 里的内容加 `padding` 或 `margin` 即可。

<dv-divider>默认缝隙</dv-divider>
<dv-divider><span style="padding: 0 24px">加宽缝隙</span></dv-divider>

```html
<dv-divider>默认缝隙</dv-divider>
<dv-divider><span style="padding: 0 24px">加宽缝隙</span></dv-divider>
```

> [!NOTE] 为什么不提供属性
>
> 间距用原生 `padding` / `margin` 就能自由控制，再为它单独加属性或 CSS 变量是多余的。分割线只管画线，间距交给你。

## API

### 属性

| 属性            | 说明                             | 类型                            | 默认值       |
| --------------- | -------------------------------- | ------------------------------- | ------------ |
| direction       | 分割线方向                       | `horizontal` \| `vertical`      | `horizontal` |
| contentPosition | 内容位置（仅横向且有内容时生效） | `left` \| `center` \| `right`   | `center`     |
| borderStyle     | 线的样式                         | `solid` \| `dashed` \| `dotted` | `solid`      |
| color           | 自定义线的颜色，覆盖默认结构色   | `string`                        | —            |

### 插槽

| 插槽名  | 说明                                                   |
| ------- | ------------------------------------------------------ |
| default | 夹在分割线中间的内容，可放文字、`<dv-icon>` 或任意元素 |
