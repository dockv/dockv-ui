# Tokens 设计变量

Design Token 将设计中的基础元素与具体样式解耦。全局修改一个变量值，即可完成整个UI的视觉迭代，无需逐个组件修改。

> [!tip] 亮/暗主题预览
> 亮暗模式下分别挂载了一套色盘，方便实现亮色暗色模式的切换和针对性的设计。
>
> 关于亮暗色模式的细节，请参考全局配置中 [主题模式 (theme-mode)](./global-config.md##主题模式-theme-mode) 的部分
>
> 下方的 token 色卡会跟随主题实时变化。点击导航栏右侧的亮/暗切换按钮，或点击下面的按钮，即可对比结构色（背景、文本、填充等）在亮色与暗色模式下的不同映射。

<ThemeToggle />

## 基础色

包含 16 个色相 × 10 个梯度 + 黑白纯色。所有功能色均从基础色中引用。

色盘存储为裸 `H,S%,L%` 三元组，使用时用 `hsl()` / `hsla()` 包裹：

```css
dv-button {
  background: hsl(var(--dockv-blue-5));
}
.badge {
  background: hsla(var(--dockv-red-5), 0.1);
}
```

### 16 色盘

<script setup>
const red      = [ { name:'0', hsl:'18,89%,96%', color:'#000000' }, { name:'1', hsl:'15,96%,91%', color:'#000000' }, { name:'2', hsl:'12,96%,82%', color:'#000000' }, { name:'3', hsl:'11,94%,73%', color:'#000000' }, { name:'4', hsl:'9,95%,64%', color:'#000000' }, { name:'5', hsl:'7,95%,55%', color:'#000000' }, { name:'6', hsl:'5,82%,46%', color:'#ffffff' }, { name:'7', hsl:'3,87%,37%', color:'#ffffff' }, { name:'8', hsl:'1,93%,29%', color:'#ffffff' }, { name:'9', hsl:'359,98%,21%', color:'#ffffff' } ]
const pink     = [ { name:'0', hsl:'349,81%,96%', color:'#000000' }, { name:'1', hsl:'348,85%,90%', color:'#000000' }, { name:'2', hsl:'345,83%,80%', color:'#000000' }, { name:'3', hsl:'343,83%,70%', color:'#000000' }, { name:'4', hsl:'341,82%,61%', color:'#000000' }, { name:'5', hsl:'340,82%,52%', color:'#ffffff' }, { name:'6', hsl:'337,82%,42%', color:'#ffffff' }, { name:'7', hsl:'336,87%,34%', color:'#ffffff' }, { name:'8', hsl:'334,92%,26%', color:'#ffffff' }, { name:'9', hsl:'332,98%,18%', color:'#ffffff' } ]
const purple   = [ { name:'0', hsl:'300,47%,94%', color:'#000000' }, { name:'1', hsl:'298,56%,87%', color:'#000000' }, { name:'2', hsl:'297,53%,74%', color:'#000000' }, { name:'3', hsl:'295,52%,63%', color:'#000000' }, { name:'4', hsl:'293,50%,52%', color:'#ffffff' }, { name:'5', hsl:'291,63%,43%', color:'#ffffff' }, { name:'6', hsl:'289,68%,37%', color:'#ffffff' }, { name:'7', hsl:'287,72%,31%', color:'#ffffff' }, { name:'8', hsl:'285,77%,26%', color:'#ffffff' }, { name:'9', hsl:'283,81%,21%', color:'#ffffff' } ]
const violet   = [ { name:'0', hsl:'270,50%,95%', color:'#000000' }, { name:'1', hsl:'269,61%,89%', color:'#000000' }, { name:'2', hsl:'266,60%,78%', color:'#000000' }, { name:'3', hsl:'265,58%,68%', color:'#000000' }, { name:'4', hsl:'263,57%,59%', color:'#000000' }, { name:'5', hsl:'260,56%,50%', color:'#ffffff' }, { name:'6', hsl:'258,58%,44%', color:'#ffffff' }, { name:'7', hsl:'256,62%,38%', color:'#ffffff' }, { name:'8', hsl:'254,66%,33%', color:'#ffffff' }, { name:'9', hsl:'252,71%,27%', color:'#ffffff' } ]
const indigo   = [ { name:'0', hsl:'225,46%,95%', color:'#000000' }, { name:'1', hsl:'226,51%,88%', color:'#000000' }, { name:'2', hsl:'228,49%,77%', color:'#000000' }, { name:'3', hsl:'228,49%,66%', color:'#000000' }, { name:'4', hsl:'230,46%,57%', color:'#000000' }, { name:'5', hsl:'231,48%,48%', color:'#ffffff' }, { name:'6', hsl:'232,52%,42%', color:'#ffffff' }, { name:'7', hsl:'233,56%,35%', color:'#ffffff' }, { name:'8', hsl:'234,59%,30%', color:'#ffffff' }, { name:'9', hsl:'235,62%,24%', color:'#ffffff' } ]
const blue     = [ { name:'0', hsl:'209,100%,96%', color:'#000000' }, { name:'1', hsl:'207,96%,90%', color:'#000000' }, { name:'2', hsl:'209,96%,79%', color:'#000000' }, { name:'3', hsl:'209,96%,69%', color:'#000000' }, { name:'4', hsl:'210,96%,59%', color:'#000000' }, { name:'5', hsl:'216,100%,49%', color:'#ffffff' }, { name:'6', hsl:'213,100%,42%', color:'#ffffff' }, { name:'7', hsl:'214,100%,35%', color:'#ffffff' }, { name:'8', hsl:'214,100%,28%', color:'#ffffff' }, { name:'9', hsl:'215,100%,21%', color:'#ffffff' } ]
const lb       = [ { name:'0', hsl:'198,83%,95%', color:'#000000' }, { name:'1', hsl:'199,89%,89%', color:'#000000' }, { name:'2', hsl:'199,88%,78%', color:'#000000' }, { name:'3', hsl:'200,88%,67%', color:'#000000' }, { name:'4', hsl:'201,87%,57%', color:'#000000' }, { name:'5', hsl:'202,100%,47%', color:'#ffffff' }, { name:'6', hsl:'203,100%,40%', color:'#ffffff' }, { name:'7', hsl:'204,100%,33%', color:'#ffffff' }, { name:'8', hsl:'206,100%,26%', color:'#ffffff' }, { name:'9', hsl:'207,100%,19%', color:'#ffffff' } ]
const cyan     = [ { name:'0', hsl:'183,58%,94%', color:'#000000' }, { name:'1', hsl:'181,61%,85%', color:'#000000' }, { name:'2', hsl:'183,60%,71%', color:'#000000' }, { name:'3', hsl:'184,58%,59%', color:'#000000' }, { name:'4', hsl:'185,63%,47%', color:'#ffffff' }, { name:'5', hsl:'186,95%,37%', color:'#ffffff' }, { name:'6', hsl:'187,96%,30%', color:'#ffffff' }, { name:'7', hsl:'188,98%,24%', color:'#ffffff' }, { name:'8', hsl:'189,100%,18%', color:'#ffffff' }, { name:'9', hsl:'191,100%,12%', color:'#ffffff' } ]
const teal     = [ { name:'0', hsl:'171,54%,93%', color:'#000000' }, { name:'1', hsl:'170,62%,85%', color:'#000000' }, { name:'2', hsl:'171,59%,70%', color:'#000000' }, { name:'3', hsl:'172,58%,57%', color:'#000000' }, { name:'4', hsl:'173,67%,46%', color:'#ffffff' }, { name:'5', hsl:'174,100%,35%', color:'#ffffff' }, { name:'6', hsl:'175,100%,29%', color:'#ffffff' }, { name:'7', hsl:'176,100%,23%', color:'#ffffff' }, { name:'8', hsl:'177,100%,17%', color:'#ffffff' }, { name:'9', hsl:'178,100%,12%', color:'#ffffff' } ]
const green    = [ { name:'0', hsl:'120,41%,95%', color:'#000000' }, { name:'1', hsl:'122,52%,88%', color:'#000000' }, { name:'2', hsl:'123,49%,76%', color:'#000000' }, { name:'3', hsl:'124,48%,65%', color:'#000000' }, { name:'4', hsl:'125,46%,56%', color:'#000000' }, { name:'5', hsl:'126,50%,47%', color:'#ffffff' }, { name:'6', hsl:'127,51%,39%', color:'#ffffff' }, { name:'7', hsl:'127,53%,31%', color:'#ffffff' }, { name:'8', hsl:'129,53%,23%', color:'#ffffff' }, { name:'9', hsl:'130,56%,15%', color:'#ffffff' } ]
const lg       = [ { name:'0', hsl:'85,46%,95%', color:'#000000' }, { name:'1', hsl:'84,52%,88%', color:'#000000' }, { name:'2', hsl:'86,51%,77%', color:'#000000' }, { name:'3', hsl:'87,49%,66%', color:'#000000' }, { name:'4', hsl:'88,48%,56%', color:'#000000' }, { name:'5', hsl:'89,50%,47%', color:'#ffffff' }, { name:'6', hsl:'90,52%,39%', color:'#ffffff' }, { name:'7', hsl:'91,52%,31%', color:'#ffffff' }, { name:'8', hsl:'92,54%,23%', color:'#ffffff' }, { name:'9', hsl:'93,54%,15%', color:'#ffffff' } ]
const lime     = [ { name:'0', hsl:'84,67%,94%', color:'#000000' }, { name:'1', hsl:'83,73%,87%', color:'#000000' }, { name:'2', hsl:'81,73%,74%', color:'#000000' }, { name:'3', hsl:'79,71%,62%', color:'#000000' }, { name:'4', hsl:'78,70%,51%', color:'#ffffff' }, { name:'5', hsl:'76,100%,41%', color:'#ffffff' }, { name:'6', hsl:'77,100%,34%', color:'#ffffff' }, { name:'7', hsl:'77,100%,27%', color:'#ffffff' }, { name:'8', hsl:'78,100%,20%', color:'#ffffff' }, { name:'9', hsl:'80,100%,14%', color:'#ffffff' } ]
const yellow   = [ { name:'0', hsl:'54,100%,96%', color:'#000000' }, { name:'1', hsl:'56,96%,90%', color:'#000000' }, { name:'2', hsl:'54,96%,79%', color:'#000000' }, { name:'3', hsl:'52,96%,69%', color:'#000000' }, { name:'4', hsl:'50,96%,59%', color:'#000000' }, { name:'5', hsl:'48,100%,49%', color:'#ffffff' }, { name:'6', hsl:'49,100%,41%', color:'#ffffff' }, { name:'7', hsl:'50,100%,33%', color:'#ffffff' }, { name:'8', hsl:'51,100%,25%', color:'#ffffff' }, { name:'9', hsl:'52,100%,16%', color:'#ffffff' } ]
const amber    = [ { name:'0', hsl:'51,90%,96%', color:'#000000' }, { name:'1', hsl:'51,88%,90%', color:'#000000' }, { name:'2', hsl:'49,88%,80%', color:'#000000' }, { name:'3', hsl:'47,88%,70%', color:'#000000' }, { name:'4', hsl:'45,88%,60%', color:'#000000' }, { name:'5', hsl:'43,88%,51%', color:'#ffffff' }, { name:'6', hsl:'40,86%,42%', color:'#ffffff' }, { name:'7', hsl:'37,88%,33%', color:'#ffffff' }, { name:'8', hsl:'34,90%,25%', color:'#ffffff' }, { name:'9', hsl:'31,93%,16%', color:'#ffffff' } ]
const orange   = [ { name:'0', hsl:'40,100%,96%', color:'#000000' }, { name:'1', hsl:'41,96%,90%', color:'#000000' }, { name:'2', hsl:'38,98%,80%', color:'#000000' }, { name:'3', hsl:'36,97%,69%', color:'#000000' }, { name:'4', hsl:'34,98%,60%', color:'#000000' }, { name:'5', hsl:'32,100%,49%', color:'#ffffff' }, { name:'6', hsl:'29,100%,41%', color:'#ffffff' }, { name:'7', hsl:'26,100%,33%', color:'#ffffff' }, { name:'8', hsl:'23,100%,25%', color:'#ffffff' }, { name:'9', hsl:'21,100%,16%', color:'#ffffff' } ]
const grey     = [ { name:'0', hsl:'0,0%,98%', color:'#000000' }, { name:'1', hsl:'210,9%,91%', color:'#000000' }, { name:'2', hsl:'206,7%,79%', color:'#000000' }, { name:'3', hsl:'213,5%,67%', color:'#000000' }, { name:'4', hsl:'210,4%,55%', color:'#000000' }, { name:'5', hsl:'210,4%,44%', color:'#ffffff' }, { name:'6', hsl:'210,7%,36%', color:'#ffffff' }, { name:'7', hsl:'213,8%,28%', color:'#ffffff' }, { name:'8', hsl:'216,10%,20%', color:'#ffffff' }, { name:'9', hsl:'214,11%,12%', color:'#ffffff' } ]

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
  <Palette prefix="red" :colors="red" :dark-colors="d_red" />
  <Palette prefix="pink" :colors="pink" :dark-colors="d_pink" />
  <Palette prefix="purple" :colors="purple" :dark-colors="d_purple" />
  <Palette prefix="violet" :colors="violet" :dark-colors="d_violet" />
  <Palette prefix="indigo" :colors="indigo" :dark-colors="d_indigo" />
  <Palette prefix="blue" :colors="blue" :dark-colors="d_blue" />
  <Palette prefix="light-blue" :colors="lb" :dark-colors="d_lb" />
  <Palette prefix="cyan" :colors="cyan" :dark-colors="d_cyan" />
  <Palette prefix="teal" :colors="teal" :dark-colors="d_teal" />
  <Palette prefix="green" :colors="green" :dark-colors="d_green" />
  <Palette prefix="light-green" :colors="lg" :dark-colors="d_lg" />
  <Palette prefix="lime" :colors="lime" :dark-colors="d_lime" />
  <Palette prefix="yellow" :colors="yellow" :dark-colors="d_yellow" />
  <Palette prefix="amber" :colors="amber" :dark-colors="d_amber" />
  <Palette prefix="orange" :colors="orange" :dark-colors="d_orange" />
  <Palette prefix="grey" :colors="grey" :dark-colors="d_grey" />
</div>

### 黑白纯色

| Token                                      | 说明 |
| ------------------------------------------ | ---- |
| <ColorToken token="--dockv-color-white" /> | 白色 |
| <ColorToken token="--dockv-color-black" /> | 黑色 |

## 功能色

所有功能色从基础色盘中引用，包含完整交互态（hover / active / disabled）和浅色背景版（light）。

### 主要色（primary）

主强调色

| Token                                                     | 说明                       |
| --------------------------------------------------------- | -------------------------- |
| <ColorToken token="--dockv-color-primary" />              | 主要色                     |
| <ColorToken token="--dockv-color-primary-hover" />        | 主要色 - 悬浮态            |
| <ColorToken token="--dockv-color-primary-active" />       | 主要色 - 激活态            |
| <ColorToken token="--dockv-color-primary-disabled" />     | 主要色 - 禁用态            |
| <ColorToken token="--dockv-color-primary-light" />        | 主要色 - 浅色版本          |
| <ColorToken token="--dockv-color-primary-light-hover" />  | 主要色 - 浅色版本 - 悬浮态 |
| <ColorToken token="--dockv-color-primary-light-active" /> | 主要色 - 浅色版本 - 激活态 |

### 次要色（secondary）

次强调色

| Token                                                       | 说明                       |
| ----------------------------------------------------------- | -------------------------- |
| <ColorToken token="--dockv-color-secondary" />              | 次要色                     |
| <ColorToken token="--dockv-color-secondary-hover" />        | 次要色 - 悬浮态            |
| <ColorToken token="--dockv-color-secondary-active" />       | 次要色 - 激活态            |
| <ColorToken token="--dockv-color-secondary-disabled" />     | 次要色 - 禁用态            |
| <ColorToken token="--dockv-color-secondary-light" />        | 次要色 - 浅色版本          |
| <ColorToken token="--dockv-color-secondary-light-hover" />  | 次要色 - 浅色版本 - 悬浮态 |
| <ColorToken token="--dockv-color-secondary-light-active" /> | 次要色 - 浅色版本 - 激活态 |

### 第三色（tertiary）

常规非强调色

| Token                                                      | 说明                       |
| ---------------------------------------------------------- | -------------------------- |
| <ColorToken token="--dockv-color-tertiary" />              | 第三色                     |
| <ColorToken token="--dockv-color-tertiary-hover" />        | 第三色 - 悬浮态            |
| <ColorToken token="--dockv-color-tertiary-active" />       | 第三色 - 激活态            |
| <ColorToken token="--dockv-color-tertiary-disabled" />     | 第三色 - 禁用态            |
| <ColorToken token="--dockv-color-tertiary-light" />        | 第三色 - 浅色版本          |
| <ColorToken token="--dockv-color-tertiary-light-hover" />  | 第三色 - 浅色版本 - 悬浮态 |
| <ColorToken token="--dockv-color-tertiary-light-active" /> | 第三色 - 浅色版本 - 激活态 |

### 信息色（info）

客观、中立信息。

| Token                                                  | 说明                       |
| ------------------------------------------------------ | -------------------------- |
| <ColorToken token="--dockv-color-info" />              | 信息色                     |
| <ColorToken token="--dockv-color-info-hover" />        | 信息色 - 悬浮态            |
| <ColorToken token="--dockv-color-info-active" />       | 信息色 - 激活态            |
| <ColorToken token="--dockv-color-info-disabled" />     | 信息色 - 禁用态            |
| <ColorToken token="--dockv-color-info-light" />        | 信息色 - 浅色版本          |
| <ColorToken token="--dockv-color-info-light-hover" />  | 信息色 - 浅色版本 - 悬浮态 |
| <ColorToken token="--dockv-color-info-light-active" /> | 信息色 - 浅色版本 - 激活态 |

### 成功色（success）

安全、成功、开启状态。

| Token                                                     | 说明                       |
| --------------------------------------------------------- | -------------------------- |
| <ColorToken token="--dockv-color-success" />              | 成功色                     |
| <ColorToken token="--dockv-color-success-hover" />        | 成功色 - 悬浮态            |
| <ColorToken token="--dockv-color-success-active" />       | 成功色 - 激活态            |
| <ColorToken token="--dockv-color-success-disabled" />     | 成功色 - 禁用态            |
| <ColorToken token="--dockv-color-success-light" />        | 成功色 - 浅色版本          |
| <ColorToken token="--dockv-color-success-light-hover" />  | 成功色 - 浅色版本 - 悬浮态 |
| <ColorToken token="--dockv-color-success-light-active" /> | 成功色 - 浅色版本 - 激活态 |

### 警示色（warning）

警告、不安全状态。

| Token                                                     | 说明                       |
| --------------------------------------------------------- | -------------------------- |
| <ColorToken token="--dockv-color-warning" />              | 警示色                     |
| <ColorToken token="--dockv-color-warning-hover" />        | 警示色 - 悬浮态            |
| <ColorToken token="--dockv-color-warning-active" />       | 警示色 - 激活态            |
| <ColorToken token="--dockv-color-warning-disabled" />     | 警示色 - 禁用态            |
| <ColorToken token="--dockv-color-warning-light" />        | 警示色 - 浅色版本          |
| <ColorToken token="--dockv-color-warning-light-hover" />  | 警示色 - 浅色版本 - 悬浮态 |
| <ColorToken token="--dockv-color-warning-light-active" /> | 警示色 - 浅色版本 - 激活态 |

### 危险色（danger）

危险操作 / 需特别关注的信息。

| Token                                                    | 说明                       |
| -------------------------------------------------------- | -------------------------- |
| <ColorToken token="--dockv-color-danger" />              | 危险色                     |
| <ColorToken token="--dockv-color-danger-hover" />        | 危险色 - 悬浮态            |
| <ColorToken token="--dockv-color-danger-active" />       | 危险色 - 激活态            |
| <ColorToken token="--dockv-color-danger-disabled" />     | 危险色 - 禁用态            |
| <ColorToken token="--dockv-color-danger-light" />        | 危险色 - 浅色版本          |
| <ColorToken token="--dockv-color-danger-light-hover" />  | 危险色 - 浅色版本 - 悬浮态 |
| <ColorToken token="--dockv-color-danger-light-active" /> | 危险色 - 浅色版本 - 激活态 |

## 中性色

这类颜色大多数不会随着色盘的变化而变化，使用着确定不变的颜色值。

### 文本色（text）

四个层级的文本/图标颜色。

| Token                                       | 说明       |
| ------------------------------------------- | ---------- |
| <ColorToken token="--dockv-color-text-0" /> | 最主要文本 |
| <ColorToken token="--dockv-color-text-1" /> | 次主要文本 |
| <ColorToken token="--dockv-color-text-2" /> | 稍次要文本 |
| <ColorToken token="--dockv-color-text-3" /> | 最次要文本 |

### 背景色（bg）

五级背景色，暗色模式下用于区分前后层级。

| Token                                     | 说明                         |
| ----------------------------------------- | ---------------------------- |
| <ColorToken token="--dockv-color-bg-0" /> | 最下层（底部页面）           |
| <ColorToken token="--dockv-color-bg-1" /> | 次下层（页面中需提升的内容） |
| <ColorToken token="--dockv-color-bg-2" /> | 中间层（模态等容器）         |
| <ColorToken token="--dockv-color-bg-3" /> | 次上层（通知、Toast 等）     |
| <ColorToken token="--dockv-color-bg-4" /> | 最上层（特殊）               |

### 填充色（fill）

容器背景不固定时的元素填充，如表单控件。

| Token                                       | 说明            |
| ------------------------------------------- | --------------- |
| <ColorToken token="--dockv-color-fill-0" /> | 填充色 - 默认态 |
| <ColorToken token="--dockv-color-fill-1" /> | 填充色 - 悬浮态 |
| <ColorToken token="--dockv-color-fill-2" /> | 填充色 - 激活态 |

### 描边色（border）

| Token                                       | 说明       |
| ------------------------------------------- | ---------- |
| <ColorToken token="--dockv-color-border" /> | 默认描边色 |

## 字体排版

### 字号

`1rem = 16px` 基准。正文尺寸从 xs 到 md，h6 到 h1 为标题尺寸。

| Token                                                                     | rem 值      | px 值  | 用途           |
| ------------------------------------------------------------------------- | ----------- | ------ | -------------- |
| <FontToken type="size" token="--dockv-font-size-xs" text="样例文字 Aa" /> | `0.75rem`   | `12px` | 辅助说明、标签 |
| <FontToken type="size" token="--dockv-font-size-sm" text="样例文字 Aa" /> | `0.8125rem` | `13px` | 紧凑内容       |
| <FontToken type="size" token="--dockv-font-size-md" text="样例文字 Aa" /> | `0.875rem`  | `14px` | 正文           |
| <FontToken type="size" token="--dockv-font-size-h6" text="样例文字 Aa" /> | `1rem`      | `16px` | 六级标题       |
| <FontToken type="size" token="--dockv-font-size-h5" text="样例文字 Aa" /> | `1.125rem`  | `18px` | 五级标题       |
| <FontToken type="size" token="--dockv-font-size-h4" text="样例文字 Aa" /> | `1.25rem`   | `20px` | 四级标题       |
| <FontToken type="size" token="--dockv-font-size-h3" text="样例文字 Aa" /> | `1.5rem`    | `24px` | 三级标题       |
| <FontToken type="size" token="--dockv-font-size-h2" text="样例文字 Aa" /> | `1.75rem`   | `28px` | 二级标题       |
| <FontToken type="size" token="--dockv-font-size-h1" text="样例文字 Aa" /> | `2rem`      | `32px` | 一级标题       |

### 字重

| Token                                                                             | 默认值 | 用途       |
| --------------------------------------------------------------------------------- | ------ | ---------- |
| <FontToken type="weight" token="--dockv-font-weight-light" text="样例文字 Aa" />  | `200`  | 极细字重   |
| <FontToken type="weight" token="--dockv-font-weight-normal" text="样例文字 Aa" /> | `400`  | 正文       |
| <FontToken type="weight" token="--dockv-font-weight-bold" text="样例文字 Aa" />   | `600`  | 标题、强调 |

### 字体族

覆盖中/日/英/韩多语言场景，优先使用 `Noto Sans` 系列，回退到系统字体：

```css
--dockv-font-family-base:
  "Noto Sans", /* English & Number & Symbol */ 
  "Noto Sans JP", /* 日本語 */ 
  "Noto Sans SC", /* 简体中文 */ 
  "Noto Sans TC", /* 繁体中文 */ 
  "Noto Sans KR", /* 한국어 */ 
  -apple-system,
  "PingFang SC", 
  "Microsoft YaHei", 
  "Segoe UI", 
  sans-serif;
```

## 圆角

| Token                                              | 默认值   |
| -------------------------------------------------- | -------- |
| <RadiusToken token="--dockv-border-radius-sq" />   | `0`      |
| <RadiusToken token="--dockv-border-radius-sm" />   | `3px`    |
| <RadiusToken token="--dockv-border-radius-md" />   | `6px`    |
| <RadiusToken token="--dockv-border-radius-lg" />   | `10px`   |
| <RadiusToken token="--dockv-border-radius-xl" />   | `12px`   |
| <RadiusToken token="--dockv-border-radius-cl" />   | `50%`    |
| <RadiusToken token="--dockv-border-radius-full" /> | `9999px` |

## 图标尺寸

| Token                                          | 值     |
| ---------------------------------------------- | ------ |
| <IconSizeToken token="--dockv-icon-size-xs" /> | `10px` |
| <IconSizeToken token="--dockv-icon-size-sm" /> | `14px` |
| <IconSizeToken token="--dockv-icon-size-md" /> | `18px` |
| <IconSizeToken token="--dockv-icon-size-lg" /> | `22px` |
| <IconSizeToken token="--dockv-icon-size-xl" /> | `26px` |

## 间距

| Token                                                     | rem 值     | px 值  |
| --------------------------------------------------------- | ---------- | ------ |
| <SpacingToken token="--dockv-spacing-none" value="0" />   | `0`        | `0`    |
| <SpacingToken token="--dockv-spacing-3xs" value="2px" />  | `0.125rem` | `2px`  |
| <SpacingToken token="--dockv-spacing-2xs" value="4px" />  | `0.25rem`  | `4px`  |
| <SpacingToken token="--dockv-spacing-xs" value="8px" />   | `0.5rem`   | `8px`  |
| <SpacingToken token="--dockv-spacing-sm" value="12px" />  | `0.75rem`  | `12px` |
| <SpacingToken token="--dockv-spacing-md" value="16px" />  | `1rem`     | `16px` |
| <SpacingToken token="--dockv-spacing-lg" value="20px" />  | `1.25rem`  | `20px` |
| <SpacingToken token="--dockv-spacing-xl" value="24px" />  | `1.5rem`   | `24px` |
| <SpacingToken token="--dockv-spacing-2xl" value="32px" /> | `2rem`     | `32px` |
| <SpacingToken token="--dockv-spacing-3xl" value="40px" /> | `2.5rem`   | `40px` |
