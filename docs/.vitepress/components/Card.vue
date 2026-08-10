<template>
  <!-- 有 link 时整张卡片渲染为 <a>，点击任意位置均可跳转；无 link 时渲染为 <div> -->
  <component :is="link ? 'a' : 'div'" class="component-card" :href="link">
    <!-- 预览区：默认插槽渲染组件示例 -->
    <div class="component-card__preview">
      <slot></slot>
    </div>
    <!-- 底部：组件名称 -->
    <div class="component-card__footer">
      <span class="component-card__name">{{ title }}</span>
    </div>
  </component>
</template>

<script setup lang="ts">
/**
 * 组件总览卡片
 * 参考 Semi Design 组件总览的卡片结构：上方预览区 + 下方组件名。
 * 传入 link 时整张卡片变为可点击链接。
 */
defineProps<{
  /** 卡片标题（组件名称） */
  title: string;
  /** 组件文档链接，缺省时卡片不可点击 */
  link?: string;
}>();
</script>

<style scoped>
.component-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--dockv-color-border);
  border-radius: var(--dockv-border-radius-lg);
  background: var(--dockv-color-bg-1);
  color: var(--dockv-color-text-0);
  text-decoration: none;
  transition: box-shadow 0.2s ease;
}
.component-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}
/* 预览区：垂直水平居中展示示例 */
.component-card__preview {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 120px;
  padding: var(--dockv-spacing-lg);
}
/* 底部：组件名称 */
.component-card__footer {
  padding: var(--dockv-spacing-sm) var(--dockv-spacing-md);
  text-align: center;
  border-top: 1px solid var(--dockv-color-border);
}
.component-card__name {
  font-size: var(--dockv-font-size-md);
  color: inherit;
}
</style>
