import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { Tag } from "../components/tag.ts";
if (!customElements.get("dv-tag")) {
  customElements.define("dv-tag", Tag);
}

const meta: Meta = {
  title: "Components/Tag",
  tags: ["autodocs"],
  component: "dv-tag",
  argTypes: {
    color: {
      control: { type: "text" },
      description:
        "标签颜色：17 种预设色盘（grey / blue / light-blue / cyan / teal / green / light-green / lime / yellow / amber / orange / red / pink / purple / violet / indigo / white）或任意 CSS 颜色（HEX / RGB / HSL / var）。未指定时回退 grey",
      table: { defaultValue: { summary: "''" } },
    },
    variant: {
      control: { type: "select" },
      options: ["light", "ghost", "soft", "outline", "solid", "neutral"],
      description: "标签视觉变体",
      table: { defaultValue: { summary: "light" } },
    },
    type: {
      control: { type: "select" },
      options: ["success", "warning", "danger"],
      description: "系统状态语义色",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl"],
      description: "标签尺寸预设",
      table: { defaultValue: { summary: "md" } },
    },
    capsule: {
      control: "boolean",
      description: "胶囊形状（两端全圆角 9999px）",
      table: { defaultValue: { summary: "false" } },
    },
    round: {
      control: "boolean",
      description: "圆角形状（与默认圆角等价，3px，仅作语义化显式声明）",
      table: { defaultValue: { summary: "false" } },
    },
    sharp: {
      control: "boolean",
      description: "直角形状（无圆角）",
      table: { defaultValue: { summary: "false" } },
    },
    prefixIcon: {
      control: "text",
      description: "前缀图标（Iconify prefix:name）",
      table: { defaultValue: { summary: "''" } },
    },
    suffixIcon: {
      control: "text",
      description: "后缀图标（Iconify prefix:name）",
      table: { defaultValue: { summary: "''" } },
    },
    prefixImage: {
      control: "text",
      description: "前缀图片 URL",
      table: { defaultValue: { summary: "''" } },
    },
    suffixImage: {
      control: "text",
      description: "后缀图片 URL",
      table: { defaultValue: { summary: "''" } },
    },
    closable: {
      control: "boolean",
      description: "是否可关闭",
      table: { defaultValue: { summary: "false" } },
    },
    checkable: {
      control: "boolean",
      description: "是否可选中（与 closable 互斥，同时声明时优先 checkable）",
      table: { defaultValue: { summary: "false" } },
    },
    checked: {
      control: "boolean",
      description:
        "选中态。配合 checkable 时为可切换的当前状态；单独声明时为只读展示（不可点击）",
      table: { defaultValue: { summary: "false" } },
    },
    selectable: {
      control: "boolean",
      description: "是否允许划选文本",
      table: { defaultValue: { summary: "false" } },
    },
    invisible: {
      control: "boolean",
      description: "隐藏标签（display: none，不占空间、不移除节点）",
      table: { defaultValue: { summary: "false" } },
    },
    disabled: {
      control: "boolean",
      description: "禁用交互，不改变可见性",
      table: { defaultValue: { summary: "false" } },
    },
  },
};

export default meta;
type Story = StoryObj;

/** 基础用法（可用 Controls 调试全部属性） */
export const Default: Story = {
  args: {
    color: "",
    variant: "light",
    type: "",
    size: "md",
    capsule: false,
    round: false,
    sharp: false,
    prefixIcon: "",
    suffixIcon: "",
    prefixImage: "",
    suffixImage: "",
    closable: false,
    checkable: false,
    checked: false,
    selectable: false,
    invisible: false,
    disabled: false,
  },
  render: (args) => html`
    <dv-tag
      color=${args.color}
      variant=${args.variant}
      type=${args.type}
      size=${args.size}
      .prefixIcon=${args.prefixIcon}
      .suffixIcon=${args.suffixIcon}
      .prefixImage=${args.prefixImage}
      .suffixImage=${args.suffixImage}
      ?capsule=${args.capsule}
      ?round=${args.round}
      ?sharp=${args.sharp}
      ?closable=${args.closable}
      ?checkable=${args.checkable}
      ?checked=${args.checked}
      ?selectable=${args.selectable}
      ?invisible=${args.invisible}
      ?disabled=${args.disabled}>
      标签
    </dv-tag>
  `,
};

/** 17 种内置预设色盘 */
export const Colors: Story = {
  render: () => html`
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
      <dv-tag color="grey">grey</dv-tag>
      <dv-tag color="blue">blue</dv-tag>
      <dv-tag color="light-blue">light-blue</dv-tag>
      <dv-tag color="cyan">cyan</dv-tag>
      <dv-tag color="teal">teal</dv-tag>
      <dv-tag color="green">green</dv-tag>
      <dv-tag color="light-green">light-green</dv-tag>
      <dv-tag color="lime">lime</dv-tag>
      <dv-tag color="yellow">yellow</dv-tag>
      <dv-tag color="amber">amber</dv-tag>
      <dv-tag color="orange">orange</dv-tag>
      <dv-tag color="red">red</dv-tag>
      <dv-tag color="pink">pink</dv-tag>
      <dv-tag color="purple">purple</dv-tag>
      <dv-tag color="violet">violet</dv-tag>
      <dv-tag color="indigo">indigo</dv-tag>
      <dv-tag color="white">white</dv-tag>
    </div>
  `,
};

/** 自定义颜色（color-mix 原生插值） */
export const CustomColor: Story = {
  render: () => html`
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
      <dv-tag color="#39C5BB">初音未来绿</dv-tag>
      <dv-tag color="rgb(255, 87, 51)" variant="soft">任意 RGB</dv-tag>
      <dv-tag color="hsl(354, 68%, 54%)" variant="outline">重音teto红</dv-tag>
      <dv-tag color="var(--dockv-color-vocaloid-luka)" variant="light">引用色盘</dv-tag>
    </div>
  `,
};

/** 系统状态语义色（type：success / warning / danger） */
export const Types: Story = {
  render: () => html`
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
      <dv-tag type="success">成功</dv-tag>
      <dv-tag type="warning">警告</dv-tag>
      <dv-tag type="danger">危险</dv-tag>
      <dv-tag type="danger" color="blue">显式 color 优先</dv-tag>
    </div>
  `,
};

/** 六种视觉变体 */
export const Variants: Story = {
  render: () => html`
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
      <dv-tag variant="light">浅色 (light)</dv-tag>
      <dv-tag variant="ghost">无背景 (ghost)</dv-tag>
      <dv-tag variant="soft">浅色+边框 (soft)</dv-tag>
      <dv-tag variant="outline">描边 (outline)</dv-tag>
      <dv-tag variant="solid">实心 (solid)</dv-tag>
      <dv-tag variant="neutral">灰底彩字 (neutral)</dv-tag>
    </div>
  `,
};

/** 四档尺寸 */
export const Sizes: Story = {
  render: () => html`
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
      <dv-tag size="sm">小</dv-tag>
      <dv-tag size="md">中</dv-tag>
      <dv-tag size="lg">大</dv-tag>
      <dv-tag size="xl">超大</dv-tag>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:12px">
      <dv-tag size="sm" color="blue">小尺寸 + 自定义色</dv-tag>
      <dv-tag size="lg" color="green">大尺寸 + 自定义色</dv-tag>
      <dv-tag size="xl" type="danger" variant="solid">超大 + 语义色</dv-tag>
    </div>
  `,
};

/** 小尺寸下的上下伸笔画完整性（y / g / p / q / j 与 b / d / h / k 不被裁剪） */
export const SmallSizeGlyphs: Story = {
  render: () => html`
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
      <dv-tag size="sm" color="blue">Typography</dv-tag>
      <dv-tag size="sm">grey tag</dv-tag>
      <dv-tag size="sm" variant="solid" type="danger">y g p q j</dv-tag>
      <dv-tag size="sm" variant="solid" type="danger">b d h k</dv-tag>
      <dv-tag size="sm" color="red">声调: ā á ǎ à</dv-tag>
    </div>
    <p style="font-size:13px;color:#888">
      小尺寸（16px）下上述文字应完整呈现，底部不被截断、不被内边距遮挡。
    </p>
  `,
};

/** 形状：默认微圆角 / 胶囊（capsule） / 圆角（round） / 直角（sharp） */
export const Shapes: Story = {
  render: () => html`
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
      <dv-tag>默认标签</dv-tag>
      <dv-tag capsule>胶囊标签</dv-tag>
      <dv-tag round>圆角标签</dv-tag>
      <dv-tag sharp>直角标签</dv-tag>
      <dv-tag capsule color="blue">胶囊蓝</dv-tag>
      <dv-tag round color="green">圆角绿</dv-tag>
      <dv-tag sharp type="warning">直角警告</dv-tag>
    </div>
  `,
};

/** 前后缀图标与图片 */
export const PrefixSuffix: Story = {
  render: () => html`
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
      <dv-tag prefix-icon="material-symbols:home" color="blue">首页</dv-tag>
      <dv-tag suffix-icon="material-symbols:chevron-right" color="green">更多</dv-tag>
      <dv-tag prefix-icon="material-symbols:star" suffix-icon="material-symbols:check" color="amber">星级</dv-tag>
      <dv-tag prefix-image="https://ui.dockv.cc/logo.png" color="blue">带头像</dv-tag>
    </div>
  `,
};

/** 可关闭（点击 × 自动隐藏） */
export const Closable: Story = {
  render: () => html`
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
      <dv-tag closable>可关闭</dv-tag>
      <dv-tag closable color="blue">可关闭-蓝</dv-tag>
      <dv-tag closable type="danger" variant="outline">删除确认</dv-tag>
    </div>
  `,
};

/** 可选中（变体成对翻转：ghost ⇄ light、outline ⇄ soft、neutral ⇄ solid） */
export const Checkable: Story = {
  render: () => html`
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
      <dv-tag checkable variant="ghost" color="blue">ghost ⇄ light</dv-tag>
      <dv-tag checkable checked variant="ghost" color="blue">ghost 已选</dv-tag>
      <dv-tag checkable variant="outline" color="green">outline ⇄ soft</dv-tag>
      <dv-tag checkable checked variant="outline" color="green">outline 已选</dv-tag>
      <dv-tag checkable variant="neutral" type="danger">neutral ⇄ solid</dv-tag>
      <dv-tag checkable checked variant="neutral" type="danger">neutral 已选</dv-tag>
    </div>
    <p style="font-size:13px;color:#888;max-width:720px">
      注意：属性中写的 <code>variant</code> 是标签「未选中」时的样子，选中后会跳到配对组的另一档。因此
      <code>checkable</code> 场景请优先使用 <code>neutral</code> / <code>outline</code> /
      <code>ghost</code>，避免未选中时就已经是「选中」的视觉效果。
    </p>
  `,
};

/** 只读选中（仅声明 checked，不可交互） */
export const CheckedReadonly: Story = {
  render: () => html`
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
      <dv-tag checked color="green" variant="neutral">只读选中</dv-tag>
      <dv-tag checked variant="solid" type="danger">只读 solid</dv-tag>
      <dv-tag checked color="blue">只读 light</dv-tag>
      <dv-tag checked>只读默认</dv-tag>
    </div>
    <p style="font-size:13px;color:#888">
      仅声明 <code>checked</code> 时只呈现选中外观，不可点击、不派发事件。
    </p>
  `,
};

/** closable 与 checkable 同时声明：优先 checkable，不渲染关闭按钮（控制台输出警告） */
export const ClosableCheckableConflict: Story = {
  render: () => html`
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
      <dv-tag closable checkable color="blue">两者同时声明</dv-tag>
      <dv-tag closable checkable checked color="green">两者同时声明 + 已选</dv-tag>
    </div>
    <p style="font-size:13px;color:#888">
      按 <code>checkable</code> 处理，关闭按钮不渲染，控制台会输出 console.warn（任何环境）。
    </p>
  `,
};

/** 禁用状态 */
export const Disabled: Story = {
  render: () => html`
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
      <dv-tag disabled>禁用标签</dv-tag>
      <dv-tag color="blue" disabled>禁用蓝</dv-tag>
      <dv-tag closable disabled>禁用关闭</dv-tag>
      <dv-tag checkable disabled>禁用选中</dv-tag>
      <dv-tag checkable checked disabled color="green">禁用 + 已选</dv-tag>
    </div>
    <p style="font-size:13px;color:#888">
      只阻断交互（dv-click / dv-change / dv-close 均不派发），不改变可见性；可用 Tab 聚焦。
    </p>
  `,
};

/** 可见性（默认可见；invisible 隐藏，不占空间但保留节点） */
export const Invisible: Story = {
  render: () => html`
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center" id="invisible-demo">
      <dv-tag>可见 A</dv-tag>
      <dv-tag invisible>应不可见</dv-tag>
      <dv-tag>可见 B</dv-tag>
    </div>
    <p style="font-size:13px;color:#888;margin-bottom:8px">
      中间标签隐藏后不占空间（A 与 B 紧邻），DOM 节点仍保留。
    </p>
    <button
      style="font-size:13px;padding:4px 10px;cursor:pointer"
      @click=${(e: Event) => {
        const row = (e.target as HTMLElement).previousElementSibling?.previousElementSibling;
        const el = row?.querySelectorAll("dv-tag")[1] as Tag | undefined;
        if (el) el.invisible = !el.invisible;
      }}>
      切换中间标签显隐
    </button>
  `,
};

/** 长文本单行省略（宽度受 max-width 限制时以 … 省略） */
export const LongText: Story = {
  render: () => html`
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
      <dv-tag style="max-width: 120px">这是一段很长很长的标签文本内容</dv-tag>
      <dv-tag size="xl" style="max-width: 160px">This is a very long tag text content</dv-tag>
      <dv-tag color="blue" style="max-width: 100px">蓝底长文本省略测试</dv-tag>
    </div>
    <div style="max-width: 200px;margin-top:12px">
      <dv-tag color="green">父容器仅有 200px 宽，标签随容器收窄并省略</dv-tag>
    </div>
    <p style="font-size:13px;color:#888">
      标签内文本始终单行，不会换行撑高；超出部分以 … 省略。
    </p>
  `,
};

/** 图片圆角跟随标签圆角（capsule / round / 自定义） */
export const ImageRadius: Story = {
  render: () => html`
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
      <dv-tag prefix-image="https://ui.dockv.cc/logo.png" color="blue">默认圆角</dv-tag>
      <dv-tag prefix-image="https://ui.dockv.cc/logo.png" capsule color="purple">
        胶囊 + 圆角图
      </dv-tag>
      <dv-tag
        prefix-image="https://ui.dockv.cc/logo.png"
        style="--dockv-tag-border-radius: 8px"
        color="green">
        8px 圆角
      </dv-tag>
      <dv-tag
        prefix-image="https://ui.dockv.cc/logo.png"
        style="--dockv-tag-image-radius: 9999px"
        color="orange">
        图片单独圆形
      </dv-tag>
    </div>
    <p style="font-size:13px;color:#888">
      图片圆角默认跟随标签圆角，可通过 <code>--dockv-tag-image-radius</code> 单独覆盖。
    </p>
  `,
};

/** 文本可划选 */
export const Selectable: Story = {
  render: () => html`
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
      <dv-tag>不可划选</dv-tag>
      <dv-tag selectable>可划选文本</dv-tag>
    </div>
  `,
};

/** 事件：dv-click / dv-close / dv-change，内联输出 detail */
export const Event: Story = {
  render: () => {
    const write = (msg: string) => {
      const el = document.querySelector("#tag-event-log");
      if (el) el.textContent = msg;
      console.log("[dv-tag]", msg);
    };

    return html`
      <style>
        .tag-event-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          align-items: center;
          margin-bottom: 12px;
        }
        #tag-event-log {
          font-size: 13px;
          color: var(--dockv-color-text-2, #555);
          font-family: ui-monospace, monospace;
          min-height: 1.5em;
        }
      </style>
      <div class="tag-event-row">
        <dv-tag
          color="blue"
          @dv-click=${(e: CustomEvent) =>
            write(`dv-click: text="${e.detail.text}" checked=${e.detail.checked}`)}>
          点击触发 dv-click
        </dv-tag>
        <dv-tag
          color="red"
          closable
          @dv-close=${(e: CustomEvent) => {
            const fromKeyboard = e.detail.originalEvent instanceof KeyboardEvent;
            write(`dv-close: text="${e.detail.text}" fromKeyboard=${fromKeyboard}`);
          }}>
          点击 × 触发 dv-close
        </dv-tag>
        <dv-tag
          color="green"
          checkable
          @dv-change=${(e: CustomEvent) => {
            const fromKeyboard = e.detail.originalEvent instanceof KeyboardEvent;
            write(
              `dv-change: checked=${e.detail.checked}（切换后新值） fromKeyboard=${fromKeyboard}`,
            );
          }}
          @dv-click=${() => write("异常：checkable 模式下不应触发 dv-click")}>
          点击触发 dv-change
        </dv-tag>
      </div>
      <p id="tag-event-log">点击上面的标签，事件 detail 将输出到这里。</p>
    `;
  },
};