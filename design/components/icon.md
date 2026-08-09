## Icon 图标组件

### 定位

`<dv-icon>` 是整个 UI 库的图标入口，承担两个职责：

- **对外的统一样式管理**：`size` / `color` 属性通过 CSS 控制，所有图标来源统一外观。
- **对内的组件引用**：`<dv-button>` 等组件内部直接引用 `<dv-icon>` 进行图标渲染。

### 内置引擎

默认仅内置 **Iconify**，`@iconify/iconify` 随组件打包（否则其他组件依赖的图标会失效）：

```html
<dv-icon icon="material-symbols:home"></dv-icon>
```

不内置其他图标库（Font Awesome、Iconfont 等），避免打包体积膨胀和 vendor lock-in。

### 渲染优先级

```
slot 有内容  →  渲染 slot（用户传入的任意 DOM）
src 有值     →  渲染原生 <img>（浏览器处理缓存与跨域）
icon 有值    →  loadIcons → renderHTML → inline SVG
```

三者互斥，优先级从高到低。实现上借助 slot 的原生回退（fallback）机制完成，无需 JS 手动检测内容。

### 属性

- `icon`：Iconify 图标名称，格式为 `图标集:图标名`，如 `material-symbols:home`。
- `src`：任意图片文件 URL，底层为原生 `<img>`，支持 SVG / PNG / JPG / ICO / WebP 等格式。
- `size`：图标大小，支持预设值（`xs` / `sm` / `md` / `lg` / `xl`）、任意 CSS 长度（如 `32px`）或 `inherit`（继承父元素字体大小）。
- `color`：图标颜色，仅对单色图标生效。
- `rotate`：旋转度数，单位 deg。
- `spin`：是否播放旋转动画，动画从 `rotate` 指定的角度开始。

### 尺寸体系

`size` 只控制图标高度，宽度按图标原始比例自适应，长条形图标不会被拉伸变形。容器同时设置 `height` 和 `font-size`，分别适配 SVG / 图片（`height: 100%` 填满）和图标字体（按 `font-size` 缩放）。

预设值映射到全局 CSS 变量（定义于 `src/styles/global/variable.scss`）：

| 预设值 |          变量          |  尺寸  |
| :----: | :--------------------: | :----: |
|  `xs`  | `--dockv-icon-size-xs` | `10px` |
|  `sm`  | `--dockv-icon-size-sm` | `14px` |
|  `md`  | `--dockv-icon-size-md` | `18px` |
|  `lg`  | `--dockv-icon-size-lg` | `22px` |
|  `xl`  | `--dockv-icon-size-xl` | `26px` |

`size="inherit"` 时容器不设固定尺寸，图标跟随父元素字体大小（`1em`）。图标与文字的轴线对齐不做处理，各图标存在差异时由开发者自行微调。

### 自定义（slot）

slot 有内容时忽略 `icon` 和 `src`，直接渲染用户传入的 DOM。

#### SVG

slot 内 SVG 直接渲染，无需额外处理：

```html
<dv-icon size="32px" color="red">
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l-8 4h16l-8-4z" />
  </svg>
</dv-icon>
```

#### 第三方图标库（非内置，可添加至文档内教学）

Font Awesome 或 Iconfont 通过 slot 传入原生标签，`size` / `color` 由容器统一控制，图标字体的字号和颜色天然继承：

```html
<link rel="stylesheet" href="fontawesome.min.css" />
<dv-icon size="20px" color="#333">
  <i class="fas fa-home"></i>
</dv-icon>
```

### 图片（src）

`src` 直接绑定原生 `<img>` 标签，支持所有图片格式（SVG / PNG / JPG / ICO / WebP），由浏览器处理缓存和跨域，无需 fetch 和格式判断：

```html
<dv-icon src="/logo.svg" size="48px"></dv-icon> <dv-icon src="/favicon.ico" size="24px"></dv-icon>
```

### 图标加载

使用 `@iconify/iconify` 的 `loadIcons` 加载图标，带竞态保护（加载期间图标名被更换时丢弃过期结果）：

- **本地优先**：用户项目安装了对应图标数据包（如 `@iconify-json/material-symbols`）时，直接使用本地数据，不请求网络。
- **在线回退**：本地未命中时自动请求 `api.iconify.design`，无需额外配置。
