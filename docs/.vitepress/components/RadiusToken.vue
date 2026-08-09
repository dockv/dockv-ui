<template>
  <span class="radius-token">
    <span
      class="radius-token__preview"
      :style="{ borderRadius: `var(${token})` }"
    ></span>
    <code class="radius-token__name">{{ token }}</code>
  </span>
</template>

<script setup lang="ts">
defineProps<{
  /** CSS 变量名，如 --dockv-border-radius-sm */
  token: string
}>()
</script>

<style scoped>
.radius-token {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.radius-token__preview {
  display: inline-block;
  width: 28px;
  height: 28px;
  background: #6bc0eb;
  flex-shrink: 0;
}
.radius-token__name {
  line-height: 1.25;
  font-size: 0.85em;
}
</style>
