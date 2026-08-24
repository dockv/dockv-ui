import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { Button } from "../components/button.ts";
if (!customElements.get("dv-button")) {
  customElements.define("dv-button", Button);
}

const meta: Meta = {
  title: "Components/Button",
  tags: ["autodocs"],
  component: "dv-button",
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["primary", "secondary", "tertiary", "success", "warning", "danger"],
      description: "按钮类型（语义色）",
      table: { defaultValue: { summary: "primary" } },
    },
    variant: {
      control: { type: "select" },
      options: ["solid", "light", "ghost", "outline", "soft", "neutral"],
      description: "按钮变体（视觉表现层）",
      table: { defaultValue: { summary: "solid" } },
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "按钮尺寸预设",
      table: { defaultValue: { summary: "md" } },
    },
    color: {
      control: "color",
      description: "自定义颜色（HEX / RGB / HSL），覆盖 type 默认色值",
      table: { defaultValue: { summary: "''" } },
    },
    icon: {
      control: "text",
      description: "图标名称（Iconify prefix:name）",
      table: { defaultValue: { summary: "''" } },
    },
    iconPosition: {
      control: { type: "inline-radio" },
      options: ["left", "right"],
      description: "图标位置",
      table: { defaultValue: { summary: "left" } },
    },
    square: {
      control: "boolean",
      description: "正方形按钮（宽 = 高）",
      table: { defaultValue: { summary: "false" } },
    },
    circle: {
      control: "boolean",
      description: "正圆按钮（隐含 square + 全圆角）",
      table: { defaultValue: { summary: "false" } },
    },
    borderRadius: {
      control: "text",
      description: "自定义圆角",
      table: { defaultValue: { summary: "''" } },
    },
    width: {
      control: "text",
      description: "自定义按钮宽度（任意 CSS 长度）",
      table: { defaultValue: { summary: "''" } },
    },
    disabled: {
      control: "boolean",
      description: "是否禁用",
      table: { defaultValue: { summary: "false" } },
    },
    loading: {
      control: "boolean",
      description: "加载中状态",
      table: { defaultValue: { summary: "false" } },
    },
    nativeType: {
      control: { type: "select" },
      options: ["button", "submit", "reset"],
      description: "原生 button 的表单行为 type",
      table: { defaultValue: { summary: "button" } },
    },
  },
};

export default meta;
type Story = StoryObj;

/** 基础用法（可用 Controls 调试全部属性） */
export const Default: Story = {
  args: {
    type: "primary",
    variant: "solid",
    size: "md",
    color: "",
    icon: "",
    iconPosition: "left",
    borderRadius: "",
    nativeType: "button",
    square: false,
    circle: false,
    disabled: false,
    loading: false,
  },
  render: (args) => html`
    <dv-button
      type=${args.type}
      variant=${args.variant}
      size=${args.size}
      color=${args.color}
      icon=${args.icon}
      iconPosition=${args.iconPosition}
      borderRadius=${args.borderRadius}
      nativeType=${args.nativeType}
      ?square=${args.square}
      ?circle=${args.circle}
      ?disabled=${args.disabled}
      ?loading=${args.loading}>
      按钮
    </dv-button>
  `,
};

/** 六种语义色 type */
export const Types: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
      <dv-button type="primary">主要</dv-button>
      <dv-button type="secondary">次要</dv-button>
      <dv-button type="tertiary">第三</dv-button>
      <dv-button type="success">成功</dv-button>
      <dv-button type="warning">警告</dv-button>
      <dv-button type="danger">危险</dv-button>
    </div>
  `,
};

/** 六种视觉表现层 variant */
export const Variants: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
      <dv-button variant="solid">深色填充</dv-button>
      <dv-button variant="light">浅色填充</dv-button>
      <dv-button variant="ghost">无背景</dv-button>
      <dv-button variant="outline">边框</dv-button>
      <dv-button variant="soft">浅色+边框</dv-button>
      <dv-button variant="neutral">灰底彩字</dv-button>
    </div>
  `,
};

/** 6 × 6 矩阵：6 种 type × 6 种 variant */
export const Matrix: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 8px">
      <!-- solid 行 -->
      <div style="display: flex; gap: 8px; align-items: center">
        <dv-button type="primary" variant="solid">主要</dv-button>
        <dv-button type="secondary" variant="solid">次要</dv-button>
        <dv-button type="tertiary" variant="solid">第三</dv-button>
        <dv-button type="success" variant="solid">成功</dv-button>
        <dv-button type="warning" variant="solid">警告</dv-button>
        <dv-button type="danger" variant="solid">危险</dv-button>
      </div>
      <!-- light 行 -->
      <div style="display: flex; gap: 8px; align-items: center">
        <dv-button type="primary" variant="light">主要</dv-button>
        <dv-button type="secondary" variant="light">次要</dv-button>
        <dv-button type="tertiary" variant="light">第三</dv-button>
        <dv-button type="success" variant="light">成功</dv-button>
        <dv-button type="warning" variant="light">警告</dv-button>
        <dv-button type="danger" variant="light">危险</dv-button>
      </div>
      <!-- ghost 行 -->
      <div style="display: flex; gap: 8px; align-items: center">
        <dv-button type="primary" variant="ghost">主要</dv-button>
        <dv-button type="secondary" variant="ghost">次要</dv-button>
        <dv-button type="tertiary" variant="ghost">第三</dv-button>
        <dv-button type="success" variant="ghost">成功</dv-button>
        <dv-button type="warning" variant="ghost">警告</dv-button>
        <dv-button type="danger" variant="ghost">危险</dv-button>
      </div>
      <!-- outline 行 -->
      <div style="display: flex; gap: 8px; align-items: center">
        <dv-button type="primary" variant="outline">主要</dv-button>
        <dv-button type="secondary" variant="outline">次要</dv-button>
        <dv-button type="tertiary" variant="outline">第三</dv-button>
        <dv-button type="success" variant="outline">成功</dv-button>
        <dv-button type="warning" variant="outline">警告</dv-button>
        <dv-button type="danger" variant="outline">危险</dv-button>
      </div>
      <!-- soft 行 -->
      <div style="display: flex; gap: 8px; align-items: center">
        <dv-button type="primary" variant="soft">主要</dv-button>
        <dv-button type="secondary" variant="soft">次要</dv-button>
        <dv-button type="tertiary" variant="soft">第三</dv-button>
        <dv-button type="success" variant="soft">成功</dv-button>
        <dv-button type="warning" variant="soft">警告</dv-button>
        <dv-button type="danger" variant="soft">危险</dv-button>
      </div>
      <!-- neutral 行 -->
      <div style="display: flex; gap: 8px; align-items: center">
        <dv-button type="primary" variant="neutral">主要</dv-button>
        <dv-button type="secondary" variant="neutral">次要</dv-button>
        <dv-button type="tertiary" variant="neutral">第三</dv-button>
        <dv-button type="success" variant="neutral">成功</dv-button>
        <dv-button type="warning" variant="neutral">警告</dv-button>
        <dv-button type="danger" variant="neutral">危险</dv-button>
      </div>
    </div>
  `,
};

/** 五种尺寸预设 */
export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
      <dv-button size="xs">超小</dv-button>
      <dv-button size="sm">小</dv-button>
      <dv-button size="md">中</dv-button>
      <dv-button size="lg">大</dv-button>
      <dv-button size="xl">超大</dv-button>
    </div>
  `,
};

/** 固定宽度 */
export const FixedSizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
      <dv-button size="md" width="120px">固定 120px</dv-button>
      <dv-button size="md" width="10rem">固定 10rem</dv-button>
      <dv-button size="md" width="50%">固定 50%</dv-button>
      <dv-button size="md" style="width: 300px">CSS 固定 300px</dv-button>
    </div>
  `,
};

/** 自定义颜色（覆盖 type 默认色值） */
export const Colors: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
      <dv-button color="#39C5BB" variant="solid">初音未来绿</dv-button>
      <dv-button color="rgb(255, 165, 0)" variant="light">镜音铃橙</dv-button>
      <dv-button color="hsl(350, 78%, 55%)" variant="outline">重音teto红</dv-button>
      <dv-button color="var(--dockv-color-vocaloid-luotianyi)" variant="soft">洛天依蓝</dv-button>
      <dv-button color="var(--dockv-color-vocaloid-gumi)" variant="ghost">GUMI 绿</dv-button>
    </div>
  `,
};

/** 图标按钮（icon 属性 + iconPosition） */
export const Icons: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
      <dv-button icon="material-symbols:home">首页</dv-button>
      <dv-button icon="material-symbols:arrow-forward" iconPosition="right">下一步</dv-button>
      <dv-button icon="material-symbols:delete" type="danger">删除</dv-button>
      <dv-button icon="material-symbols:settings"></dv-button>
      <dv-button icon="material-symbols:add" variant="outline"></dv-button>
      <dv-button icon="material-symbols:close" type="danger" variant="ghost"></dv-button>
    </div>
  `,
};

/** slot 直接使用 <dv-icon>：图标尺寸自由，支持纯图标与图文混排 */
export const SlotIcon: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
      <dv-button>
        <dv-icon icon="material-symbols:home"></dv-icon>
        直接使用图标组件
      </dv-button>
      <dv-button iconPosition="right">
        直接使用图标组件
        <dv-icon icon="material-symbols:home"></dv-icon>
      </dv-button>
      <dv-button>
        <dv-icon icon="material-symbols:home"></dv-icon>
      </dv-button>
    </div>
  `,
};

/** square / circle：紧凑形状，图标优先，纯文字只显示首字符 */
export const SquareCircle: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
      <dv-button icon="material-symbols:settings" square></dv-button>
      <dv-button icon="material-symbols:close" circle></dv-button>
      <dv-button circle>保存</dv-button>
      <dv-button square>删</dv-button>
      <dv-button circle type="danger" variant="outline" icon="material-symbols:delete"></dv-button>
    </div>
  `,
};

/** 自定义圆角 borderRadius：任意 CSS 长度或全局圆角 token */
export const BorderRadius: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
      <dv-button borderRadius="0">直角</dv-button>
      <dv-button borderRadius="0.75rem">小圆角</dv-button>
      <dv-button borderRadius="9999px">胶囊</dv-button>
      <dv-button borderRadius="var(--dockv-border-radius-sm)">sm</dv-button>
      <dv-button borderRadius="var(--dockv-border-radius-xl)">xl</dv-button>
      <dv-button borderRadius="var(--dockv-border-radius-full)">full</dv-button>
    </div>
  `,
};

/** 状态：禁用 / 加载 */
export const States: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
      <dv-button disabled>禁用</dv-button>
      <dv-button type="danger" variant="solid" disabled>禁用危险</dv-button>
      <dv-button loading>加载中</dv-button>
      <dv-button loading variant="outline">提交中</dv-button>
      <dv-button loading type="danger" icon="material-symbols:delete">删除中</dv-button>
      <dv-button disabled loading>禁用优先</dv-button>
    </div>
  `,
};

/** native-type：内层原生按钮的表单行为（submit / reset） */
export const NativeType: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
      <dv-button type="primary" native-type="submit">提交（submit）</dv-button>
      <dv-button type="success" native-type="reset">重置（reset）</dv-button>
    </div>
  `,
};

/** dv-click 事件 */
export const Event: Story = {
  render: () => html`
    <dv-button @dv-click=${() => console.log("dv-click 触发")}> 点我（dv-click） </dv-button>
  `,
};
