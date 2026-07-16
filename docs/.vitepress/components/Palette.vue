<template>
  <div class="palette-row">
    <div
      v-for="color in colors"
      :key="color.name"
      class="palette-chip"
      @click="copy(`hsla(var(--dockv-${prefix}-${color.name}), 1)`)"
    >
      <div class="palette-chip__block" :style="{ background: 'hsl(' + color.hsl + ')' }"></div>
      <div class="palette-chip__label">{{ prefix }}-{{ color.name }}</div>
      <div class="palette-chip__value">{{ color.hsl }}</div>
    </div>
  </div>
  <div v-if="darkColors" class="palette-row" style="margin-top:4px">
    <div
      v-for="color in darkColors"
      :key="color.name"
      class="palette-chip"
      @click="copy(`hsla(var(--dockv-${prefix}-${color.name}), 1)`)"
    >
      <div class="palette-chip__block" :style="{ background: 'hsl(' + color.hsl + ')' }"></div>
      <div class="palette-chip__label-d">{{ prefix }}-{{ color.name }}</div>
      <div class="palette-chip__value">{{ color.hsl }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  prefix: string
  colors: { name: string; hsl: string }[]
  darkColors?: { name: string; hsl: string }[]
}>()

function copy(value: string) {
  navigator.clipboard.writeText(value)
}
</script>

<style scoped>
.palette-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.palette-chip {
  width: 108px;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;
  background: var(--vp-c-bg-soft);
}
.palette-chip:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}
.palette-chip__block {
  height: 48px;
}
.palette-chip__label {
  font-size: 11px;
  font-weight: 600;
  padding: 4px 6px 0;
  white-space: nowrap;
}
.palette-chip__label-d {
  font-size: 11px;
  font-weight: 600;
  padding: 4px 6px 0;
  white-space: nowrap;
  color: var(--vp-c-text-2);
}
.palette-chip__value {
  font-size: 10px;
  color: var(--vp-c-text-2);
  padding: 0 6px 6px;
  font-family: ui-monospace, monospace;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
