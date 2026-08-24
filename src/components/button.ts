import { LitElement, html, unsafeCSS } from "lit";
import type { PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "../styles/components/button.scss?inline";
import "./icon.ts"; // 按钮内部依赖 <dv-icon> 渲染图标

/** 按钮类型（语义色） */
export const BUTTON_TYPES = [
  "primary",
  "secondary",
  "tertiary",
  "success",
  "warning",
  "danger",
] as const;
export type ButtonType = (typeof BUTTON_TYPES)[number];

/** 按钮变体（视觉表现层） */
export const BUTTON_VARIANTS = ["solid", "light", "ghost", "outline", "soft", "neutral"] as const;
export type ButtonVariant = (typeof BUTTON_VARIANTS)[number];

/** 按钮尺寸预设 */
export const BUTTON_SIZES = ["xs", "sm", "md", "lg", "xl"] as const;
export type ButtonSize = (typeof BUTTON_SIZES)[number];

/** 原生 button 的表单行为 type */
export const NATIVE_TYPES = ["button", "submit", "reset"] as const;
export type NativeType = (typeof NATIVE_TYPES)[number];

/**
 * Button 按钮组件
 *
 * 外观由两个正交维度决定：`type`（语义色）+ `variant`（视觉表现层）。
 * 运行时可通过 `color` 属性覆盖主题色（color-mix 动态生成各交互态）。
 */
@customElement("dv-button")
export class Button extends LitElement {
  /** 按钮类型（语义色） */
  @property({ type: String })
  type: ButtonType = "primary";

  /** 按钮变体（视觉表现层） */
  @property({ type: String })
  variant: ButtonVariant = "solid";

  /** 按钮尺寸预设 */
  @property({ type: String })
  size: ButtonSize = "md";

  /**
   * 自定义颜色，覆盖 `type` 默认色值
   * 支持 HEX / RGB / HSL 三种格式
   */
  @property({ type: String })
  color = "";

  /**
   * 图标名称（Iconify `prefix:name`），加载时被替换为 spinner
   * @example icon="material-symbols:home"
   */
  @property({ type: String })
  icon = "";

  /** 图标位置（仅普通形状 + `icon` 属性路径时生效） */
  @property({ type: String })
  iconPosition: "left" | "right" = "left";

  /** 正方形按钮（宽 = 高） */
  @property({ type: Boolean, reflect: true })
  square = false;

  /** 正圆按钮（隐含 square + 全圆角） */
  @property({ type: Boolean, reflect: true })
  circle = false;

  /** 自定义圆角，覆盖默认圆角 */
  @property({ type: String })
  borderRadius = "";

  /** 自定义按钮宽度，固定宽度（支持任意 CSS 长度，如 120px、10rem、50%） */
  @property({ type: String })
  width = "";

  /** 是否禁用 */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** 加载中状态（图标替换为 spinner，点击被 JS 层拦截） */
  @property({ type: Boolean, reflect: true })
  loading = false;

  /**
   * 原生 button 的表单行为 type（submit / reset / button）
   * 与颜色语义 `type` 完全分离，禁止互相透传
   */
  @property({ type: String, attribute: "native-type" })
  nativeType: NativeType = "button";

  /** 内部状态：slot 是否含元素节点（视为图标 / 自定义内容） */
  @state()
  private _slotHasElement = false;

  /** 内部状态：slot 的纯文本内容（用于 square / circle 首字符截断） */
  @state()
  private _slotText = "";

  /** 组件样式（通过 Vite ?inline 编译为纯 CSS 字符串） */
  static styles = unsafeCSS(styles);

  /** 是否紧凑形状（square / circle） */
  private get _compact(): boolean {
    return this.square || this.circle;
  }

  /**
   * 是否纯图标按钮（有图标、无文字、非紧凑形状）
   *
   * 纯图标按钮在 SCSS 层会把水平内边距收窄
   * 避免"图标自带留白 + 常规内边距"叠加导致显得空。
   *
   * "有图标"指：`icon` 属性非空，或 slot 中存在元素（如 <dv-icon>）；
   * "无文字"指：slot 纯文本为空。
   *
   * @returns 是否为纯图标按钮
   */
  private get _iconOnly(): boolean {
    return !this._compact && (!!this.icon || this._slotHasElement) && !this._slotText;
  }

  /**
   * 计算内联样式字符串
   *
   * `color` 非空时注入一组 `--dockv-button-{variant}-*` 变量覆盖 SCSS 预定义色板，
   * 交互态颜色用 color-mix 动态生成。
   * `borderRadius` 非空时覆盖圆角变量。
   *
   * @returns CSS style 属性值
   */
  private _getInlineStyle(): string {
    const parts: string[] = [];
    if (this.color) {
      const c = this.color;
      parts.push(
        // solid 深色填充
        "--dockv-button-solid-font-color: #ffffff",
        `--dockv-button-solid-bg-color: ${c}`,
        `--dockv-button-solid-bg-color-hover: color-mix(in srgb, ${c} 85%, #000)`,
        `--dockv-button-solid-bg-color-active: color-mix(in srgb, ${c} 75%, #000)`,
        `--dockv-button-solid-ol-color-focus: color-mix(in srgb, ${c} 60%, transparent)`,
        // light 浅色填充
        `--dockv-button-light-font-color: ${c}`,
        `--dockv-button-light-bg-color: color-mix(in srgb, ${c} 10%, transparent)`,
        `--dockv-button-light-bg-color-hover: color-mix(in srgb, ${c} 20%, transparent)`,
        `--dockv-button-light-bg-color-active: color-mix(in srgb, ${c} 30%, transparent)`,
        `--dockv-button-light-ol-color-focus: color-mix(in srgb, ${c} 40%, transparent)`,
        // ghost 无背景（只覆盖文字色，背景保持透明 + 灰色 hover）
        `--dockv-button-ghost-font-color: ${c}`,
        `--dockv-button-ghost-bg-color-active: color-mix(in srgb, ${c} 16%, transparent)`,
        `--dockv-button-ghost-ol-color-focus: color-mix(in srgb, ${c} 40%, transparent)`,
        // outline 透明背景 + 边框
        `--dockv-button-outline-font-color: ${c}`,
        `--dockv-button-outline-border-color: ${c}`,
        `--dockv-button-outline-ol-color-focus: color-mix(in srgb, ${c} 40%, transparent)`,
        // soft 浅色背景 + 边框
        `--dockv-button-soft-font-color: ${c}`,
        `--dockv-button-soft-bg-color: color-mix(in srgb, ${c} 10%, transparent)`,
        `--dockv-button-soft-bg-color-hover: color-mix(in srgb, ${c} 20%, transparent)`,
        `--dockv-button-soft-bg-color-active: color-mix(in srgb, ${c} 30%, transparent)`,
        `--dockv-button-soft-border-color: ${c}`,
        // neutral 灰底 + 彩色文字（背景保持灰阶，仅覆盖文字色与 focus 描边）
        `--dockv-button-neutral-font-color: ${c}`,
        `--dockv-button-neutral-ol-color-focus: color-mix(in srgb, ${c} 40%, transparent)`,
      );
    }
    if (this.borderRadius) {
      parts.push(`--dockv-button-border-radius: ${this.borderRadius}`);
    }
    return parts.join(";");
  }

  /**
   * 点击处理：禁用 / 加载中不触发 dv-click
   * @param e - 原生点击事件
   */
  private _handleClick(e: Event): void {
    if (this.disabled || this.loading) return;
    this.dispatchEvent(
      new CustomEvent("dv-click", {
        bubbles: true,
        composed: true,
        detail: { originalEvent: e },
      }),
    );
  }

  /**
   * slot 内容变化时仅记录内容类型（元素 / 文本），供渲染分支与 _iconOnly 判定使用。
   *
   * 刻意"只读不写"：不在此处覆写 `icon` 属性。原先的实现会把 `icon` 覆写为 slot 里
   * dv-icon 的文本（通常是空串），导致 slot 无 dv-icon 时属性图标被悄悄清空。
   * 紧凑形状下 slot 图标本就整体渲染 slot 元素本身，无需读取图标名，故可安全去掉该覆写。
   * 用 slotchange 而非渲染期查询，避免 slot 尚未挂载导致的空判定。
   *
   * @param e - slotchange 事件
   */
  private _handleSlotChange(e: Event): void {
    const slot = e.target as HTMLSlotElement;
    const nodes = slot.assignedNodes();
    this._slotHasElement = nodes.some((n) => n.nodeType === Node.ELEMENT_NODE);
    this._slotText = nodes
      .filter((n) => n.nodeType === Node.TEXT_NODE)
      .map((n) => n.textContent ?? "")
      .join("")
      .trim();
  }

  /**
   * 渲染方法
   * @returns Lit 模板结果
   */
  protected override render() {
    const style = this._getInlineStyle();
    const compact = this._compact;

    // 属性图标（loading 时强制替换为 spinner）
    const iconName = this.loading ? "svg-spinners:180-ring" : this.icon;
    const attrIconEl = iconName
      ? html`<span class="dockv-button-icon"
          ><dv-icon icon=${iconName} size="20px"></dv-icon
        ></span>`
      : "";

    // 紧凑形状（square / circle）下按内容优先级取一：
    //   slot 中的元素（如 <dv-icon>） > icon 属性 > 纯文字首字符
    let content;
    if (compact) {
      // 捕获用隐藏 slot：紧凑形状不总是展示完整 slot，但必须始终渲染一个 slot 以触发
      // slotchange，否则纯文字/属性图标分支没有 slot，"探头"缺位导致 _slotText 永远为空。
      const captureSlot = html`<slot hidden @slotchange=${this._handleSlotChange}></slot>`;
      if (this._slotHasElement) {
        content = html`<slot @slotchange=${this._handleSlotChange}></slot>`;
      } else if (iconName) {
        content = html`${attrIconEl}${captureSlot}`;
      } else {
        content = html`
          <span class="dockv-button-text">${this._slotText.slice(0, 1)}</span>
          ${captureSlot}
        `;
      }
    } else {
      // 普通形状：图标 + 文字并存，图标位置由 iconPosition 控制
      content = html`
        ${this.iconPosition === "left" ? attrIconEl : ""}
        <slot @slotchange=${this._handleSlotChange}></slot>
        ${this.iconPosition === "right" ? attrIconEl : ""}
      `;
    }

    const classes = [
      "dockv-button",
      `dockv-button-${this.type}`,
      `dockv-button-${this.variant}`,
      `dockv-button-${this.size}`,
      this._iconOnly ? "dockv-button-icononly" : "",
      this.loading ? "dockv-button-loading" : "",
      this.square ? "dockv-button-square" : "",
      this.circle ? "dockv-button-circle" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return html`
      <button
        part="button"
        type=${this.nativeType}
        class=${classes}
        style=${style}
        ?disabled=${this.disabled}
        @click=${this._handleClick}
        @contextmenu=${(e: Event) => e.preventDefault()}>
        ${content}
      </button>
    `;
  }

  /**
   * 更新周期：同步宿主(:host)的宽度
   *
   * 宽度必须落在最外层宿主上，百分比才会相对宿主真正的父容器计算。
   * 直接设在内部 <button> 会相对宿主再嵌套，导致 50% 套 50% 坍缩（约 25%）。
   * 内部按钮的铺满（width: 100%）已由 button.scss 负责，这里只需给宿主定宽。
   * @param changedProps - 本次更新变化的属性集合
   */
  protected override updated(changedProps: PropertyValues): void {
    if (changedProps.has("width") && this.width) {
      this.style.setProperty("width", this.width);
    }
  }
}

/**
 * 扩展 HTMLElementTagNameMap，让 TypeScript 认识 <dv-button> 标签
 */
declare global {
  interface HTMLElementTagNameMap {
    "dv-button": Button;
  }
}
