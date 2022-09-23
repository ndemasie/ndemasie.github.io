function initSelectJs() {
  if (window.innerWidth <= 576) return // Desktop only

  document
    .querySelectorAll(`label.select select`)
    .forEach((select) =>
      select.addEventListener('mousedown', (event) => event.preventDefault())
    )

  document
    .querySelectorAll('select + .select-options > .select-option')
    .forEach((element) => {
      element.addEventListener('mousedown', (event) => {
        if (event.button !== (LEFT_BUTTON = 0)) return
        event.stopPropagation()
        element.closest('select').value = option.dataset.value
        element.closest('select').dispatchEvent(new Event('change'))
      })
    })
}

function initRippleJs() {
  const initElement = (element) => {
    element.addEventListener('click', (event) => {
      element.style.setProperty('--ripple-x', event.layerX + 'px')
      element.style.setProperty('--ripple-y', event.layerY + 'px')
      element.classList.add('pulse')
      element.addEventListener(
        'animationend',
        () => element.classList.remove('pulse'),
        { once: true, passive: true }
      )
    })
  }

  document
    .querySelectorAll('.ripple')
    .forEach((element) => initElement(element))
}

function navTo(path) {
  location.href = location.origin + location.pathname.split('/').fill(path, 1, 2).join('/')
}

document.addEventListener('DOMContentLoaded', () => {
  initSelectJs()
  initRippleJs()
})