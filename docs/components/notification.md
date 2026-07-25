---
title: Notification 通知
---

<script setup>
import { Notification } from '../../src/notification'

function showBasic() { Notification.open({ title: '通知标题', content: '这是一条通知内容' }) }
function showSuccess() { Notification.success({ title: '操作成功', content: '数据已成功保存' }) }
function showWarning() { Notification.warning({ title: '注意', content: '此操作不可逆' }) }
function showError() { Notification.error({ title: '操作失败', content: '权限不足，请联系管理员' }) }
function showInfo() { Notification.info({ title: '提示', content: '系统将在今晚维护' }) }
function showLongContent() { Notification.open({ title: '长文本通知', content: '当通知内容很长时，会自动换行显示，确保所有信息都能完整展示给用户。' }) }
function showNoClose() { Notification.open({ title: '不可关闭', content: '这条通知不显示关闭按钮', showClose: false }) }
function showCustomIcon() { Notification.open({ title: '自定义图标', content: '使用了自定义的图标', icon: 'material-symbols:favorite' }) }
function showNoIcon() { Notification.open({ title: '无图标', content: '隐藏了默认图标', icon: '' }) }
function showTopLeft() { Notification.open({ title: '左上角', content: '位于左上角', position: 'topLeft' }) }
function showTop() { Notification.open({ title: '顶部居中', content: '位于顶部居中', position: 'top' }) }
function showTopRight() { Notification.open({ title: '右上角(默认)', content: '位于右上角', position: 'topRight' }) }
function showBottomLeft() { Notification.open({ title: '左下角', content: '位于左下角', position: 'bottomLeft' }) }
function showBottom() { Notification.open({ title: '底部居中', content: '位于底部居中', position: 'bottom' }) }
function showBottomRight() { Notification.open({ title: '右下角', content: '位于右下角', position: 'bottomRight' }) }
function showSticky() { Notification.open({ title: '常驻通知', content: '这条不会自动消失，需手动关闭', duration: 0 }) }
function showUpdate() {
  const id = Notification.open({ title: '处理中...', content: '任务 1/5', type: 'info' })
  let progress = 1
  const timer = setInterval(() => {
    progress++
    if (progress > 5) {
      Notification.open({ id, title: '处理完成', content: '全部 5 个任务已完成', type: 'success' })
      clearInterval(timer)
    } else {
      Notification.open({ id, content: `任务 ${progress}/5...` })
    }
  }, 800)
}
function destroyAll() { Notification.destroyAll() }
</script>

# Notification 通知

纯命令式的全局通知反馈组件，适用于操作反馈、异步任务通知等场景。

## 基础用法

通过 `Notification` 的静态方法弹出通知。通知默认在 3 秒后自动消失，hover 时暂停倒计时。

<dv-button @dv-click="showBasic">基础通知</dv-button>

```ts
import { Notification } from '@dockv/ui'

Notification.open({ title: '通知标题', content: '这是一条通知内容' })
```

## 类型（type）

使用快捷方法或 `type` 选项定义通知类型，自动设置图标和强调色。

<div style="display: flex; gap: 8px;">
  <dv-button type="primary" @dv-click="showInfo">信息 (info)</dv-button>
  <dv-button type="success" @dv-click="showSuccess">成功 (success)</dv-button>
  <dv-button type="warning" @dv-click="showWarning">警告 (warning)</dv-button>
  <dv-button type="danger" @dv-click="showError">错误 (error)</dv-button>
</div>

```ts
Notification.info({ title: '提示', content: '系统将在今晚维护' })
Notification.success({ title: '操作成功', content: '数据已成功保存' })
Notification.warning({ title: '注意', content: '此操作不可逆' })
Notification.error({ title: '操作失败', content: '权限不足，请联系管理员' })

// 或用 open 指定 type
Notification.open({ title: '...', content: '...', type: 'success' })
```

| type | 默认图标 | 强调色 |
|---|---|---|
| `info` | `material-symbols:info` | 蓝色 |
| `success` | `material-symbols:check-circle` | 绿色 |
| `warning` | `material-symbols:warning` | 橙色 |
| `error` | `material-symbols:error` | 红色 |

## 位置（position）

通过 `position` 选项控制弹出位置。

<div style="display: flex; flex-wrap: wrap; gap: 8px;">
  <dv-button size="extra-large" @dv-click="showTopLeft">左上角</dv-button>
  <dv-button size="extra-large" @dv-click="showTop">顶部居中</dv-button>
  <dv-button size="extra-large" @dv-click="showTopRight">右上角</dv-button>
</div>
<br>
<div style="display: flex; flex-wrap: wrap; gap: 8px;">
  <dv-button size="extra-large" @dv-click="showBottomLeft">左下角</dv-button>
  <dv-button size="extra-large" @dv-click="showBottom">底部居中</dv-button>
  <dv-button size="extra-large" @dv-click="showBottomRight">右下角</dv-button>
</div>

```ts
Notification.open({ title: '左上角', content: '...', position: 'topLeft' })
Notification.open({ title: '右上角', content: '...', position: 'topRight' }) // 默认
Notification.open({ title: '底部居中', content: '...', position: 'bottom' })
```

| 值 | 说明 |
|---|---|
| `top` | 顶部居中 |
| `topLeft` | 左上角 |
| `topRight` | 右上角（**默认**） |
| `bottom` | 底部居中 |
| `bottomLeft` | 左下角 |
| `bottomRight` | 右下角 |

## 自动关闭时长（duration）

通过 `duration` 控制自动关闭延时（单位：秒）。设为 `0` 则不会自动关闭。

<dv-button @dv-click="showSticky">常驻通知 (duration=0)</dv-button>

```ts
Notification.open({ title: '常驻通知', content: '不会自动消失', duration: 0 })
Notification.open({ title: '快速消失', content: '1 秒后消失', duration: 1 })
Notification.open({ title: '长驻留', content: '10 秒后消失', duration: 10 })
```

## 图标（icon）

默认按 `type` 自动设置图标。可通过 `icon` 自定义，传 `''` 隐藏图标。

<div style="display: flex; gap: 8px;">
  <dv-button @dv-click="showCustomIcon">自定义图标</dv-button>
  <dv-button @dv-click="showNoIcon">隐藏图标</dv-button>
</div>

```ts
// 自定义图标
Notification.open({ title: '收藏', content: '...', icon: 'material-symbols:favorite' })

// 隐藏图标
Notification.open({ title: '无图标', content: '...', icon: '' })
```

## 关闭按钮（showClose）

<dv-button @dv-click="showNoClose">无关闭按钮</dv-button>

```ts
Notification.open({ title: '不可关闭', content: '...', showClose: false })
```

## 更新通知内容

`open()` 返回唯一 id，传入已有 id 可原地更新通知内容而不改变位置。

<dv-button @dv-click="showUpdate">演示进度更新</dv-button>

```ts
const id = Notification.open({ title: '处理中...', content: '任务 1/5', type: 'info' })
// ...
Notification.open({ id, title: '处理完成', content: '全部任务已完成', type: 'success' })
```

## 长文本

内容过长时自动换行。

<dv-button @dv-click="showLongContent">长文本通知</dv-button>

## 手动关闭 / 销毁全部

```ts
const id = Notification.open({ title: '...', content: '...' })
Notification.close(id)    // 触发退出动画后移除
Notification.destroyAll()  // 立即销毁所有通知（无动画）
```

<dv-button type="danger" @dv-click="destroyAll">销毁全部通知</dv-button>

## 全局配置

```ts
Notification.config({
  duration: 5,              // 默认自动关闭延时（秒）
  position: 'topRight',     // 默认弹出位置
  zIndex: 1010,             // 默认 z-index
  top: '24px',              // 距顶部偏移
  bottom: '24px',           // 距底部偏移
  left: '24px',             // 距左侧偏移
  right: '24px',            // 距右侧偏移
})
```

## 回调

```ts
Notification.open({
  title: '通知',
  content: '点击我试试',
  onClick: () => { console.log('点击了通知') },
  onClose: () => { console.log('通知已关闭') },
})
```

## API

### 静态方法

| 方法 | 说明 | 参数 | 返回值 |
|---|---|---|---|
| `open(options)` | 打开一条通知 | `NotificationOptions` | `string` id |
| `info(options)` | 打开一条 `info` 类型通知 | `string \| NotificationOptions` | `string` id |
| `success(options)` | 打开一条 `success` 类型通知 | `string \| NotificationOptions` | `string` id |
| `warning(options)` | 打开一条 `warning` 类型通知 | `string \| NotificationOptions` | `string` id |
| `error(options)` | 打开一条 `error` 类型通知 | `string \| NotificationOptions` | `string` id |
| `close(id)` | 关闭指定通知 | `string` | — |
| `destroyAll()` | 立即销毁所有通知 | — | — |
| `config(config)` | 设置全局默认配置 | `Partial<NotificationGlobalConfig>` | — |
| `count` | 当前通知数量（只读） | — | `number` |

> `info/success/warning/error` 的 `options` 可以传 `string`，此时作为 `title`。

### Options

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `id` | `string` | — | 传入已有 id 时更新该通知 |
| `title` | `string` | `''` | 标题 |
| `content` | `string` | `''` | 正文 |
| `type` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | 类型 |
| `duration` | `number` | `3` | 自动关闭延时（秒），`0` 不自动关闭 |
| `position` | `'top' \| 'topLeft' \| 'topRight' \| 'bottom' \| 'bottomLeft' \| 'bottomRight'` | `'topRight'` | 弹出位置 |
| `icon` | `string` | 按 type 自动 | 自定义 Iconify 图标，传 `''` 隐藏 |
| `showClose` | `boolean` | `true` | 是否显示关闭按钮 |
| `zIndex` | `number` | `1010` | z-index |
| `onClick` | `() => void` | — | 点击通知体的回调 |
| `onClose` | `() => void` | — | 关闭时的回调 |

### 全局配置

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `duration` | `number` | `3` | 默认自动关闭延时 |
| `position` | `NotificationPosition` | `'topRight'` | 默认弹出位置 |
| `zIndex` | `number` | `1010` | 默认 z-index |
| `top` | `string` | `'24px'` | 距顶部偏移 |
| `bottom` | `string` | `'24px'` | 距底部偏移 |
| `left` | `string` | `'24px'` | 距左侧偏移 |
| `right` | `string` | `'24px'` | 距右侧偏移 |

## CSS 变量

| 变量 | 说明 | 默认值 |
|---|---|---|
| `--dockv-notification-bg-color` | 背景色 | `var(--dockv-color-bg-2)` |
| `--dockv-notification-text-color` | 正文文字色 | `var(--dockv-color-text-1)` |
| `--dockv-notification-title-color` | 标题文字色 | `var(--dockv-color-text-0)` |
| `--dockv-notification-border-color` | 边框色 | `var(--dockv-color-border)` |
| `--dockv-notification-border-radius` | 圆角 | `var(--dockv-border-radius-medium)` |
| `--dockv-notification-shadow` | 阴影 | `0 4px 12px rgba(0, 0, 0, 0.12)` |
| `--dockv-notification-padding` | 内边距 | `14px 16px` |
| `--dockv-notification-width` | 宽度 | `320px` |
| `--dockv-notification-gap` | 通知间距 | `12px` |
| `--dockv-notification-animation-duration` | 动画时长 | `300ms` |
| `--dockv-notification-icon-size` | 图标尺寸 | `24px` |
| `--dockv-notification-close-size` | 关闭按钮尺寸 | `20px` |
