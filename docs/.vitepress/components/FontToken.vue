<template>
  <span class="font-token">
    <code class="font-token__name">{{ token }}</code>
    <span class="font-token__preview" :style="{ [cssProp]: `var(${token})` }">{{ text }}</span>
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    /** CSS 变量名，如 --dockv-font-size-md 或 --dockv-font-weight-bold */
    token: string;
    /** 预览文字 */
    text?: string;
    /** CSS 属性：fontSize（字号）或 fontWeight（字重） */
    type?: "size" | "weight";
  }>(),
  {
    text: "Aa 東京 繁簡 あいう 서울 123",
    type: "size",
  },
);

// fontSize → 字号，fontWeight → 字重
const cssProp = computed(() => "font" + (props.type === "size" ? "Size" : "Weight"));
</script>

<style scoped>
.font-token {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.font-token__name {
  font-size: 0.85em;
  line-height: 1.25;
  flex-shrink: 0;
}
.font-token__preview {
  line-height: 1;
  white-space: nowrap;
  font-family: var(--vp-font-family-base);
}
</style>
