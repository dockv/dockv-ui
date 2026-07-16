---
title: Tokens 设计变量
---

# Tokens 设计变量

Design Token 将设计中的基础元素与具体样式解耦。全局修改一个变量值，即可完成整个UI的视觉迭代，无需逐个组件修改。

暗色模式依赖 Token 体系：组件只引用变量，变量值随 `[theme="dark"]` 自动切换。

## 基础色

包含 16 个色相 × 10 个梯度。所有功能色均从基础色中引用。

色盘存储为裸 `H,S%,L%` 三元组，使用时用 `hsl()` / `hsla()` 包裹：

```css
.btn { background: hsl(var(--dockv-blue-5)); }
.badge { background: hsla(var(--dockv-red-5), 0.1); }
```

<script setup>
import Palette from './.vitepress/components/Palette.vue'

const red    = [ { name:'0', hsl:'12,93%,96%' }, { name:'1', hsl:'3,93%,91%' }, { name:'2', hsl:'7,92%,82%' }, { name:'3', hsl:'11,90%,73%' }, { name:'4', hsl:'9,93%,64%' }, { name:'5', hsl:'8,92%,55%' }, { name:'6', hsl:'5,83%,46%' }, { name:'7', hsl:'3,87%,37%' }, { name:'8', hsl:'2,93%,29%' }, { name:'9', hsl:'1,96%,21%' } ]
const pink   = [ { name:'0', hsl:'349,64%,96%' }, { name:'1', hsl:'348,79%,90%' }, { name:'2', hsl:'345,71%,80%' }, { name:'3', hsl:'343,72%,70%' }, { name:'4', hsl:'341,82%,61%' }, { name:'5', hsl:'340,83%,51%' }, { name:'6', hsl:'338,82%,42%' }, { name:'7', hsl:'336,86%,34%' }, { name:'8', hsl:'334,92%,26%' }, { name:'9', hsl:'331,98%,18%' } ]
const purple = [ { name:'0', hsl:'300,47%,94%' }, { name:'1', hsl:'300,54%,87%' }, { name:'2', hsl:'297,55%,74%' }, { name:'3', hsl:'295,52%,63%' }, { name:'4', hsl:'293,48%,52%' }, { name:'5', hsl:'291,47%,43%' }, { name:'6', hsl:'289,50%,37%' }, { name:'7', hsl:'287,53%,31%' }, { name:'8', hsl:'285,57%,26%' }, { name:'9', hsl:'282,61%,21%' } ]
const violet = [ { name:'0', hsl:'275,36%,95%' }, { name:'1', hsl:'274,57%,89%' }, { name:'2', hsl:'266,51%,78%' }, { name:'3', hsl:'265,47%,68%' }, { name:'4', hsl:'263,56%,59%' }, { name:'5', hsl:'260,56%,50%' }, { name:'6', hsl:'259,55%,46%' }, { name:'7', hsl:'256,53%,38%' }, { name:'8', hsl:'254,56%,33%' }, { name:'9', hsl:'252,59%,27%' } ]
const indigo = [ { name:'0', hsl:'232,30%,95%' }, { name:'1', hsl:'228,40%,88%' }, { name:'2', hsl:'228,44%,77%' }, { name:'3', hsl:'228,47%,66%' }, { name:'4', hsl:'230,53%,57%' }, { name:'5', hsl:'231,55%,48%' }, { name:'6', hsl:'232,44%,41%' }, { name:'7', hsl:'233,43%,35%' }, { name:'8', hsl:'233,43%,30%' }, { name:'9', hsl:'235,45%,24%' } ]
const blue   = [ { name:'0', hsl:'212,100%,96%' }, { name:'1', hsl:'210,100%,90%' }, { name:'2', hsl:'210,100%,79%' }, { name:'3', hsl:'209,100%,69%' }, { name:'4', hsl:'210,100%,59%' }, { name:'5', hsl:'216,100%,49%' }, { name:'6', hsl:'215,100%,42%' }, { name:'7', hsl:'214,100%,35%' }, { name:'8', hsl:'215,100%,28%' }, { name:'9', hsl:'216,100%,21%' } ]
const lb      = [ { name:'0', hsl:'198,100%,95%' }, { name:'1', hsl:'197,89%,89%' }, { name:'2', hsl:'197,82%,78%' }, { name:'3', hsl:'199,73%,67%' }, { name:'4', hsl:'201,72%,57%' }, { name:'5', hsl:'203,70%,49%' }, { name:'6', hsl:'202,66%,47%' }, { name:'7', hsl:'196,55%,41%' }, { name:'8', hsl:'201,55%,37%' }, { name:'9', hsl:'206,43%,33%' } ]
const cyan   = [ { name:'0', hsl:'185,54%,94%' }, { name:'1', hsl:'181,59%,85%' }, { name:'2', hsl:'184,56%,72%' }, { name:'3', hsl:'184,55%,59%' }, { name:'4', hsl:'185,64%,47%' }, { name:'5', hsl:'186,95%,37%' }, { name:'6', hsl:'189,96%,30%' }, { name:'7', hsl:'188,97%,24%' }, { name:'8', hsl:'188,100%,18%' }, { name:'9', hsl:'188,100%,12%' } ]
const teal   = [ { name:'0', hsl:'171,54%,93%' }, { name:'1', hsl:'170,63%,85%' }, { name:'2', hsl:'171,61%,70%' }, { name:'3', hsl:'172,59%,57%' }, { name:'4', hsl:'173,67%,46%' }, { name:'5', hsl:'174,100%,35%' }, { name:'6', hsl:'174,95%,26%' }, { name:'7', hsl:'176,98%,18%' }, { name:'8', hsl:'176,95%,14%' }, { name:'9', hsl:'177,100%,11%' } ]
const green  = [ { name:'0', hsl:'120,31%,95%' }, { name:'1', hsl:'122,51%,88%' }, { name:'2', hsl:'121,49%,76%' }, { name:'3', hsl:'124,47%,66%' }, { name:'4', hsl:'125,45%,56%' }, { name:'5', hsl:'126,47%,51%' }, { name:'6', hsl:'125,34%,47%' }, { name:'7', hsl:'127,39%,34%' }, { name:'8', hsl:'127,37%,25%' }, { name:'9', hsl:'129,42%,17%' } ]
const lg      = [ { name:'0', hsl:'85,41%,95%' }, { name:'1', hsl:'81,63%,88%' }, { name:'2', hsl:'81,56%,77%' }, { name:'3', hsl:'82,50%,66%' }, { name:'4', hsl:'83,52%,56%' }, { name:'5', hsl:'82,47%,53%' }, { name:'6', hsl:'83,38%,44%' }, { name:'7', hsl:'81,38%,31%' }, { name:'8', hsl:'79,41%,23%' }, { name:'9', hsl:'82,42%,16%' } ]
const lime   = [ { name:'0', hsl:'82,65%,94%' }, { name:'1', hsl:'79,76%,87%' }, { name:'2', hsl:'79,69%,74%' }, { name:'3', hsl:'78,62%,62%' }, { name:'4', hsl:'78,63%,51%' }, { name:'5', hsl:'75,52%,48%' }, { name:'6', hsl:'76,42%,41%' }, { name:'7', hsl:'74,38%,34%' }, { name:'8', hsl:'71,37%,27%' }, { name:'9', hsl:'69,41%,18%' } ]
const yellow = [ { name:'0', hsl:'52,83%,96%' }, { name:'1', hsl:'50,98%,90%' }, { name:'2', hsl:'48,100%,79%' }, { name:'3', hsl:'48,100%,69%' }, { name:'4', hsl:'50,100%,59%' }, { name:'5', hsl:'48,100%,49%' }, { name:'6', hsl:'46,86%,42%' }, { name:'7', hsl:'43,82%,35%' }, { name:'8', hsl:'39,81%,29%' }, { name:'9', hsl:'37,82%,21%' } ]
const amber  = [ { name:'0', hsl:'51,90%,96%' }, { name:'1', hsl:'51,88%,90%' }, { name:'2', hsl:'49,88%,80%' }, { name:'3', hsl:'47,88%,70%' }, { name:'4', hsl:'45,88%,60%' }, { name:'5', hsl:'43,88%,51%' }, { name:'6', hsl:'40,86%,42%' }, { name:'7', hsl:'37,88%,33%' }, { name:'8', hsl:'34,90%,25%' }, { name:'9', hsl:'31,93%,16%' } ]
const orange = [ { name:'0', hsl:'40,100%,96%' }, { name:'1', hsl:'41,98%,90%' }, { name:'2', hsl:'38,100%,80%' }, { name:'3', hsl:'36,99%,69%' }, { name:'4', hsl:'34,99%,60%' }, { name:'5', hsl:'32,100%,49%' }, { name:'6', hsl:'29,100%,41%' }, { name:'7', hsl:'26,100%,33%' }, { name:'8', hsl:'23,100%,25%' }, { name:'9', hsl:'21,100%,16%' } ]
const grey   = [ { name:'0', hsl:'0,0%,98%' }, { name:'1', hsl:'210,8%,91%' }, { name:'2', hsl:'206,6%,79%' }, { name:'3', hsl:'207,5%,67%' }, { name:'4', hsl:'208,4%,55%' }, { name:'5', hsl:'212,4%,44%' }, { name:'6', hsl:'213,5%,35%' }, { name:'7', hsl:'218,5%,28%' }, { name:'8', hsl:'216,6%,20%' }, { name:'9', hsl:'220,6%,13%' } ]

// Dark mode
const d_red    = [ { name:'0', hsl:'359,85%,23%' }, { name:'1', hsl:'0,80%,31%' }, { name:'2', hsl:'3,76%,40%' }, { name:'3', hsl:'5,71%,49%' }, { name:'4', hsl:'7,96%,59%' }, { name:'5', hsl:'9,96%,67%' }, { name:'6', hsl:'11,97%,75%' }, { name:'7', hsl:'13,95%,83%' }, { name:'8', hsl:'16,95%,92%' }, { name:'9', hsl:'15,100%,97%' } ]
const d_pink   = [ { name:'0', hsl:'331,86%,19%' }, { name:'1', hsl:'333,80%,28%' }, { name:'2', hsl:'335,75%,37%' }, { name:'3', hsl:'337,71%,46%' }, { name:'4', hsl:'339,82%,55%' }, { name:'5', hsl:'341,83%,64%' }, { name:'6', hsl:'343,83%,72%' }, { name:'7', hsl:'345,83%,81%' }, { name:'8', hsl:'346,83%,91%' }, { name:'9', hsl:'348,79%,96%' } ]
const d_purple = [ { name:'0', hsl:'283,72%,22%' }, { name:'1', hsl:'285,67%,28%' }, { name:'2', hsl:'287,63%,33%' }, { name:'3', hsl:'289,60%,39%' }, { name:'4', hsl:'291,56%,45%' }, { name:'5', hsl:'293,48%,54%' }, { name:'6', hsl:'295,49%,65%' }, { name:'7', hsl:'296,52%,75%' }, { name:'8', hsl:'298,53%,87%' }, { name:'9', hsl:'300,43%,95%' } ]
const d_violet = [ { name:'0', hsl:'264,63%,29%' }, { name:'1', hsl:'263,59%,35%' }, { name:'2', hsl:'262,55%,40%' }, { name:'3', hsl:'261,52%,47%' }, { name:'4', hsl:'260,55%,53%' }, { name:'5', hsl:'259,56%,61%' }, { name:'6', hsl:'258,58%,70%' }, { name:'7', hsl:'257,58%,80%' }, { name:'8', hsl:'257,59%,89%' }, { name:'9', hsl:'255,55%,96%' } ]
const d_indigo = [ { name:'0', hsl:'235,63%,24%' }, { name:'1', hsl:'234,58%,30%' }, { name:'2', hsl:'232,55%,36%' }, { name:'3', hsl:'231,52%,42%' }, { name:'4', hsl:'230,48%,48%' }, { name:'5', hsl:'229,47%,57%' }, { name:'6', hsl:'228,49%,67%' }, { name:'7', hsl:'227,50%,77%' }, { name:'8', hsl:'227,53%,88%' }, { name:'9', hsl:'229,44%,95%' } ]
const d_blue   = [ { name:'0', hsl:'215,91%,23%' }, { name:'1', hsl:'214,87%,31%' }, { name:'2', hsl:'213,81%,40%' }, { name:'3', hsl:'212,77%,49%' }, { name:'4', hsl:'211,100%,58%' }, { name:'5', hsl:'210,100%,66%' }, { name:'6', hsl:'209,100%,75%' }, { name:'7', hsl:'208,100%,83%' }, { name:'8', hsl:'207,100%,92%' }, { name:'9', hsl:'206,100%,97%' } ]
const d_lb      = [ { name:'0', hsl:'206,100%,19%' }, { name:'1', hsl:'205,100%,26%' }, { name:'2', hsl:'204,97%,34%' }, { name:'3', hsl:'203,91%,42%' }, { name:'4', hsl:'202,88%,51%' }, { name:'5', hsl:'201,88%,60%' }, { name:'6', hsl:'200,88%,70%' }, { name:'7', hsl:'199,88%,80%' }, { name:'8', hsl:'198,88%,90%' }, { name:'9', hsl:'199,90%,96%' } ]
const d_cyan   = [ { name:'0', hsl:'189,88%,13%' }, { name:'1', hsl:'189,86%,19%' }, { name:'2', hsl:'188,85%,26%' }, { name:'3', hsl:'187,83%,33%' }, { name:'4', hsl:'186,81%,40%' }, { name:'5', hsl:'185,56%,50%' }, { name:'6', hsl:'184,57%,61%' }, { name:'7', hsl:'183,59%,73%' }, { name:'8', hsl:'183,61%,86%' }, { name:'9', hsl:'184,55%,94%' } ]
const d_teal   = [ { name:'0', hsl:'177,94%,12%' }, { name:'1', hsl:'177,91%,18%' }, { name:'2', hsl:'176,89%,25%' }, { name:'3', hsl:'174,87%,31%' }, { name:'4', hsl:'173,85%,38%' }, { name:'5', hsl:'172,58%,48%' }, { name:'6', hsl:'172,56%,59%' }, { name:'7', hsl:'170,58%,72%' }, { name:'8', hsl:'169,59%,85%' }, { name:'9', hsl:'169,52%,94%' } ]
const d_green  = [ { name:'0', hsl:'130,54%,15%' }, { name:'1', hsl:'129,53%,23%' }, { name:'2', hsl:'128,51%,31%' }, { name:'3', hsl:'127,50%,39%' }, { name:'4', hsl:'126,49%,47%' }, { name:'5', hsl:'124,45%,56%' }, { name:'6', hsl:'124,47%,66%' }, { name:'7', hsl:'122,50%,77%' }, { name:'8', hsl:'122,52%,88%' }, { name:'9', hsl:'120,41%,95%' } ]
const d_lg      = [ { name:'0', hsl:'93,53%,16%' }, { name:'1', hsl:'91,52%,24%' }, { name:'2', hsl:'90,51%,32%' }, { name:'3', hsl:'90,49%,40%' }, { name:'4', hsl:'89,48%,49%' }, { name:'5', hsl:'87,47%,57%' }, { name:'6', hsl:'86,49%,67%' }, { name:'7', hsl:'86,52%,77%' }, { name:'8', hsl:'84,53%,88%' }, { name:'9', hsl:'87,44%,95%' } ]
const d_lime   = [ { name:'0', hsl:'79,92%,14%' }, { name:'1', hsl:'78,91%,22%' }, { name:'2', hsl:'77,88%,29%' }, { name:'3', hsl:'76,87%,37%' }, { name:'4', hsl:'75,85%,45%' }, { name:'5', hsl:'77,70%,55%' }, { name:'6', hsl:'79,71%,65%' }, { name:'7', hsl:'81,71%,76%' }, { name:'8', hsl:'83,71%,88%' }, { name:'9', hsl:'87,69%,95%' } ]
const d_yellow = [ { name:'0', hsl:'52,93%,17%' }, { name:'1', hsl:'51,91%,26%' }, { name:'2', hsl:'50,89%,35%' }, { name:'3', hsl:'49,87%,44%' }, { name:'4', hsl:'48,97%,53%' }, { name:'5', hsl:'50,98%,63%' }, { name:'6', hsl:'52,97%,72%' }, { name:'7', hsl:'54,98%,81%' }, { name:'8', hsl:'56,96%,91%' }, { name:'9', hsl:'57,100%,96%' } ]
const d_amber  = [ { name:'0', hsl:'31,80%,18%' }, { name:'1', hsl:'34,78%,27%' }, { name:'2', hsl:'37,76%,36%' }, { name:'3', hsl:'39,74%,45%' }, { name:'4', hsl:'43,89%,55%' }, { name:'5', hsl:'44,89%,64%' }, { name:'6', hsl:'47,89%,72%' }, { name:'7', hsl:'49,89%,82%' }, { name:'8', hsl:'51,88%,91%' }, { name:'9', hsl:'49,89%,96%' } ]
const d_orange = [ { name:'0', hsl:'20,93%,17%' }, { name:'1', hsl:'23,91%,26%' }, { name:'2', hsl:'26,89%,35%' }, { name:'3', hsl:'29,87%,45%' }, { name:'4', hsl:'32,100%,54%' }, { name:'5', hsl:'34,100%,63%' }, { name:'6', hsl:'36,100%,72%' }, { name:'7', hsl:'38,100%,82%' }, { name:'8', hsl:'40,100%,91%' }, { name:'9', hsl:'40,100%,96%' } ]
const d_grey   = [ { name:'0', hsl:'214,11%,12%' }, { name:'1', hsl:'216,10%,20%' }, { name:'2', hsl:'213,8%,28%' }, { name:'3', hsl:'210,7%,36%' }, { name:'4', hsl:'210,4%,44%' }, { name:'5', hsl:'210,4%,55%' }, { name:'6', hsl:'213,5%,67%' }, { name:'7', hsl:'206,7%,79%' }, { name:'8', hsl:'210,9%,91%' }, { name:'9', hsl:'0,0%,98%' } ]
</script>

### 红色（Red）
<Palette prefix="red" :colors="red" />

### 粉色（Pink）
<Palette prefix="pink" :colors="pink" />

### 紫色（Purple）
<Palette prefix="purple" :colors="purple" />

### 紫罗兰（Violet）
<Palette prefix="violet" :colors="violet" />

### 靛蓝（Indigo）
<Palette prefix="indigo" :colors="indigo" />

### 蓝色（Blue）
<Palette prefix="blue" :colors="blue" />

### 浅蓝（Light Blue）
<Palette prefix="light-blue" :colors="lb" />

### 青色（Cyan）
<Palette prefix="cyan" :colors="cyan" />

### 青绿（Teal）
<Palette prefix="teal" :colors="teal" />

### 绿色（Green）
<Palette prefix="green" :colors="green" />

### 浅绿（Light Green）
<Palette prefix="light-green" :colors="lg" />

### 酸橙（Lime）
<Palette prefix="lime" :colors="lime" />

### 黄色（Yellow）
<Palette prefix="yellow" :colors="yellow" />

### 琥珀（Amber）
<Palette prefix="amber" :colors="amber" />

### 橙色（Orange）
<Palette prefix="orange" :colors="orange" />

### 灰色（Grey）
<Palette prefix="grey" :colors="grey" />

## 功能色

从基础色盘中引用，应用于具体的 UI 元素。

### 主要色（primary）

主强调色，用于主操作按钮、选中态等。

### 次要色（secondary）

次强调色，用于非强调功能操作。

### 第三色（tertiary）

用于常规、非强调功能。

### 信息色（info）

表达客观、中立信息。

### 成功色（success）

表达成功、完成、开启状态。

### 警示色（warning）

表达警告、不安全状态。

### 危险色（danger）

表达危险状态。

### 文本色（text）

四个层级的文本/图标颜色，从主要到次要：

| Token | 说明 |
|---|---|
| `--dockv-color-text-0` | 最主要文本 |
| `--dockv-color-text-1` | 次主要文本 |
| `--dockv-color-text-2` | 稍次要文本 |
| `--dockv-color-text-3` | 最次要文本（占位、禁用） |

### 链接色（link）

超链接文本颜色。

### 背景色（bg）

各级背景色，暗色模式下用于区分前后层级：

| Token | 说明 |
|---|---|
| `--dockv-color-bg-0` | 最底层背景 |
| `--dockv-color-bg-1` | 次底层背景（卡片） |
| `--dockv-color-bg-2` | 悬浮态背景 |

### 填充色（fill）

用于容器背景不固定时的元素填充，如表单控件。

### 描边色（border）

界面中的描边颜色。

### 禁用色（disabled）

禁用态元素的背景、文本、描边。

### 阴影色（shadow）

通过 border 模拟的扁平阴影效果。

## 字体

### 字号

| Token | 大小 | 用途 |
|---|---|---|
| `--dockv-font-size-xs` | 12px | 辅助说明 |
| `--dockv-font-size-sm` | 14px | 正文 |
| `--dockv-font-size-md` | 16px | 小标题 |
| `--dockv-font-size-lg` | 18px | 标题 |
| `--dockv-font-size-xl` | 24px | 大标题 |

### 字重

| Token | 值 | 用途 |
|---|---|---|
| `--dockv-font-weight-normal` | 400 | 正文 |
| `--dockv-font-weight-medium` | 600 | 强调 |
| `--dockv-font-weight-bold` | 700 | 标题 |

### 字体族

```css
--dockv-font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
--dockv-font-family-mono: ui-monospace, SFMono-Regular, Consolas, monospace;
```

## 圆角

| Token | 值 | 用途 |
|---|---|---|
| `--dockv-radius-xs` | 4px | 紧凑元素 |
| `--dockv-radius-sm` | 6px | 按钮、输入框 |
| `--dockv-radius-md` | 8px | 卡片、容器 |
| `--dockv-radius-lg` | 12px | 弹窗 |
| `--dockv-radius-full` | 999px | 胶囊 |

## 阴影

| Token | 用途 |
|---|---|
| `--dockv-shadow-xs` | 轻微浮起 |
| `--dockv-shadow-sm` | 下拉面板 |
| `--dockv-shadow-md` | 弹窗/对话框 |
| `--dockv-shadow-lg` | 抽屉/侧边栏 |

## 尺寸

### 高度

| Token | 值 |
|---|---|
| `--dockv-height-xs` | 24px |
| `--dockv-height-sm` | 28px |
| `--dockv-height-md` | 32px |
| `--dockv-height-lg` | 36px |
| `--dockv-height-xl` | 40px |

### 图标尺寸

| Token | 值 |
|---|---|
| `--dockv-icon-xs` | 12px |
| `--dockv-icon-sm` | 16px |
| `--dockv-icon-md` | 20px |
| `--dockv-icon-lg` | 24px |

## 间距

| Token | 值 |
|---|---|
| `--dockv-spacing-xs` | 4px |
| `--dockv-spacing-sm` | 8px |
| `--dockv-spacing-md` | 12px |
| `--dockv-spacing-lg` | 16px |
| `--dockv-spacing-xl` | 24px |

## 动画

| Token | 值 | 用途 |
|---|---|---|
| `--dockv-duration-fast` | 100ms | 微交互 |
| `--dockv-duration-normal` | 200ms | 常规过渡 |
| `--dockv-duration-slow` | 300ms | 展开/收起 |
| `--dockv-ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | 出场 |
| `--dockv-ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | 入场 |
