### 定位

`Notification` 是一个**纯命令式**的全局通知反馈组件。

通知的核心场景是：用户操作后动态弹出、自动消失，天然适合命令式调用而非预置在模板中。如果需要页面内嵌的静态警告/提示条，那是另一个组件 `<dv-alert>` 的职责。

```ts
import { Notification } from "@dockv/ui";

Notification.success({ title: "保存成功", content: "数据已保存" });
Notification.error({ title: "删除失败", content: "权限不足" });
```

### 与类似组件的边界

| 组件           | 用法                         | 场景                                 |
| -------------- | ---------------------------- | ------------------------------------ |
| `Notification` | 命令式 `Notification.open()` | 操作反馈，全局弹出，自动消失         |
| `Alert`        | 声明式 `<dv-alert>`          | 页面内嵌的静态警告/提示条            |
| `Toast`        | 命令式 `Toast.open()`        | 轻量提示，无标题，目标容器可以自定义 |

### 架构

单文件 `src/components/notification.ts`：

- 导出静态类 `Notification`：对外暴露 API，负责容器管理、DOM 创建、堆叠排列、定时关闭、动画调度
- 导出卡片组件 `NotificationCard`（Lit，标签 `<dv-notification>`），渲染单条通知（图标、标题、内容、关闭按钮）。通常由 `Notification` 内部驱动，也开放导出以便单独预览、测试与二次组合

```
Notification.open()
  → 确保目标 position 的容器存在
  → 创建 <dv-notification> 元素
  → 设置属性、事件监听
  → append 到容器
  → 触发进入动画
  → 启动 duration 定时器（duration > 0 时）
  → 返回唯一 id
```

### API

#### 静态方法

```ts
Notification.open(options) => id       // 新建通知，返回 id
Notification.info(options) => id       // type = 'info'
Notification.success(options) => id    // type = 'success'
Notification.warning(options) => id    // type = 'warning'
Notification.error(options) => id      // type = 'error'
Notification.update(id, options)       // 更新指定通知（部分配置，只改传入字段；options 不含 id）
Notification.close(id)                 // 手动关闭（触发退出动画后移除 DOM）
Notification.destroyAll()              // 立即销毁所有通知
Notification.config(config)            // 全局默认配置
```

#### Options

| 属性           | 类型                                                                                                            | 默认值         | 说明                                                                                                                                                                                                                |
| -------------- | --------------------------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`           | `string`                                                                                                        | 自动生成       | 自定义通知 id；不传则由管理器自动生成。仅创建时生效，供 `update()` / `close()` 定位使用，不可通过 `update` 修改；与现存 id 重复时抛错                                                                               |
| `title`        | `string`                                                                                                        | `''`           | 通知标题                                                                                                                                                                                                            |
| `content`      | `string` \| `Node` \| `TemplateResult`                                                                          | `''`           | 通知正文。`string` 纯文本；`Node`（含 `HTMLElement`，原生 DOM，**零 lit 依赖**，通用写法）；`TemplateResult`（Lit `html\`...\``）仅当项目装有 lit 时可用                                                            |
| `type`         | `'info'` \| `'success'` \| `'warning'` \| `'error'`                                                             | —（不设置）    | 通知类型，自动设置图标和颜色；**不设置时无图标**（除非显式传 `icon`）、强调色使用第三色（tertiary）                                                                                                                 |
| `color`        | `string`                                                                                                        | —              | 自定义强调色，覆盖 `type` 默认配色。非空字符串生效（语义同按钮 `color`）：影响图标色、soft 背景/边框、进度条等，标题/正文文字保持常规色                                                                             |
| `variant`      | `'normal'` \| `'soft'`                                                                                          | `'normal'`     | 视觉变体。`'normal'`（普通）：白/中性背景 + 细边框；`'soft'`（多彩）：浅色背景 + 强调色边框 + 强调色图标，文字保持 normal 样式                                                                                      |
| `duration`     | `number`                                                                                                        | `3000`         | 自动关闭延时（毫秒），设为 `0` 不自动关闭，需手动调用 `close()`                                                                                                                                                     |
| `position`     | `'top'` \| `'topLeft'` \| `'topRight'` \| `'bottom'` \| `'bottomLeft'` \| `'bottomRight'`                       | `'topRight'`   | 弹出位置                                                                                                                                                                                                            |
| `icon`         | `string` \| `false`                                                                                             | 按 `type` 自动 | 自定义图标，Iconify 格式（`prefix:name`）。`false` 显式隐藏图标；`''` 显示 type 默认图标                                                                                                                            |
| `showClose`    | `boolean`                                                                                                       | `true`         | 是否显示关闭按钮                                                                                                                                                                                                    |
| `progress`     | `boolean` \| `{ color?: string \| Array<{ color: string; percentage: number }>; position?: 'top' \| 'bottom' }` | `true`         | 默认开启，显示与 `duration` 匹配的倒计时进度条；`false` 关闭。传入对象可自定义，`color` 覆盖 type 状态色（支持按百分比分档），`position` 控制进度条在卡片顶部或底部（默认底部）。`duration` 为 `0` 时自动降级不显示 |
| `pauseOnHover` | `boolean`                                                                                                       | `true`         | hover 时同时暂停自动关闭计时器与进度条；为 `false` 时两者照常运行                                                                                                                                                   |
| `zIndex`       | `number`                                                                                                        | `1010`         | 通知的 z-index                                                                                                                                                                                                      |
| `onClick`      | `() => void`                                                                                                    | —              | 点击通知体的回调                                                                                                                                                                                                    |
| `onClose`      | `() => void`                                                                                                    | —              | 通知关闭时的回调（自动关闭和手动关闭都会触发）                                                                                                                                                                      |

#### 全局配置

`Notification.config()` 统一入口，可配置所有全局默认值；未传入的字段保持原值。这些默认值也是 `Notification.open()` 未传对应参数时的兜底值。

```ts
Notification.config({
  duration: 3000,
  position: "topRight",
  zIndex: 1010,
  // 各方向的偏移量（按 position 选择性生效，见"容器与位置管理"）
  top: "24px",
  bottom: "24px",
  left: "24px",
  right: "24px",

  variant: "normal",        // 默认视觉变体
  showClose: true,          // 默认显示关闭按钮
  progress: true,           // 默认显示进度条
  pauseOnHover: true,       // 默认 hover 暂停
  
  // 各 type 的全局默认图标映射（按 type 浅合并，允许只覆盖部分 type）
  icon: {
    info: "material-symbols:info-rounded",
    success: "material-symbols:check-circle-rounded",
    warning: "material-symbols:warning-rounded",
    error: "material-symbols:error-rounded",
  },
});
```

##### 字段说明

| 字段                    | 类型                                        | 默认值       | 生效时机                          |
| ----------------------- | ------------------------------------------- | ------------ | --------------------------------- |
| `duration`              | `number`                                    | `3000`       | 新建通知（open 未传 duration 时） |
| `position`              | `NotificationPosition`                      | `'topRight'` | 新建通知 + 已存在容器同步移动     |
| `zIndex`                | `number`                                    | `1010`       | 已存在容器同步更新                |
| `top/bottom/left/right` | `string`                                    | `'24px'`     | 已存在容器同步更新                |
| `variant`               | `'normal' \| 'soft'`                        | `'normal'`   | 只影响新建通知                    |
| `showClose`             | `boolean`                                   | `true`       | 只影响新建通知                    |
| `progress`              | `boolean`                                   | `true`       | 只影响新建通知                    |
| `pauseOnHover`          | `boolean`                                   | `true`       | 只影响新建通知                    |
| `icon`                  | `Partial<Record<NotificationType, string>>` | 内建图标表   | 只影响新建通知（图标解析时读取）  |

> **实例级默认（variant / showClose / progress / pauseOnHover）** 只影响之后新建的通知，不回头修改已存在的实例；**容器级（position / zIndex / 偏移量）** 会同步更新已创建的容器。

##### 图标三级解析

新建通知时图标按以下优先级取：`open({ icon })` 显式传入 > `config({ icon })` 全局映射 > `TYPE_DEFAULT_ICONS` 内建默认表。

```ts
// render 中（NotificationCard）
const iconName =
  this.icon === false ? "" : this.icon || (this.type ? globalConfig.icon[this.type] : "");
```

`globalConfig.icon` 初始为 `TYPE_DEFAULT_ICONS` 的副本，`config({ icon })` 传入时与现有映射浅合并（`{ ...old, ...new }`），因此可只覆盖部分 type。

### 容器与位置管理

每种 `position` 值各自对应一个 `position: fixed` 的容器 `<div>`，同一位置的多个通知在该容器内垂直堆叠。容器在第一次使用时惰性创建，挂载到 `document.body`。

| position      | 水平对齐（`align-items`） | 堆叠方向（`flex-direction`） |
| ------------- | ------------------------- | ---------------------------- |
| `topLeft`     | `flex-start`              | `column`（从上到下）         |
| `top`         | `center`                  | `column`（从上到下）         |
| `topRight`    | `flex-end`                | `column`（从上到下）         |
| `bottomLeft`  | `flex-start`              | `column-reverse`（从下到上） |
| `bottom`      | `center`                  | `column-reverse`（从下到上） |
| `bottomRight` | `flex-end`                | `column-reverse`（从下到上） |

通知之间间距通过 CSS `gap` 控制。

### ID 与更新

`Notification.open()` 返回一个唯一 id，用于定位该条通知。id 仅在创建时生效：`open` 传入的自定义 id 若与当前列表中的某条重复，直接抛出错误（不静默更新，也不覆盖）。更新内容统一走 `update(id, options)`——同一函数不承担"新建 + 更新"两种语义，保证接口职责单一、行为统一。`update` 的 options 为部分配置（`Omit<Partial<NotificationOptions>, 'id'>`）：不含 `id` 位，只应用传入的字段，未传字段保持原值，通知位置不变：

```ts
const id = Notification.open({ title: "处理中...", content: "正在保存", type: "info" });
setTimeout(() => {
  Notification.update(id, { title: "处理完成", content: "数据已保存", type: "success" });
}, 2000);
```

### 动画

动画由 `Notification` 管理器控制，不内建在 `NotificationCard` 组件中（`@keyframes` 在 `notification.scss` 中定义）。

进入与退出拆分为两套独立的时长与缓动，避免退出拖沓：

- **进入**：从对应方向 slide-in + fade-in，用 `--dockv-notification-animation-duration` + `--dockv-notification-animation-easing`
- **退出**：fade-out + translate back，用 `--dockv-notification-animation-exit-duration` + `--dockv-notification-animation-exit-easing`
- 滑入距离由 `--dockv-notification-animation-offset` 控制（方向由 position 决定，容器内按上/下/左/右取正反号）

缓动默认一对：进入用 ease-out（由快渐慢，出门感觉更丝滑），退出用 ease-in（由慢渐快，消失得更果断），符合视觉直觉。

### <dv-notification> 卡片组件

对外导出（模块 + `src/index.ts` 均导出 `NotificationCard`，自定义元素标签 `<dv-notification>`）。设计上作为 Notification 管理器的渲染单元，也可单独使用、预览与测试。

#### 属性

| 属性        | 类型                                                        | 默认值         |
| ----------- | ----------------------------------------------------------- | -------------- |
| `type`      | `''` \| `'info'` \| `'success'` \| `'warning'` \| `'error'` | `''`           |
| `color`     | `string`                                                    | —              |
| `variant`   | `'normal'` \| `'soft'`                                      | `'normal'`     |
| `title`     | `string`                                                    | `''`           |
| `content`   | `string` \| `Node` \| `TemplateResult`                      | `''`           |
| `icon`      | `string` \| `false`                                         | 按 `type` 自动 |
| `showClose` | `boolean`                                                   | `true`         |
| `progress`  | `boolean`                                                   | `true`         |

#### 事件

| 事件       | 说明                              |
| ---------- | --------------------------------- |
| `dv-close` | 点击关闭按钮时触发，携带 `{ id }` |
| `dv-click` | 点击通知体时触发，携带 `{ id }`   |

#### 内部渲染

```
┌─────────────────────────────────────────┐
│ [icon]  标题文字                     [×] │
│         正文内容描述                      │
├─────────────────────────────────────────┤
└─────────────────────────────────────────┘        ← 底部进度条（默认显示，随倒计时缩至 0；progress: false 隐藏）
```

- 图标通过 `<dv-icon>` 渲染
- 关闭按钮通过 `<dv-button variant="ghost">` 渲染
- 标题使用 `font-weight: 600`，正文使用常规字重

### 各 type 默认配置

| type        | 默认图标                                | 强调色             |
| ----------- | --------------------------------------- | ------------------ |
| —（不设置） | 无                                      | 第三色（tertiary） |
| `'info'`    | `material-symbols:info-rounded`         | 主要色（primary）  |
| `'success'` | `material-symbols:check-circle-rounded` | 成功色（success）  |
| `'warning'` | `material-symbols:warning-rounded`      | 警示色（warning）  |
| `'error'`   | `material-symbols:error-rounded`        | 危险色（danger）   |

### 视觉变体（variant）

`variant` 与 `type` 正交：`type` 定语义与强调色，`variant` 定卡片的底色与边框形态，两者该分离就分离，避免借鉴按钮时走样。

| 部位      | `normal`（普通，默认）                        | `soft`（多彩）               |
| --------- | --------------------------------------------- | ---------------------------- |
| 背景      | `var(--dockv-color-bg-3)`（不透明层级背景）   | 强调色约 10% 叠加到 `bg-3`   |
| 边框      | `--dockv-notification-border-color`（细边框） | type 强调色                  |
| 图标      | type 强调色                                   | type 强调色                  |
| 标题/正文 | `var(--dockv-color-text-0)` 常规文字色        | 与 normal 相同（文字不改色） |

> [!WARNING]
>
> #### 背景必须取层级化不透明 token，禁用 `fill-*`
>
> 通知是 `z-index` 最顶层的浮层。`--dockv-color-fill-*` 是**半透明**填充（亮色黑色 alpha、暗色白色 alpha），供给 hover/激活等叠色用的；若用它当卡片底色，底层内容会透上来、显示受阻。普通模式背景必须用 `--dockv-color-bg-{level}`，选 `bg-3`（正是注释里"通知、Toast"那一级）；其在暗色模式下逐级变浅，天然区分层级。soft 的浅背景同样要保持不透明：用强调色 `color-mix` 叠加到 `bg-3`，而不是叠加到透明上。

写法与按钮 `variant` 心智一致（`soft` 同为"边框 + 浅背景"表现层）。外围 SCSS 用 `.dockv-notification-normal` / `.dockv-notification-soft` 两个 class 切换背景 / 边框变量。遵循按钮的设计边界：`variant` 只承载基础视觉表现层，更多风格交给上层组合，不无脑膨胀。

整体强调色可用 `color` 属性覆盖（语义同按钮 `color`），在非空时覆盖 `type` 默认强调色，一并作用到图标、soft 背景/边框、进度条默认色等；标题/正文文字不动。实现为注入内联 `<style>` + `color-mix()` 派生各级颜色（btn/u 与按钮一致）。`progress.color` 是更细的局部覆盖，只改进度条、优先级高于 `color`。

### 进度条（progress）

进度条**默认开启**：卡片**底部**显示一条随 `duration` 倒计时的进度条，直观看清还剩多少停留时间。通过 `progress: false` 关闭；传对象可自定义——`progress.position` 可切到**顶部**，兼作主题装饰线。

```ts
// 用法一：默认开启（progress 默认为 true），颜色取 type 强调色
Notification.success({ title: "保存成功", duration: 3000 });

// 用法二：传对象自定义颜色（覆盖 type 状态色，支持按百分比分档）+ 置顶
Notification.info({
  title: "渐变进度",
  progress: {
    position: "top",
    color: [
      { color: "#f56c6c", percentage: 20 },
      { color: "#e6a23c", percentage: 40 },
      { color: "#5cb87a", percentage: 60 },
      { color: "#1989fa", percentage: 80 },
      { color: "#6f7ad3", percentage: 100 },
    ],
  },
});
```

- `progress` 默认 `true` → 显示进度条，颜色默认取 type 强调色，位置默认底部；`false` 关闭
- `progress: { color, position }` → `color` 覆盖 type 状态色（支持按百分比分档或单个颜色）；`position` 为 `'bottom'`（默认）或 `'top'`
- `duration` 为 `0`（不自动关闭）时没有倒计时可显示，进度条**自动降级为不显示**
- `pauseOnHover: true`（默认）时 hover 同时暂停计时器与进度条；`false` 时两者照常推进

**实现**：进度条不内建私有动画，由 `Notification` 管理器按倒计时刷新宽度。在卡片根节点用 CSS 变量 `--dockv-notification-progress`（`0–100%`）驱动进度宽度、`--dockv-notification-progress-color` 驱动颜色、`--dockv-notification-progress-position`（`'top'` / `'bottom'`）驱动位置。分档色由管理器把当前百分比映射到对应色值后再写入。hover 暂停就是暂停倒计时刷新（不再更新该变量），与计时器共用同一 `pauseOnHover` 判定，天然保持一致。

### 实现要点

1. 唯一 id 生成使用自增计数器或 `crypto.randomUUID()`；`open` 校验自定义 id 与现存列表冲突，重复则抛错
2. 容器管理用 `Map<position, HTMLElement>`，确保多个通知容器互不干扰
3. `Notification.close(id)` 触发退出动画，动画结束后移除元素；`destroyAll()` 跳过动画直接移除
4. `Notification.update(id, options)` 按 id 定位卡片（id 不存在则抛错），浅合并部分配置后触发重渲染；传入 `duration` 时重置该条倒计时与进度条
5. `pauseOnHover` 为 `true`（默认）时，hover（进入卡片）同时暂停自动关闭倒计时与进度条，mouseleave 恢复；为 `false` 时两者照常运行（参考 Element Plus 行为）
6. 组件销毁时（unmounted）清理定时器，避免内存泄漏

### 富内容 content

`content` 支持传原生 DOM 节点（`Node`）或 lit 模板（`TemplateResult`），可自由组合组件与文本。

```js
// 零 lit 依赖的通用写法（推荐）：传原生 DOM 节点
const wrap = document.createElement("div");
wrap.style.display = "flex";
wrap.style.alignItems = "center";
wrap.style.gap = "8px";

const img = document.createElement("img");
img.src = "/avatar.png";
img.style.width = "20px";
img.style.borderRadius = "50%";
wrap.append(img, document.createTextNode("头像已更新"));

Notification.info({ title: "头像已更新", content: wrap, duration: 0 });

// 若项目装有 lit（本库 peer 依赖），可更省事地传 TemplateResult
import { html } from "lit";

Notification.info({
  title: "更新提示",
  content: html`
    <div style="display:flex;align-items:center;gap:8px">
      <dv-icon name="material-symbols:info-outline"></dv-icon>
      <span>发现新版本 <b>v2.4.0</b></span>
    </div>
  `,
  duration: 0,
});
```

### 应用案例

```
用户点击"保存"
  → Notification.success({ title: '保存成功', content: '配置文件已更新' })
  → 右上角滑入一条绿色通知
  → 3 秒后自动消失

用户点击"删除"
  → Notification.error({ title: '删除失败', content: '权限不足，请联系管理员' })
  → 右上角滑入一条红色通知，hover 暂停倒计时
  → 用户点击关闭按钮或 3 秒后自动消失

后台任务场景
  → id = Notification.info({ title: '正在处理', content: '任务 1/10...' })
  → 每处理完一个任务，Notification.update(id, { content: '任务 3/10...' })
  → 全部完成，Notification.update(id, { type: 'success', title: '处理完成', content: '全部 10 个任务完成' })
```

### 已知渲染特性：进度条宽度的亚像素边缘

> **说明**：这是浏览器渲染的固有特性，非组件缺陷，主流组件库（Element Plus、Arco Design 等）的进度条同样存在，默认接受、不做特殊处理。

**现象**：同 `duration`、几乎同时创建的多条通知，进度条看起来"有粗有细"（在 100% 缩放下较明显；125% 缩放时因像素网格对齐侥幸消除，属偶然，不代表修复）。

**成因**：进度条宽度 `width: var(--dockv-notification-progress)` 由每帧写入的**剩余百分比**（剩余 / duration）驱动。`320px（卡片固定宽） × 剩余百分比` 几乎总为非整数像素（如 33.3% → 106.56px），落在半个像素上时，浏览器只能以**半透明单个像素反锯齿**凑数，该边缘即显得淡/细。不同通知同瞬间的剩余百分比不同，边缘淡化程度各异，遂见"粗细不一"。

**结论**：无法从样式层彻底消除；高度 3px 为整数像素不受影响，被观察到的"粗/细"是横向边缘锯齿。若未来要在特定缩放对齐，可考虑更复杂的边缘对齐方案，但收益低、不建议。

### 查询当前存活通知：`get(id)` / `getAll()`

**动机**：调用方需要知道"页面上还挂着几条通知"、"某条提示还剩多少时长"等运行时状态，但不应触碰内部 `instances` 表，也不应拿到实例引用（避免破坏封装、造成内存耦合）。故对外暴露**只读快照**查询接口。

**快照类型**（新建，字段聚焦"查询/排障"，不下放内容、回调等重量级或副作用字段）：

```ts
/** 通知运行时快照（只读，供查询/排障，不含实例引用） */
export interface NotificationSnapshot {
  /** 通知 id */
  id: string;
  /** 标题（从卡片元素实时读取） */
  title: string;
  /** 自动关闭延时（ms）；0 表示不自动关闭 */
  duration: number;
  /** 剩余毫秒（倒计时），调用时刻采样，非实时 */
  remaining: number;
  /** 弹出位置 */
  position: NotificationPosition;
}
```

**字段取舍说明**：

- `title` 恒为 `string`：不传 title 时返回空字符串 `""`，不做归一处理（`element.title` 默认即 `""`），调用方如需判空用 `!snapshot.title`。同理 `element.type` 默认也是 `""`。
- `remaining` 为**取值瞬间**的采样值（每帧 `updateProgress` 已在更新 `instance.remaining`，`getAll` 零新增计时逻辑，直接采出）；若需实时推送需事件机制，不在本 API 范围。
- **不下放** `content`（可能是 DOM/模板，浅拷贝反而误导）、**不下放** `onClick`/`onClose`（内部回调，暴露有副作用风险）。

**接口形状**：`get(id): NotificationSnapshot | undefined`（单查，`instances.get` 直接命中，简洁直白）+ `getAll(): NotificationSnapshot[]`（遍历 `instances` 采出一次浅拷贝数组）。

**典型用法**：

```ts
// 页面上还剩几条通知
const count = Notification.getAll().length;

// 某条通知还剩多少毫秒
const n = Notification.get("dockv-notification-3");
n?.remaining; // 剩余 ms
```
