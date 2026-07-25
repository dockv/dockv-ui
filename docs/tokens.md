---
title: Tokens 设计变量
---

# Tokens 设计变量

Design Token 将设计中的基础元素与具体样式解耦。全局修改一个变量值，即可完成整个UI的视觉迭代，无需逐个组件修改。

## 基础色

包含 16 个色相 × 10 个梯度。所有功能色均从基础色中引用。

色盘存储为裸 `H,S%,L%` 三元组，使用时用 `hsl()` / `hsla()` 包裹：

```css
dv-button {
  background: hsl(var(--dockv-blue-5));
}
.badge {
  background: hsla(var(--dockv-red-5), 0.1);
}
```

<script setup>
import Palette from './.vitepress/components/Palette.vue'

const red    = [ { name:'0', hsl:'12,93%,96%', color:'#000000' }, { name:'1', hsl:'3,93%,91%', color:'#000000' }, { name:'2', hsl:'7,92%,82%', color:'#000000' }, { name:'3', hsl:'11,90%,73%', color:'#000000' }, { name:'4', hsl:'9,93%,64%', color:'#000000' }, { name:'5', hsl:'8,92%,55%', color:'#ffffff' }, { name:'6', hsl:'5,83%,46%', color:'#ffffff' }, { name:'7', hsl:'3,87%,37%', color:'#ffffff' }, { name:'8', hsl:'2,93%,29%', color:'#ffffff' }, { name:'9', hsl:'1,96%,21%', color:'#ffffff' } ]
const pink   = [ { name:'0', hsl:'349,64%,96%', color:'#000000' }, { name:'1', hsl:'348,79%,90%', color:'#000000' }, { name:'2', hsl:'345,71%,80%', color:'#000000' }, { name:'3', hsl:'343,72%,70%', color:'#000000' }, { name:'4', hsl:'341,82%,61%', color:'#ffffff' }, { name:'5', hsl:'340,83%,51%', color:'#ffffff' }, { name:'6', hsl:'338,82%,42%', color:'#ffffff' }, { name:'7', hsl:'336,86%,34%', color:'#ffffff' }, { name:'8', hsl:'334,92%,26%', color:'#ffffff' }, { name:'9', hsl:'331,98%,18%', color:'#ffffff' } ]
const purple = [ { name:'0', hsl:'300,47%,94%', color:'#000000' }, { name:'1', hsl:'300,54%,87%', color:'#000000' }, { name:'2', hsl:'297,55%,74%', color:'#000000' }, { name:'3', hsl:'295,52%,63%', color:'#000000' }, { name:'4', hsl:'293,48%,52%', color:'#ffffff' }, { name:'5', hsl:'291,47%,43%', color:'#ffffff' }, { name:'6', hsl:'289,50%,37%', color:'#ffffff' }, { name:'7', hsl:'287,53%,31%', color:'#ffffff' }, { name:'8', hsl:'285,57%,26%', color:'#ffffff' }, { name:'9', hsl:'282,61%,21%', color:'#ffffff' } ]
const violet = [ { name:'0', hsl:'275,36%,95%', color:'#000000' }, { name:'1', hsl:'274,57%,89%', color:'#000000' }, { name:'2', hsl:'266,51%,78%', color:'#000000' }, { name:'3', hsl:'265,47%,68%', color:'#000000' }, { name:'4', hsl:'263,56%,59%', color:'#ffffff' }, { name:'5', hsl:'260,56%,50%', color:'#ffffff' }, { name:'6', hsl:'259,55%,46%', color:'#ffffff' }, { name:'7', hsl:'256,53%,38%', color:'#ffffff' }, { name:'8', hsl:'254,56%,33%', color:'#ffffff' }, { name:'9', hsl:'252,59%,27%', color:'#ffffff' } ]
const indigo = [ { name:'0', hsl:'232,30%,95%', color:'#000000' }, { name:'1', hsl:'228,40%,88%', color:'#000000' }, { name:'2', hsl:'228,44%,77%', color:'#000000' }, { name:'3', hsl:'228,47%,66%', color:'#000000' }, { name:'4', hsl:'230,53%,57%', color:'#000000' }, { name:'5', hsl:'231,55%,48%', color:'#ffffff' }, { name:'6', hsl:'232,44%,41%', color:'#ffffff' }, { name:'7', hsl:'233,43%,35%', color:'#ffffff' }, { name:'8', hsl:'233,43%,30%', color:'#ffffff' }, { name:'9', hsl:'235,45%,24%', color:'#ffffff' } ]
const blue   = [ { name:'0', hsl:'212,100%,96%', color:'#000000' }, { name:'1', hsl:'210,100%,90%', color:'#000000' }, { name:'2', hsl:'210,100%,79%', color:'#000000' }, { name:'3', hsl:'209,100%,69%', color:'#000000' }, { name:'4', hsl:'210,100%,59%', color:'#000000' }, { name:'5', hsl:'216,100%,49%', color:'#ffffff' }, { name:'6', hsl:'215,100%,42%', color:'#ffffff' }, { name:'7', hsl:'214,100%,35%', color:'#ffffff' }, { name:'8', hsl:'215,100%,28%', color:'#ffffff' }, { name:'9', hsl:'216,100%,21%', color:'#ffffff' } ]
const lb      = [ { name:'0', hsl:'198,100%,95%', color:'#000000' }, { name:'1', hsl:'197,89%,89%', color:'#000000' }, { name:'2', hsl:'197,82%,78%', color:'#000000' }, { name:'3', hsl:'199,73%,67%', color:'#000000' }, { name:'4', hsl:'201,72%,57%', color:'#000000' }, { name:'5', hsl:'203,70%,49%', color:'#ffffff' }, { name:'6', hsl:'202,66%,47%', color:'#ffffff' }, { name:'7', hsl:'196,55%,41%', color:'#ffffff' }, { name:'8', hsl:'201,55%,37%', color:'#ffffff' }, { name:'9', hsl:'206,43%,33%', color:'#ffffff' } ]
const cyan   = [ { name:'0', hsl:'185,54%,94%', color:'#000000' }, { name:'1', hsl:'181,59%,85%', color:'#000000' }, { name:'2', hsl:'184,56%,72%', color:'#000000' }, { name:'3', hsl:'184,55%,59%', color:'#000000' }, { name:'4', hsl:'185,64%,47%', color:'#ffffff' }, { name:'5', hsl:'186,95%,37%', color:'#ffffff' }, { name:'6', hsl:'189,96%,30%', color:'#ffffff' }, { name:'7', hsl:'188,97%,24%', color:'#ffffff' }, { name:'8', hsl:'188,100%,18%', color:'#ffffff' }, { name:'9', hsl:'188,100%,12%', color:'#ffffff' } ]
const teal   = [ { name:'0', hsl:'171,54%,93%', color:'#000000' }, { name:'1', hsl:'170,63%,85%', color:'#000000' }, { name:'2', hsl:'171,61%,70%', color:'#000000' }, { name:'3', hsl:'172,59%,57%', color:'#000000' }, { name:'4', hsl:'173,67%,46%', color:'#ffffff' }, { name:'5', hsl:'174,100%,35%', color:'#ffffff' }, { name:'6', hsl:'174,95%,26%', color:'#ffffff' }, { name:'7', hsl:'176,98%,18%', color:'#ffffff' }, { name:'8', hsl:'176,95%,14%', color:'#ffffff' }, { name:'9', hsl:'177,100%,11%', color:'#ffffff' } ]
const green  = [ { name:'0', hsl:'120,31%,95%', color:'#000000' }, { name:'1', hsl:'122,51%,88%', color:'#000000' }, { name:'2', hsl:'121,49%,76%', color:'#000000' }, { name:'3', hsl:'124,47%,66%', color:'#000000' }, { name:'4', hsl:'125,45%,56%', color:'#000000' }, { name:'5', hsl:'126,47%,51%', color:'#ffffff' }, { name:'6', hsl:'125,34%,47%', color:'#ffffff' }, { name:'7', hsl:'127,39%,34%', color:'#ffffff' }, { name:'8', hsl:'127,37%,25%', color:'#ffffff' }, { name:'9', hsl:'129,42%,17%', color:'#ffffff' } ]
const lg      = [ { name:'0', hsl:'85,41%,95%', color:'#000000' }, { name:'1', hsl:'81,63%,88%', color:'#000000' }, { name:'2', hsl:'81,56%,77%', color:'#000000' }, { name:'3', hsl:'82,50%,66%', color:'#000000' }, { name:'4', hsl:'83,52%,56%', color:'#000000' }, { name:'5', hsl:'82,47%,53%', color:'#000000' }, { name:'6', hsl:'83,38%,44%', color:'#ffffff' }, { name:'7', hsl:'81,38%,31%', color:'#ffffff' }, { name:'8', hsl:'79,41%,23%', color:'#ffffff' }, { name:'9', hsl:'82,42%,16%', color:'#ffffff' } ]
const lime   = [ { name:'0', hsl:'82,65%,94%', color:'#000000' }, { name:'1', hsl:'79,76%,87%', color:'#000000' }, { name:'2', hsl:'79,69%,74%', color:'#000000' }, { name:'3', hsl:'78,62%,62%', color:'#000000' }, { name:'4', hsl:'78,63%,51%', color:'#ffffff' }, { name:'5', hsl:'75,52%,48%', color:'#ffffff' }, { name:'6', hsl:'76,42%,41%', color:'#ffffff' }, { name:'7', hsl:'74,38%,34%', color:'#ffffff' }, { name:'8', hsl:'71,37%,27%', color:'#ffffff' }, { name:'9', hsl:'69,41%,18%', color:'#ffffff' } ]
const yellow = [ { name:'0', hsl:'52,83%,96%', color:'#000000' }, { name:'1', hsl:'50,98%,90%', color:'#000000' }, { name:'2', hsl:'48,100%,79%', color:'#000000' }, { name:'3', hsl:'48,100%,69%', color:'#000000' }, { name:'4', hsl:'50,100%,59%', color:'#000000' }, { name:'5', hsl:'48,100%,49%', color:'#ffffff' }, { name:'6', hsl:'46,86%,42%', color:'#ffffff' }, { name:'7', hsl:'43,82%,35%', color:'#ffffff' }, { name:'8', hsl:'39,81%,29%', color:'#ffffff' }, { name:'9', hsl:'37,82%,21%', color:'#ffffff' } ]
const amber  = [ { name:'0', hsl:'51,90%,96%', color:'#000000' }, { name:'1', hsl:'51,88%,90%', color:'#000000' }, { name:'2', hsl:'49,88%,80%', color:'#000000' }, { name:'3', hsl:'47,88%,70%', color:'#000000' }, { name:'4', hsl:'45,88%,60%', color:'#000000' }, { name:'5', hsl:'43,88%,51%', color:'#ffffff' }, { name:'6', hsl:'40,86%,42%', color:'#ffffff' }, { name:'7', hsl:'37,88%,33%', color:'#ffffff' }, { name:'8', hsl:'34,90%,25%', color:'#ffffff' }, { name:'9', hsl:'31,93%,16%', color:'#ffffff' } ]
const orange = [ { name:'0', hsl:'40,100%,96%', color:'#000000' }, { name:'1', hsl:'41,98%,90%', color:'#000000' }, { name:'2', hsl:'38,100%,80%', color:'#000000' }, { name:'3', hsl:'36,99%,69%', color:'#000000' }, { name:'4', hsl:'34,99%,60%', color:'#000000' }, { name:'5', hsl:'32,100%,49%', color:'#ffffff' }, { name:'6', hsl:'29,100%,41%', color:'#ffffff' }, { name:'7', hsl:'26,100%,33%', color:'#ffffff' }, { name:'8', hsl:'23,100%,25%', color:'#ffffff' }, { name:'9', hsl:'21,100%,16%', color:'#ffffff' } ]
const grey   = [ { name:'0', hsl:'0,0%,98%', color:'#000000' }, { name:'1', hsl:'210,8%,91%', color:'#000000' }, { name:'2', hsl:'206,6%,79%', color:'#000000' }, { name:'3', hsl:'207,5%,67%', color:'#000000' }, { name:'4', hsl:'208,4%,55%', color:'#000000' }, { name:'5', hsl:'212,4%,44%', color:'#ffffff' }, { name:'6', hsl:'213,5%,35%', color:'#ffffff' }, { name:'7', hsl:'218,5%,28%', color:'#ffffff' }, { name:'8', hsl:'216,6%,20%', color:'#ffffff' }, { name:'9', hsl:'220,6%,13%', color:'#ffffff' } ]

// Dark mode
const d_red    = [ { name:'0', hsl:'359,85%,23%', color:'#ffffff' }, { name:'1', hsl:'0,80%,31%', color:'#ffffff' }, { name:'2', hsl:'3,76%,40%', color:'#ffffff' }, { name:'3', hsl:'5,71%,49%', color:'#ffffff' }, { name:'4', hsl:'7,96%,59%', color:'#000000' }, { name:'5', hsl:'9,96%,67%', color:'#000000' }, { name:'6', hsl:'11,97%,75%', color:'#000000' }, { name:'7', hsl:'13,95%,83%', color:'#000000' }, { name:'8', hsl:'16,95%,92%', color:'#000000' }, { name:'9', hsl:'15,100%,97%', color:'#000000' } ]
const d_pink   = [ { name:'0', hsl:'331,86%,19%', color:'#ffffff' }, { name:'1', hsl:'333,80%,28%', color:'#ffffff' }, { name:'2', hsl:'335,75%,37%', color:'#ffffff' }, { name:'3', hsl:'337,71%,46%', color:'#ffffff' }, { name:'4', hsl:'339,82%,55%', color:'#000000' }, { name:'5', hsl:'341,83%,64%', color:'#000000' }, { name:'6', hsl:'343,83%,72%', color:'#000000' }, { name:'7', hsl:'345,83%,81%', color:'#000000' }, { name:'8', hsl:'346,83%,91%', color:'#000000' }, { name:'9', hsl:'348,79%,96%', color:'#000000' } ]
const d_purple = [ { name:'0', hsl:'283,72%,22%', color:'#ffffff' }, { name:'1', hsl:'285,67%,28%', color:'#ffffff' }, { name:'2', hsl:'287,63%,33%', color:'#ffffff' }, { name:'3', hsl:'289,60%,39%', color:'#ffffff' }, { name:'4', hsl:'291,56%,45%', color:'#ffffff' }, { name:'5', hsl:'293,48%,54%', color:'#000000' }, { name:'6', hsl:'295,49%,65%', color:'#000000' }, { name:'7', hsl:'296,52%,75%', color:'#000000' }, { name:'8', hsl:'298,53%,87%', color:'#000000' }, { name:'9', hsl:'300,43%,95%', color:'#000000' } ]
const d_violet = [ { name:'0', hsl:'264,63%,29%', color:'#ffffff' }, { name:'1', hsl:'263,59%,35%', color:'#ffffff' }, { name:'2', hsl:'262,55%,40%', color:'#ffffff' }, { name:'3', hsl:'261,52%,47%', color:'#ffffff' }, { name:'4', hsl:'260,55%,53%', color:'#000000' }, { name:'5', hsl:'259,56%,61%', color:'#000000' }, { name:'6', hsl:'258,58%,70%', color:'#000000' }, { name:'7', hsl:'257,58%,80%', color:'#000000' }, { name:'8', hsl:'257,59%,89%', color:'#000000' }, { name:'9', hsl:'255,55%,96%', color:'#000000' } ]
const d_indigo = [ { name:'0', hsl:'235,63%,24%', color:'#ffffff' }, { name:'1', hsl:'234,58%,30%', color:'#ffffff' }, { name:'2', hsl:'232,55%,36%', color:'#ffffff' }, { name:'3', hsl:'231,52%,42%', color:'#ffffff' }, { name:'4', hsl:'230,48%,48%', color:'#ffffff' }, { name:'5', hsl:'229,47%,57%', color:'#000000' }, { name:'6', hsl:'228,49%,67%', color:'#000000' }, { name:'7', hsl:'227,50%,77%', color:'#000000' }, { name:'8', hsl:'227,53%,88%', color:'#000000' }, { name:'9', hsl:'229,44%,95%', color:'#000000' } ]
const d_blue   = [ { name:'0', hsl:'215,91%,23%', color:'#ffffff' }, { name:'1', hsl:'214,87%,31%', color:'#ffffff' }, { name:'2', hsl:'213,81%,40%', color:'#ffffff' }, { name:'3', hsl:'212,77%,49%', color:'#ffffff' }, { name:'4', hsl:'211,100%,58%', color:'#000000' }, { name:'5', hsl:'210,100%,66%', color:'#000000' }, { name:'6', hsl:'209,100%,75%', color:'#000000' }, { name:'7', hsl:'208,100%,83%', color:'#000000' }, { name:'8', hsl:'207,100%,92%', color:'#000000' }, { name:'9', hsl:'206,100%,97%', color:'#000000' } ]
const d_lb      = [ { name:'0', hsl:'206,100%,19%', color:'#ffffff' }, { name:'1', hsl:'205,100%,26%', color:'#ffffff' }, { name:'2', hsl:'204,97%,34%', color:'#ffffff' }, { name:'3', hsl:'203,91%,42%', color:'#ffffff' }, { name:'4', hsl:'202,88%,51%', color:'#ffffff' }, { name:'5', hsl:'201,88%,60%', color:'#000000' }, { name:'6', hsl:'200,88%,70%', color:'#000000' }, { name:'7', hsl:'199,88%,80%', color:'#000000' }, { name:'8', hsl:'198,88%,90%', color:'#000000' }, { name:'9', hsl:'199,90%,96%', color:'#000000' } ]
const d_cyan   = [ { name:'0', hsl:'189,88%,13%', color:'#ffffff' }, { name:'1', hsl:'189,86%,19%', color:'#ffffff' }, { name:'2', hsl:'188,85%,26%', color:'#ffffff' }, { name:'3', hsl:'187,83%,33%', color:'#ffffff' }, { name:'4', hsl:'186,81%,40%', color:'#ffffff' }, { name:'5', hsl:'185,56%,50%', color:'#ffffff' }, { name:'6', hsl:'184,57%,61%', color:'#000000' }, { name:'7', hsl:'183,59%,73%', color:'#000000' }, { name:'8', hsl:'183,61%,86%', color:'#000000' }, { name:'9', hsl:'184,55%,94%', color:'#000000' } ]
const d_teal   = [ { name:'0', hsl:'177,94%,12%', color:'#ffffff' }, { name:'1', hsl:'177,91%,18%', color:'#ffffff' }, { name:'2', hsl:'176,89%,25%', color:'#ffffff' }, { name:'3', hsl:'174,87%,31%', color:'#ffffff' }, { name:'4', hsl:'173,85%,38%', color:'#ffffff' }, { name:'5', hsl:'172,58%,48%', color:'#ffffff' }, { name:'6', hsl:'172,56%,59%', color:'#000000' }, { name:'7', hsl:'170,58%,72%', color:'#000000' }, { name:'8', hsl:'169,59%,85%', color:'#000000' }, { name:'9', hsl:'169,52%,94%', color:'#000000' } ]
const d_green  = [ { name:'0', hsl:'130,54%,15%', color:'#ffffff' }, { name:'1', hsl:'129,53%,23%', color:'#ffffff' }, { name:'2', hsl:'128,51%,31%', color:'#ffffff' }, { name:'3', hsl:'127,50%,39%', color:'#ffffff' }, { name:'4', hsl:'126,49%,47%', color:'#ffffff' }, { name:'5', hsl:'124,45%,56%', color:'#000000' }, { name:'6', hsl:'124,47%,66%', color:'#000000' }, { name:'7', hsl:'122,50%,77%', color:'#000000' }, { name:'8', hsl:'122,52%,88%', color:'#000000' }, { name:'9', hsl:'120,41%,95%', color:'#000000' } ]
const d_lg      = [ { name:'0', hsl:'93,53%,16%', color:'#ffffff' }, { name:'1', hsl:'91,52%,24%', color:'#ffffff' }, { name:'2', hsl:'90,51%,32%', color:'#ffffff' }, { name:'3', hsl:'90,49%,40%', color:'#ffffff' }, { name:'4', hsl:'89,48%,49%', color:'#ffffff' }, { name:'5', hsl:'87,47%,57%', color:'#000000' }, { name:'6', hsl:'86,49%,67%', color:'#000000' }, { name:'7', hsl:'86,52%,77%', color:'#000000' }, { name:'8', hsl:'84,53%,88%', color:'#000000' }, { name:'9', hsl:'87,44%,95%', color:'#000000' } ]
const d_lime   = [ { name:'0', hsl:'79,92%,14%', color:'#ffffff' }, { name:'1', hsl:'78,91%,22%', color:'#ffffff' }, { name:'2', hsl:'77,88%,29%', color:'#ffffff' }, { name:'3', hsl:'76,87%,37%', color:'#ffffff' }, { name:'4', hsl:'75,85%,45%', color:'#ffffff' }, { name:'5', hsl:'77,70%,55%', color:'#000000' }, { name:'6', hsl:'79,71%,65%', color:'#000000' }, { name:'7', hsl:'81,71%,76%', color:'#000000' }, { name:'8', hsl:'83,71%,88%', color:'#000000' }, { name:'9', hsl:'87,69%,95%', color:'#000000' } ]
const d_yellow = [ { name:'0', hsl:'52,93%,17%', color:'#ffffff' }, { name:'1', hsl:'51,91%,26%', color:'#ffffff' }, { name:'2', hsl:'50,89%,35%', color:'#ffffff' }, { name:'3', hsl:'49,87%,44%', color:'#ffffff' }, { name:'4', hsl:'48,97%,53%', color:'#ffffff' }, { name:'5', hsl:'50,98%,63%', color:'#000000' }, { name:'6', hsl:'52,97%,72%', color:'#000000' }, { name:'7', hsl:'54,98%,81%', color:'#000000' }, { name:'8', hsl:'56,96%,91%', color:'#000000' }, { name:'9', hsl:'57,100%,96%', color:'#000000' } ]
const d_amber  = [ { name:'0', hsl:'31,80%,18%', color:'#ffffff' }, { name:'1', hsl:'34,78%,27%', color:'#ffffff' }, { name:'2', hsl:'37,76%,36%', color:'#ffffff' }, { name:'3', hsl:'39,74%,45%', color:'#ffffff' }, { name:'4', hsl:'43,89%,55%', color:'#000000' }, { name:'5', hsl:'44,89%,64%', color:'#000000' }, { name:'6', hsl:'47,89%,72%', color:'#000000' }, { name:'7', hsl:'49,89%,82%', color:'#000000' }, { name:'8', hsl:'51,88%,91%', color:'#000000' }, { name:'9', hsl:'49,89%,96%', color:'#000000' } ]
const d_orange = [ { name:'0', hsl:'20,93%,17%', color:'#ffffff' }, { name:'1', hsl:'23,91%,26%', color:'#ffffff' }, { name:'2', hsl:'26,89%,35%', color:'#ffffff' }, { name:'3', hsl:'29,87%,45%', color:'#ffffff' }, { name:'4', hsl:'32,100%,54%', color:'#ffffff' }, { name:'5', hsl:'34,100%,63%', color:'#000000' }, { name:'6', hsl:'36,100%,72%', color:'#000000' }, { name:'7', hsl:'38,100%,82%', color:'#000000' }, { name:'8', hsl:'40,100%,91%', color:'#000000' }, { name:'9', hsl:'40,100%,96%', color:'#000000' } ]
const d_grey   = [ { name:'0', hsl:'214,11%,12%', color:'#ffffff' }, { name:'1', hsl:'216,10%,20%', color:'#ffffff' }, { name:'2', hsl:'213,8%,28%', color:'#ffffff' }, { name:'3', hsl:'210,7%,36%', color:'#ffffff' }, { name:'4', hsl:'210,4%,44%', color:'#ffffff' }, { name:'5', hsl:'210,4%,55%', color:'#000000' }, { name:'6', hsl:'213,5%,67%', color:'#000000' }, { name:'7', hsl:'206,7%,79%', color:'#000000' }, { name:'8', hsl:'210,9%,91%', color:'#000000' }, { name:'9', hsl:'0,0%,98%', color:'#000000' } ]
</script>

<div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:12px">
  <Palette prefix="red" :colors="red" />
  <Palette prefix="pink" :colors="pink" />
  <Palette prefix="purple" :colors="purple" />
  <Palette prefix="violet" :colors="violet" />
  <Palette prefix="indigo" :colors="indigo" />
  <Palette prefix="blue" :colors="blue" />
  <Palette prefix="light-blue" :colors="lb" />
  <Palette prefix="cyan" :colors="cyan" />
  <Palette prefix="teal" :colors="teal" />
  <Palette prefix="green" :colors="green" />
  <Palette prefix="light-green" :colors="lg" />
  <Palette prefix="lime" :colors="lime" />
  <Palette prefix="yellow" :colors="yellow" />
  <Palette prefix="amber" :colors="amber" />
  <Palette prefix="orange" :colors="orange" />
  <Palette prefix="grey" :colors="grey" />
</div>

## 功能色

所有功能色从基础色盘中引用，包含完整交互态（hover / active / disabled）和浅色背景版（light）。

### 主要色（primary）

主强调色，引用 `--dockv-blue` 色系。

| Token                                 | 说明              |
| ------------------------------------- | ----------------- |
| `--dockv-color-primary`               | 主色              |
| `--dockv-color-primary-hover`         | 主色 - 悬浮态     |
| `--dockv-color-primary-active`        | 主色 - 激活态     |
| `--dockv-color-primary-disabled`      | 主色 - 禁用态     |
| `--dockv-color-primary-light-default` | 浅版主色（背景）  |
| `--dockv-color-primary-light-hover`   | 浅版主色 - 悬浮态 |
| `--dockv-color-primary-light-active`  | 浅版主色 - 激活态 |

### 次要色（secondary）

次强调色，引用 `--dockv-light-blue` 色系。

| Token                                   | 说明                |
| --------------------------------------- | ------------------- |
| `--dockv-color-secondary`               | 次要色              |
| `--dockv-color-secondary-hover`         | 次要色 - 悬浮态     |
| `--dockv-color-secondary-active`        | 次要色 - 激活态     |
| `--dockv-color-secondary-disabled`      | 次要色 - 禁用态     |
| `--dockv-color-secondary-light-default` | 浅版次要色（背景）  |
| `--dockv-color-secondary-light-hover`   | 浅版次要色 - 悬浮态 |
| `--dockv-color-secondary-light-active`  | 浅版次要色 - 激活态 |

### 第三色（tertiary）

常规非强调色，引用 `--dockv-grey` 色系。

| Token                                  | 说明                |
| -------------------------------------- | ------------------- |
| `--dockv-color-tertiary`               | 第三色              |
| `--dockv-color-tertiary-hover`         | 第三色 - 悬浮态     |
| `--dockv-color-tertiary-active`        | 第三色 - 激活态     |
| `--dockv-color-tertiary-light-default` | 浅版第三色（背景）  |
| `--dockv-color-tertiary-light-hover`   | 浅版第三色 - 悬浮态 |
| `--dockv-color-tertiary-light-active`  | 浅版第三色 - 激活态 |

### 信息色（info）

客观、中立信息。

| Token                              | 说明                |
| ---------------------------------- | ------------------- |
| `--dockv-color-info`               | 信息色              |
| `--dockv-color-info-hover`         | 信息色 - 悬浮态     |
| `--dockv-color-info-active`        | 信息色 - 激活态     |
| `--dockv-color-info-disabled`      | 信息色 - 禁用态     |
| `--dockv-color-info-light-default` | 浅版信息色（背景）  |
| `--dockv-color-info-light-hover`   | 浅版信息色 - 悬浮态 |
| `--dockv-color-info-light-active`  | 浅版信息色 - 激活态 |

### 成功色（success）

安全、成功、开启状态。

| Token                                 | 说明                |
| ------------------------------------- | ------------------- |
| `--dockv-color-success`               | 成功色              |
| `--dockv-color-success-hover`         | 成功色 - 悬浮态     |
| `--dockv-color-success-active`        | 成功色 - 激活态     |
| `--dockv-color-success-disabled`      | 成功色 - 禁用态     |
| `--dockv-color-success-light-default` | 浅版成功色（背景）  |
| `--dockv-color-success-light-hover`   | 浅版成功色 - 悬浮态 |
| `--dockv-color-success-light-active`  | 浅版成功色 - 激活态 |

### 警示色（warning）

警告、不安全状态。

| Token                                 | 说明                |
| ------------------------------------- | ------------------- |
| `--dockv-color-warning`               | 警示色              |
| `--dockv-color-warning-hover`         | 警示色 - 悬浮态     |
| `--dockv-color-warning-active`        | 警示色 - 激活态     |
| `--dockv-color-warning-light-default` | 浅版警示色（背景）  |
| `--dockv-color-warning-light-hover`   | 浅版警示色 - 悬浮态 |
| `--dockv-color-warning-light-active`  | 浅版警示色 - 激活态 |

### 危险色（danger）

危险操作 / 需特别关注的信息。

| Token                                | 说明                |
| ------------------------------------ | ------------------- |
| `--dockv-color-danger`               | 危险色              |
| `--dockv-color-danger-hover`         | 危险色 - 悬浮态     |
| `--dockv-color-danger-active`        | 危险色 - 激活态     |
| `--dockv-color-danger-light-default` | 浅版危险色（背景）  |
| `--dockv-color-danger-light-hover`   | 浅版危险色 - 悬浮态 |
| `--dockv-color-danger-light-active`  | 浅版危险色 - 激活态 |

### 链接色（link）

超链接文本颜色。

| Token                        | 说明            |
| ---------------------------- | --------------- |
| `--dockv-color-link`         | 链接色          |
| `--dockv-color-link-hover`   | 链接色 - 悬浮态 |
| `--dockv-color-link-active`  | 链接色 - 激活态 |
| `--dockv-color-link-visited` | 链接色 - 已访问 |

### 文本色（text）

四个层级的文本/图标颜色。

| Token                  | 说明                     |
| ---------------------- | ------------------------ |
| `--dockv-color-text-0` | 最主要文本               |
| `--dockv-color-text-1` | 次主要文本               |
| `--dockv-color-text-2` | 稍次要文本               |
| `--dockv-color-text-3` | 最次要文本（占位、禁用） |

### 背景色（bg）

五级背景色，暗色模式下用于区分前后层级。

| Token                | 说明                         |
| -------------------- | ---------------------------- |
| `--dockv-color-bg-0` | 最下层（底部页面）           |
| `--dockv-color-bg-1` | 次下层（页面中需提升的内容） |
| `--dockv-color-bg-2` | 中间层（模态等容器）         |
| `--dockv-color-bg-3` | 次上层（通知、Toast 等）     |
| `--dockv-color-bg-4` | 最上层（特殊）               |

### 填充色（fill）

容器背景不固定时的元素填充，如表单控件。

| Token                  | 说明            |
| ---------------------- | --------------- |
| `--dockv-color-fill-0` | 填充色 - 默认态 |
| `--dockv-color-fill-1` | 填充色 - 悬浮态 |
| `--dockv-color-fill-2` | 填充色 - 激活态 |

### 描边色（border）

| Token                        | 说明         |
| ---------------------------- | ------------ |
| `--dockv-color-border`       | 默认描边色   |
| `--dockv-color-focus-border` | 聚焦态描边色 |

### 禁用色（disabled）

| Token                           | 说明          |
| ------------------------------- | ------------- |
| `--dockv-color-disabled-text`   | 禁用态 - 文字 |
| `--dockv-color-disabled-border` | 禁用态 - 描边 |
| `--dockv-color-disabled-bg`     | 禁用态 - 背景 |
| `--dockv-color-disabled-fill`   | 禁用态 - 填充 |

### 阴影

| Token                     | 说明                                  |
| ------------------------- | ------------------------------------- |
| `--dockv-shadow-elevated` | 提升层级界面（Toast、Modal、Popover） |
| `--dockv-color-shadow`    | 扁平阴影效果（模拟描边）              |

### 其他功能色

| Token                      | 说明       |
| -------------------------- | ---------- |
| `--dockv-color-white`      | 白色       |
| `--dockv-color-black`      | 黑色       |
| `--dockv-color-nav-bg`     | 导航背景色 |
| `--dockv-color-overlay-bg` | 蒙层背景色 |

## 字体排版

### 字号

`1rem = 16px` 基准。正文尺寸从 xs 到 md，h6 到 h1 为标题尺寸。

| Token                  | rem 值      | px 值 | 用途           |
| ---------------------- | ----------- | ----- | -------------- |
| `--dockv-font-size-xs` | `0.75rem`   | 12px  | 辅助说明、标签 |
| `--dockv-font-size-sm` | `0.8125rem` | 13px  | 紧凑内容       |
| `--dockv-font-size-md` | `0.875rem`  | 14px  | 正文           |
| `--dockv-font-size-h6` | `1rem`      | 16px  | 六级标题       |
| `--dockv-font-size-h5` | `1.125rem`  | 18px  | 五级标题       |
| `--dockv-font-size-h4` | `1.25rem`   | 20px  | 四级标题       |
| `--dockv-font-size-h3` | `1.5rem`    | 24px  | 三级标题       |
| `--dockv-font-size-h2` | `1.75rem`   | 28px  | 二级标题       |
| `--dockv-font-size-h1` | `2rem`      | 32px  | 一级标题       |

### 字重

| Token                        | 值    | 用途       |
| ---------------------------- | ----- | ---------- |
| `--dockv-font-weight-light`  | `200` | 极细字重   |
| `--dockv-font-weight-normal` | `400` | 正文       |
| `--dockv-font-weight-blod`   | `600` | 标题、强调 |

### 字体族

覆盖中/英/日/韩多语言场景，优先使用 Noto Sans 系列，回退到系统字体：

```css
--dockv-font-family-base:
  "Noto Sans", /* English & Number & Symbol */ "Noto Sans JP", /* 日本語 */ "Noto Sans SC",
  /* 简体中文 */ "Noto Sans TC", /* 繁体中文 */ "Noto Sans KR", /* 한국어 */ -apple-system,
  "PingFang SC", "Microsoft YaHei", "Segoe UI", sans-serif;
```

## 圆角

| Token                        | 值       | 用途                    |
| ---------------------------- | -------- | ----------------------- |
| `--dockv-border-radius-sq`   | `0`      | 直角                    |
| `--dockv-border-radius-sm`   | `3px`    | 按钮、输入框、标签      |
| `--dockv-border-radius-md`   | `6px`    | 卡片、下拉面板          |
| `--dockv-border-radius-lg`   | `10px`   | 大容器                  |
| `--dockv-border-radius-xl`   | `12px`   | 弹窗、对话框            |
| `--dockv-border-radius-cl`   | `50%`    | 圆形/半圆（头像、徽标） |
| `--dockv-border-radius-full` | `9999px` | 全胶囊（标签、按钮）    |

## 图标尺寸

| Token                  | 值     | 用途     |
| ---------------------- | ------ | -------- |
| `--dockv-icon-size-xs` | `8px`  | 极小图标 |
| `--dockv-icon-size-sm` | `12px` | 小图标   |
| `--dockv-icon-size-md` | `16px` | 常规图标 |
| `--dockv-icon-size-lg` | `20px` | 大图标   |
| `--dockv-icon-size-xl` | `24px` | 特大图标 |

## 间距

基于 `0.125rem (2px)` 倍率的间距体系。提供 11 级间距，覆盖从 0 到 2.5rem 的常用场景。

| Token                  | rem 值     | px 值 |
| ---------------------- | ---------- | ----- |
| `--dockv-spacing-none` | `0`        | 0     |
| `--dockv-spacing-3xs`  | `0.125rem` | 2px   |
| `--dockv-spacing-2xs`  | `0.25rem`  | 4px   |
| `--dockv-spacing-xs`   | `0.5rem`   | 8px   |
| `--dockv-spacing-sm`   | `0.75rem`  | 12px  |
| `--dockv-spacing-md`   | `1rem`     | 16px  |
| `--dockv-spacing-lg`   | `1.25rem`  | 20px  |
| `--dockv-spacing-xl`   | `1.5rem`   | 24px  |
| `--dockv-spacing-2xl`  | `2rem`     | 32px  |
| `--dockv-spacing-3xl`  | `2.5rem`   | 40px  |

## 层级（z-index）

| Token                         | 值     | 用途               |
| ----------------------------- | ------ | ------------------ |
| `--dockv-zindex-wallpaper`    | `-1`   | 背景元素           |
| `--dockv-zindex-notification` | `1000` | 通知、Toast 等浮层 |

## 动画

> [!note]
> 以下 Token 为规划中的设计变量，尚未在代码中落地。

| Token                     | 值                           | 用途      |
| ------------------------- | ---------------------------- | --------- |
| `--dockv-duration-fast`   | 100ms                        | 微交互    |
| `--dockv-duration-normal` | 200ms                        | 常规过渡  |
| `--dockv-duration-slow`   | 300ms                        | 展开/收起 |
| `--dockv-ease-out`        | `cubic-bezier(0, 0, 0.2, 1)` | 出场      |
| `--dockv-ease-in`         | `cubic-bezier(0.4, 0, 1, 1)` | 入场      |
