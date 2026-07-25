## Icon 图标组件

### 定位

`<dv-icon>` 是整个 UI 库的图标入口，承担两个职责：
- **对外的统一样式管理**：`size` / `color` 属性通过 CSS 变量控制，所有图标来源统一外观
- **对内的组件引用**：`<dv-button>` 等组件内部直接引用 `<dv-icon>` 进行图标渲染

### 内置引擎

默认仅内置 **Iconify**，通过 `@iconify/iconify` 加载图标：

```html
<dv-icon icon="material-symbols:home"></dv-icon>
```

不内置其他图标库（Font Awesome、Iconfont 等），避免打包体积膨胀和 vendor lock-in。

### 渲染优先级

```
slot 有内容  →  渲染 slot
src 有值     →  渲染 <img>（原生标签，无 fetch / 无跨域问题 / 浏览器缓存）
icon 有值    →  loadIcons → renderHTML → inline SVG
```

三者互斥，优先级从高到低。

### 图片（src）

`src` 直接绑定原生 `<img>` 标签，支持所有图片格式（SVG / PNG / JPG / ICO / WebP），由浏览器处理缓存和跨域

```html
<dv-icon src="/logo.svg" size="48px"></dv-icon>
<dv-icon src="/favicon.ico" size="24px"></dv-icon>
```

### 自定义 SVG（slot）

slot 有内容时忽略 `icon` 和 `src`。`size` 映射为容器 `font-size`，slot 内 SVG 由 `::slotted(svg)` 设为 `1em` 自适应：

```html
<dv-icon size="24px" color="red">
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2..."/>
  </svg>
</dv-icon>
```

### 第三方图标库（非内置，可添加至文档内教学）

Font Awesome 或 Iconfont 通过 slot 传入原生标签：

```html
<link rel="stylesheet" href="fontawesome.min.css">
<dv-icon size="20px" color="#333">
  <i class="fas fa-home"></i>
</dv-icon>
```

icon font 的 `font-size` 和 `color` 天然继承容器的 CSS，无需组件层适配。

### 构建策略

策略一中 `@iconify/iconify` 随组件打包进 IIFE，策略二中图标组件不含 Iconify（外部引入或通过 slot 使用）。
