<template>
  <div class="palette-wrapper">
    <div class="palette-row">
      <div
        v-for="color in activeColors"
        :key="color.name"
        class="palette-chip"
        @click="copy(`hsla(var(--dockv-${prefix}-${color.name}), 1)`)">
        <div class="palette-chip__block" :style="{ background: 'hsl(' + color.hsl + ')' }"></div>
        <div class="palette-chip__label" :style="{ color: color.color }">
          {{ prefix }}-{{ color.name }}
        </div>
        <div class="palette-chip__value" :style="{ color: color.color }">{{ color.hsl }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useData } from "vitepress";

const props = defineProps<{
  prefix: string;
  colors: { name: string; hsl: string; color: string }[];
  darkColors?: { name: string; hsl: string; color: string }[];
}>();

const { isDark } = useData();

// 跟随主题模式切换色盘：暗色模式显示暗色色盘，亮色模式显示亮色色盘
const activeColors = computed(() =>
  isDark.value && props.darkColors ? props.darkColors : props.colors
);

function copy(value: string) {
  navigator.clipboard.writeText(value);
}
</script>

<style scoped>
.palette-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.palette-row {
  display: flex;
  flex-direction: column;
}
.palette-chip {
  position: relative;
  width: 100%;
  height: 54px;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  transition:
    transform 0.15s,
    box-shadow 0.15s;
}
.palette-chip + .palette-chip {
  border-radius: 0;
}
.palette-chip:first-child {
  border-radius: 6px 6px 0 0;
}
.palette-chip:last-child {
  border-radius: 0 0 6px 6px;
}
.palette-chip:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  z-index: 1;
}
.palette-chip__block {
  position: absolute;
  inset: 0;
}
.palette-chip__label {
  position: absolute;
  top: 6px;
  left: 12px;
  font-size: 14px;
  font-weight: 800;
  white-space: nowrap;
}
.palette-chip__value {
  position: absolute;
  bottom: 6px;
  left: 12px;
  font-size: 10px;

  white-space: nowrap;
}
</style>
