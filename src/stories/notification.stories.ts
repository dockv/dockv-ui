import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { NotificationCard, Notification } from "../components/notification.ts";
import type { NotificationType, NotificationVariant } from "../components/notification.ts";
// 不重复注册 Notification 组件
if (!customElements.get("dv-notification")) {
  customElements.define("dv-notification", NotificationCard);
}

const meta: Meta = {
  title: "Components/Notification",
  tags: ["autodocs"],
  component: "dv-notification",
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["", "info", "success", "warning", "error"],
      description: "通知类型（语义色）；不设置时无图标、强调色用第三色",
      table: { defaultValue: { summary: "—（不设置）" } },
    },
    color: {
      control: "color",
      description: "自定义强调色，覆盖 type 默认配色",
      table: { defaultValue: { summary: "''" } },
    },
    variant: {
      control: { type: "select" },
      options: ["normal", "soft"],
      description: "视觉变体",
      table: { defaultValue: { summary: "normal" } },
    },
    title: {
      control: "text",
      description: "通知标题",
      table: { defaultValue: { summary: "''" } },
    },
    content: {
      control: "text",
      description: "通知正文（支持纯文本 / DOM 节点 / lit 模板）",
      table: { defaultValue: { summary: "''" } },
    },
    icon: {
      control: "text",
      description: "自定义图标（Iconify prefix:name）；false 隐藏，留空使用 type 对应的默认图标",
      table: { defaultValue: { summary: "按 type 自动" } },
    },
    showClose: {
      control: "boolean",
      description: "是否显示关闭按钮",
      table: { defaultValue: { summary: "true" } },
    },
    progress: {
      control: "boolean",
      description: "是否显示进度条",
      table: { defaultValue: { summary: "true" } },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    type: "",
    color: "",
    variant: "normal",
    title: "标题文字",
    content: "正文内容描述",
    icon: "",
    showClose: true,
    progress: true,
  },
  render: (args) => html`
    <dv-notification
      type=${args.type}
      variant=${args.variant}
      color=${args.color}
      title=${args.title}
      .icon=${args.icon}
      .content=${args.content}
      ?showClose=${args.showClose}
      ?progress=${args.progress}
      style="--dockv-notification-progress: 60%"></dv-notification>
  `,
};

/** 四种语义色 type */
export const Types: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start">
      <dv-notification
        type="info"
        title="Info 提示"
        .content=${"这是一条通知"}
        style="--dockv-notification-progress: 100%"></dv-notification>
      <dv-notification
        type="success"
        title="Success 成功"
        .content=${"操作已完成"}
        style="--dockv-notification-progress: 80%"></dv-notification>
      <dv-notification
        type="warning"
        title="Warning 警告"
        .content=${"请注意检查"}
        style="--dockv-notification-progress: 50%"></dv-notification>
      <dv-notification
        type="error"
        title="Error 错误"
        .content=${"操作失败，请重试"}
        style="--dockv-notification-progress: 30%"></dv-notification>
    </div>
  `,
};

/** 两种视觉变体：normal（普通）/ soft（多彩） */
export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start">
      <dv-notification
        type="success"
        title="普通模式"
        .content=${"白/中性背景 + 细边框"}
        style="--dockv-notification-progress: 100%"></dv-notification>
      <dv-notification
        type="success"
        variant="soft"
        title="多彩模式"
        .content=${"浅色背景 + 强调色边框 + 强调色图标"}
        style="--dockv-notification-progress: 100%"></dv-notification>
    </div>
  `,
};

/** 自定义强调色 color：覆盖 type 默认配色 */
export const Colors: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start">
      <dv-notification
        type="info"
        color="#39C5BB"
        title="自定义青色"
        .content=${"初音未来绿"}
        style="--dockv-notification-progress: 100%"></dv-notification>
      <dv-notification
        type="warning"
        color="#6f7ad3"
        variant="soft"
        title="自定义紫色（多彩模式）"
        .content=${"soft 背景/边框随 color 变化"}
        style="--dockv-notification-progress: 100%"></dv-notification>
    </div>
  `,
};

/** 图标：自定义 / 隐藏 / 默认 */
export const Icons: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start">
      <dv-notification
        type="success"
        title="默认图标"
        .content=${"按 type 自动匹配"}
        style="--dockv-notification-progress: 100%"></dv-notification>
      <dv-notification
        type="success"
        .icon=${"material-symbols:rocket-launch"}
        title="自定义图标"
        .content=${"icon 属性覆盖默认"}
        style="--dockv-notification-progress: 100%"></dv-notification>
      <dv-notification
        type="info"
        .icon=${false}
        title="隐藏图标"
        .content=${"icon=false 显式隐藏"}
        style="--dockv-notification-progress: 100%"></dv-notification>
    </div>
  `,
};

/** 进度条：静态展示不同剩余宽度（真实场景由管理器按倒计时刷新） */
export const Progress: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start">
      <dv-notification
        type="success"
        title="进度条（默认底部）"
        .content=${"剩余 60%"}
        style="--dockv-notification-progress: 60%"></dv-notification>
      <dv-notification
        type="warning"
        title="进度条（置顶）"
        .content=${"progress-position 为 top"}
        data-progress-position="top"
        style="--dockv-notification-progress: 40%"></dv-notification>
      <dv-notification
        type="info"
        title="关闭进度条"
        .content=${"progress=false"}
        .progress=${false}></dv-notification>
    </div>
  `,
};

/** 富内容 content：DOM 节点 / lit 模板 */
export const RichContent: Story = {
  render: () => {
    // 原生 DOM 节点（零 lit 依赖写法）
    const wrap = document.createElement("div");
    wrap.style.cssText = "display:flex;align-items:center;gap:8px";
    wrap.innerHTML = `<img src="http://ui.dockv.cc/logo.png" style="width:20px;border-radius:50%">头像已更新`;

    return html`
      <div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start">
        <dv-notification
          title="DOM 节点"
          .content=${wrap}
          style="--dockv-notification-progress: 100%"></dv-notification>
        <dv-notification
          title="Lit 模板"
          .content=${html`
            <div style="display:flex;align-items:center;gap:8px">
              <dv-icon icon="material-symbols:info-outline"></dv-icon>
              <span>发现新版本 <b>v2.4.0</b></span>
            </div>
          `}
          style="--dockv-notification-progress: 100%"></dv-notification>
      </div>
    `;
  },
};

/** 命令式调用：open / 各 type 快捷方法 */
export const CommandApi: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
      <dv-button
        type="primary"
        variant="neutral"
        @dv-click=${() => Notification.info({ title: "Info", content: "这是一条 info 通知" })}
        >Info</dv-button
      >
      <dv-button
        type="success"
        variant="neutral"
        @dv-click=${() => Notification.success({ title: "保存成功", content: "配置文件已更新" })}
        >Success</dv-button
      >
      <dv-button
        type="warning"
        variant="neutral"
        @dv-click=${() =>
          Notification.warning({ title: "磁盘空间不足", content: "剩余 5% 空间", duration: 5000 })}
        >Warning</dv-button
      >
      <dv-button
        type="danger"
        variant="neutral"
        @dv-click=${() =>
          Notification.error({ title: "删除失败", content: "权限不足，请联系管理员" })}
        >Error</dv-button
      >
    </div>
  `,
};

/** 位置：六个 position */
export const Positions: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
      <dv-button
        @dv-click=${() =>
          Notification.open({ title: "top", content: "顶部居中", position: "top", duration: 2500 })}
        >top</dv-button
      >
      <dv-button
        @dv-click=${() =>
          Notification.open({
            title: "topLeft",
            content: "左上角",
            position: "topLeft",
            duration: 2500,
          })}
        >topLeft</dv-button
      >
      <dv-button
        @dv-click=${() =>
          Notification.open({
            title: "topRight",
            content: "右上角（默认）",
            position: "topRight",
            duration: 2500,
          })}
        >topRight</dv-button
      >
      <dv-button
        @dv-click=${() =>
          Notification.open({
            title: "bottom",
            content: "底部居中",
            position: "bottom",
            duration: 2500,
          })}
        >bottom</dv-button
      >
      <dv-button
        @dv-click=${() =>
          Notification.open({
            title: "bottomLeft",
            content: "左下角",
            position: "bottomLeft",
            duration: 2500,
          })}
        >bottomLeft</dv-button
      >
      <dv-button
        @dv-click=${() =>
          Notification.open({
            title: "bottomRight",
            content: "右下角",
            position: "bottomRight",
            duration: 2500,
          })}
        >bottomRight</dv-button
      >
    </div>
  `,
};

/** 更新 update：进度类任务的内容就地更新 */
export const Update: Story = {
  render: () => html`
    <dv-button
      @dv-click=${() => {
        const id = Notification.info({ title: "正在处理", content: "任务 1/10...", duration: 0 });
        let i = 1;
        const timer = setInterval(() => {
          i++;
          if (i > 10) {
            clearInterval(timer);
            Notification.update(id, {
              type: "success",
              title: "处理完成",
              content: "全部 10 个任务完成",
              duration: 3000,
            });
            return;
          }
          Notification.update(id, { content: `任务 ${i}/10...` });
        }, 500);
      }}>
      模拟后台任务
    </dv-button>
  `,
};

/** 进度条自定义：颜色分档 / 置顶 */
export const ProgressCustom: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
      <dv-button
        @dv-click=${() =>
          Notification.info({
            title: "分档颜色",
            content: "随剩余时间变化颜色",
            duration: 6000,
            progress: {
              color: [
                { color: "#f56c6c", percentage: 20 },
                { color: "#e6a23c", percentage: 40 },
                { color: "#5cb87a", percentage: 60 },
                { color: "#1989fa", percentage: 80 },
                { color: "#6f7ad3", percentage: 100 },
              ],
            },
          })}
        >分档颜色</dv-button
      >
      <dv-button
        @dv-click=${() =>
          Notification.info({
            title: "进度条置顶",
            content: "兼作主题装饰线",
            duration: 4000,
            progress: { position: "top", color: "#39C5BB" },
          })}
        >进度条置顶</dv-button
      >
      <dv-button
        @dv-click=${() =>
          Notification.success({
            title: "无进度条",
            content: "progress: false",
            progress: false,
            duration: 3000,
          })}
        >关闭进度条</dv-button
      >
    </div>
  `,
};

/** 生命周期：close / destroyAll / config */
export const Lifecycle: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
      <dv-button
        @dv-click=${() => {
          const id = Notification.open({
            title: "倒计时 10 秒",
            content: "点击关闭可提前结束",
            duration: 10000,
          });
          // 立即关闭测试：稍后手动关闭
          (window as unknown as { __notifId?: string }).__notifId = id;
        }}>
        打开一条（10s）
      </dv-button>
      <dv-button
        variant="outline"
        @dv-click=${() =>
          Notification.close((window as unknown as { __notifId?: string }).__notifId ?? "")}>
        关闭最后一条
      </dv-button>
      <dv-button type="danger" variant="ghost" @dv-click=${() => Notification.destroyAll()}
        >destroyAll</dv-button
      >
      <dv-button
        variant="neutral"
        @dv-click=${() => {
          Notification.config({ duration: 1500, position: "bottomRight", icon: { info: "logos:pnpm" } });
          Notification.info({ title: "全局配置已改", content: "1.5s 后自动关闭，右下角，info 默认图标：logos:pnpm" });
        }}>
        改全局配置
      </dv-button>
    </div>
  `,
};

/** 重复 id 抛错：open 传入已存在 id 会直接抛错 */
export const DuplicateId: Story = {
  render: () => html`
    <dv-button
      type="danger"
      variant="outline"
      @dv-click=${() => {
        try {
          Notification.open({ id: "dup-test", title: "第一条", duration: 10000 });
          // 第二次用同一 id：抛错
          Notification.open({ id: "dup-test", title: "重复 id" });
        } catch (err) {
          console.error(err);
          Notification.error({
            title: "捕获到错误",
            content: (err as Error).message,
            duration: 5000,
          });
        }
      }}>
      触发重复 id 抛错
    </dv-button>
  `,
};

/** get/getAll 查询当前存活通知：数量、标题、剩余时长、位置 */
export const QuerySnapshots: Story = {
  render: () => html`
    <dv-button
      variant="neutral"
      @dv-click=${() => {
        Notification.destroyAll();
        Notification.info({ id: "snap-a", title: "任务 A", content: "剩余 8s", duration: 8000 });
        Notification.open({ title: "", content: "无标题，检测空串", duration: 6000 });
        const all = Notification.getAll();
        const one = Notification.get("snap-a");
        Notification.warning({
          title: `getAll 命中 ${all.length} 条`,
          content: `get("snap-a") -> title="${one?.title}" remaining=${one?.remaining}ms, position=${one?.position}`,
          duration: 6000,
        });
      }}>
      生成并查询快照
    </dv-button>
  `,
};

/** 类型引用（供 TS 检查 / 文档示例） */
export type StoryTypes = NotificationType | NotificationVariant;
