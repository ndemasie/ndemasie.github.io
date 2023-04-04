export function initSelect() {
  if (window.innerWidth <= 576) return // Desktop only

  const selectOptionEvent = (event: MouseEvent): void => {
    const element = event.currentTarget as HTMLElement
    const select = element.closest('label')?.querySelector('select')!

    if (event.button !== (LEFT_BUTTON = 0)) return
    event.stopPropagation()
    select.value = element.dataset.value!
    select.dispatchEvent(new Event('change'))
  }

  document
    .querySelectorAll<HTMLSelectElement>(`label.select select`)
    .forEach((select) =>
      select.addEventListener('mousedown', (event) => event.preventDefault())
    )

  document
    .querySelectorAll<HTMLElement>('label.select select ~ .select-options > .select-option')
    .forEach((element) =>
      element.addEventListener('mousedown', selectOptionEvent)
    )
}