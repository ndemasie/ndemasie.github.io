export * from './initFormatters'
export * from './initRipple'
export * from './initSelect'
export * from './injectCustomHistoryEvents'

import { initRipple } from './initRipple'
import { initSelect } from './initSelect'
import { initFormatters } from './initFormatters'

export function initPage() {
  document.addEventListener('DOMContentLoaded', () => {
    initSelect()
    initRipple()
    initFormatters()
  })
}