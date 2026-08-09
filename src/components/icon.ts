import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { loadIcons, renderHTML } from "@iconify/iconify";
import styles from "../styles/components/icon.scss?inline";

/** 预设图标尺寸（对应 variable.scss 中的 CSS 变量） */
const SIZE_PRESETS = ["xs", "sm", "md", "lg", "xl"] as const;

/** 预设类型 */
type SizePreset = (typeof SIZE_PRESETS)[number];

/**
 * Icon 图标组件
 *
 * 渲染优先级（从高到低）：
 * 1. slot 有内容 → 直接渲染 slot
 * 2. src 有值 → 渲染原生 <img>
 * 3. icon 有值 → 渲染 Iconify inline SVG
 */
@customElement("dv-icon")
export class Icon extends LitElement {
  /**
   * Iconify 图标名称
   * @example <dv-icon icon="material-symbols:home-rounded"></dv-icon>
   */
  @property({ type: String })
  icon: string = "";

  /**
   * 图标的 src 地址
   * @example <dv-icon src="https://ui.dockv.cc/logo.png"></dv-icon>
   */
  @property({ type: String })
  src: string = "";

  /**
   * 图标大小，支持预设值（xs/sm/md/lg/xl）、具体数值（如 24px）或 inherit（继承父元素字体大小）
   * 尺寸只应用于图标高度，宽度按 SVG 原始比例自适应
   * @example <dv-icon size="lg"></dv-icon>
   * @example <dv-icon size="24px"></dv-icon>
   * @example <dv-icon size="inherit"></dv-icon>
   */
  @property({ type: String })
  size: string = "";

  /**
   * 图标颜色
   * @example <dv-icon color="red"></dv-icon>
   */
  @property({ type: String })
  color: string = "";

  /**
   * 旋转度数（仅水平旋转，单位：deg）
   * @example <dv-icon rotate="90"></dv-icon>
   */
  @property({ type: Number })
  rotate: number = 0;

  /**
   * 是否播放旋转动画
   * @example <dv-icon spin></dv-icon>
   */
  @property({ type: Boolean, reflect: true })
  spin: boolean = false;

  /** 组件样式（通过 Vite ?inline 编译为纯 CSS 字符串） */
  static styles = unsafeCSS(styles);

  /** 内部状态：Iconify 加载后的 SVG HTML 字符串 */
  @state()
  private _svgHTML: string = "";

  /**
   * 解析 size 属性值：预设字符串 → CSS 变量，具体数值 → 直接使用，inherit → 1em
   * @returns 可用于 height 的 CSS 值
   */
  private _resolveSize(): string {
    if (!this.size) return `var(--dockv-icon-size-md)`;
    if (this.size === "inherit") return "1em";
    return SIZE_PRESETS.includes(this.size as SizePreset)
      ? `var(--dockv-icon-size-${this.size})`
      : this.size;
  }

  /**
   * 计算内联样式字符串
   * @returns CSS style 属性值
   */
  private _getInlineStyle(): string {
    const parts: string[] = [];
    if (this.color) parts.push(`color: ${this.color}`);
    // 旋转度数，通过 CSS 变量传入，便于 spin 动画以它为起点
    if (this.rotate) parts.push(`--dockv-icon-rotate: ${this.rotate}deg`);
    // inherit 时不设固定尺寸，让内容跟随父元素的字体大小
    if (this.size !== "inherit") {
      const size = this._resolveSize();
      // height 控制 SVG / 图片类内容（slot 里的 svg/img 靠 height: 100% 填满）
      parts.push(`height: ${size}`);
      // font-size 控制图标字体类内容（如 Font Awesome 的 <i>）
      parts.push(`font-size: ${size}`);
    }
    return parts.join(";");
  }

  /**
   * 加载 Iconify 图标（带竞态保护）
   *
   * 不向 renderHTML 传任何尺寸——让 Iconify 生成默认 SVG（1em），
   * 实际尺寸完全由 CSS 控制：.dockv-icon svg 的 height: 100% 填满容器高度，
   * width: auto 按图标原始比例自适应，无需 JS 参与尺寸计算。
   *
   * @param name - 图标名称（如 "material-symbols:home"）
   */
  private _loadIcon(name: string): void {
    loadIcons([name], (loaded) => {
      // 竞态保护：如果加载期间图标名已被更换，丢弃这次结果
      if (this.icon !== name) return;
      if (loaded.length === 0) return;

      const result = renderHTML(name);
      this._svgHTML = result || "";
    });
  }

  /**
   * 属性变化时的更新钩子
   */
  protected override willUpdate(changed: Map<string, unknown>): void {
    // icon 或 size 属性变化时，重置并重新加载
    if (changed.has("icon") || changed.has("size")) {
      this._svgHTML = "";
      if (this.icon) this._loadIcon(this.icon);
    }
  }

  /**
   * 首次更新时加载图标
   */
  protected override firstUpdated(): void {
    if (this.icon) this._loadIcon(this.icon);
  }

  /**
   * 渲染方法（按优先级返回不同内容）
   * @returns Lit 模板结果
   */
  protected override render() {
    const style = this._getInlineStyle();
    // spin 时给容器加动画 class，配合 --dockv-icon-rotate 做旋转起点
    const spinClass = this.spin ? " dockv-icon-spin" : "";

    // 优先级通过 slot 的原生回退（fallback）机制实现：
    // light DOM 有内容 → 浏览器自动显示插槽内容；
    // light DOM 无内容 → 显示 fallback（src 图片 > icon 图标）。
    // 这样无需 JS 手动检测 slot 内容，也不存在"首次渲染时 slot 尚未创建"的死结。
    let fallback;
    if (this.src) {
      fallback = html`<img src=${this.src} alt="" />`;
    } else if (this.icon && this._svgHTML) {
      fallback = unsafeHTML(this._svgHTML);
    }

    return html`<span class="dockv-icon${spinClass}" style=${style}
      ><slot>${fallback}</slot></span
    >`;
  }
}

/**
 * 扩展 HTMLElementTagNameMap，让 TypeScript 认识 <dv-icon> 标签
 */
declare global {
  interface HTMLElementTagNameMap {
    "dv-icon": Icon;
  }
}
