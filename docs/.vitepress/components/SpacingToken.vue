<template>
  <span class="spacing-token">
    <span class="spacing-token__diagram">
      <!-- 标线 + 数值，在方块上方 -->
      <span class="spacing-token__annotations">
        <span class="spacing-token__label">{{ value }}</span>
        <span class="spacing-token__dim-line" :style="{ width: `var(${token})` }">
          <span class="spacing-token__dim-tick"></span>
          <span class="spacing-token__dim-body"></span>
          <span class="spacing-token__dim-tick"></span>
        </span>
      </span>
      <!-- 内容行：方块 + 间距 + 方块 -->
      <span class="spacing-token__content">
        <span class="spacing-token__block"></span>
        <span class="spacing-token__gap" :style="{ width: `var(${token})` }"></span>
        <span class="spacing-token__block"></span>
      </span>
    </span>
    <code class="spacing-token__name">{{ token }}</code>
  </span>
</template>

<script setup lang="ts">
defineProps<{
  token: string;
  value: string;
}>();
</script>

<style scoped>
.spacing-token {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.spacing-token__diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
}
/* ── 标线 + 数值（在方块上方） ── */
.spacing-token__annotations {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2px;
}
/* ── 内容行 ── */
.spacing-token__content {
  display: flex;
  align-items: stretch;
}
/* ── 灰色方块 ── */
.spacing-token__block {
  width: 10px;
  min-height: 20px;
  background: #888;
  border-radius: 2px;
  flex-shrink: 0;
}
/* ── 间距区域（半透明红色） ── */
.spacing-token__gap {
  min-width: 0;
  background: rgba(255, 60, 60, 0.12);
  flex-shrink: 0;
}
/* ── 标注值 ── */
.spacing-token__label {
  font-size: 0.7em;
  color: #e44;
  line-height: 1;
  white-space: nowrap;
}
/* ── 红色标注线 ── */
.spacing-token__dim-line {
  display: flex;
  align-items: center;
  height: 8px;
}
.spacing-token__dim-tick {
  width: 1px;
  height: 8px;
  background: #e44;
  flex-shrink: 0;
}
.spacing-token__dim-body {
  flex: 1;
  height: 0;
  border-top: 1px solid #e44;
}
/* ── token 名称 ── */
.spacing-token__name {
  font-size: 0.85em;
  line-height: 1.25;
}
</style>
