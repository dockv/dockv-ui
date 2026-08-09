import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { Icon } from "../components/icon.ts";
if (!customElements.get("dv-icon")) {
  customElements.define("dv-icon", Icon);
}

const meta: Meta = {
  title: "Components/Icon",
  tags: ["autodocs"],
  component: "dv-icon",
  argTypes: {
    icon: {
      control: "text",
      description: "Iconify 图标名称",
      table: { defaultValue: { summary: "''" } },
    },
    src: {
      control: "text",
      description: "图片地址",
      table: { defaultValue: { summary: "''" } },
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl", "inherit", "24px", "32px", "48px"],
      description: "图标大小（预设值、inherit 或具体数值）",
      table: { defaultValue: { summary: "md" } },
    },
    color: {
      control: "color",
      description: "图标颜色",
      table: { defaultValue: { summary: "''" } },
    },
    rotate: {
      control: { type: "number" },
      description: "旋转度数（deg）",
      table: { defaultValue: { summary: "0" } },
    },
    spin: {
      control: "boolean",
      description: "是否播放旋转动画",
      table: { defaultValue: { summary: "false" } },
    },
  },
};

export default meta;
type Story = StoryObj;

/** Iconify 图标渲染（可用 Controls 调试全部属性） */
export const Default: Story = {
  args: {
    icon: "material-symbols:home-rounded",
    size: "md",
  },
  render: (args) =>
    html`<dv-icon
      icon=${args.icon}
      src=${args.src}
      size=${args.size}
      color=${args.color}
      rotate=${args.rotate ?? 0}
      ?spin=${args.spin ?? false}></dv-icon>`,
};

/** 预设尺寸对比 */
export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 3px;">
      文字和图标的对比
      <dv-icon icon="material-symbols:home" size="xs"></dv-icon>
      <dv-icon icon="material-symbols:home" size="sm"></dv-icon>
      <dv-icon icon="material-symbols:home" size="md"></dv-icon>
      <dv-icon icon="material-symbols:home" size="lg"></dv-icon>
      <dv-icon icon="material-symbols:home" size="xl"></dv-icon>
      <dv-icon icon="material-symbols:home" size="32px"></dv-icon>
      <dv-icon icon="material-symbols:home" size="48px"></dv-icon>
    </div>
  `,
};

/** 继承父元素字体大小 */
export const InheritSize: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 0px;">
      <div style="display: flex; font-size: 12px;">
        12px 文字
        <dv-icon icon="material-symbols:home" size="inherit"></dv-icon>
        <dv-icon icon="material-symbols:star" size="inherit" color="red"></dv-icon>
      </div>
      <div style="display: flex; font-size: 16px;">
        16px 文字（默认大小）
        <dv-icon icon="material-symbols:home" size="inherit"></dv-icon>
        <dv-icon icon="material-symbols:star" size="inherit" color="red"></dv-icon>
      </div>
      <div style="display: flex; font-size: 24px;">
        24px 文字
        <dv-icon icon="material-symbols:home" size="inherit"></dv-icon>
        <dv-icon icon="material-symbols:star" size="inherit" color="red"></dv-icon>
      </div>
      <div style="display: flex; font-size: 32px;">
        32px 文字
        <dv-icon icon="material-symbols:home" size="inherit"></dv-icon>
        <dv-icon icon="material-symbols:star" size="inherit" color="red"></dv-icon>
      </div>
    </div>
  `,
};

/** 颜色对比 */
export const Colors: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 16px;">
      <dv-icon icon="material-symbols:home" size="lg"></dv-icon>
      <dv-icon icon="material-symbols:home" size="lg" color="red"></dv-icon>
      <dv-icon icon="material-symbols:home" size="lg" color="#1976d2"></dv-icon>
      <dv-icon icon="material-symbols:home" size="lg" color="#4caf50"></dv-icon>
      <dv-icon icon="material-symbols:home" size="lg" color="#ff9800"></dv-icon>
    </div>
  `,
};

/** 不同图标集 */
export const IconSets: Story = {
  render: () => html`
    <div style="display: flex; gap: 24px;">
      <div style="text-align: center;">
        <dv-icon icon="material-symbols:home" size="lg"></dv-icon>
        <div>Material Symbols</div>
      </div>
      <div style="text-align: center;">
        <dv-icon icon="mdi:heart" size="lg" color="red"></dv-icon>
        <div>MDI</div>
      </div>
      <div style="text-align: center;">
        <dv-icon icon="carbon:user-avatar" size="lg"></dv-icon>
        <div>Carbon</div>
      </div>
    </div>
  `,
};

/** 图片方式（src 属性） */
export const ImageSrc: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px;">
      <dv-icon src="https://ui-avatars.com/api/?name=DockV" size="md"></dv-icon>
      <dv-icon src="https://picsum.photos/48" size="48px"></dv-icon>
    </div>
  `,
};

/** 自定义 SVG 内容（slot 方式） */
export const CustomSvg: Story = {
  render: () => html`
    <dv-icon size="lg" color="#1976d2">
      <svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M12 2L2 22h20L12 2zm0 4l6 14H6l6-14z" />
      </svg>
    </dv-icon>
  `,
};

/** 渲染优先级：slot > src > icon */
export const RenderPriority: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div>
        <strong>优先级 1：slot（即使设了 src/icon，也显示 slot 内容）</strong>
        <dv-icon src="/logo.svg" icon="material-symbols:home" size="lg">
          <svg viewBox="0 0 24 24" style="fill: green">
            <circle cx="12" cy="12" r="10" />
          </svg>
        </dv-icon>
      </div>
      <div>
        <strong>优先级 2：src（设了 src 和 icon，但没 slot）</strong>
        <dv-icon src="https://picsum.photos/40" icon="material-symbols:home" size="40px"></dv-icon>
      </div>
      <div>
        <strong>优先级 3：icon（只设了 icon）</strong>
        <dv-icon icon="material-symbols:home" size="lg"></dv-icon>
      </div>
    </div>
  `,
};

/** 无内容空状态 */
export const Empty: Story = {
  render: () => html`<dv-icon size="lg" color="gray"></dv-icon>`,
};

/** 旋转角度（rotate） */
export const Rotate: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 16px;">
      <dv-icon icon="material-symbols:arrow-left-alt-rounded" size="lg"></dv-icon>
      <dv-icon icon="material-symbols:arrow-left-alt-rounded" size="lg" rotate="45"></dv-icon>
      <dv-icon icon="material-symbols:arrow-left-alt-rounded" size="lg" rotate="90"></dv-icon>
      <dv-icon icon="material-symbols:arrow-left-alt-rounded" size="lg" rotate="180"></dv-icon>
    </div>
  `,
};

/** 旋转动画（spin），可叠加 rotate 作为起点角度 */
export const Spin: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 16px;">
      <dv-icon icon="material-symbols:settings" size="lg" spin></dv-icon>
      <dv-icon icon="material-symbols:settings" size="lg" rotate="45" spin></dv-icon>
      <span style="display: inline-flex; align-items: center; gap: 4px;">
        加载中
        <dv-icon icon="material-symbols:settings" size="sm" spin></dv-icon>
      </span>
    </div>
  `,
};

/** 多色图标：品牌 logo 自带颜色，color 属性无效 */
export const MulticolorIcons: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 16px;">
      <dv-icon icon="logos:figma" size="lg" color="red"></dv-icon>
      <dv-icon icon="logos:react" size="lg" color="red"></dv-icon>
      <span style="color: #888;">设置了 color="red"，图标仍是彩色</span>
    </div>
  `,
};

/** 宽高比自适应：size 只控制高度，宽度按比例伸展（长条形 logo 不变形） */
export const WideIcons: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 16px;">
      <dv-icon icon="logos:sqlite" size="xl"></dv-icon>
      <dv-icon icon="logos:cloudflare" size="xl"></dv-icon>
      <dv-icon icon="logos:figma" size="xl"></dv-icon>
    </div>
  `,
};

/** 第三方图标库：Font Awesome 图标字体通过 slot 传入，size / color 生效 */
export const ThirdPartyFont: Story = {
  render: () => html`
    <div>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.3.0/css/all.min.css" />
      <div style="display: flex; align-items: center; gap: 16px;">
        <dv-icon size="24px" color="#4c78f2">
          <i class="fa-solid fa-circle-user"></i>
        </dv-icon>
        <dv-icon size="30px" color="#eea21f">
          <i class="fa-brands fa-cloudflare"></i>
        </dv-icon>
        <dv-icon size="36px" color="#6b6b6b">
          <i class="fa-solid fa-compass"></i>
        </dv-icon>
      </div>
    </div>
  `,
};
