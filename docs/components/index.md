# 组件总览 (Overview)

基于 DockV 设计语言开发的原生 Web Components 组件库。组件与框架无关，可直接在 React、Vue 及原生 HTML 中使用。

## 基础组件

<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: var(--dockv-spacing-md);">

<Card title="Icon | 图标" link="/components/icon">
  <div style="display: flex; gap: var(--dockv-spacing-sm);">
    <dv-icon icon="material-symbols:home" size="xl" color="var(--dockv-color-primary)"></dv-icon>
    <dv-icon icon="material-symbols:star" size="xl" color="var(--dockv-color-warning)"></dv-icon>
    <dv-icon icon="material-symbols:check-circle" size="xl" color="var(--dockv-color-success)"></dv-icon>
  </div>
</Card>

<Card title="Button | 按钮" link="/components/button">
  <div style="display: flex; gap: var(--dockv-spacing-sm);">
    <dv-button type="primary">按钮</dv-button>
    <dv-button icon="material-symbols:check-box-rounded" type="success"></dv-button>
  </div>
</Card>

<Card title="Divider | 分割线" link="/components/divider">
  <dv-divider color="#666666" style="--dockv-divider-width: 2px;">
    <dv-icon icon="material-symbols:safety-divider-rounded"></dv-icon>
    <span style="margin-left: 6px;">分割线</span>
  </dv-divider>
</Card>

<Card title="Notification | 通知" link="/components/notification">
  <div style="transform: scale(0.6); transform-origin: center; width: 320px; margin: 0 auto;">
    <dv-notification type="info" title="新消息" content="你有 3 条未读通知"></dv-notification>
  </div>
</Card>

</div>
