---
title: Global Config 全局配置
---

# Global Config 全局配置

全局配置通过**挂载在 HTML 属性**上生效，所有子组件自动继承。不需要引入 JS SDK，不需要 Provider 包裹。

> [!tip]
> - 每个组件都支持**独立配置**，组件属性的优先级高于全局配置
> - 全局配置对标的是「你想让整个应用统一某个行为」的场景

## 主题（theme）

控制所有组件的浅色 / 暗色模式。

| 值 | 说明 |
|---|---|
| `light` | 亮色模式 |
| `dark` | 暗色模式 |
| `auto` | 自动判断（默认） |

默认值：`auto`。优先级：localStorage > cookie > 浏览器/系统。

### 使用方式

将 `theme` 属性挂载在任意容器元素上，该容器内的所有 DockV 组件自动切换对应色值。

```html
<!-- 全局暗色 -->
<body theme="dark">
  <d-button>我自动变暗色</d-button>
</body>

<!-- 子树强制亮色（暗色应用中嵌入亮色卡片） -->
<section theme="light">
  <d-button>我是亮色风格</d-button>
</section>
```

### 原理

组件内部通过 CSS 变量 `--dockv-color-*` 承载色值，`[theme="dark"]` / `[theme="light"]` 选择器覆盖变量值，组件自身**不写任何 mode 判断逻辑**。

---

## 国际化

### 语言（lang）

控制组件内置文案（如日期选择器的月份名、无数据提示等）。

| 值 | 说明 |
|---|---|
| `zh-CN` | 简体中文 |
| `en` | 英文 |
| `ja` | 日文 |
| ... | 其他标准 [BCP47](https://mdn.org.cn/en-US/docs/Glossary/BCP_47_language_tag) 语言标签 |

默认值：`auto`（自动判断，优先级：localStorage > cookie > 浏览器/系统）。

### 使用方式

```html
<html lang="zh-CN">
  <body>
    <d-date-picker></d-date-picker>

    <!-- 日语歌词片段，屏幕阅读器自动切换日语音韵，组件文案也跟随 -->
    <div lang="ja-JP">
      <p>桜の舞う空の下で</p>
      <d-date-picker></d-date-picker>  <!-- 月份显示为「1月」而非「January」 -->
    </div>
  </body>
</html>
```

组件内部通过读取**最近祖先**的 `lang` 属性决定文案语言。未设置时回退到浏览器语言（`navigator.language`）。

### 时区（timezone）

控制日期/时间相关组件展示和计算所用的时区。

| 格式 | 示例 | 说明 |
|---|---|---|
| `auto` | — | 跟随浏览器时区 |
| UTC 偏移 | `UTC+08:00`、`UTC-05:00` | 与 UTC 的偏移量 |
| IANA 时区 ID | `Asia/Shanghai`、`America/New_York` | 自动处理夏令时 |

默认值：`auto`。优先级：localStorage > cookie > 浏览器/系统。

> [!tip]
> - 推荐使用 IANA 时区 ID（如 `Asia/Shanghai`），它会自动计算夏令时偏移。 
> - UTC 偏移写法（如 `UTC+08:00`）内部会尝试映射到 IANA ID，映射不存在时视为固定偏移。
> - `auto` 在子树局部覆盖上级时区时使用。

### 使用方式

```html
<!-- 全局北京时间 -->
<body timezone="Asia/Shanghai">
  <d-date-picker></d-date-picker>
</body>

<!-- 子树使用纽约时区 -->
<div timezone="America/New_York">
  <d-date-picker></d-date-picker>
</div>
```

组件内部通过读取**最近祖先**的 `timezone` 属性决定时区。未设置时回退到 `browser`。

---

## 设计思路

### 为什么用 HTML 属性而不是 JS API？

```
❌  JS API:  DockV.config({ theme: 'dark' })   → 需要引入额外的 JS，框架耦合
✅  HTML 属性: <body theme="dark">             → 零侵入，原生 HTML，任何框架都能用
```

Web Components 的天生优势就是**靠近 DOM**。用 HTML 属性做全局配置，不需要 Provider Context、不需要 runtime config，组件自己通过属性选择器和祖先查询就能获取配置值。

### 优先级链

```
组件属性 > 最近祖先的 HTML 属性 > 默认值
```

示例:

```html
<body theme="dark">
  <d-button theme="light">  ← 组件属性覆盖全局，这个按钮是亮色
  </d-button>
  <d-button>                ← 没有组件属性，继承 body 的 dark
  </d-button>
</body>
```

`theme`、`lang`、`timezone` 三类配置均适用相同优先级规则：越靠近组件的属性权重越高。
