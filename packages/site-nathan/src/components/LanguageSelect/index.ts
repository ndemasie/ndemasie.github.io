import { html, css, unsafeCSS, LitElement } from 'lit'
import { customElement, state, property, query } from 'lit/decorators.js'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import { Language } from 'src/types/Language'

import I18nIcon from './i18n.svg?raw'
import styles from './styles.css?raw'

@customElement('language-select')
export class LanguageSelect extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot()
    return root
  }

  static styles = css`
    ${unsafeCSS(styles)}
  `

  @query('select')
  private select

  @property({ type: String })
  public value: Language = Language.EN

  @state()
  private isMobile = window.innerWidth < 500

  @state()
  private options = Object.values(Language).map((lang) => {
    return {
      value: lang,
      label: new Intl.DisplayNames([lang], { type: 'language' }).of(lang),
    }
  })

  @state()
  private selected = null

  private handleChange(event: Event) {
    const [, , ...rest] = window.location.pathname.split('/')
    window.location.pathname = ['', event.target!.value, ...rest].join('/')
  }

  firstUpdated() {
    if (this.isMobile) {
      this.selected = this.options.find((opt) => opt.value === this.value)
    }
  }

  protected render() {
    return html`
      <label>
        <div class="prepend-icon">${unsafeHTML(I18nIcon)}</div>
        <select .value=${this.value} @change=${this.handleChange}>
          ${this.isMobile &&
          this.selected &&
          html`<option
            selected
            value=${this.selected.value}
            label=${this.selected.value.toUpperCase()}
          ></option>`}
          ${this.options.map((option) => {
            return html`
              <option
                ?selected=${this.value === option.value}
                value=${option.value}
                label=${option.label}
              >
                ${option.label}
              </option>
            `
          })}
        </select>
        <div class="append-icon"></div>
      </label>
    `
  }
}
