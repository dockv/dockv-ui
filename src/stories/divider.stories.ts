import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components-vite";

// 防止重复定义 Divider 组件
import { Divider } from "../components/divider.ts";
if (!customElements.get("dv-divider")) {
  customElements.define("dv-divider", Divider);
}

const meta: Meta = {
  title: "Components/Divider",
  tags: ["autodocs"],
  component: "dv-divider",
  argTypes: {
    direction: {
      control: { type: "inline-radio" },
      options: ["horizontal", "vertical"],
      description: "分割线方向",
      table: { defaultValue: { summary: "horizontal" } },
    },
    contentPosition: {
      control: { type: "inline-radio" },
      options: ["left", "center", "right"],
      description: "内容位置（仅横向且有内容时生效）",
      table: { defaultValue: { summary: "center" } },
    },
    borderStyle: {
      control: { type: "inline-radio" },
      options: ["solid", "dashed", "dotted"],
      description: "线型（实线 / 虚线 / 点线）",
      table: { defaultValue: { summary: "solid" } },
    },
    color: {
      control: "color",
      description: "自定义线的颜色，覆盖默认结构色 token",
      table: { defaultValue: { summary: "''" } },
    },
  },
};

export default meta;
type Story = StoryObj;

/** 基础用法 */
export const Default: Story = {
  args: {
    direction: "horizontal",
    contentPosition: "center",
    borderStyle: "solid",
    color: "",
  },
  render: (args) => html`
    <dv-divider
      direction=${args.direction}
      contentPosition=${args.contentPosition}
      borderStyle=${args.borderStyle}
      color=${args.color}>
      或
    </dv-divider>
  `,
};

/** 基础用法：无内容时是一根完整的分割线 */
export const Basic: Story = {
  render: () => html`
    <p>上面的内容</p>
    <dv-divider></dv-divider>
    <p>下面的内容</p>
  `,
};

/** 带内容（默认 slot）：线夹住文字或图标 */
export const WithContent: Story = {
  render: () => html`
    <dv-divider>或</dv-divider>
    <dv-divider>
      <dv-icon icon="material-symbols:sailing-outline-rounded"></dv-icon>
      <span>已经划到世界尽头了哦</span>
      <dv-icon icon="material-symbols:sailing-outline-rounded"></dv-icon>
    </dv-divider>
  `,
};

/** 内容位置 contentPosition：两端始终有线，只改长短 */
export const ContentPositions: Story = {
  render: () => html`
    <dv-divider contentPosition="left">靠左</dv-divider>
    <dv-divider>居中</dv-divider>
    <dv-divider contentPosition="right">靠右</dv-divider>
  `,
};

/** 方向 direction：竖向分割线用于工具栏、按钮组分隔 */
export const Directions: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; align-items: center">
      <dv-button variant="ghost">首页</dv-button>
      <dv-divider direction="vertical"></dv-divider>
      <dv-button variant="ghost">文档</dv-button>
      <dv-divider direction="vertical"></dv-divider>
      <dv-button variant="ghost">关于</dv-button>
    </div>
  `,
};

/** 线型 borderStyle：实线 / 虚线 / 点线 */
export const BorderStyles: Story = {
  render: () => html`
    <dv-divider>实线</dv-divider>
    <dv-divider borderStyle="dashed">虚线</dv-divider>
    <dv-divider borderStyle="dotted">点线</dv-divider>
  `,
};

/** 线宽 CSS 变量：虚线 / 点线需加宽才看得出断点 */
export const LineWidth: Story = {
  render: () => html`
    <dv-divider borderStyle="dashed">虚线 1px</dv-divider>
    <dv-divider borderStyle="dashed" style="--dockv-divider-width: 3px">虚线 3px</dv-divider>
    <dv-divider borderStyle="dotted" style="--dockv-divider-width: 4px">点线 4px</dv-divider>
  `,
};

/** 自定义颜色 color */
export const Colors: Story = {
  render: () => html`
    <dv-divider color="var(--dockv-color-vocaloid-miku)">初音未来</dv-divider>
    <dv-divider color="var(--dockv-color-vocaloid-luka)">巡音流歌</dv-divider>
    <dv-divider color="#66CCFF">自定义蓝</dv-divider>
  `,
};

/** 间距控制：外围间距用原生 margin / gap，内容缝隙用 padding / margin */
export const Spacing: Story = {
  render: () => html`
    <p>上段内容</p>
    <dv-divider style="margin: 24px 0">上下间距 24px</dv-divider>
    <p>下段内容</p>
    <div style="display: flex; align-items: center">
      <span>首页</span>
      <dv-divider direction="vertical" style="margin-inline: 12px"></dv-divider>
      <span>文档</span>
    </div>
    <dv-divider>默认缝隙</dv-divider>
    <dv-divider><span style="padding: 0 24px">加宽缝隙</span></dv-divider>
  `,
};
