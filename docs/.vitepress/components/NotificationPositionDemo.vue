<template>
  <div class="notif-demo">
    <!-- Tab 切换：桌面端 / 移动端视口形态 -->
    <div class="notif-demo__tabs">
      <button
        v-for="m in modes"
        :key="m.key"
        type="button"
        class="notif-demo__tab"
        :class="{ 'notif-demo__tab--active': mode === m.key }"
        @click="switchMode(m.key)">
        {{ m.label }}
      </button>
    </div>

    <!-- 浏览器视口（模拟窗口） -->
    <div class="notif-demo__viewport" :class="`notif-demo__viewport--${mode}`">
      <!-- 浏览器标题栏 -->
      <div class="notif-demo__chrome">
        <span class="notif-demo__dots">
          <i class="notif-demo__dot notif-demo__dot--red"></i>
          <i class="notif-demo__dot notif-demo__dot--yellow"></i>
          <i class="notif-demo__dot notif-demo__dot--green"></i>
        </span>
        <span class="notif-demo__url">ui.dockv.cc</span>
      </div>

      <!-- 极简网页骨架（占位，衬托通知盖在上层的效果） -->
      <div class="notif-demo__page">
        <div class="notif-demo__navbar">
          <span class="notif-demo__nav-item"></span>
          <span class="notif-demo__nav-item"></span>
          <span class="notif-demo__nav-item"></span>
          <span class="notif-demo__nav-item"></span>
        </div>
        <div class="notif-demo__hero">
          <span class="notif-demo__hero-title"></span>
          <span class="notif-demo__hero-text"></span>
          <span class="notif-demo__hero-text"></span>
          <span class="notif-demo__hero-btn"></span>
        </div>
        <!-- 桌面端额外展示一张内容卡片占位 -->
        <div v-if="mode === 'desktop'" class="notif-demo__grid">
          <span class="notif-demo__grid-item"></span>
          <span class="notif-demo__grid-item"></span>
          <span class="notif-demo__grid-item"></span>
        </div>
      </div>

      <!-- 六个位置热点（点击在对应角落弹通知） -->
      <button
        v-for="p in positions"
        :key="p.key"
        type="button"
        class="notif-demo__hotspot"
        :class="{
          'notif-demo__hotspot--active': activePos === p.key,
          'notif-demo__hotspot--reverse': isReverse(p.key),
        }"
        :style="hotspotStyle(p.key)"
        :title="`${p.key}：${p.label}`"
        @click="onPick(p)">
        <span class="notif-demo__hotspot-dot"></span>
        <span class="notif-demo__hotspot-label">{{ p.key }}</span>
      </button>

      <!-- 静态示意卡片挂载点（由 lit 渲染 <dv-notification>） -->
      <div ref="cardSlot" class="notif-demo__card-slot"></div>
    </div>

    <p class="notif-demo__hint">点击视口中的位置点，通知会在对应角落弹出，并在视口内示意落位。</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from "vue";
import { html, render } from "lit";
import { Notification } from "../../../src/index.ts";

/**
 * 位置演示组件：用模拟浏览器视口直观展示六个通知位置。
 * - 桌面端 / 移动端两种视口形态（Tab 切换）
 * - 点击视口内的位置点：在该位置用 <dv-notification> 静态渲染一张示意卡片，
 *   同时调用 Notification.open 弹出真实通知
 */

/** 位置 key（与 NotificationPosition 一致） */
type PositionKey = "top" | "topLeft" | "topRight" | "bottom" | "bottomLeft" | "bottomRight";

/** 位置描述表：key + 中文说明 */
interface PositionItem {
  key: PositionKey;
  label: string;
}

const modes = [
  { key: "desktop", label: "桌面端" },
  { key: "mobile", label: "移动端" },
] as const;
type Mode = (typeof modes)[number]["key"];

const positions: PositionItem[] = [
  { key: "top", label: "顶部居中" },
  { key: "topLeft", label: "左上角" },
  { key: "topRight", label: "右上角" },
  { key: "bottom", label: "底部居中" },
  { key: "bottomLeft", label: "左下角" },
  { key: "bottomRight", label: "右下角" },
];

const mode = ref<Mode>("desktop");
/** 当前选中的位置（用于热点高亮与静态卡片） */
const activePos = ref<PositionKey | null>(null);
/** 静态示意卡片挂载点 */
const cardSlot = ref<HTMLDivElement>();
/** 本组件弹出的真实通知 id，切换位置时先关闭，避免同屏堆叠混乱 */
let lastRealId = "";

/** 切换视口形态；若已有选中位置则重摆静态卡片（两种形态尺寸不同） */
function switchMode(m: Mode): void {
  mode.value = m;
  if (activePos.value) renderCard(activePos.value);
}

/** 右列位置（topRight / bottomRight）：标签翻到圆点左侧，避免超出视口右边界 */
function isReverse(key: PositionKey): boolean {
  return key === "topRight" || key === "bottomRight";
}

/** 计算热点定位：内缩视口边缘 12px */
function hotspotStyle(key: PositionKey): Record<string, string> {
  const s: Record<string, string> = { position: "absolute" };
  switch (key) {
    case "top":
      s.top = "12px";
      s.left = "50%";
      s.transform = "translateX(-50%)";
      break;
    case "topLeft":
      s.top = "12px";
      s.left = "12px";
      break;
    case "topRight":
      s.top = "12px";
      s.right = "12px";
      break;
    case "bottom":
      s.bottom = "12px";
      s.left = "50%";
      s.transform = "translateX(-50%)";
      break;
    case "bottomLeft":
      s.bottom = "12px";
      s.left = "12px";
      break;
    case "bottomRight":
      s.bottom = "12px";
      s.right = "12px";
      break;
  }
  return s;
}

/**
 * 计算静态示意卡片的定位样式。
 * 通过覆盖 --dockv-notification-width（卡片在 shadow 内使用该变量）控制宽度。
 * 垂直方向避让 12px 处的热点，卡片从 44px 起。
 */
function cardStyle(key: PositionKey): Record<string, string> {
  const s: Record<string, string> = { position: "absolute" };
  if (mode.value === "mobile") {
    // 移动端：通栏卡片（左右各留 12px），仅区分上下，符合窄屏直觉
    s.left = "12px";
    s.right = "12px";
    s["--dockv-notification-width"] = "100%";
    if (key.startsWith("top")) s.top = "44px";
    else s.bottom = "44px";
  } else {
    // 桌面端：固定宽度卡片，六方向分别落位
    s["--dockv-notification-width"] = "280px";
    switch (key) {
      case "top":
        s.top = "44px";
        s.left = "50%";
        s.transform = "translateX(-50%)";
        break;
      case "topLeft":
        s.top = "44px";
        s.left = "12px";
        break;
      case "topRight":
        s.top = "44px";
        s.right = "12px";
        break;
      case "bottom":
        s.bottom = "44px";
        s.left = "50%";
        s.transform = "translateX(-50%)";
        break;
      case "bottomLeft":
        s.bottom = "44px";
        s.left = "12px";
        break;
      case "bottomRight":
        s.bottom = "44px";
        s.right = "12px";
        break;
    }
  }
  return s;
}

/** 把样式对象转成内联 CSS 字符串 */
function toInlineStyle(styles: Record<string, string>): string {
  return Object.entries(styles)
    .map(([k, v]) => `${k}: ${v}`)
    .join("; ");
}

/**
 * 点击位置点：
 * 1. 关闭上一条本组件弹出的真实通知（避免堆叠混乱）
 * 2. 在对应角落弹出真实通知
 * 3. 视口内静态渲染一张示意卡片
 */
function onPick(p: PositionItem): void {
  activePos.value = p.key;
  if (lastRealId) Notification.close(lastRealId);
  lastRealId = Notification.open({
    title: p.key,
    content: p.label,
    position: p.key,
    duration: 3000,
  });
  renderCard(p.key);
}

/**
 * 用 lit 渲染静态示意卡片。
 * content / icon 是 property（attribute: false），attribute 传不进去，
 * 因此用 lit 模板的 .property 绑定 + data-position 驱动正确的进入动画。
 */
function renderCard(key: PositionKey): void {
  if (!cardSlot.value) return;
  const p = positions.find((x) => x.key === key)!;
  render(
    html`
      <dv-notification
        type="info"
        variant="soft"
        title=${key}
        .content=${p.label}
        .icon=${false}
        .progress=${false}
        .showClose=${false}
        data-position=${key}
        style=${toInlineStyle(cardStyle(key))}></dv-notification>
    `,
    cardSlot.value,
  );
}

// 离开页面时清理真实通知（静态卡片随组件卸载自然销毁）
onBeforeUnmount(() => {
  if (lastRealId) Notification.close(lastRealId);
});
</script>

<style scoped>
.notif-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* ===== Tab 切换 ===== */
.notif-demo__tabs {
  display: inline-flex;
  gap: 8px;
  padding: 4px;
  border: 1px solid var(--dockv-color-border);
  border-radius: var(--dockv-border-radius-md);
  background: var(--dockv-color-bg-2);
  margin-bottom: 16px;
}
.notif-demo__tab {
  padding: 4px 14px;
  border: none;
  border-radius: var(--dockv-border-radius-sm);
  background: transparent;
  color: var(--dockv-color-text-1);
  font-size: 13px;
  line-height: 20px;
  cursor: pointer;
  transition:
    background 0.15s,
    color 0.15s;
}
.notif-demo__tab:hover {
  color: var(--dockv-color-text-0);
}
.notif-demo__tab--active {
  background: var(--dockv-color-primary);
  color: var(--dockv-color-white);
}

/* ===== 视口 ===== */
.notif-demo__viewport {
  position: relative;
  border: 1px solid var(--dockv-color-border);
  border-radius: var(--dockv-border-radius-lg);
  background: var(--dockv-color-bg-1);
  box-shadow: var(--dockv-shadow-md, 0 4px 12px rgba(0, 0, 0, 0.12));
  overflow: hidden;
}
.notif-demo__viewport--desktop {
  width: 100%;
  max-width: 680px;
  height: 380px;
}
.notif-demo__viewport--mobile {
  width: 300px;
  height: 560px;
}

/* ===== 浏览器标题栏 ===== */
.notif-demo__chrome {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 34px;
  padding: 0 12px;
  border-bottom: 1px solid var(--dockv-color-border);
  background: var(--dockv-color-bg-2);
}
.notif-demo__dots {
  display: inline-flex;
  gap: 5px;
  flex-shrink: 0;
}
.notif-demo__dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
}
.notif-demo__dot--red {
  background: #ff5f57;
}
.notif-demo__dot--yellow {
  background: #febc2e;
}
.notif-demo__dot--green {
  background: #28c840;
}
.notif-demo__url {
  flex: 1;
  max-width: 320px;
  /* 固定胶囊高度，避免继承 VitePress 大行高把框撑满；内容用 flex 垂直水平居中 */
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  border: 1px solid var(--dockv-color-border);
  border-radius: 999px;
  /* 亮色模式下 bg-* 全为纯白，纯背景会隐形，故用半透明填充 + 边框勾勒出胶囊 */
  background: var(--dockv-color-fill-0);
  color: var(--dockv-color-text-1);
  font-size: 11px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ===== 极简网页骨架 ===== */
.notif-demo__page {
  height: calc(100% - 34px);
  padding: 14px;
  background: var(--dockv-color-bg-1);
}
.notif-demo__navbar {
  display: flex;
  gap: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--dockv-color-border);
}
.notif-demo__nav-item {
  width: 36px;
  height: 8px;
  border-radius: 4px;
  background: color-mix(in srgb, var(--dockv-color-text-0) 14%, transparent);
}
.notif-demo__hero {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 20px;
}
.notif-demo__hero-title {
  width: 42%;
  height: 16px;
  border-radius: 4px;
  background: color-mix(in srgb, var(--dockv-color-text-0) 20%, transparent);
}
.notif-demo__hero-text {
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: color-mix(in srgb, var(--dockv-color-text-0) 10%, transparent);
}
.notif-demo__hero-text:nth-child(3) {
  width: 74%;
}
.notif-demo__hero-btn {
  width: 64px;
  height: 22px;
  margin-top: 8px;
  border-radius: var(--dockv-border-radius-sm);
  background: color-mix(in srgb, var(--dockv-color-primary) 24%, transparent);
}
.notif-demo__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 20px;
}
.notif-demo__grid-item {
  height: 64px;
  border-radius: var(--dockv-border-radius-md);
  background: color-mix(in srgb, var(--dockv-color-text-0) 6%, transparent);
}

/* ===== 位置热点 ===== */
.notif-demo__hotspot {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  z-index: 2;
}
/* 右列位置：标签翻到圆点左侧，避免超出视口右边界 */
.notif-demo__hotspot--reverse {
  flex-direction: row-reverse;
}
.notif-demo__hotspot-dot {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid var(--dockv-color-primary);
  background: color-mix(in srgb, var(--dockv-color-primary) 18%, var(--dockv-color-bg-1));
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--dockv-color-primary) 10%, transparent);
  transition:
    background 0.15s,
    transform 0.15s;
}
.notif-demo__hotspot:hover .notif-demo__hotspot-dot {
  background: var(--dockv-color-primary);
  transform: scale(1.15);
}
.notif-demo__hotspot--active .notif-demo__hotspot-dot {
  background: var(--dockv-color-primary);
}
.notif-demo__hotspot-label {
  font-size: 10px;
  line-height: 1;
  color: var(--dockv-color-text-2);
  user-select: none;
}
.notif-demo__hotspot:hover .notif-demo__hotspot-label {
  color: var(--dockv-color-text-0);
}

/* ===== 静态卡片挂载点 ===== */
.notif-demo__card-slot {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none; /* 示意卡片只做展示，不拦截热点点击 */
}

/* ===== 提示文案 ===== */
.notif-demo__hint {
  margin: 12px 0 0;
  font-size: 12px;
  color: var(--dockv-color-text-2);
}
</style>
