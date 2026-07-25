import { LitElement, html, unsafeCSS } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import styles from './styles/components/dv-notification.scss?inline'
import './dv-icon'
import './dv-button'

const DEFAULT_ICONS: Record<string, string> = {
  info: 'material-symbols:info',
  success: 'material-symbols:check-circle',
  warning: 'material-symbols:warning-rounded',
  error: 'material-symbols:error',
}

@customElement('dv-notification')
export class DNotificationCard extends LitElement {
  @property({ type: String })
  type: 'info' | 'success' | 'warning' | 'error' = 'info'

  @property({ type: String })
  title = ''

  @property({ type: String })
  content = ''

  @property({ type: String })
  icon = ''

  @property({ type: Boolean })
  showClose = true

  @property({ type: String })
  position: 'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight' = 'topRight'

  @state()
  private _animation: '' | 'show' | 'hide' = ''

  static styles = unsafeCSS(styles)

  protected override firstUpdated(): void {
    this._animation = 'show'
  }

  startExit(): void {
    this._animation = 'hide'
    this.shadowRoot?.addEventListener('animationend', this._onExitAnimationEnd, { once: true })
  }

  private _onExitAnimationEnd = (): void => {
    this.dispatchEvent(new CustomEvent('dv-close', { bubbles: true, composed: true }))
  }

  private _handleClose() {
    this.startExit()
  }

  private _handleClick() {
    this.dispatchEvent(new CustomEvent('dv-click', { bubbles: true, composed: true }))
  }

  render() {
    const resolvedIcon = this.icon || DEFAULT_ICONS[this.type] || ''

    const animClass = this._animation ? `notification-${this._animation}-${this.position}` : ''

    const titleEl = this.title
      ? html`<div class="dockv-notification-title">${this.title}</div>`
      : ''

    const contentEl = this.content
      ? html`<div class="dockv-notification-content">${this.content}</div>`
      : ''

    const closeEl = this.showClose
      ? html`<div class="dockv-notification-close">
          <dv-button
            type="tertiary"
            variant="ghost"
            size="extra-small"
            icon="material-symbols:close"
            @dv-click=${this._handleClose}
          ></dv-button>
        </div>`
      : ''

    return html`
      <div class="dockv-notification-card ${animClass}" @click=${this._handleClick}>
        <div class="dockv-notification-icon dockv-notification-type-${this.type}">
          <dv-icon icon=${resolvedIcon} size="24px"></dv-icon>
        </div>
        <div class="dockv-notification-body">
          ${titleEl}
          ${contentEl}
        </div>
        ${closeEl}
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dv-notification': DNotificationCard
  }
}
