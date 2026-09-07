import { LitElement, html, unsafeCSS } from "lit";
import type { PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "../styles/components/divider.scss?inline";

/** 分割线方向 */
export const DIVIDER_DIRECTIONS = ["horizontal", "vertical"] as const;
export type DividerDirection = (typeof DIVIDER_DIRECTIONS)[number];

/** 内容位置（仅横向且有内容时生效） */
export const DIVIDER_CONTENT_POSITIONS = ["left", "center", "right"] as const;
export type DividerContentPosition = (typeof DIVIDER_CONTENT_POSITIONS)[number];

/** 线型 */
export const DIVIDER_BORDER_STYLES = ["solid", "dashed", "dotted"] as const;
export type DividerBorderStyle = (typeof DIVIDER_BORDER_STYLES)[number];

/**
 * Divider 分割线组件
 */
@customElement("dv-divider")
export class Divider extends LitElement {
  /** 分割线方向 */
  @property({ type: String, reflect: true })
  direction: DividerDirection = "horizontal";

  /**
   * 内容位置（left / center / right）
   * 仅横向且夹了内容时生效；竖向时被忽略
   */
  @property({ type: String })
  contentPosition: DividerContentPosition = "center";

  /** 线型（实线 / 虚线 / 点线） */
  @property({ type: String })
  borderStyle: DividerBorderStyle = "solid";

  /** 自定义颜色 */
  @property({ type: String })
  color = "";

  /** 检查 slot 是否含有内容 */
  @state()
  private _hasContent = false;

  /** 组件样式 */
  static styles = unsafeCSS(styles);

  /**
   * 同步 host 上的 CSS 变量
   *
   * 颜色与线型统一通过 host 上的自定义属性下发（子元素与宿主线条共同继承），
   * 便于同时覆盖横向两段线（border-top）与竖向宿主竖线（border-left）。
   *
   * @param changedProps - 本次更新发生变化的属性集合
   */
  protected override updated(changedProps: PropertyValues): void {
    if (changedProps.has("color") || changedProps.has("borderStyle")) {
      if (this.color) {
        this.style.setProperty("--dockv-divider-color", this.color);
      } else {
        this.style.removeProperty("--dockv-divider-color");
      }
      this.style.setProperty("--dockv-divider-border-style", this.borderStyle);
    }
  }

  /**
   * slot 内容变化时检测是否夹了非空白内容
   *
   * 驱动 `dockv-divider-has-content` 形态：
   * - 有内容：左右两段线 + 内容（启用 contentPosition 与内容左右间距）
   * - 无内容：两段线拼成一条完整线，不加内容间距
   *
   * @param e - slotchange 事件
   */
  private _handleSlotChange(e: Event): void {
    const nodes = (e.target as HTMLSlotElement).assignedNodes();
    this._hasContent = nodes.some((n) => {
      if (n.nodeType === Node.ELEMENT_NODE) return true;
      if (n.nodeType === Node.TEXT_NODE) return Boolean((n.textContent ?? "").trim() && true);
      return false;
    });
  }

  /**
   * 结构为「左线 + 内容 + 右线」，两段线由内容两侧的 span 承担：
   * - 横向：宿主 display:block，内部 flex 排布；contentPosition 通过调节两段线 flex 伸缩实现。
   * - 竖向：宿主自身退化为一条竖线（border-left），内部容器隐藏，不夹内容。
   */
  protected override render() {
    const classes = ["dockv-divider", `dockv-divider-${this.contentPosition}`];
    if (this._hasContent) classes.push("dockv-divider-has-content");

    return html`
      <div class=${classes.join(" ")} role="separator" aria-orientation=${this.direction}>
        <span class="dockv-divider-line-before" part="line" aria-hidden="true"></span>
        <div class="dockv-divider-content">
          <slot @slotchange=${this._handleSlotChange}></slot>
        </div>
        <span class="dockv-divider-line-after" part="line" aria-hidden="true"></span>
      </div>
    `;
  }
}

/**
 * 扩展 HTMLElementTagNameMap，让 TypeScript 认识 <dv-divider> 标签
 */
declare global {
  interface HTMLElementTagNameMap {
    "dv-divider": Divider;
  }
}
