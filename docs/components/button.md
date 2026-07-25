---
title: Button 按钮
---

# Button 按钮

常用的操作按钮。

## 基础用法

<dv-button>按钮</dv-button>

```html
<dv-button>按钮</dv-button>
```

## 类型（type）

使用 `type` 属性来定义按钮类型。

| 值 | 说明 |
|---|---|
| `primary` | 主要按钮（默认） |
| `secondary` | 次要按钮 |
| `tertiary` | 第三按钮 |
| `success` | 成功按钮 |
| `warning` | 警告按钮 |
| `danger` | 危险按钮 |

<dv-button type="primary">主要按钮</dv-button> 
<dv-button type="secondary">次要按钮</dv-button> 
<dv-button type="tertiary">第三按钮</dv-button> 
<dv-button type="success">成功按钮</dv-button> 
<dv-button type="warning">警告按钮</dv-button> 
<dv-button type="danger">危险按钮</dv-button> 

```html
<dv-button type="primary">主要按钮</dv-button>
<dv-button type="secondary">次要按钮</dv-button>
<dv-button type="tertiary">第三按钮</dv-button>
<dv-button type="success">成功按钮</dv-button>
<dv-button type="warning">警告按钮</dv-button>
<dv-button type="danger">危险按钮</dv-button>
```

## 变体（variant）

使用 `variant` 属性来定义按钮样式。

| 值 | 说明 |
|---|---|
| `solid` | 深色填充（默认） |
| `light` | 浅色填充 |
| `ghost` | 无背景 |
| `outline` | 透明背景 + 边框 |
| `soft` | 浅色背景 + 边框 |
| `neutral` | 单色填充 |

<dv-button variant="solid">深色填充</dv-button> 
<dv-button variant="light">浅色填充</dv-button> 
<dv-button variant="ghost">无背景</dv-button> 
<dv-button variant="outline">边框</dv-button> 
<dv-button variant="soft">浅色+边框</dv-button> 
<dv-button variant="neutral">单色填充</dv-button> 

```html
<dv-button variant="solid">深色填充</dv-button>
<dv-button variant="light">浅色填充</dv-button>
<dv-button variant="ghost">无背景</dv-button>
<dv-button variant="outline">边框</dv-button>
<dv-button variant="soft">浅色+边框</dv-button>
<dv-button variant="neutral">单色填充</dv-button>
```

## 尺寸（size）

使用 `size` 属性来定义按钮大小。

| 值 | 说明 |
|---|---|
| `extra-small` | 超小尺寸 |
| `small` | 小尺寸 |
| `medium` | 中尺寸（默认） |
| `large` | 大尺寸 |
| `extra-large` | 超大尺寸 |

<dv-button size="extra-small">超小尺寸</dv-button> 
<dv-button size="small">小尺寸</dv-button> 
<dv-button size="medium">中尺寸</dv-button> 
<dv-button size="large">大尺寸</dv-button> 
<dv-button size="extra-large">超大尺寸</dv-button> 

```html
<dv-button size="extra-small">超小尺寸</dv-button>
<dv-button size="small">小尺寸</dv-button>
<dv-button size="medium">中尺寸</dv-button>
<dv-button size="large">大尺寸</dv-button>
<dv-button size="extra-large">超大尺寸</dv-button>
```

## 颜色（color）

使用 `color` 属性自定义按钮颜色，会覆盖 `type` 的默认色值。支持 `HEX`、`RGB`、`HSL`。

<dv-button color="#39C5BB">初音未来绿</dv-button> 
<dv-button color="rgb(255, 165, 0)">镜音铃橙</dv-button> 
<dv-button color="hsl(354, 68%, 54%)">重音teto红</dv-button> 

```html
<dv-button color="#39C5BB">自定义色</dv-button>
<dv-button color="rgb(255, 165, 0)">自定义色</dv-button>
<dv-button color="hsl(354, 68%, 54%)">自定义色</dv-button>
```

## 图标（icon）

使用 `icon` 属性为按钮添加图标，通过 `iconPosition` 控制图标位置。图标基于 Iconify，格式为 `prefix:name`。

### 图标在左（默认）

<dv-button icon="material-symbols:home">首页</dv-button> 
<dv-button icon="material-symbols:search">搜索</dv-button> 
<dv-button icon="material-symbols:delete" type="danger">删除</dv-button> 

```html
<dv-button icon="material-symbols:home">首页</dv-button>
<dv-button icon="material-symbols:search">搜索</dv-button>
<dv-button icon="material-symbols:delete" type="danger">删除</dv-button>
```

### 图标在右

<dv-button icon="material-symbols:arrow-forward" iconPosition="right">下一步</dv-button> 
<dv-button icon="material-symbols:open-in-new" iconPosition="right" variant="outline">打开</dv-button> 

```html
<dv-button icon="material-symbols:arrow-forward" iconPosition="right">下一步</dv-button>
<dv-button icon="material-symbols:open-in-new" iconPosition="right" variant="outline">打开</dv-button>
```

### 纯图标按钮

不传内容时即为纯图标按钮。

<dv-button icon="material-symbols:settings"></dv-button> 
<dv-button icon="material-symbols:add" variant="outline"></dv-button> 
<dv-button icon="material-symbols:close" type="danger" variant="ghost"></dv-button> 

```html
<dv-button icon="material-symbols:settings"></dv-button>
<dv-button icon="material-symbols:add" variant="outline"></dv-button>
<dv-button icon="material-symbols:close" type="danger" variant="ghost"></dv-button>
```

### 图标侧边距自定义

当有图标时，可通过 CSS 变量覆盖图标侧的 padding，让图标贴边。

<div style="display: flex; gap: 8px; align-items: center;">
  <dv-button icon="material-symbols:arrow-back" style="--dockv-button-padding-x: 8px 0px 8px 0px">返回</dv-button>
  <dv-button icon="material-symbols:arrow-forward" iconPosition="right" style="--dockv-button-padding-x: 8px 4px 8px 12px">下一步</dv-button>
</div>

```html
<dv-button icon="material-symbols:arrow-back" style="--dockv-button-padding-left: 4px">返回</dv-button>
<dv-button icon="material-symbols:arrow-forward" iconPosition="right" style="--dockv-button-padding-right: 4px">下一步</dv-button>

```html
<dv-button icon="material-symbols:arrow-back" style="--dockv-button-padding-left: 4px">返回</dv-button>
<dv-button icon="material-symbols:arrow-forward" iconPosition="right" style="--dockv-button-padding-right: 4px">下一步</dv-button>
```

## 圆角（borderRadius）

使用 `borderRadius` 属性自定义圆角。

<dv-button borderRadius="0">直角</dv-button> 
<dv-button borderRadius="0.75rem">小圆角</dv-button> 
<dv-button borderRadius="9999px">胶囊</dv-button> 

```html
<dv-button borderRadius="0">直角</dv-button>
<dv-button borderRadius="0.75rem">小圆角</dv-button> 
<dv-button borderRadius="9999px">胶囊</dv-button>
```

## 禁用状态（disabled）

使用 `disabled` 属性禁用按钮。

<dv-button disabled>禁用按钮</dv-button> 
<dv-button type="danger" variant="solid" disabled>禁用危险按钮</dv-button> 

```html
<dv-button disabled>禁用按钮</dv-button>
<dv-button type="danger" variant="solid" disabled>禁用危险按钮</dv-button>
```

## 加载状态（loading）

使用 `loading` 属性让按钮进入加载中状态，显示一个旋转动画，同时按钮不可点击。

<dv-button loading>加载中</dv-button> 
<dv-button loading variant="outline">提交中</dv-button> 
<dv-button loading type="danger" icon="material-symbols:delete">删除中</dv-button> 

```html
<dv-button loading>加载中</dv-button>
<dv-button loading variant="outline">提交中</dv-button>
<dv-button loading type="danger" icon="material-symbols:delete">删除中</dv-button>
```

> [!warning]
> 禁用状态（disabled）优先级高于加载状态（loading）。当两者同时为 `true` 时，按钮显示为禁用态。

## 应用案例

### 弹出一个警告框

<br>

<dv-button type="warning" onclick="alert('呀~不要点我')">
  点我一下
</dv-button>

```html
<dv-button type="warning" onclick="alert('呀~不要点我')">
  点我一下
</dv-button>
```

### 带时长的确认按钮

## API

### 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| type | 按钮类型 | `primary` \| `secondary` \| `tertiary` \| `warning` \| `danger` | `primary` |
| variant | 按钮变体 | `light` \| `solid` \| `ghost` \| `outline` \| `soft` \| `neutral` | `light` |
| size | 按钮尺寸 | `extra-small` \| `small` \| `medium` \| `large` \| `extra-large` | `medium` |
| color | 自定义颜色 | `string` | — |
| icon | 图标名称，格式 `prefix:name` | `string` | — |
| iconPosition | 图标位置 | `left` \| `right` | `left` |
| borderRadius | 自定义圆角 | `string` | — |
| disabled | 是否禁用 | `boolean` | `false` |
| loading | 加载中状态 | `boolean` | `false` |

### 事件

| 事件名 | 说明 | 回调参数 |
|---|---|---|
| dv-click | 点击按钮时触发 | `CustomEvent` |

### 插槽

| 插槽名 | 说明 |
|---|---|
| default | 按钮内容 |

## Token 设计变量

### 尺寸

| 变量 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `--dockv-button-extra-small-height` | height | `24px` | 超小尺寸高度 |
| `--dockv-button-small-height` | height | `28px` | 小尺寸高度 |
| `--dockv-button-medium-height` | height | `32px` | 中尺寸高度 |
| `--dockv-button-large-height` | height | `36px` | 大尺寸高度 |
| `--dockv-button-extra-large-height` | height | `40px` | 超大尺寸高度 |

### 间距

| 变量 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `--dockv-button-padding-top` | length | `0` | 上内边距 |
| `--dockv-button-padding-bottom` | length | `0` | 下内边距 |
| `--dockv-button-padding-left` | length | 按尺寸变化 | 左内边距 |
| `--dockv-button-padding-right` | length | 按尺寸变化 | 右内边距 |
| `--dockv-button-gap` | length | `6px` | 图标与文字间距 |
| `--dockv-button-border-radius` | length | `var(--dockv-border-radius-small)` | 按钮圆角 |

### 主题

| 变量 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `--dockv-button---dockv-button-light-font-color` | color | `var(--dockv-color-primary)` | 浅色主题文字色 |
| `--dockv-button-light-bg-color` | color | `transparent` | 浅色主题背景色 |
| `--dockv-button-light-border-color` | color | `transparent` | 浅色主题边框色 |
| `--dockv-button---dockv-button-solid-font-color` | color | `#ffffff` | 深色主题文字色 |
| `--dockv-button-solid-bg-color` | color | `var(--dockv-color-primary)` | 深色主题背景色 |
| `--dockv-button-solid-border-color` | color | `transparent` | 深色主题边框色 |

### 颜色

| 变量 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `--dockv-color-primary` | color | `#646cff` | 主色 |
| `--dockv-color-warning` | color | `#f0ad4e` | 警告色 |
| `--dockv-color-danger` | color | `#dc2626` | 危险色 |
| `--dockv-color-secondary` | color | `#333` | 次要色（文字） |
| `--dockv-color-secondary-bg` | color | `#f5f5f5` | 次要色（背景） |
| `--dockv-color-secondary-border` | color | `#d9d9d9` | 次要色（边框） |

## 衍生组件

- Form 表单 | 提交
- BackTop 回到顶部 | 基础
- Hotkey 快捷键 | 提示
- Typography 版式 | 链接
