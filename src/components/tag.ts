import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "../styles/components/tag.scss?inline";
import "./icon.ts"; // 标签内部依赖 <dv-icon> 渲染前后缀图标 / 图片

/** 标签系统状态语义色（消费全局功能色 Token） */
export const TAG_TYPES = ["success", "warning", "danger"] as const;
export type TagType = (typeof TAG_TYPES)[number];

/** 标签视觉变体（表现层，与 <dv-button> 对齐） */
export const TAG_VARIANTS = ["light", "ghost", "soft", "outline", "solid", "neutral"] as const;
export type TagVariant = (typeof TAG_VARIANTS)[number];

/** 标签尺寸预设 */
export const TAG_SIZES = ["sm", "md", "lg", "xl"] as const;
export type TagSize = (typeof TAG_SIZES)[number];

/** 17 种内置预设色盘（非预设名当作自定义 CSS 颜色处理） */
export const TAG_COLORS = [
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
export type TagColor = (typeof TAG_COLORS)[number];

/** dv-click / dv-change 的 detail 载荷 */
export interface TagEventDetail {
  originalEvent: Event;
  text: string;
  checked?: boolean;
}

/** dv-close 的 detail 载荷 */
export interface TagCloseEventDetail {
  originalEvent: Event;
  text: string;
}

/**
 * 校验字符串是否为合法的 CSS 颜色
 *
 * 借助 `CSS.supports` 判定，覆盖 HEX / RGB / HSL / HWB / LCH / OKLCH / 具名色 / var() 等。
 * 非浏览器环境（SSR / Node）或 API 不可用时跳过校验，一律放行。
 *
 * @param value - 待校验的颜色字符串
 * @returns 是否被浏览器识别为合法颜色
 */
function isValidCssColor(value: string): boolean {
  if (typeof CSS === "undefined" || typeof CSS.supports !== "function") return true;
  return CSS.supports("color", value);
}

/**
 * Tag 标签组件
 *
 * 轻量信息标记组件，在有限空间内标出内容的分类、属性或状态。
 * 支持 17 种预设色盘 / 自定义 CSS 颜色、6 种视觉变体、4 档尺寸、
 * 胶囊 / 直角形状、前后缀图标与图片、可关闭与可选中交互、显隐与禁用。
 */
@customElement("dv-tag")
export class Tag extends LitElement {
  /**
   * 标签颜色：17 种预设色盘或任意 CSS 颜色（HEX / RGB / HSL / var(--x)）。
   * 非预设名时作为自定义色写入内联 --dockv-tag-color，派生变量基于它 color-mix。
   */
  @property({ type: String })
  color = "";

  /** 视觉变体（光照 / 幽灵 / 柔和 / 描边 / 实心 / 中性灰） */
  @property({ type: String })
  variant: TagVariant = "light";

  /** 系统状态语义色，消费全局功能色 Token（--dockv-color-#{$type}） */
  @property({ type: String })
  type = "";

  /** 尺寸预设 */
  @property({ type: String })
  size: TagSize = "md";

  /** 胶囊形状（两端全圆角 9999px） */
  @property({ type: Boolean, reflect: true })
  capsule = false;

  /** 圆角形状（标准微圆角 3px，默认即为此形态） */
  @property({ type: Boolean, reflect: true })
  round = false;

  /** 直角形状（无圆角 0px） */
  @property({ type: Boolean, reflect: true })
  sharp = false;

  /** 前缀图标（Iconify prefix:name），交给前缀 <dv-icon icon> */
  @property({ type: String, attribute: "prefix-icon" })
  prefixIcon = "";

  /** 后缀图标（Iconify prefix:name），交给后缀 <dv-icon icon> */
  @property({ type: String, attribute: "suffix-icon" })
  suffixIcon = "";

  /** 前缀图片 URL，交给前缀 <dv-icon src>（优先级高于 prefix-icon） */
  @property({ type: String, attribute: "prefix-image" })
  prefixImage = "";

  /** 后缀图片 URL，交给后缀 <dv-icon src>（优先级高于 suffix-icon） */
  @property({ type: String, attribute: "suffix-image" })
  suffixImage = "";

  /** 是否可关闭（尾部渲染 × 按钮，派发 dv-close） */
  @property({ type: Boolean, reflect: true })
  closable = false;

  /** 是否可选中（与 closable 互斥，同时声明时优先 checkable） */
  @property({ type: Boolean, reflect: true })
  checkable = false;

  /** 选中态（checkable 时由 dv-change 内部同步；单独传入作为只读态） */
  @property({ type: Boolean, reflect: true })
  checked = false;

  /** 是否允许划选文本 */
  @property({ type: Boolean, reflect: true })
  selectable = false;

  /** 隐藏标签（display: none，不占空间、不移除节点）；默认不写即显示。dv-close 未被拦截时自动置 true */
  @property({ type: Boolean, reflect: true })
  invisible = false;

  /** 禁用交互（dv-click / dv-change / dv-close 均不派发），不改变可见性 */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** 内部状态：默认插槽的纯文本（供事件 detail.text 使用） */
  @state()
  private _text = "";

  /** 组件样式（通过 Vite ?inline 编译为纯 CSS 字符串） */
  static styles = unsafeCSS(styles);

  /** closable + checkable 互斥：优先 checkable 模式（渲染前判定） */
  private get _isCheckableMode(): boolean {
    return this.checkable;
  }

  /**
   * 计算内联样式字符串
   *
   * `color` 为非预设色名时（自定义 CSS 颜色），写入 --dockv-tag-color 种子，
   * 派生各变体 / 选中态变量全部基于它 color-mix 生成（与 button 同构）。
   *
   * @returns CSS style 属性值
   */
  private _getInlineStyle(): string {
    if (this.color && !TAG_COLORS.includes(this.color as TagColor)) {
      const c = this.color;
      if (!isValidCssColor(c)) {
        console.error(
          `[dv-tag] 无效的颜色值 \`${c}\`：` +
            `请传入 17 种预设色名之一（${TAG_COLORS.join(" / ")}），` +
            `或合法的 CSS 颜色（HEX / RGB / HSL / var(--x)）。当前将回退为默认灰色。`,
        );
        return "";
      }
      return `--dockv-tag-color: ${c}; --dockv-tag-focus-color: ${c}`;
    }
    return "";
  }

  /**
   * 点击标签主体：派发 dv-click（不可拦截），disabled 不触发。
   * checkable 模式下翻转选中态并派发 dv-change。
   * @param e - 原生点击事件
   */
  private _handleClick(e: Event): void {
    if (this.disabled) return;

    if (this._isCheckableMode) {
      this._toggleChecked(e);
      return;
    }

    this.dispatchEvent(
      new CustomEvent("dv-click", {
        bubbles: true,
        composed: true,
        detail: { originalEvent: e, text: this._text, checked: this.checked },
      }),
    );
  }

  /**
   * 切换选中态：派发 dv-change（可 preventDefault 阻止内部翻转）。
   * @param e - 原生事件
   */
  private _toggleChecked(e: Event): void {
    const next = !this.checked;
    const ev = new CustomEvent("dv-change", {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail: { originalEvent: e as Event, checked: next, text: this._text },
    });
    this.dispatchEvent(ev);
    if (!ev.defaultPrevented) {
      this.checked = next;
    }
  }

  /**
   * 点击关闭按钮：派发 dv-close（可 preventDefault 阻止自动隐藏）。
   * 点击事件被 stopPropagation，绝不触发宿主 dv-click。
   * @param e - 原生点击事件
   */
  private _handleClose(e: Event): void {
    e.stopPropagation();
    if (this.disabled) return;

    const ev = new CustomEvent("dv-close", {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail: { originalEvent: e, text: this._text },
    });
    this.dispatchEvent(ev);
    if (!ev.defaultPrevented) {
      this.invisible = true;
    }
  }

  /**
   * checkable 键盘激活：Space / Enter 切换选中，就地拦截默认滚页 / 表单提交。
   * @param e - 原生 keydown 事件
   */
  private _handleKeydown(e: KeyboardEvent): void {
    if (!this._isCheckableMode || this.disabled) return;
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      this._toggleChecked(e);
    }
  }

  /**
   * slot 内容变化时记录默认插槽纯文本，供事件 detail.text 使用。
   * @param e - slotchange 事件
   */
  private _handleSlotChange(e: Event): void {
    const slot = e.target as HTMLSlotElement;
    this._text = slot
      .assignedNodes()
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
    const checkable = this._isCheckableMode;
    const closable = this.closable && !checkable;
    const isPresetColor = TAG_COLORS.includes(this.color as TagColor);
    // 标签颜色优先级：显式定义 color（预设或自定义）> type 语义色 > 默认 grey 中性色
    const effectiveType = !this.color && this.type ? this.type : "";
    const effectivePresetColor = isPresetColor
      ? this.color
      : !this.color && !this.type
        ? "grey"
        : "";
    const isDefaultTag = !this.color && !this.type;
    if (this.closable && this.checkable) {
      console.warn(
        "[dv-tag] `closable` 与 `checkable` 互斥，同时声明时优先按 checkable（可选中）处理，关闭按钮不渲染。",
      );
    }

    // 前后缀 <dv-icon>：同时配置 image 与 icon 时透传，由 dv-icon 内部优先级（src > icon）覆盖
    const prefixPart = this.prefixImage ? "prefix image" : "prefix";
    const prefixEl =
      this.prefixIcon || this.prefixImage
        ? html`<span part=${prefixPart} aria-hidden="true" class="dockv-tag-icon ${
            this.prefixImage ? "dockv-tag-image" : ""
          }"
            ><dv-icon
              icon=${this.prefixIcon}
              src=${this.prefixImage}
              size=${this.prefixImage ? "var(--dockv-tag-image-size)" : "inherit"}></dv-icon
          ></span>`
        : "";
    const suffixPart = this.suffixImage ? "suffix image" : "suffix";
    const suffixEl =
      this.suffixIcon || this.suffixImage
        ? html`<span part=${suffixPart} aria-hidden="true" class="dockv-tag-icon ${
            this.suffixImage ? "dockv-tag-image" : ""
          }"
            ><dv-icon
              icon=${this.suffixIcon}
              src=${this.suffixImage}
              size=${this.suffixImage ? "var(--dockv-tag-image-size)" : "inherit"}></dv-icon
          ></span>`
        : "";
    const closeEl = closable
      ? html`<button
          part="close"
          type="button"
          class="dockv-tag-close"
          aria-label="移除标签"
          @click=${this._handleClose}
          ><svg
            viewBox="0 0 16 16"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true">
            <path
              d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.75.75 0 1 1 1.06 1.06L9.06 8l3.22 3.22a.75.75 0 1 1-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 0 1-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06z"
            />
          </svg></button
        >`
      : "";

    const classes = [
      "dockv-tag",
      `dockv-tag-${this.variant}`,
      `dockv-tag-${this.size}`,
      effectiveType ? `dockv-tag-type-${effectiveType}` : "",
      effectivePresetColor ? `dockv-tag-color-${effectivePresetColor}` : "",
      isDefaultTag ? "dockv-tag-default-color" : "",
      this.capsule ? "dockv-tag-capsule" : "",
      this.round ? "dockv-tag-round" : "",
      this.sharp ? "dockv-tag-sharp" : "",
      this.checked ? "dockv-tag-checked" : "",
      this.disabled ? "dockv-tag-disabled" : "",
      this.selectable ? "dockv-tag-selectable" : "",
    ]
      .filter(Boolean)
      .join(" ");

    // 宿主语义：checkable → role=checkbox；closable → 不设 role（尾部原生 button）。
    // 纯展示不设 role / tabindex。
    const tabindex = checkable ? "0" : undefined;
    const ariaChecked = checkable ? (this.checked ? "true" : "false") : undefined;

    return html`
      <span
        part="tag"
        class=${classes}
        style=${style}
        role=${checkable ? "checkbox" : undefined}
        tabindex=${tabindex}
        aria-checked=${ariaChecked}
        aria-disabled=${this.disabled ? "true" : undefined}
        @click=${this._handleClick}
        @keydown=${this._handleKeydown}
        @slotchange=${this._handleSlotChange}>
        ${prefixEl}
        <span part="text" class="dockv-tag-text"
          ><slot @slotchange=${this._handleSlotChange}></slot
        ></span>
        ${suffixEl}
        ${closeEl}
      </span>
    `;
  }
}

/**
 * 扩展 HTMLElementTagNameMap，让 TypeScript 认识 <dv-tag> 标签
 */
declare global {
  interface HTMLElementTagNameMap {
    "dv-tag": Tag;
  }
}