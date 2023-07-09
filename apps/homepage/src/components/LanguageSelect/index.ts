import { html, css, LitElement } from 'lit'
import { customElement, state, property } from 'lit/decorators.js'
import { Language } from 'src/types/Language'

@customElement('language-select')
export class LanguageSelect extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot()
    return root
  }

  static styles = css`
    label select {
      all: unset;
    }

    label {
      --padding-x: 0.4em;

      display: flex;
      position: relative;

      border: solid 1.2px var(--theme-primary);
      border-radius: 6px;
      background-color: var(--theme-background);
      color: var(--theme-primary);
      padding: 0.25em 0;
    }

    label *:first-child {
      padding-left: var(--padding-x);
    }
    label *:last-child {
      padding-left: var(--padding-x);
    }

    label .dropdown-arrow {
      --width: 1.6em;

      height: 100%;
      width: var(--size);

      padding: 0 var(--padding-x);
    }

    label .dropdown-arrow .arrow {
      --size: calc(var(--width) / 3);

      border: calc(var(--size)) solid transparent;
      border-top: calc(var(--size)) solid var(--theme-primary);

      pointer-events: none;

      transition: transform 500ms ease;
      transform: translateY(calc(var(--size) / 2));
      transform-origin: center calc(50% - var(--size) / 4);
    }
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
        <div class="prepend-icon">
          <svg
            width="1.25em"
            height="1.25em"
            viewBox="0 0 88.6 77.3"
            focusable="false"
            aria-hidden="true"
            role="img"
          >
            <path
              fill="currentColor"
              d="M61 24.6h7.9l18.7 51.6h-7.7l-5.4-15.5H54.3l-5.6 15.5h-7.2L61 24.6zM72.6 55l-8-22.8L56.3 55h16.3z"
            />
            <path
              fill="currentColor"
              d="M53.6 60.6c-10-4-16-9-22-14 0 0 1.3 1.3 0 0-6 5-20 13-20 13l-4-6c8-5 10-6 19-13-2.1-1.9-12-13-13-19h8c4 9 10 14 10 14 10-8 10-19 10-19h8s-1 13-12 24c5 5 10 9 19 13l-3 7zm-52-44h56v-8h-23v-7h-9v7h-24v8z"
            />
          </svg>
        </div>

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
