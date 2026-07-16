---
title: Icon 图标
---

# Icon 图标

基于 Iconify 的 Web Component 图标组件。

## 基础用法

<d-icon icon="material-symbols:home"></d-icon>

```html
<d-icon icon="material-symbols:home"></d-icon>
```

## 尺寸（size）

使用 `size` 属性控制图标大小。

<d-icon icon="material-symbols:home" size="16px"></d-icon>
<d-icon icon="material-symbols:home" size="24px"></d-icon>
<d-icon icon="material-symbols:home" size="32px"></d-icon>
<d-icon icon="material-symbols:home" size="48px"></d-icon>

```html
<d-icon icon="material-symbols:home" size="16px"></d-icon>
<d-icon icon="material-symbols:home" size="24px"></d-icon>
<d-icon icon="material-symbols:home" size="32px"></d-icon>
<d-icon icon="material-symbols:home" size="48px"></d-icon>
```

## 颜色（color）

使用 `color` 属性自定义图标颜色。仅对使用 `currentColor` 的单色图标生效。

<d-icon icon="material-symbols:home" size="32px" color="var(--dockv-color-primary)"></d-icon>
<d-icon icon="material-symbols:home" size="32px" color="#39C5BB"></d-icon>
<d-icon icon="material-symbols:home" size="32px" color="var(--dockv-color-danger)"></d-icon>
<d-icon icon="material-symbols:home" size="32px" color="var(--dockv-color-warning)"></d-icon>

```html
<d-icon icon="material-symbols:home" size="32px" color="var(--dockv-color-primary)"></d-icon>
<d-icon icon="material-symbols:home" size="32px" color="#39C5BB"></d-icon>
<d-icon icon="material-symbols:home" size="32px" color="var(--dockv-color-danger)"></d-icon>
<d-icon icon="material-symbols:home" size="32px" color="var(--dockv-color-warning)"></d-icon>
```

## 动画图标

部分图标集支持动画，如 `svg-spinners`。

<d-icon icon="svg-spinners:3-dots-bounce" size="32px" color="var(--dockv-color-primary)"></d-icon>
<d-icon icon="svg-spinners:180-ring" size="32px" color="var(--dockv-color-primary)"></d-icon>

```html
<d-icon icon="svg-spinners:3-dots-bounce" size="32px" color="var(--dockv-color-primary)"></d-icon>
<d-icon icon="svg-spinners:180-ring" size="32px" color="var(--dockv-color-primary)"></d-icon>
```

## 更多图标集

<d-icon icon="material-symbols:star" size="24px" color="var(--dockv-color-warning)"></d-icon>
<d-icon icon="mdi:heart" size="24px" color="var(--dockv-color-danger)"></d-icon>
<d-icon icon="ph:check-circle-fill" size="24px" color="var(--dockv-color-success)"></d-icon>
<d-icon icon="ri:settings-4-fill" size="24px"></d-icon>

```html
<d-icon icon="material-symbols:star" size="24px" color="var(--dockv-color-warning)"></d-icon>
<d-icon icon="mdi:heart" size="24px" color="var(--dockv-color-danger)"></d-icon>
<d-icon icon="ph:check-circle-fill" size="24px" color="var(--dockv-color-success)"></d-icon>
<d-icon icon="ri:settings-4-fill" size="24px"></d-icon>
```

## API

### 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| icon | Iconify 格式的图标名称，如 `material-symbols:home` | `string` | — |
| size | 图标尺寸 | `string` | — |
| color | 图标颜色（仅单色图标生效） | `string` | — |

### 插槽

| 插槽名 | 说明 |
|---|---|
| default | 不支持，图标通过 `icon` 属性指定 |
