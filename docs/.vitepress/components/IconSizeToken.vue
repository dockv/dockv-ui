<template>
  <span class="icon-size-token">
    <!-- 图标预览 -->
    <code class="icon-size-token__name">{{ token }}</code>
    <span class="icon-size-token__preview" :style="{ width: `var(${token})`, height: `var(${token})` }">
    <!-- 占位方块，后续可替换为 SVG -->
      <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
    </span>
  </span>
</template>

<script setup lang="ts">
defineProps<{
  /** CSS 变量名，如 --dockv-icon-size-md */
  token: string
}>()
</script>

<style scoped>
.icon-size-token {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.icon-size-token__preview {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--vp-c-text-1);
}
.icon-size-token__preview svg {
  width: 100%;
  height: 100%;
}
.icon-size-token__name {
  font-size: 0.85em;
  line-height: 1.25;
}
</style>
