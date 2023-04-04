export function injectCustomHistoryEvents() {
  if (!window.history) {
    console.error('Window History does not exist, failed to load custom events')
    return
  }

  const pushStateFn = window.history.pushState
  window.history.pushState = (...args) => {
    pushStateFn.apply(window.history, args)
    console.log('history.pushState')
    window.dispatchEvent(new CustomEvent('history.pushState'))
  }

  const replaceStateFn = window.history.replaceState
  window.history.replaceState = (...args) => {
    replaceStateFn.apply(window.history, args)
    console.log('history.replaceState')
    window.dispatchEvent(new CustomEvent('history.replaceState'))
  }
}
