---
title: Icon 图标
---

# Icon 图标

基于 Iconify 的图标组件，同时支持其他第三方图标库和自定义图标导入。

## 基础用法

通过 `icon` 属性指定 Iconify 图标名称即可渲染图标。

图标名的格式是 `图标集:图标名`，比如 `material-symbols:home` 中，冒号前是图标集，冒号后是图标名。

需要找图标时，可以在 [Iconify 图标库](https://icon-sets.iconify.design/) 搜索，点开任意图标即可复制它的名称。

::: details 示例
![示例](/1786186449225.png)
:::

<dv-icon icon="material-symbols:home"></dv-icon>
<dv-icon icon="material-symbols:emergency-home"></dv-icon>
<dv-icon icon="line-md:beer-twotone-loop"></dv-icon>
<dv-icon icon="line-md:emoji-smile-twotone"></dv-icon>

```html
<dv-icon icon="material-symbols:home"></dv-icon>
<dv-icon icon="material-symbols:emergency-home"></dv-icon>
<dv-icon icon="line-md:beer-twotone-loop"></dv-icon>
<dv-icon icon="line-md:emoji-smile-twotone"></dv-icon>
```

## 尺寸（size）

使用 `size` 属性控制图标大小。

::: tip 提示

`size` 只控制图标的高度（height）。宽度（width）会按照图标原本的比例自动适配。

> [!info] 原理：
> 每个图标都有自己的宽高比（比如 2:1），高度一定，宽度就跟着比例算出来了——就像等比缩放一张照片，长条形的 logo 也不会被拉伸变形。

下面 4 个图标高度相同（都是 xl = 26px），但宽度各不相同：

<dv-icon icon="logos:sqlite" size="xl"></dv-icon> 
<dv-icon icon="logos:cloudflare" size="xl"></dv-icon> 
<dv-icon icon="logos:microsoft" size="xl"></dv-icon> 
<dv-icon icon="logos:figma" size="xl"></dv-icon> 

```html
<dv-icon icon="logos:sqlite" size="xl"></dv-icon> 
<dv-icon icon="logos:cloudflare" size="xl"></dv-icon> 
<dv-icon icon="logos:microsoft" size="xl"></dv-icon> 
<dv-icon icon="logos:figma" size="xl"></dv-icon> 
```

:::

### 预设尺寸

| 预设值 | 对应尺寸 |
| :----: | :------: |
|  `xs`  |  `10px`  |
|  `sm`  |  `14px`  |
|  `md`  |  `18px`  |
|  `lg`  |  `22px`  |
|  `xl`  |  `26px`  |

<div style="display: flex; gap: 3px;">
  <dv-icon icon="logos:npm-icon" size="xs"></dv-icon>
  <dv-icon icon="logos:npm-icon" size="sm"></dv-icon>
  <dv-icon icon="logos:npm-icon" size="md"></dv-icon>
  <dv-icon icon="logos:npm-icon" size="lg"></dv-icon>
  <dv-icon icon="logos:npm-icon" size="xl"></dv-icon>
</div>

```html
<dv-icon icon="logos:npm-icon" size="xs"></dv-icon>
<dv-icon icon="logos:npm-icon" size="sm"></dv-icon>
<dv-icon icon="logos:npm-icon" size="md"></dv-icon>
<dv-icon icon="logos:npm-icon" size="lg"></dv-icon>
<dv-icon icon="logos:npm-icon" size="xl"></dv-icon>
```

### 继承父元素的字体大小

使用 `size="inherit"` 让图标自动继承父元素的字体大小，字号变图标就跟着变。

> [!info] 原理：
> 图标默认继承父元素的字体大小。相当于图标"伪装"成一个文字字符——文字多大，图标就多大，还能和文字对齐。

<div style="font-size: 14px;">14px <dv-icon icon="material-symbols:home" size="inherit"></dv-icon></div>
<div style="font-size: 18px;">18px <dv-icon icon="material-symbols:home" size="inherit"></dv-icon></div>
<div style="font-size: 22px;">22px <dv-icon icon="material-symbols:home" size="inherit"></dv-icon></div>

```html
<div style="font-size: 14px;">
  14px <dv-icon icon="material-symbols:home" size="inherit"></dv-icon>
</div>

<div style="font-size: 18px;">
  18px <dv-icon icon="material-symbols:home" size="inherit"></dv-icon>
</div>

<div style="font-size: 22px;">
  22px <dv-icon icon="material-symbols:home" size="inherit"></dv-icon>
</div>
```

### 自定义尺寸

除了预设值，`size` 也支持任意 CSS 长度值，比如 `32px`、`2rem` 等。

<dv-icon icon="material-symbols:home" size="12px"></dv-icon>
<dv-icon icon="material-symbols:home" size="20px"></dv-icon>
<dv-icon icon="material-symbols:home" size="32px"></dv-icon>
<dv-icon icon="material-symbols:home" size="48px"></dv-icon>

```html
<dv-icon icon="material-symbols:home" size="12px"></dv-icon>
<dv-icon icon="material-symbols:home" size="20px"></dv-icon>
<dv-icon icon="material-symbols:home" size="32px"></dv-icon>
<dv-icon icon="material-symbols:home" size="48px"></dv-icon>
```

## 颜色（color）

使用 `color` 属性自定义图标颜色。仅对单色图标生效。

单色图标就像涂色书里的黑白线条画，`color` 就是你手里的蜡笔，想涂什么颜色都行：

<dv-icon icon="material-symbols:home" size="32px" color="var(--dockv-color-vocaloid-miku)"></dv-icon>
<dv-icon icon="material-symbols:home" size="32px" color="var(--dockv-color-vocaloid-rin)"></dv-icon>
<dv-icon icon="material-symbols:home" size="32px" color="var(--dockv-color-vocaloid-luka)"></dv-icon>
<dv-icon icon="material-symbols:home" size="32px" color="#66CCFF"></dv-icon>
<dv-icon icon="material-symbols:home" size="32px" color="rgb(153, 153, 255)"></dv-icon>

> [!tip] 小贴士
> 示例里 `var(--dockv-color-xxx)` 是 DockV 内置的主题色变量，也可以直接写 `#66CCFF`、`rgb(153, 153, 255)`、`hsl(240, 100%, 50%)` 等任意 CSS 颜色值。

```html
<dv-icon
  icon="material-symbols:home"
  size="32px"
  color="var(--dockv-color-vocaloid-miku)"></dv-icon>
<dv-icon icon="material-symbols:home" size="32px" color="var(--dockv-color-vocaloid-rin)"></dv-icon>
<dv-icon
  icon="material-symbols:home"
  size="32px"
  color="var(--dockv-color-vocaloid-luka)"></dv-icon>
<dv-icon icon="material-symbols:home" size="32px" color="#66CCFF"></dv-icon>
<dv-icon icon="material-symbols:home" size="32px" color="rgb(153, 153, 255)"></dv-icon>
```

而多色图标（比如品牌 logo，前缀为 `logos:`）已经自带多种颜色，`color` 属性对它们无效：

<dv-icon icon="logos:figma" size="32px" color="var(--dockv-color-danger)"></dv-icon>

```html
<dv-icon icon="logos:figma" size="32px" color="var(--dockv-color-danger)"></dv-icon>
```

## 旋转与动画（rotate / spin）

使用 `rotate` 属性让图标旋转固定角度，使用 `spin` 属性让图标持续旋转。两者可以叠加，动画会从 `rotate` 指定的角度开始转。

<dv-icon icon="material-symbols:arrow-left-alt-rounded" size="32px" rotate="45"></dv-icon>
<dv-icon icon="material-symbols:arrow-left-alt-rounded" size="32px" rotate="90"></dv-icon>
<dv-icon icon="material-symbols:arrow-left-alt-rounded" size="32px" rotate="180"></dv-icon>
<dv-icon icon="material-symbols:arrow-left-alt-rounded" size="32px" spin></dv-icon>
<dv-icon icon="material-symbols:arrow-left-alt-rounded" size="32px" rotate="45" spin></dv-icon>

```html
<dv-icon icon="material-symbols:arrow-left-alt-rounded" size="32px" rotate="45"></dv-icon>
<dv-icon icon="material-symbols:arrow-left-alt-rounded" size="32px" rotate="90"></dv-icon>
<dv-icon icon="material-symbols:arrow-left-alt-rounded" size="32px" rotate="180"></dv-icon>
<dv-icon icon="material-symbols:arrow-left-alt-rounded" size="32px" spin></dv-icon>
<dv-icon icon="material-symbols:arrow-left-alt-rounded" size="32px" rotate="45" spin></dv-icon>
```

::: tip 最佳实践
"加载中"场景除了用 `spin` 属性，也可以直接用 Iconify 的动画图标集：
`svg-spinners`（纯加载 spinner）和 `line-md`（线条风格动画图标）。

<dv-icon icon="svg-spinners:bars-rotate-fade" size="lg" color="var(--dockv-color-primary)"></dv-icon> 
<dv-icon icon="svg-spinners:bars-scale-fade" size="lg" color="var(--dockv-color-primary)"></dv-icon> 
<dv-icon icon="svg-spinners:3-dots-bounce" size="lg" color="var(--dockv-color-primary)"></dv-icon> 
<dv-icon icon="svg-spinners:180-ring" size="lg" color="var(--dockv-color-primary)"></dv-icon> 
<dv-icon icon="line-md:loading-twotone-loop" size="lg" color="var(--dockv-color-primary)"></dv-icon> 

```html
<dv-icon icon="svg-spinners:bars-rotate-fade" size="lg" color="var(--dockv-color-primary)"></dv-icon> 
<dv-icon icon="svg-spinners:bars-scale-fade" size="lg" color="var(--dockv-color-primary)"></dv-icon> 
<dv-icon icon="svg-spinners:3-dots-bounce" size="lg" color="var(--dockv-color-primary)"></dv-icon> 
<dv-icon icon="svg-spinners:180-ring" size="lg" color="var(--dockv-color-primary)"></dv-icon> 
<dv-icon icon="line-md:loading-twotone-loop" size="lg" color="var(--dockv-color-primary)"></dv-icon> 
```
:::

## 图片（src）

通过 `src` 属性加载任意图片文件，底层为原生 `<img>` 标签，支持 SVG / PNG / JPG / ICO / WebP 等所有格式。

<dv-icon src="https://raw.githubusercontent.com/gilbarbara/logos/refs/heads/main/logos/github-icon.svg" size="36px"></dv-icon> 
<dv-icon src="https://dash.cloudflare.com/favicon.ico" size="36px"></dv-icon> 
<dv-icon src="/logo.png" size="36px"></dv-icon> 

```html
<dv-icon src="https://raw.githubusercontent.com/gilbarbara/logos/refs/heads/main/logos/github-icon.svg" size="36px"></dv-icon> 
<dv-icon src="https://dash.cloudflare.com/favicon.ico" size="36px"></dv-icon> 
<dv-icon src="https://ui.dockv.cc/logo.png" size="36px"></dv-icon> 
```

## 自定义图标

同时设置多种图标来源时，只会渲染优先级最高的一种：slot > src > icon。

例如，同时设置 `icon` 属性和插槽内容时，显示插槽内容：

<dv-icon icon="material-symbols:home" color="var(--dockv-color-danger)">
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" fill="currentColor"></circle>
  </svg>
</dv-icon>

```html
<dv-icon icon="material-symbols:home" color="var(--dockv-color-danger)">
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" fill="currentColor"></circle>
  </svg>
</dv-icon>
```

### 插槽（slot）

通过 slot 直接传入其他图标元素，可使用任意第三方图标库。

<dv-icon size="32px" color="var(--dockv-color-danger)">
<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
	<path d="M0 0h24v24H0z" fill="none" />
	<path fill="currentColor" d="M9.1 5L5 9.1v5.8L9.1 19h5.8l4.1-4.1V9.1L14.9 5zm7.14 9.83l-1.41 1.41L12 13.41l-2.83 2.83l-1.41-1.41L10.59 12L7.76 9.17l1.41-1.41L12 10.59l2.83-2.83l1.41 1.41L13.41 12z" opacity=".3" />
	<path fill="currentColor" d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27zM19 14.9L14.9 19H9.1L5 14.9V9.1L9.1 5h5.8L19 9.1zm-4.17-7.14L12 10.59L9.17 7.76L7.76 9.17L10.59 12l-2.83 2.83l1.41 1.41L12 13.41l2.83 2.83l1.41-1.41L13.41 12l2.83-2.83z" />
</svg>
</dv-icon>
<dv-icon size="32px" color="var(--dockv-color-info)">
<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
	<path d="M0 0h24v24H0z" fill="none" />
	<path fill="currentColor" d="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8s8-3.59 8-8s-3.59-8-8-8m1 13h-2v-6h2zm0-8h-2V7h2z" opacity=".3" />
	<path fill="currentColor" d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8" />
</svg>
</dv-icon>
<dv-icon size="32px" color="var(--dockv-color-success)">
<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48">
	<path d="M0 0h48v48H0z" fill="none" />
	<defs>
		<mask id="SVG4IxzvcIZ">
			<g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4">
				<path fill="#555" d="m24 4l5.253 3.832l6.503-.012l1.997 6.188l5.268 3.812L41 24l2.021 6.18l-5.268 3.812l-1.997 6.188l-6.503-.012L24 44l-5.253-3.832l-6.503.012l-1.997-6.188l-5.268-3.812L7 24l-2.021-6.18l5.268-3.812l1.997-6.188l6.503.012z" />
				<path d="m17 24l5 5l10-10" />
			</g>
		</mask>
	</defs>
	<path fill="currentColor" d="M0 0h48v48H0z" mask="url(#SVG4IxzvcIZ)" />
</svg>
</dv-icon>
<dv-icon size="32px" color="var(--dockv-color-warning)">
<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
	<path d="M0 0h24v24H0z" fill="none" />
	<path fill="currentColor" d="M4.47 19h15.06L12 5.99zM13 18h-2v-2h2zm0-4h-2v-4h2z" opacity=".3" />
	<path fill="currentColor" d="M1 21h22L12 2zm3.47-2L12 5.99L19.53 19zM11 16h2v2h-2zm0-6h2v4h-2z" />
</svg>
</dv-icon>

::: details 查看完整代码

```html
<dv-icon size="32px" color="var(--dockv-color-danger)">
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none" />
    <path
      fill="currentColor"
      d="M9.1 5L5 9.1v5.8L9.1 19h5.8l4.1-4.1V9.1L14.9 5zm7.14 9.83l-1.41 1.41L12 13.41l-2.83 2.83l-1.41-1.41L10.59 12L7.76 9.17l1.41-1.41L12 10.59l2.83-2.83l1.41 1.41L13.41 12z"
      opacity=".3" />
    <path
      fill="currentColor"
      d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27zM19 14.9L14.9 19H9.1L5 14.9V9.1L9.1 5h5.8L19 9.1zm-4.17-7.14L12 10.59L9.17 7.76L7.76 9.17L10.59 12l-2.83 2.83l1.41 1.41L12 13.41l2.83 2.83l1.41-1.41L13.41 12l2.83-2.83z" />
  </svg>
</dv-icon>

<dv-icon size="32px" color="var(--dockv-color-info)">
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none" />
    <path
      fill="currentColor"
      d="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8s8-3.59 8-8s-3.59-8-8-8m1 13h-2v-6h2zm0-8h-2V7h2z"
      opacity=".3" />
    <path
      fill="currentColor"
      d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8" />
  </svg>
</dv-icon>

<dv-icon size="32px" color="var(--dockv-color-success)">
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48">
    <path d="M0 0h48v48H0z" fill="none" />
    <defs>
      <mask id="SVG4IxzvcIZ">
        <g
          fill="none"
          stroke="#fff"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="4">
          <path
            fill="#555"
            d="m24 4l5.253 3.832l6.503-.012l1.997 6.188l5.268 3.812L41 24l2.021 6.18l-5.268 3.812l-1.997 6.188l-6.503-.012L24 44l-5.253-3.832l-6.503.012l-1.997-6.188l-5.268-3.812L7 24l-2.021-6.18l5.268-3.812l1.997-6.188l6.503.012z" />
          <path d="m17 24l5 5l10-10" />
        </g>
      </mask>
    </defs>
    <path fill="currentColor" d="M0 0h48v48H0z" mask="url(#SVG4IxzvcIZ)" />
  </svg>
</dv-icon>

<dv-icon size="32px" color="var(--dockv-color-warning)">
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none" />
    <path
      fill="currentColor"
      d="M4.47 19h15.06L12 5.99zM13 18h-2v-2h2zm0-4h-2v-4h2z"
      opacity=".3" />
    <path
      fill="currentColor"
      d="M1 21h22L12 2zm3.47-2L12 5.99L19.53 19zM11 16h2v2h-2zm0-6h2v4h-2z" />
  </svg>
</dv-icon>
```

:::

### 第三方图标库

Font Awesome、Iconfont 等第三方图标也是通过 slot 传入原生标签，`size` 和 `color` 天然继承：

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.3.0/css/all.min.css"/>
<dv-icon size="24px" color="#4c78f2ff">
  <i class="fa-solid fa-circle-user"></i>
</dv-icon>
<dv-icon size="30px" color="#eea21fff">
  <i class="fa-brands fa-cloudflare"></i>
</dv-icon>
<dv-icon size="36px" color="#6b6b6bff">
  <i class="fa-solid fa-compass"></i>
</dv-icon>

```html
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.3.0/css/all.min.css" />

<dv-icon size="24px" color="#4c78f2ff">
  <i class="fa-solid fa-circle-user"></i>
</dv-icon>
<dv-icon size="30px" color="#eea21fff">
  <i class="fa-brands fa-cloudflare"></i>
</dv-icon>
<dv-icon size="36px" color="#6b6b6bff">
  <i class="fa-solid fa-compass"></i>
</dv-icon>
```
> [!info] Q&A
> Q: 为什么不直接写 `<i>` 还要包一层 `<dv-icon>`？
>
> A: 因为 `size` 和 `color` 由 `<dv-icon>` 统一控制，换图标时不用改动样式。

## 图标加载与离线使用

### 加载原理

`<dv-icon icon="material-symbols:home">` 底层使用 `@iconify/iconify` 的 `loadIcons` 加载图标，按以下顺序查找：

1. **内存缓存**：已加载过的图标直接复用，不重复请求。
2. **本地数据包**：如果安装了对应图标集的数据包（如 `@iconify-json/material-symbols`），直接用本地数据，不发网络请求。
3. **在线 API**：以上都没有时，自动请求 `api.iconify.design`，只下载用到的图标。

整个过程自动完成，无需任何配置。可以理解成「手机双模」：有本地信号用本地，没有就自动连 Wi-Fi。

::: warning 需要联网
默认情况下图标从在线 API 加载，**首次使用某个图标时需要联网**。离线 / 内网环境见下文。
:::

### 离线 / 内网环境

想离线使用哪个图标集，就安装对应的数据包，装完自动生效，代码一行不用改：

```bash
pnpm add -D @iconify-json/material-symbols
```

每个数据包只含一个图标集（几十 KB），按需安装，适合图标来源固定的项目。

> [!warning] UMD 产物无法加载数据包
> 通过 `<script>` 直接引入 UMD 产物时没有打包器，本地数据包无法被加载，只能走在线 API。

### tree-shaking 说明

`@iconify/iconify` 本身**不包含任何图标数据**，只是一个加载器，体积很小（约几 KB），随组件打包不用担心体积。

图标数据天生按需加载：

- **在线加载**：只下载页面上用到的图标，没用到的根本不会请求。
- **按集安装**：打包器只把用到的图标集分块打进产物。
- **全量包 + 插件**：构建时只把用到的图标打进去，粒度最细。

> [!danger] 不要静态导入整个数据包
> 不要写 `import icons from "@iconify-json/material-symbols/icons.json"` 这样的静态导入，它会把整个图标集打进产物，废掉按需加载。

## API

### 属性

| 属性   | 说明                                               | 类型      | 默认值  |
| ------ | -------------------------------------------------- | --------- | ------- |
| icon   | Iconify 格式的图标名称，如 `material-symbols:home` | `string`  | —       |
| src    | 任意图片文件 URL，支持 SVG / PNG / JPG / ICO 等    | `string`  | —       |
| size   | 图标尺寸，支持预设值（`xs`/`sm`/`md`/`lg`/`xl`）、CSS 长度（如 `32px`，需带单位）或 `inherit`（继承父元素字体大小） | `string` | `md` |
| color  | 图标颜色（仅单色图标生效）                         | `string`  | —       |
| rotate | 旋转度数，单位 deg                                 | `number`  | `0`     |
| spin   | 是否播放旋转动画                                   | `boolean` | `false` |

### 插槽

| 插槽名  | 说明                                                   |
| ------- | ------------------------------------------------------ |
| default | 传入自定义 `<svg>` 元素，有内容时 `icon` 和 `src` 会被忽略 |
