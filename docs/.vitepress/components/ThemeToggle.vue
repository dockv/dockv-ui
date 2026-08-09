<template>
  <button class="theme-toggle" type="button" @click="isDark = !isDark">
    <!-- 太阳/月亮小图标（CSS 绘制） -->
    <span class="theme-toggle__icon" :class="{ 'theme-toggle__icon--dark': isDark }"></span>
    <span class="theme-toggle__label">
      {{ isDark ? "暗色模式" : "亮色模式" }}
    </span>
    <span class="theme-toggle__hint">点击切换 · token 色卡实时变化</span>
  </button>
</template>

<script setup lang="ts">
import { useData } from "vitepress";

// 与 VitePress 自带的亮/暗切换共用同一个状态源，两处切换互相同步
const { isDark } = useData();
</script>

<style scoped>
.theme-toggle {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  font-size: 0.875rem;
  line-height: 1.4;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: border-color 0.2s;
}
.theme-toggle:hover {
  border-color: var(--vp-c-brand-1);
}
/* 亮色：太阳（黄色圆 + 光晕） */
.theme-toggle__icon {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #f6c445;
  box-shadow: 0 0 6px rgba(246, 196, 69, 0.9);
  flex-shrink: 0;
}
/* 暗色：月亮（内切阴影画出月牙） */
.theme-toggle__icon--dark {
  background: transparent;
  box-shadow: inset -3px 2px 0 0 #e8e8f0;
}
.theme-toggle__label {
  font-weight: 600;
}
.theme-toggle__hint {
  font-size: 0.8em;
  opacity: 0.65;
}
</style>
