export function initRipple() {
  const rippleEvent = (event: MouseEvent): void => {
      const element = event.currentTarget as HTMLElement
      element.style.setProperty('--ripple-x', event.layerX + 'px')
      element.style.setProperty('--ripple-y', event.layerY + 'px')
      element.classList.add('pulse')
      element.addEventListener(
        'animationend',
        () => element.classList.remove('pulse'),
        { once: true, passive: true }
      )
    }

  document
    .querySelectorAll<HTMLElement>('.ripple')
    .forEach((element) =>
      element.addEventListener('click', rippleEvent)
    )
}