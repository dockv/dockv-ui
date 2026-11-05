<template>
  <div class="tag-matrix-wrap">
    <table class="tag-matrix-table">
      <thead>
        <tr>
          <th>color \ variant</th>
          <th v-for="v in variants" :key="v"><code>{{ v }}</code></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="c in colors" :key="c">
          <td><code>{{ c }}</code></td>
          <td
            v-for="v in variants"
            :key="v"
            class="tag-matrix-cell"
            title="点击复制标签代码"
            @click="handleCopy(c, v)"
          >
            <div class="tag-matrix-cell__inner">
              <dv-tag :variant="v" :color="c">{{ c }}</dv-tag>
              <transition name="fade">
                <span v-if="copiedKey === `${c}-${v}`" class="tag-matrix-copied">已复制</span>
              </transition>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const variants = ["light", "ghost", "soft", "outline", "solid", "neutral"] as const;
const colors = [
  "grey",
  "blue",
  "light-blue",
  "cyan",
  "teal",
  "green",
  "light-green",
  "lime",
  "yellow",
  "amber",
  "orange",
  "red",
  "pink",
  "purple",
  "violet",
  "indigo",
  "white",
] as const;

const copiedKey = ref<string>("");
let timer: ReturnType<typeof setTimeout> | null = null;

const handleCopy = async (color: string, variant: string) => {
  const code = `<dv-tag variant="${variant}" color="${color}"></dv-tag>`;
  try {
    await navigator.clipboard.writeText(code);
    copiedKey.value = `${color}-${variant}`;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      copiedKey.value = "";
    }, 1500);
  } catch (err) {
    console.error("复制失败:", err);
  }
};
</script>

<style scoped>
.tag-matrix-wrap {
  width: 100%;
  overflow-x: auto;
  margin: 16px 0;
}

.tag-matrix-table {
  width: 100%;
  border-collapse: collapse;
  margin: 0;
  display: table;
}

.tag-matrix-table th,
.tag-matrix-table td {
  border: 1px solid var(--vp-c-divider);
  padding: 8px 12px;
  text-align: center;
  vertical-align: middle;
}

.tag-matrix-table th {
  background-color: var(--vp-c-bg-soft);
  font-weight: 600;
}

.tag-matrix-cell {
  cursor: pointer;
  transition: background-color 0.2s ease;
  user-select: none;
}

.tag-matrix-cell:hover {
  background-color: var(--vp-c-bg-mute);
}

.tag-matrix-cell__inner {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.tag-matrix-copied {
  position: absolute;
  top: -24px;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--vp-c-neutral, #000);
  color: var(--vp-c-neutral-inverse, #fff);
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  white-space: nowrap;
  pointer-events: none;
  z-index: 10;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

:root.dark .tag-matrix-copied,
html.dark .tag-matrix-copied {
  background-color: var(--vp-c-neutral, #fff);
  color: var(--vp-c-neutral-inverse, #000);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate(-50%, 4px);
}
</style>
