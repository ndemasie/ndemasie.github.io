// https://codepen.io/giana/pen/BZaGyP

const template = `
<style>
  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 var(--hover); }
  }

  button {
    --color: hsla(277, 46%, 62%);
    --hover: hsla(130, 46%, 62%, .8);

    color: var(--color);
    transition: 250ms;

    background: none;
    border: 2px solid;
    font: inherit;
    line-height: 1;
    margin: 0.5em;
    padding: 1em 2em;
  }

  button:hover,
  button:focus {
    border-color: var(--hover);
    color: #fff;
  }

  .fill:hover,
  .fill:focus {
    box-shadow: inset 0 0 0 2em var(--hover);
  }

  .pulse:hover,
  .pulse:focus {
    animation: pulse 1s;
    box-shadow: 0 0 0 2em transparent;
  }

  .close:hover,
  .close:focus {
    box-shadow:
      inset -3.5em 0 0 0 var(--hover),
      inset 3.5em 0 0 0 var(--hover);
  }

  .raise:hover,
  .raise:focus {
    box-shadow: 0 0.5em 0.5em -0.4em var(--hover);
    transform: translateY(-0.25em);
  }

  // Animating from the bottom
  .up:hover,
  .up:focus {
    box-shadow: inset 0 -3.25em 0 0 var(--hover);
  }

  // And from the left
  .slide:hover,
  .slide:focus {
    box-shadow: inset 6.5em 0 0 0 var(--hover);
  }
</style>

<button>
  <slot></slot>
</button>
`

class MyButton extends HTMLElement {
  constructor() {
    super()

    // Get the template and clone it into the shadow DOM
    const el = document.createElement('template')
    el.innerHTML = template

    this.attachShadow({ mode: 'open' })
    this.shadowRoot!.appendChild(el.content.cloneNode(true))
  }

  connectedCallback() {
    const button = this.shadowRoot!.querySelector('button')!
    button.className = this.className
  }
}

customElements.define('my-button', MyButton)
