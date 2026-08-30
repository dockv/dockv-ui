---
title: Notification 通知
---

# Notification 通知

全局通知反馈组件，用于用户操作后的动态提示。**纯命令式调用**，无需预置在模板中，通知会自动弹出并在停留后消失。

<script setup lang="ts">
import { Notification } from "../../src/index.ts";
import { html } from "lit";
import { ref } from "vue";

function showDomContent() {
  // 原生 DOM 节点（通用写法，不依赖 lit）
  const wrap = document.createElement("div");
  wrap.innerHTML = `
    <img src="/logo.png" style="width:64px; height:64px; display:block">
    DockV UI
  `;
  Notification.info({ title: "原生 DOM 节点", content: wrap });
}

function showTemplateContent() {
  // lit 模板（项目装有 lit 时更省事）
  Notification.info({
    title: "Lit 模板",
    content: html`
      <div style="display:flex;align-items:center;gap:8px;">
        <p></p><span>发现 DockV UI 新版本 <b>v2.4.0</b></span>
      </div>
      <div style="display:flex;align-items:center;">
        <dv-button variant="ghost" size="xs" @dv-click="">查看详情</dv-button>
        <dv-button variant="ghost" size="xs" @dv-click="">一会再看</dv-button>
      </div>
    `,
    variant: "soft",
    duration: 5000,
  });
}

function runUpdateDemo() {
  // 模拟后台任务：每 400ms 就地更新一次内容，完成后切换为 success
  const id = Notification.info({ title: "正在处理", content: "任务 1/10...", duration: 0 });
  let i = 1;
  const timer = setInterval(() => {
    i++;
    if (i > 10) {
      clearInterval(timer);
      Notification.update(id, {
        type: "success",
        title: "处理完成",
        content: "全部 10 个任务完成",
        duration: 3000,
      });
    } else {
      Notification.update(id, { content: `任务 ${i}/10...` });
    }
  }, 500);
}

let demoNotifId = "";
// 记录当前批次生成的通知 id（重新生成前先把上一批全部关掉）
let demoNotifIds = [];

function openDemoNotif() {
  // 重新生成前，先关掉上一批通知
  for (const id of demoNotifIds) {
    Notification.close(id);
  }
  demoNotifIds = [];

  // 生成多条不自动关闭的通知，其中一条是"特殊"通知（单独关闭的目标）
  demoNotifIds.push(Notification.open({ title: "第一条", content: "不会自动关闭", duration: 0 }));
  demoNotifIds.push(Notification.open({ title: "第二条", content: "也不会自动关闭", duration: 0 }));
  demoNotifId = Notification.open({
    title: "特殊的一条",
    content: "可点右侧按钮单独关闭我",
    type: "warning",
    duration: 0,
  });
  demoNotifIds.push(demoNotifId);
  demoNotifIds.push(Notification.open({ title: "第三条", content: "也不会自动关闭", duration: 0 }));
}

function closeDemoNotif() {
  // 只关闭特殊那条，其余不受影响
  Notification.close(demoNotifId);
}

// —— 回调演示：在页面上累计显示回调触发次数（移动端无需开控制台） ——
const clickCount = ref(0);
const closeCount = ref(0);

function openCallbackDemo() {
  clickCount.value = 0;
  closeCount.value = 0;
  Notification.success({
    title: "保存成功",
    content: "点击通知体或等它关闭，看下方计数变化",
    duration: 0, // 不自动关闭，方便手动点击通知体触发 onClick
    onClick: () => {
      clickCount.value++;
    },
    onClose: () => {
      closeCount.value++;
    },
  });
}

function openDuplicateIdDemo() {
  // 重复 id 演示：第一次 open 正常，第二次用同一 id 抛错，捕获后弹条错误通知
  try {
    Notification.open({ id: "dup-demo", title: "第一条", duration: 10000 });
    Notification.open({ id: "dup-demo", title: "重复 id" }); // 第二次：同 id 冲突即抛错
  } catch (err) {
    console.error(err);
    const message = err instanceof Error ? err.message : String(err);
    Notification.error({ title: "捕获到错误", content: message, duration: 5000 });
  }
}

function getAllDemo() {
  // 演示 get/getAll：生成几条固定时长通知，延迟后查询并弹窗打印所有快照
  const id = Notification.info({ id: "snap-demo", title: "待处理任务", content: "剩余 8s", duration: 12000 });
  Notification.open({ title: "无标题通知测试", content: "检测 title 为空串", duration: 6000 });
  // 等 1s，让上面几条全部入场后再查询，避免结果通知被新通知挤走或互相遮挡
  setTimeout(() => {
    const all = Notification.getAll();
    // 用 lit 模板实现真正的 DOM 逐行换行（`<br>` 字符串在富文本中不会换行）
    const list = all.map(
      (n) => html`<p>[${n.id}]<br>- title="${n.title}"<br>- remaining=${n.remaining}ms<br>- position ${n.position}</p>`,
    );
    Notification.warning({
      title: `get/getAll 结果：存活 ${all.length} 条`,
      content: html`${list}` || "（无存活通知）",
      duration: 6000,
    });
    console.table(all); // 额外在控制台打印全部快照，便于核对
  }, 1000);
}
</script>

## 基础用法

使用 `Notification.success()` 等方法即可弹出一条通知，默认出现在**右上角**，3 秒后自动消失。

<div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
  <dv-button type="primary" variant="neutral" @dv-click="Notification.info({ title: '提示', content: '这是一条普通通知' })">普通提示</dv-button>
  <dv-button type="success" variant="neutral" @dv-click="Notification.success({ title: '保存成功', content: '配置文件已更新' })">保存成功</dv-button>
  <dv-button type="warning" variant="neutral" @dv-click="Notification.warning({ title: '警告', content: '请注意' })">警告</dv-button>
  <dv-button type="danger" variant="neutral" @dv-click="Notification.error({ title: '删除失败', content: '权限不足' })">删除失败</dv-button>
</div>

```js
import { Notification } from "dockv-ui";

Notification.info({ title: "提示", content: "这是一条普通通知" });
Notification.success({ title: "保存成功", content: "配置文件已更新" });
Notification.warning({ title: "警告", content: "请注意" });
Notification.error({ title: "删除失败", content: "权限不足" });
```

## 类型（type）

使用 `type` 定义通知的语义色与默认图标。**不设置 `type` 时**：无图标（除非显式传 `icon`），颜色使用第三色（tertiary，灰色）。

<div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
  <dv-button type="tertiary" variant="neutral" @dv-click="Notification.open({ title: '不设置', content: '无图标，灰色第三色' })">不设置</dv-button>
  <dv-button type="primary" variant="neutral" icon="material-symbols:info-rounded" @dv-click="Notification.info({ title: 'Info', content: '中性提示' })">info</dv-button>
  <dv-button type="success" variant="neutral" icon="material-symbols:check-circle-rounded" @dv-click="Notification.success({ title: 'Success', content: '操作成功' })">success</dv-button>
  <dv-button type="warning" variant="neutral" icon="material-symbols:warning-rounded" @dv-click="Notification.warning({ title: 'Warning', content: '请注意' })">warning</dv-button>
  <dv-button type="danger" variant="neutral" icon="material-symbols:error-rounded"  @dv-click="Notification.error({ title: 'Error', content: '操作失败' })">error</dv-button>
</div>

```typescript
Notification.open({ title: "不设置", content: "静默类型，第三色（灰色），无图标" });
Notification.open({ type: "info", title: "Info", content: "中性类型，主要色" });
Notification.open({ type: "success", title: "Success", content: "成功类型，成功色（绿色）" });
Notification.open({ type: "warning", title: "Warning", content: "警告类型，警示色（橙黄色）" });
Notification.open({ type: "error", title: "Error", content: "错误类型，危险色（红色）" });
```

| 值          | 说明        | 默认图标 (iconify 名称)                 | 强调色 |
| ----------- | ----------- | --------------------------------------- | ------ |
| —（不设置） | 静默        | 无图标                                  | 第三色 |
| `info`      | 中性        | `material-symbols:info-rounded`         | 主要色 |
| `success`   | 成功 / 完成 | `material-symbols:check-circle-rounded` | 成功色 |
| `warning`   | 警告 / 注意 | `material-symbols:warning-rounded`      | 警示色 |
| `error`     | 错误 / 失败 | `material-symbols:error-rounded`        | 危险色 |

> [!TIP]
> 每种 type 还提供对应快捷方法：`Notification.info()` / `success()` / `warning()` / `error()`，等价于 `open({ type: '…' })`。想不带图标的中性通知，直接用 `Notification.open({ title, content })` 即可。
>
> ```typescript
> Notification.info({ title: "Info | 中性类型", content: "主要色" });
> Notification.success({ title: "Success | 成功类型", content: "成功色（绿色）" });
> Notification.warning({ title: "Warning | 警告类型", content: "警示色（橙黄色）" });
> Notification.error({ title: "Error | 错误类型", content: "危险色（红色）" });
> ```

## 视觉变体（variant）

`variant` 控制卡片底色与边框形态，与 `type`（语义色）正交。

- **`normal`（默认）**：不透明黑白纯色背景 + 细边框 + 阴影。

  <dv-notification type="success" variant="normal" title="普通模式" content="白/中性背景"></dv-notification>

- **`soft`（多彩）**：强调色浅背景 + 强调色边框 + 强调色图标，文字保持常规色。

  <dv-notification type="success" variant="soft" title="多彩模式" content="浅色背景 + 强调色边框"></dv-notification>

<br>

<div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
  <dv-button type="success" variant="neutral" @dv-click="Notification.success({ title: '普通模式', content: '白/中性背景' })">normal</dv-button>
  <dv-button type="success" variant="soft" @dv-click="Notification.success({ title: '多彩模式', content: '浅色背景 + 强调色边框', variant: 'soft' })">soft</dv-button>
</div>

```js
Notification.success({ title: "普通模式", content: "白/中性背景", variant: "normal" });
Notification.success({ title: "多彩模式", content: "浅色背景 + 强调色边框", variant: "soft" });
```

## 颜色（color）

用 `color` 属性指定自定义强调色，覆盖 `type` 默认配色。指定后，图标、soft 背景与边框、进度条统一换上该颜色，标题与正文文字保持常规色。

`color` 支持任意合法 CSS 颜色值（`HEX`、`RGB`、`HSL`、命名颜色等），也支持 CSS 变量（如色盘预设 `var(--dockv-color-*)`）。

soft 背景与边框基于该颜色自动混色生成，无需额外配置：

<div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
  <dv-button color="#39C5BB" variant="neutral" @dv-click="Notification.info({ title: '自定义绿色', content: '覆盖默认蓝色', color: '#39C5BB' })">初音未来绿</dv-button>
  <dv-button color="#6f7ad3" variant="soft" @dv-click="Notification.info({ title: '自定义紫色（多彩模式）', content: '背景/边框随 color 变化', color: '#6f7ad3', variant: 'soft' })">自定义紫（多彩模式）</dv-button>
</div>

```js
Notification.info({ title: "自定义青色", content: "覆盖默认蓝色", color: "#39C5BB" });
Notification.info({
  title: "自定义紫色（soft）",
  content: "背景/边框随 color 变化",
  color: "#6f7ad3",
  variant: "soft",
});
```

## 图标（icon）

默认按 `type` 自动匹配图标；可用 `icon` 属性指定 Iconify 图标（`prefix:name`）覆盖。要隐藏图标，**显式传 `false`**（传空字符串时：有 `type` 用 type 默认图标，无 `type` 则不显示图标）。

<div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
  <dv-button type="tertiary" variant="soft" icon="svg-spinners:bars-scale-fade" square @dv-click="Notification.open({ title: '自定义图标', content: 'icon 属性覆盖默认图标', icon: 'svg-spinners:bars-scale-fade', variant: 'soft' })"></dv-button>
  <dv-button type="danger" variant="neutral" icon="logos:npm" @dv-click="Notification.error({ title: '自定义图标', content: 'icon 属性覆盖默认图标', icon: 'logos:npm' })"></dv-button>
  <dv-button type="success" variant="neutral" icon="material-symbols:rocket-launch" @dv-click="Notification.success({ title: '自定义图标', content: 'icon 属性覆盖默认图标', icon: 'material-symbols:rocket-launch' })">自定义图标</dv-button>
  <dv-button variant="neutral" @dv-click="Notification.info({ title: '隐藏图标', content: 'icon: false', icon: false })">隐藏图标</dv-button>
</div>

```js
Notification.open({
  title: "自定义图标",
  content: "icon 属性覆盖默认图标",
  icon: "svg-spinners:bars-scale-fade",
  variant: "soft",
});
Notification.error({
  title: "自定义图标",
  content: "icon 属性覆盖默认图标",
  icon: "logos:npm",
});
Notification.success({
  title: "自定义图标",
  content: "icon 属性覆盖默认图标",
  icon: "material-symbols:rocket-launch",
});

// 隐藏图标
Notification.info({ title: "隐藏图标", content: "icon: false", icon: false });
```

## 批量修改圆角

通知卡片默认圆角走的是 CSS 变量 `--dockv-notification-border-radius`（默认引用 `--dockv-border-radius-md`），CSS 变量可穿透 Shadow DOM 继承，因此批量修改**无需改动组件代码**：

```css
dv-notification {
  --dockv-notification-border-radius: 8px !important;
}
```

> [!INFO] 为何需要 !important
> 组件内部 `:host` 已把默认值定在宿主上，优先级是类级别（0,1,0），裸写 `dv-notification`（元素级别 0,0,1）压不住，需 `!important` 或更高优先级的选择器。

## 位置（position）

通过 `position` 控制通知出现的角落，共六个位置。下面用浏览器视口模拟**桌面端**与**移动端**，点击视口中的位置点，通知即在该角落弹出，并实时示意落位。

<NotificationPositionDemo />

<br>

<div style="display: flex; flex-wrap: wrap; gap: 8px">
  <dv-button type="primary" variant="neutral" style="flex: 1 1 30%" @dv-click="Notification.info({ title: '左上角', content: 'topLeft', position: 'topLeft' })">topLeft</dv-button>
  <dv-button type="primary" variant="neutral" style="flex: 1 1 30%" @dv-click="Notification.info({ title: '顶部居中', content: '默认位置', position: 'top' })">top</dv-button>
  <dv-button type="primary" variant="neutral" style="flex: 1 1 30%" @dv-click="Notification.info({ title: '右上角', content: 'topRight', position: 'topRight' })">topRight</dv-button>
  <dv-button type="primary" variant="neutral" style="flex: 1 1 30%" @dv-click="Notification.info({ title: '左下角', content: 'bottomLeft', position: 'bottomLeft' })">bottomLeft</dv-button>
  <dv-button type="primary" variant="neutral" style="flex: 1 1 30%" @dv-click="Notification.info({ title: '底部居中', content: '默认位置', position: 'bottom' })">bottom</dv-button>
  <dv-button type="primary" variant="neutral" style="flex: 1 1 30%" @dv-click="Notification.info({ title: '右下角', content: 'bottomRight', position: 'bottomRight' })">bottomRight</dv-button>
</div>

```js
Notification.info({ title: "左上角", content: "position 指定弹出角落", position: "topLeft" });
Notification.info({ title: "顶部居中", content: "position 指定弹出角落", position: "top" });
Notification.info({ title: "右上角", content: "position 指定弹出角落", position: "topRight" });
Notification.info({ title: "左下角", content: "position 指定弹出角落", position: "bottomLeft" });
Notification.info({ title: "底部居中", content: "position 指定弹出角落", position: "bottom" });
Notification.info({ title: "右下角", content: "position 指定弹出角落", position: "bottomRight" });
```

| 值            | 说明     | 实际生效的偏移     |
| ------------- | -------- | ------------------ |
| `top`         | 顶部居中 | `top`              |
| `topLeft`     | 左上角   | `top` + `left`     |
| `topRight`    | 右上角   | `top` + `right`    |
| `bottom`      | 底部居中 | `bottom`           |
| `bottomLeft`  | 左下角   | `bottom` + `left`  |
| `bottomRight` | 右下角   | `bottom` + `right` |

> [!INFO] 堆叠行为
> 同一位置的通知会垂直堆叠：顶部位置**新的贴顶**（旧的下移），底部位置**新的贴底**（旧的上移）。

## 停留与进度条（duration / progress）

- `duration` 控制自动关闭延时（毫秒），默认 `3000`；设为 `0` 表示不自动关闭。
- `progress` 进度条**默认开启**，显示剩余停留时间；`false` 关闭。传入对象 `{ color?, position? }` 可自定义：`color` 传单个颜色（覆盖 type 默认色）或按百分比分档的颜色数组；`position` 为 `'top'` / `'bottom'`（默认底部）。当 `duration` 为 `0`（不自动关闭）时没有任何倒计时可展示，进度条**自动降级为不显示**。

<div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
  <dv-button type="success" variant="neutral" @dv-click="Notification.success({ title: '保存成功', content: '默认 3 秒自动关闭' })">默认进度条</dv-button>
  <dv-button color="#39C5BB" variant="neutral" @dv-click="Notification.info({ title: '置顶进度条', content: html`兼作主题装饰线。<br>并且可以自定义颜色。`,duration: 4500, progress: { position: 'top', color: '#39C5BB' } })">置顶 + 自定义色</dv-button>
  <dv-button
    color="#fff" variant="ghost"
    style="background: linear-gradient(to right, #f56c6c, #e6a23c, #5cb87a, #1989fa, #6f7ad3); border-radius: 3px;"
    @dv-click="Notification.info({ title: '分档颜色', content: '随剩余时间（进度）变色', color: '#39c5bb', duration: 6000, progress: { color: [{ color: '#f56c6c', percentage: 20 }, { color: '#e6a23c', percentage: 40 }, { color: '#5cb87a', percentage: 60 }, { color: '#1989fa', percentage: 80 }, { color: '#6f7ad3', percentage: 100 }] } })">分档颜色</dv-button>
  <dv-button variant="neutral" type="warning" @dv-click="Notification.warning({ title: '无进度条', content: 'progress: false', progress: false })">关闭进度条</dv-button>
  <dv-button variant="neutral" type="danger" @dv-click="Notification.error({ title: '不自动关闭', content: 'duration: 0，需手动关闭', duration: 0 })">不自动关闭</dv-button>
</div>

```js
Notification.success({ title: "保存成功", content: "默认 3 秒自动关闭" });

Notification.info({
  title: "置顶进度条",
  content: "兼作主题装饰线",
  progress: { position: "top", color: "#39C5BB" },
});

Notification.info({
  title: "分档颜色",
  content: "随剩余时间（进度）变色",
  duration: 6000,
  progress: {
    color: [
      { color: "#f56c6c", percentage: 20 },
      { color: "#e6a23c", percentage: 40 },
      { color: "#5cb87a", percentage: 60 },
      { color: "#1989fa", percentage: 80 },
      { color: "#6f7ad3", percentage: 100 },
    ],
  },
});

Notification.info({ title: "不自动关闭", content: "duration: 0，需手动关闭", duration: 0 });
```

## 暂停 （pauseOnHover）

鼠标悬停在通知上时，自动关闭倒计时与进度条**同时暂停**，移开后继续。

`pauseOnHover` 默认开启。关闭需要显式传 `false`。

<div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
<dv-button variant="neutral" @dv-click="Notification.info({ title: '开启暂停', content: 'pauseOnHover: true', pauseOnHover: true })">开启暂停</dv-button>
<dv-button variant="neutral" @dv-click="Notification.info({ title: '关闭暂停', content: 'pauseOnHover: false', pauseOnHover: false })">关闭暂停</dv-button>
</div>

```js
// 开启暂停
Notification.info({ title: "开启暂停", content: "pauseOnHover: true", pauseOnHover: true });

// 关闭暂停
Notification.info({ title: "关闭暂停", content: "pauseOnHover: false", pauseOnHover: false });
```

## 富内容（content）

`content` 支持三种类型：纯文本、原生 DOM 节点（`Node`，零 lit 依赖）、lit 模板（`TemplateResult`）。

<div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
  <dv-button variant="neutral" @dv-click="showDomContent">原生 DOM 节点</dv-button>
  <dv-button variant="soft" @dv-click="showTemplateContent">Lit 模板</dv-button>
</div>

```js
// 纯文本
Notification.info({ title: "提示", content: "这是一段文字" });

// 原生 DOM 节点（通用写法，不依赖 lit）
const wrap = document.createElement("div");
wrap.innerHTML = `
  <img src="/logo.png" style="width:64px; height:64px; display:block;">
  DockV UI
`;
Notification.info({ title: "原生 DOM 节点", content: wrap });

// lit 模板（项目装有 lit 时更省事）
import { html } from "lit";
Notification.info({
  title: "Lit 模板",
  content: html`
    <div style="display:flex;align-items:center;gap:8px;">
      <p></p>
      <span>发现 DockV UI 新版本 <b>v2.4.0</b></span>
    </div>
    <div style="display:flex;align-items:center;">
      <dv-button variant="ghost" size="xs" @dv-click="">查看详情</dv-button>
      <dv-button variant="ghost" size="xs" @dv-click="">一会再看</dv-button>
    </div>
  `,
  variant: "soft",
  duration: 5000,
});
```

## 更新内容（update）

`open()` 返回唯一 id。用 `Notification.update(id, options)` 就地更新这条通知（**部分配置**：只改传入字段，其余保持原值，位置不变）。注意：`update` 的 options **不含 `id`**；`open` 传重复 id 会直接抛错，不静默更新。

<div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
  <dv-button variant="neutral" @dv-click="runUpdateDemo">模拟后台任务</dv-button>
</div>

```js
const id = Notification.info({ title: "正在处理", content: "任务 1/10...", duration: 0 });

// 每完成一个任务，就地更新内容（title/type 等未传字段保持原值）
Notification.update(id, { content: "任务 3/10..." });

// 全部完成，切换类型与标题
Notification.update(id, { type: "success", title: "处理完成", content: "全部 10 个任务完成" });
```

> [!DANGER] id 冲突即抛错
> `open` 传入的自定义 id 若与现存通知重复，会**直接抛出错误**（不静默更新、不覆盖）。更新请用 `update()`。
>
> <dv-button type="danger" variant="outline" @dv-click="openDuplicateIdDemo">试试重复 id</dv-button>

> [!WARNING] `update` / 复用 id 的边界
>
> - `update(id)` 对不存在的 id 也会抛错（不静默忽略）。
> - `close(id)` 是"先播退出动画再移除"，动画结束前实例仍占着该 id；此时立即用同 id `open()` 会触发冲突错误，需等旧通知退场后再复用，可以在创建前手动增加延迟。

## 关闭与销毁（close / destroyAll）

`close(id)` 播放退出动画后移除单个通知；`destroyAll()` 跳过动画立即清空所有通知。

<div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
  <dv-button @dv-click="openDemoNotif">生成多条（不自动关闭）</dv-button>
  <dv-button variant="outline" @dv-click="closeDemoNotif">关闭特殊那条</dv-button>
  <dv-button type="danger" variant="ghost" @dv-click="Notification.destroyAll()">destroyAll</dv-button>
</div>

```js
const id = Notification.open({ title: "停留 10 秒", content: "可提前关闭", duration: 10000 });
Notification.close(id); // 手动关闭（触发退出动画）

Notification.destroyAll(); // 立即销毁所有通知
```

## 查询当前通知（get / getAll）

- `get(id)` 查询单条通知的**只读快照**（不存在返回 `undefined`）
- `getAll()` 返回当前所有存活通知的快照数组。

快照不含实例引用，只用来读取状态（数量、标题、剩余时长、位置等），不能直接修改通知。

<div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
  <dv-button variant="neutral" @dv-click="getAllDemo">生成并查询</dv-button>
</div>

```js
// 查询单条：id 不存在时返回 undefined
const one = Notification.get(id);
one?.remaining; // 该通知剩余毫秒

// 查询当前所有存活通知
const all = Notification.getAll();
all.length; // 页面上还剩几条
const task = all.find((n) => n.title === "待处理任务");
```

> [!NOTE] 快照字段
>
> - `title` 未配置时为空字符串 `""`，不做归一，判空用 `!snapshot.title`。
> - `remaining` 是**取值时刻**的采样值，不实时更新；若需实时感知需配合定时器轮询。

## 全局配置（config）

`config()` 修改未传入参数的全局默认值，影响之后所有新建通知。

<div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
  <dv-button variant="neutral" @dv-click="Notification.config({ duration: 1500, position: 'bottomRight', right: '64px', bottom: '48px' }); 
  Notification.info({ title: '配置已改', content: '1.5s 后消失，右下角，偏移量 64px, 48px' })">改全局配置</dv-button>
  <dv-button variant="soft" @dv-click="Notification.config({ duration: 3000, position: 'topRight', right: '24px', top: '24px' }); 
  Notification.info({ title: '配置已改', content: '还原全局配置' })">还原全局配置</dv-button>
</div>

```js
// 全局默认配置（所有字段均可只传需要的部分）
Notification.config({
  duration: 3000,
  position: "topRight",
  zIndex: 1010,
  top: "24px",
  bottom: "24px",
  left: "24px",
  right: "24px",
  variant: "normal",
  showClose: true,
  progress: true,
  pauseOnHover: true,
  // 各 type 的全局默认图标（按 type 覆盖，未传的 type 保留原图标）
  icon: {
    info: "material-symbols:info-rounded",
    success: "material-symbols:check-circle-rounded",
    warning: "material-symbols:warning-rounded",
    error: "material-symbols:error-rounded",
  },
});
```

> [!warning] 两个容易被忽略的边界
>
> - `top / bottom / left / right` 偏移量**按位置选择性生效**：`top` 只认 `top`，`topLeft` 认 `top` + `left`……要让通知偏移到某个角落，请改用对应 `position`，而非单设某个偏移键。
> - `config()` 修改偏移会让你**已存在的通知容器也跟着移动**（不只是影响新建通知）。

## 回调（onClick / onClose）

- `onClick`：点击通知体时触发。
- `onClose`：通知关闭时触发（自动关闭和手动关闭都会触发）。

<div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap">
  <dv-button @dv-click="openCallbackDemo">触发回调</dv-button>
  <span>点击通知体：<b>{{ clickCount }}</b> 次</span>
  <span>通知关闭：<b>{{ closeCount }}</b> 次</span>
</div>

```js
Notification.success({
  title: "保存成功",
  content: "配置文件已更新",
  onClick: () => console.log("点击了通知"),
  onClose: () => console.log("通知已关闭"),
});
```

## API

### 静态方法

| 方法                               | 说明                                        |
| ---------------------------------- | ------------------------------------------- |
| `Notification.open(options)`       | 新建通知，返回唯一 id                       |
| `Notification.info(options)`       | 快捷方法，`type = 'info'`                   |
| `Notification.success(options)`    | 快捷方法，`type = 'success'`                |
| `Notification.warning(options)`    | 快捷方法，`type = 'warning'`                |
| `Notification.error(options)`      | 快捷方法，`type = 'error'`                  |
| `Notification.update(id, options)` | 更新指定通知（部分配置，options 不含 `id`） |
| `Notification.close(id)`           | 手动关闭（触发退出动画后移除 DOM）          |
| `Notification.destroyAll()`        | 立即销毁所有通知（跳过动画）                |
| `Notification.config(config)`      | 设置全局默认配置                            |

### 全局配置（GlobalConfig）

`config()` 可配置以下全局默认值，未传的字段保持原值；这些默认值也是 `open()` 未传对应参数时的兜底值。

| 属性           | 类型                                                                                      | 默认值       | 说明                                                   |
| -------------- | ----------------------------------------------------------------------------------------- | ------------ | ------------------------------------------------------ |
| `duration`     | `number`                                                                                  | `3000`       | 自动关闭延时（毫秒）；`0` 不自动关闭                   |
| `position`     | `'top'` \| `'topLeft'` \| `'topRight'` \| `'bottom'` \| `'bottomLeft'` \| `'bottomRight'` | `'topRight'` | 弹出位置                                               |
| `zIndex`       | `number`                                                                                  | `1010`       | 通知容器层级                                           |
| `top`          | `string`                                                                                  | `'24px'`     | 顶部通知容器到视口上边的距离（仅 `top` 系位置生效）    |
| `bottom`       | `string`                                                                                  | `'24px'`     | 底部通知容器到视口下边的距离（仅 `bottom` 系位置生效） |
| `left`         | `string`                                                                                  | `'24px'`     | 左上 / 左下通知容器到视口左边的距离                    |
| `right`        | `string`                                                                                  | `'24px'`     | 右上 / 右下通知容器到视口右边的距离                    |
| `variant`      | `'normal'` \| `'soft'`                                                                    | `'normal'`   | 默认视觉变体                                           |
| `showClose`    | `boolean`                                                                                 | `true`       | 默认是否显示关闭按钮                                   |
| `progress`     | `boolean`                                                                                 | `true`       | 默认是否显示进度条                                     |
| `pauseOnHover` | `boolean`                                                                                 | `true`       | 默认 hover 是否暂停自动关闭计时器与进度条              |
| `icon`         | `Partial<Record<'info' \| 'success' \| 'warning' \| 'error', string>>`                    | 内建图标     | 各 type 的全局默认图标映射（按 type 覆盖）             |

> `variant` / `showClose` / `progress` / `pauseOnHover` 只影响之后新建的通知。`icon` 为按 type 的映射，与全局现有图标**浅合并**（可只覆盖部分 type），某 type 未传时保留原图标。

### Options

| 属性           | 类型                                                                                                            | 默认值         | 说明                                                                                                          |
| -------------- | --------------------------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------- |
| `id`           | `string`                                                                                                        | 自动生成       | 自定义通知 id；不传则自动生成。与现存 id 重复时**抛错**；不可通过 `update` 修改                               |
| `title`        | `string`                                                                                                        | `''`           | 通知标题                                                                                                      |
| `content`      | `string` \| `Node` \| `TemplateResult`                                                                          | `''`           | 通知正文，支持纯文本 / DOM 节点 / lit 模板                                                                    |
| `type`         | `'info'` \| `'success'` \| `'warning'` \| `'error'`                                                             | —（不设置）    | 通知类型，自动设置图标和颜色；不设置时无图标、强调色用第三色（tertiary）                                      |
| `color`        | `string`                                                                                                        | —              | 自定义强调色，覆盖 `type` 默认配色                                                                            |
| `variant`      | `'normal'` \| `'soft'`                                                                                          | `'normal'`     | 视觉变体                                                                                                      |
| `duration`     | `number`                                                                                                        | `3000`         | 自动关闭延时（毫秒）；`0` 不自动关闭                                                                          |
| `position`     | `'top'` \| `'topLeft'` \| `'topRight'` \| `'bottom'` \| `'bottomLeft'` \| `'bottomRight'`                       | `'topRight'`   | 弹出位置                                                                                                      |
| `icon`         | `string` \| `false`                                                                                             | 按 `type` 自动 | 自定义图标；`false` 显式隐藏，`''` 用 type 默认                                                               |
| `showClose`    | `boolean`                                                                                                       | `true`         | 是否显示关闭按钮                                                                                              |
| `progress`     | `boolean` \| `{ color?: string \| Array<{ color: string; percentage: number }>; position?: 'top' \| 'bottom' }` | `true`         | 进度条；`false` 关闭；对象可自定义 `color`（单个颜色或按百分比分档数组）与 `position`（`'top'` / `'bottom'`） |
| `pauseOnHover` | `boolean`                                                                                                       | `true`         | hover 时暂停自动关闭计时器与进度条                                                                            |
| `zIndex`       | `number`                                                                                                        | `1010`         | 通知的 z-index                                                                                                |
| `onClick`      | `() => void`                                                                                                    | —              | 点击通知体的回调                                                                                              |
| `onClose`      | `() => void`                                                                                                    | —              | 通知关闭时的回调（自动关闭和手动关闭都会触发）                                                                |

### 卡片组件（`<dv-notification>`）

`NotificationCard` 随 `Notification` 一并导出，可单独使用做静态展示或二次组合。

#### 属性

| 属性        | 类型                                                | 默认值         |
| ----------- | --------------------------------------------------- | -------------- |
| `type`      | `'info'` \| `'success'` \| `'warning'` \| `'error'` | —（不设置）    |
| `color`     | `string`                                            | —              |
| `variant`   | `'normal'` \| `'soft'`                              | `'normal'`     |
| `title`     | `string`                                            | `''`           |
| `content`   | `string` \| `Node` \| `TemplateResult`              | `''`           |
| `icon`      | `string` \| `false`                                 | 按 `type` 自动 |
| `showClose` | `boolean`                                           | `true`         |
| `progress`  | `boolean`                                           | `true`         |

#### 事件

| 事件名     | 说明                        |
| ---------- | --------------------------- |
| `dv-close` | 关闭时触发（带 `id`）       |
| `dv-click` | 点击通知体时触发（带 `id`） |
