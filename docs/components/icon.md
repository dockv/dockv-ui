---
title: Icon 图标
---

# Icon 图标

基于 Iconify 的 Web Component 图标组件，同时支持自定义 SVG。

## 基础用法

<dv-icon icon="material-symbols:home"></dv-icon>

```html
<dv-icon icon="material-symbols:home"></dv-icon>
```

## 尺寸（size）

使用 `size` 属性控制图标大小。

<dv-icon icon="material-symbols:home" size="16px"></dv-icon>
<dv-icon icon="material-symbols:home" size="24px"></dv-icon>
<dv-icon icon="material-symbols:home" size="32px"></dv-icon>
<dv-icon icon="material-symbols:home" size="48px"></dv-icon>

```html
<dv-icon icon="material-symbols:home" size="16px"></dv-icon>
<dv-icon icon="material-symbols:home" size="24px"></dv-icon>
<dv-icon icon="material-symbols:home" size="32px"></dv-icon>
<dv-icon icon="material-symbols:home" size="48px"></dv-icon>
```

## 颜色（color）

使用 `color` 属性自定义图标颜色。仅对使用 `currentColor` 的单色图标生效。

<dv-icon icon="material-symbols:home" size="32px" color="var(--dockv-color-primary)"></dv-icon>
<dv-icon icon="material-symbols:home" size="32px" color="#39C5BB"></dv-icon>
<dv-icon icon="material-symbols:home" size="32px" color="var(--dockv-color-danger)"></dv-icon>
<dv-icon icon="material-symbols:home" size="32px" color="var(--dockv-color-warning)"></dv-icon>

```html
<dv-icon icon="material-symbols:home" size="32px" color="var(--dockv-color-primary)"></dv-icon>
<dv-icon icon="material-symbols:home" size="32px" color="#39C5BB"></dv-icon>
<dv-icon icon="material-symbols:home" size="32px" color="var(--dockv-color-danger)"></dv-icon>
<dv-icon icon="material-symbols:home" size="32px" color="var(--dockv-color-warning)"></dv-icon>
```

## 自定义 SVG

通过 slot 直接传入 `<svg>` 元素，可使用任意第三方图标库或手写 SVG。渲染优先级：slot > src > icon。

<dv-icon size="32px" color="var(--dockv-color-danger)">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
</dv-icon>

<dv-icon size="32px" color="var(--dockv-color-primary)">
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
</dv-icon>

```html
<dv-icon size="32px" color="var(--dockv-color-danger)">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
</dv-icon>
```

## 图片（src）

通过 `src` 属性加载任意图片文件，底层为原生 `<img>` 标签，支持 SVG / PNG / JPG / ICO / WebP 等所有格式。

<dv-icon src="https://raw.githubusercontent.com/gilbarbara/logos/refs/heads/main/logos/github-icon.svg" size="36px"></dv-icon>
<dv-icon src="https://dash.cloudflare.com/favicon.ico" size="36px"></dv-icon>

```html
<dv-icon src="https://raw.githubusercontent.com/gilbarbara/logos/refs/heads/main/logos/github-icon.svg" size="36px"></dv-icon>
<dv-icon src="https://dash.cloudflare.com/favicon.ico" size="36px"></dv-icon>
```

## 第三方图标库

Font Awesome 或 Iconfont 通过 slot 传入原生标签，`size` 和 `color` 天然继承：

```html
<link rel="stylesheet" href="fontawesome.min.css">
<dv-icon size="20px" color="#333">
  <i class="fas fa-home"></i>
</dv-icon>
```

## 动画图标

部分图标集支持动画，如 `svg-spinners`。

<dv-icon icon="svg-spinners:3-dots-bounce" size="32px" color="var(--dockv-color-primary)"></dv-icon>
<dv-icon icon="svg-spinners:180-ring" size="32px" color="var(--dockv-color-primary)"></dv-icon>

```html
<dv-icon icon="svg-spinners:3-dots-bounce" size="32px" color="var(--dockv-color-primary)"></dv-icon>
<dv-icon icon="svg-spinners:180-ring" size="32px" color="var(--dockv-color-primary)"></dv-icon>
```

## 更多图标集

<dv-icon icon="material-symbols:star" size="24px" color="var(--dockv-color-warning)"></dv-icon>
<dv-icon icon="mdi:heart" size="24px" color="var(--dockv-color-danger)"></dv-icon>
<dv-icon icon="ph:check-circle-fill" size="24px" color="var(--dockv-color-success)"></dv-icon>
<dv-icon icon="ri:settings-4-fill" size="24px"></dv-icon>

```html
<dv-icon icon="material-symbols:star" size="24px" color="var(--dockv-color-warning)"></dv-icon>
<dv-icon icon="mdi:heart" size="24px" color="var(--dockv-color-danger)"></dv-icon>
<dv-icon icon="ph:check-circle-fill" size="24px" color="var(--dockv-color-success)"></dv-icon>
<dv-icon icon="ri:settings-4-fill" size="24px"></dv-icon>
```

## API

### 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| icon | Iconify 格式的图标名称，如 `material-symbols:home` | `string` | — |
| src | 任意图片文件 URL，支持 SVG / PNG / JPG / ICO 等 | `string` | — |
| size | 图标尺寸 | `string` | — |
| color | 图标颜色（仅单色图标生效） | `string` | — |

### 插槽

| 插槽名 | 说明 |
|---|---|
| default | 传入自定义 `<svg>` 元素，有内容时 `icon` 和 `src` 失效 |
