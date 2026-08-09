---
title: Global Config 全局配置
---

# Global Config 全局配置

全局配置通过**挂载在 HTML 属性**上生效，所有子组件自动继承。不需要引入 JS SDK，不需要 Provider 包裹。

> [!tip]
> - 每个组件都支持**独立配置**，组件属性的优先级高于全局配置
> - 全局配置对标的是「你想让整个应用统一某个行为」的场景

## 主题模式（theme-mode）

控制所有组件的浅色 / 暗色模式。

| 值 | 说明 |
|---|---|
| `auto` | 自动判断，优先级：localStorage > cookie > 浏览器/系统偏好（`prefers-color-scheme`）（默认） |
| `light` | 亮色模式 |
| `dark` | 暗色模式 |

### 使用方式

将 `theme-mode` 属性挂载在任意容器元素上，该容器内的所有 DockV 组件自动切换对应色值。

或使用 class 类名 `dockv-theme-mode-light` / `dockv-theme-mode-dark`

```html
<!-- 全局暗色 -->
<body theme-mode="dark">
  <dv-button>我是暗色风格</dv-button>

  <!-- 子树强制亮色（暗色应用中嵌入亮色组件） -->
  <dv-button theme-mode="light">我是亮色风格</dv-button>

  <!-- 子树恢复自动判断（不跟随上级 dark，重新走 auto 解析链） -->
  <div theme-mode="auto">
    <dv-button>跟随系统/缓存偏好</dv-button>
  </div>

  <div class="dockv-theme-mode-light">
    <dv-button>子组件会跟随父容器改变</dv-button>
  </div>
</body>
```

### 原理

组件内部通过 CSS 变量 `--dockv-color-*` 承载色值。色盘切换有两种触发方式：

- **属性选择器**：`[theme-mode="dark"]` — 用于显式指定的 `light` / `dark`
- **CSS class**：`.dockv-theme-mode-dark` / `.dockv-theme-mode-light` — 用于 `auto` 自动解析

```scss
body[theme-mode="dark"], .dockv-theme-mode-dark, :host([theme-mode="dark"]), :host .dockv-theme-dark {
  --dockv-red-0: 359,85%,23%;
  --dockv-red-1: 0,80%,31%;
}
```

组件自身**不写任何 theme-mode 判断逻辑**。

> [!tip] auto 的实现策略
> `auto` 解析结果通过 **CSS class** 挂载到 DOM 上（如 `.dockv-theme-mode-dark`），**不修改 `theme-mode` 属性本身**。这样既满足 CSS 选择器的触发需求，又保留了属性上的原始意图。后续 localStorage 切换时只需替换 class。
>
> CSS 自定义属性（`--dockv-*`）会沿 DOM 树向下继承，**穿透 Shadow DOM 边界**，因此在 `<body>` 上加一个 class 即可让所有子孙 Web Component 自动切换色盘，无需逐个组件处理。

---

## 国际化

### 语言（lang）

控制组件内置文案（如日期选择器的月份名、无数据提示等）。

| 值 | 说明 |
|---|---|
| `zh-CN` | 简体中文 |
| `en-US` | 英文 |
| `ja-JP` | 日文 |
| ... | 其他标准 [BCP47](https://mdn.org.cn/en-US/docs/Glossary/BCP_47_language_tag) 语言标签 |
| `auto` | 自动判断（默认值），优先级：localStorage > cookie > 浏览器/系统 |

### 使用方式

```html
<html lang="zh-CN">
  <body>
    <dv-date-picker></dv-date-picker>

    <!-- 日语歌词片段，屏幕阅读器自动切换日语音韵，组件文案也跟随 -->
    <div lang="ja-JP">
      <p>桜の舞う空の下で</p>
      <dv-date-picker></dv-date-picker>  <!-- 月份显示为「1月」而非「January」 -->
    </div>
  </body>
</html>
```

组件内部通过读取**最近祖先**的 `lang` 属性决定文案语言。值为 `auto` 或未设置时，按以下优先级解析：

1. `localStorage` 中的用户偏好
2. 浏览器 cookie
3. `navigator.language`（浏览器/系统语言）

解析结果仅存在于组件内部，**不回写到 DOM 属性**上（与 `theme-mode` 不同，`lang` 由 JS 直接消费，不依赖 CSS 选择器）。

### 时区（timezone）

控制日期/时间相关组件展示和计算所用的时区。

| 格式 | 示例 | 说明 |
|---|---|---|
| `auto` | — | 自动判断（默认值），优先级：localStorage > cookie > 浏览器/系统 |
| UTC 偏移 | `UTC+08:00`、`UTC-05:00` | 与 UTC 的偏移量 |
| IANA 时区 ID | `Asia/Shanghai`、`America/New_York` | 自动处理夏令时 |

> [!tip]
> - 推荐使用 IANA 时区 ID（如 `Asia/Shanghai`），它会自动计算夏令时偏移。 
> - UTC 偏移写法（如 `UTC+08:00`）内部会尝试映射到 IANA ID，映射不存在时视为固定偏移。
> - `auto` 在子树局部覆盖上级时区时使用。

### 使用方式

```html
<!-- 全局北京时间 -->
<body timezone="Asia/Shanghai">
  <dv-date-picker></dv-date-picker>
</body>

<!-- 子树使用纽约时区 -->
<div timezone="America/New_York">
  <dv-date-picker></dv-date-picker>
</div>

<!-- 子树恢复自动判断 -->
<div timezone="auto">
  <dv-date-picker></dv-date-picker>
</div>
```

组件内部通过读取**最近祖先**的 `timezone` 属性决定时区。`auto` 的解析链路与 `lang` 相同，解析结果仅存在于组件内部，不回写 DOM。

---

## 设计思路

### 为什么用 HTML 属性而不是 JS API？

```
❌  JS API:  DockV.config({ theme: 'dark' })   → 需要引入额外的 JS，框架耦合
✅  HTML 属性: <body theme-mode="dark">        → 零侵入，原生 HTML，任何框架都能用
```

Web Components 的天生优势就是**靠近 DOM**。用 HTML 属性做全局配置，不需要 Provider Context、不需要 runtime config，组件自己通过属性选择器和祖先查询就能获取配置值。

### 优先级链

```
组件属性 > 最近祖先的 HTML 属性 > 默认值
```

示例:

```html
<body theme-mode="dark">
  <dv-button theme-mode="light">  ← 组件属性覆盖全局，这个按钮是亮色
  </dv-button>
  <dv-button>                     ← 没有组件属性，继承 body 的 dark
  </dv-button>
</body>
```

`theme-mode`、`lang`、`timezone` 三类配置均适用相同优先级规则：越靠近组件的属性权重越高。

### `auto` 的通用解析规则

`auto` 在三类配置中都是**隐式默认值**，也支持显式声明（用于子树解除上级约束、重新走自动判断）。解析优先级统一为：

```
localStorage 中的 dockv-{key} 偏好
        ↓ 未找到
document.cookie 中的 dockv-{key}
        ↓ 未找到
浏览器/系统原生 API（navigator.language / prefers-color-scheme / Intl.DateTimeFormat）
```

`lang` 和 `timezone` 的解析结果保持在组件内存中（纯读，不回写 DOM）。`theme-mode` 因 CSS 依赖，通过追加 `.dockv-theme-mode-dark` / `.dockv-theme-mode-light` class 触发色盘切换，不修改 `theme-mode` 属性本身。
