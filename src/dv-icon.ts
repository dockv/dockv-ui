import { LitElement, html, unsafeCSS } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import { loadIcons, renderHTML } from '@iconify/iconify'
import styles from './styles/components/dv-icon.scss?inline'

@customElement('dv-icon')
export class DIcon extends LitElement {
  @property({ type: String })
  icon: string = ''

  @property({ type: String })
  src: string = ''

  @property({ type: String })
  size: string = ''

  @property({ type: String })
  color: string = ''

  @state()
  private _svgHTML: string = ''

  static styles = unsafeCSS(styles)

  protected override willUpdate(changed: Map<string, unknown>): void {
    if (changed.has('icon')) {
      this._svgHTML = ''
      if (this.icon) this._loadIcon()
    }
  }

  protected override firstUpdated(): void {
    if (this.icon) this._loadIcon()
  }

  private _loadIcon(): void {
    const name = this.icon
    loadIcons([name], (loaded) => {
      if (loaded.length === 0) return
      const result = renderHTML(name, {
        width: this.size || '1em',
        height: this.size || '1em',
      })
      this._svgHTML = result || ''
    })
  }

  render() {
    const styleParts: string[] = []
    if (this.color) styleParts.push(`color: ${this.color}`)
    if (this.size) styleParts.push(`font-size: ${this.size}`)

    let fallback: unknown = ''

    if (this.src) {
      fallback = html`<img src=${this.src} alt="" />`
    } else if (this._svgHTML) {
      fallback = unsafeHTML(this._svgHTML)
    }

    return html`
      <span class="dockv-icon" style=${styleParts.join(';') || ''}>
        <slot>${fallback}</slot>
      </span>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dv-icon': DIcon
  }
}
