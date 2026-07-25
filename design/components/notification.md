## Notification 通知组件

### 定位

`Notification` 是一个**纯命令式**的全局通知反馈组件。

通知的核心场景是：用户操作后动态弹出、自动消失，天然适合命令式调用而非预置在模板中。如果需要页面内嵌的静态警告/提示条，那是另一个组件 `<dv-alert>` 的职责。

```ts
import { Notification } from '@dockv/ui'

Notification.success({ title: '保存成功', content: '数据已保存' })
Notification.error({ title: '删除失败', content: '权限不足' })
```

### 与类似组件的边界

| 组件 | 用法 | 场景 |
|---|---|---|
| `Notification` | 命令式 `Notification.open()` | 操作反馈，全局弹出，自动消失 |
| `Alert`（未来） | 声明式 `<dv-alert>` | 页面内嵌的静态警告/提示条 |
| `Toast`（未来） | 命令式 | 轻量提示，无标题无图标，纯文字 |

### 架构

两个文件：

- **`src/notification.ts`** — `Notification` 静态类，对外暴露 API，负责容器管理、DOM 创建、堆叠排列、定时关闭、动画调度
- **`src/dv-notification.ts`** — 内部使用，不对外暴露。渲染单条通知卡片的 Lit 组件（图标、标题、内容、关闭按钮）

```
Notification.open()
  → 确保目标 position 的容器存在
  → 创建 <dockv-notification-card> 元素
  → 设置属性、事件监听
  → append 到容器
  → 触发进入动画
  → 启动 duration 定时器（duration > 0 时）
  → 返回唯一 id
```

### API

#### 静态方法

```ts
Notification.open(options) => id       // 通用打开
Notification.info(options) => id       // type = 'info'
Notification.success(options) => id    // type = 'success'
Notification.warning(options) => id    // type = 'warning'
Notification.error(options) => id      // type = 'error'
Notification.close(id)                 // 手动关闭（触发退出动画后移除 DOM）
Notification.destroyAll()              // 立即销毁所有通知
Notification.config(config)            // 全局默认配置
```

#### Options

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `title` | `string` | `''` | 通知标题 |
| `content` | `string` | `''` | 通知正文 |
| `type` | `'info'` \| `'success'` \| `'warning'` \| `'error'` | `'info'` | 通知类型，自动设置图标和颜色 |
| `duration` | `number` | `3` | 自动关闭延时（秒），设为 `0` 不自动关闭，需手动调用 `close()` |
| `position` | `'top'` \| `'topLeft'` \| `'topRight'` \| `'bottom'` \| `'bottomLeft'` \| `'bottomRight'` | `'topRight'` | 弹出位置 |
| `icon` | `string` | 按 `type` 自动 | 自定义图标，Iconify 格式（`prefix:name`）。传 `''` 可隐藏图标 |
| `showClose` | `boolean` | `true` | 是否显示关闭按钮 |
| `zIndex` | `number` | `1010` | 通知的 z-index |
| `onClick` | `() => void` | — | 点击通知体的回调 |
| `onClose` | `() => void` | — | 通知关闭时的回调（自动关闭和手动关闭都会触发） |

#### 全局配置

```ts
Notification.config({
  duration: 3,
  position: 'topRight',
  zIndex: 1010,
  top: '24px',       // 各方向的偏移量
  bottom: '24px',
  left: '24px',
  right: '24px',
})
```

### 容器与位置管理

每种 `position` 值各自对应一个 `position: fixed` 的容器 `<div>`，同一位置的多个通知在该容器内垂直堆叠。容器在第一次使用时惰性创建，挂载到 `document.body`。

- `top` / `topLeft` / `topRight` → flex column，从上到下排列
- `bottom` / `bottomLeft` / `bottomRight` → flex column-reverse，从下到上排列

通知之间间距通过 CSS `gap` 控制。

### ID 与更新

`Notification.open()` 返回一个唯一 id。支持传入已有 id 来更新通知内容（不改变位置），对标 Semi Design 的更新功能：

```ts
const id = Notification.open({ title: '处理中...', content: '正在保存', type: 'info' })
setTimeout(() => {
  Notification.open({ id, title: '处理完成', content: '数据已保存', type: 'success' })
}, 2000)
```

### 动画

动画由 `Notification` 管理器控制，不内建在 `DNotificationCard` 组件中：

- **进入**：从对应方向 slide-in + fade-in（`@keyframes` 在 `dv-notification.scss` 中定义）
- **退出**：fade-out + translate back，动画结束后从 DOM 中移除

动画时长通过 CSS 变量 `--dockv-notification-animation-duration` 控制（默认 `300ms`）。

### <dockv-notification-card> 内部组件

不对外暴露的 Lit 组件。仅作为 Notification 管理器的渲染单元使用。

#### 属性

| 属性 | 类型 | 默认值 |
|---|---|---|
| `type` | `'info'` \| `'success'` \| `'warning'` \| `'error'` | `'info'` |
| `title` | `string` | `''` |
| `content` | `string` | `''` |
| `icon` | `string` | 按 `type` 自动 |
| `showClose` | `boolean` | `true` |

#### 事件

| 事件 | 说明 |
|---|---|
| `dv-close` | 点击关闭按钮时触发，携带 `{ id }` |
| `dv-click` | 点击通知体时触发，携带 `{ id }` |

#### 内部渲染

```
┌─────────────────────────────────────────┐
│ [icon]  标题文字                    [×] │
│         正文内容描述                      │
└─────────────────────────────────────────┘
```

- 图标通过 `<dv-icon>` 渲染
- 关闭按钮通过 `<dv-button variant="ghost">` 渲染
- 标题使用 `font-weight: 600`，正文使用常规字重

### 各 type 默认配置

| type | 默认图标 | 强调色 |
|---|---|---|
| `'info'` | `material-symbols:info` | 中性色/蓝色 |
| `'success'` | `material-symbols:check-circle` | 绿色 |
| `'warning'` | `material-symbols:warning` | 橙色/黄色 |
| `'error'` | `material-symbols:error` | 红色 |

### CSS 变量

| 变量 | 说明 | 默认值 |
|---|---|---|
| `--dockv-notification-bg-color` | 背景色 | `var(--dockv-color-bg)` |
| `--dockv-notification-text-color` | 文字色 | `var(--dockv-color-text)` |
| `--dockv-notification-title-color` | 标题色 | `var(--dockv-color-text)` |
| `--dockv-notification-border-color` | 边框色 | `var(--dockv-color-border)` |
| `--dockv-notification-border-radius` | 圆角 | `var(--dockv-border-radius-medium)` |
| `--dockv-notification-shadow` | 阴影 | `0 4px 12px rgba(0, 0, 0, 0.12)` |
| `--dockv-notification-padding` | 内边距 | `14px 16px` |
| `--dockv-notification-width` | 宽度 | `320px` |
| `--dockv-notification-gap` | 通知间距 | `12px` |
| `--dockv-notification-animation-duration` | 动画时长 | `300ms` |
| `--dockv-notification-icon-size` | 图标尺寸 | `24px` |
| `--dockv-notification-close-size` | 关闭按钮尺寸 | `20px` |

### 实现要点

1. 唯一 id 生成使用自增计数器或 `crypto.randomUUID()`
2. 容器管理用 `Map<position, HTMLElement>`，确保多个通知容器互不干扰
3. `Notification.close(id)` 触发退出动画，动画结束后移除元素；`destroyAll()` 跳过动画直接移除
4. 通知 hover 时暂停自动关闭倒计时，mouseleave 时恢复（参考 Semi Design 行为）
5. 组件销毁时（unmounted）清理定时器，避免内存泄漏

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
  → 每处理完一个任务，Notification.open({ id, content: '任务 3/10...' })
  → 全部完成，Notification.open({ id, type: 'success', title: '处理完成', content: '全部 10 个任务完成' })
```
