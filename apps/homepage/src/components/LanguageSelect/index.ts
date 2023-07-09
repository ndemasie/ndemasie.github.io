import { html, css, unsafeCSS, LitElement } from 'lit'
import { customElement, state, property } from 'lit/decorators.js'
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

  @property({ type: String })
  value: Language = Language.EN

  @state()
  private options = Object.values(Language).map((lang) => {
    return {
      value: lang,
      label: new Intl.DisplayNames([lang], { type: 'language' }).of(lang),
    }
  })

  private handleChange(event: Event) {
    const [, , ...rest] = window.location.pathname.split('/')
    window.location.pathname = ['', event.target!.value, ...rest].join('/')
  }

  protected render() {
    return html`
      <label>
        <div class="prepend-icon">${unsafeHTML(I18nIcon)}</div>
        <select .value=${this.value} @change=${this.handleChange}>
          ${this.options.map((option) => {
            return html`
              <option
                ?selected=${this.value === option.value}
                value="${option.value}"
              >
                <span>${option.label}&nbsp;</span>
              </option>
            `
          })}
        </select>
      </label>
    `
  }
}
