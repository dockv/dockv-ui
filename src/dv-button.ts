import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./styles/components/dv-button.scss?inline";
import "./dv-icon";

@customElement("dv-button")
export class DButton extends LitElement {
  @property({ type: String })
  type: "primary" | "secondary" | "tertiary" | "warning" | "danger" = "primary";

  @property({ type: String })
  variant: "light" | "solid" | "ghost" | "outline" | "soft" | "skeuo" = "solid";

  @property({ type: String })
  size: "extra-small" | "small" | "medium" | "large" | "extra-large" = "medium";

  @property({ type: String })
  color = "";

  @property({ type: String })
  icon = "";

  @property({ type: String })
  iconPosition: "left" | "right" = "left";

  @property({ type: String })
  borderRadius = "";

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean })
  loading = false;

  /**
   * 是否为正方形按钮（消除左右内边距和图标间距）
   */
  @property({ type: Boolean })
  square = false;

  private _handleClick() {
    if (this.disabled || this.loading) return;
    this.dispatchEvent(new CustomEvent("dv-click", { bubbles: true, composed: true }));
  }

  static styles = unsafeCSS(styles);

  render() {
    const style = [
      this.color
        ? `
          --dockv-button-solid–font-color: #ffffff;
          --dockv-button-solid-bg-color:${this.color};
          --dockv-button-solid-bg-color-hover:color-mix(in srgb, ${this.color} 85%, #000);
          --dockv-button-solid-bg-color-active:color-mix(in srgb, ${this.color} 75%, #000);
          --dockv-button-solid-ol-color-focus:color-mix(in srgb, ${this.color} 60%, transparent);
          --dockv-button-light-font-color:${this.color};
          --dockv-button-light-bg-color:color-mix(in srgb, ${this.color} 10%, transparent);
          --dockv-button-light-bg-color-hover:color-mix(in srgb, ${this.color} 20%, transparent);
          --dockv-button-light-bg-color-active:color-mix(in srgb, ${this.color} 30%, transparent);
          --dockv-button-light-ol-color-focus:color-mix(in srgb, ${this.color} 40%, transparent);
          --dockv-button-ghost-font-color:${this.color};
          --dockv-button-ghost-bg-color:${this.color};
          --dockv-button-ghost-bg-color-active:color-mix(in srgb, ${this.color} 16%, transparent);
          --dockv-button-ghost-ol-color-focus:color-mix(in srgb, ${this.color} 40%, transparent);
          --dockv-button-outline-font-color:${this.color};
          --dockv-button-outline-ol-color-focus:color-mix(in srgb, ${this.color} 40%, transparent);
          --dockv-button-soft-font-color:${this.color};
          --dockv-button-soft-bg-color:color-mix(in srgb, ${this.color} 10%, transparent);
          --dockv-button-soft-border-color:${this.color};
          --dockv-button-soft-bg-color-hover:color-mix(in srgb, ${this.color} 20%, transparent);
          --dockv-button-soft-bg-color-active:color-mix(in srgb, ${this.color} 30%, transparent);
          --dockv-button-soft-ol-color-focus:color-mix(in srgb, ${this.color} 40%, transparent);
        `
        : "",
      this.borderRadius ? `--dockv-button-border-radius: ${this.borderRadius}` : "",
    ]
      .filter(Boolean)
      .join(";");

    const iconName = this.loading ? "svg-spinners:180-ring" : this.icon;

    const iconEl = iconName
      ? html`<span class="dockv-button-icon">
          <dv-icon icon=${iconName} size="20px"></dv-icon>
        </span>`
      : "";

    const loadingClass = this.loading ? " dockv-button-loading" : "";
    const squareClass = this.square ? " dockv-button-square" : "";

    return html`
      <button
        part="button"
        type="button"
        class="dockv-button dockv-button-${this.type} dockv-button-${this
          .variant} dockv-button-${this.size}${loadingClass}${squareClass}"
        style=${style}
        ?disabled=${this.disabled}
        @click=${this._handleClick}
        @contextmenu=${(e: Event) => e.preventDefault()}>
        ${this.iconPosition === "left" ? iconEl : ""}
        <slot></slot>
        ${this.iconPosition === "right" ? iconEl : ""}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "dv-button": DButton;
  }
}
