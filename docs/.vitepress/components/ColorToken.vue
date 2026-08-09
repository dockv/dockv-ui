<template>
  <span class="color-token">
    <!-- 色块 -->
    <span class="color-token__swatch-wrap">
      <!-- 棋盘格背景（显示透明度） -->
      <span class="color-token__checker"></span>
      <!-- 实际颜色 -->
      <span class="color-token__swatch" :style="{ background: `var(${token})` }"></span>
    </span>
    <!-- 变量名 -->
    <code class="color-token__name">{{ token }}</code>
    <!-- 运算后的实际颜色值（浏览器 getComputedStyle） -->
    <span class="color-token__value">{{ resolved }}</span>
  </span>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useData } from "vitepress";

const props = defineProps<{
  /** CSS 变量名，如 --dockv-color-primary */
  token: string;
}>();

const { isDark } = useData();

const resolved = ref("");

/** 从 body 上读取 token 的运算后实际值 */
const resolve = () => {
  const val = getComputedStyle(document.body).getPropertyValue(props.token).trim();
  resolved.value = val || "(not set)";
};

onMounted(resolve);
// 主题（亮/暗）切换后 token 值会变，需要重新读取
watch(isDark, resolve);
</script>

<style scoped>
.color-token {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
}
.color-token__swatch-wrap {
  position: relative;
  display: inline-block;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid rgba(128, 128, 128, 0.3);
}
/* 棋盘格：两个方向的小方格 */
.color-token__checker {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(45deg, rgba(128, 128, 128, 0.2) 25%, transparent 25%),
    linear-gradient(-45deg, rgba(128, 128, 128, 0.2) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, rgba(128, 128, 128, 0.2) 75%),
    linear-gradient(-45deg, transparent 75%, rgba(128, 128, 128, 0.2) 75%);
  background-size: 6px 6px;
  background-position:
    0 0,
    0 3px,
    3px -3px,
    -3px 0;
}
.color-token__swatch {
  position: absolute;
  inset: 0;
  border-radius: 4px;
}
.color-token__name {
  font-size: 0.85em;
  line-height: 1.25;
}
.color-token__value {
  font-size: 0.8em;
  opacity: 0.65;
  font-family: var(--vp-font-family-mono);
}
</style>
