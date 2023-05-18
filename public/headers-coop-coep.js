// CREDIT: https://raw.githubusercontent.com/josephrocca/clip-image-sorter/main/enable-threads.js
// REF: http://stefnotch.github.io/web/COOP%20and%20COEP%20Service%20Worker/

// NOTE: This file creates a service worker that cross-origin-isolates the page (read more here: https://web.dev/coop-coep/) which allows us to use wasm threads.
// Normally you would set the COOP and COEP headers on the server to do this, but Github Pages doesn't allow this, so this is a hack to do that.

/* Edited version of: coi-serviceworker v0.1.6 - Guido Zuidhof, licensed under MIT */
// From here: https://github.com/gzuidhof/coi-serviceworker
if (typeof window === 'undefined') {
  self.addEventListener('install', () => self.skipWaiting())
  self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()))

  const handleFetch = async (request) => {
    if (request.cache === 'only-if-cached' && request.mode !== 'same-origin') {
      return
    }

    if (request.mode === 'no-cors') {
      // We need to set `credentials` to "omit" for no-cors requests, per this comment: https://bugs.chromium.org/p/chromium/issues/detail?id=1309901#c7
      request = new Request(request.url, {
        cache: request.cache,
        credentials: 'omit',
        headers: request.headers,
        integrity: request.integrity,
        destination: request.destination,
        keepalive: request.keepalive,
        method: request.method,
        mode: request.mode,
        redirect: request.redirect,
        referrer: request.referrer,
        referrerPolicy: request.referrerPolicy,
        signal: request.signal,
      })
    }

    const response = await fetch(request).catch((e) => console.error(e))

    if (response.status === 0) {
      return response
    }

    const headers = new Headers(response.headers)
    headers.set('Cross-Origin-Embedder-Policy', 'require-corp') // or: credentialless
    headers.set('Cross-Origin-Opener-Policy', 'same-origin')
    headers.set('Cross-Origin-Resource-Policy', 'cross-origin')

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    })
  }

  self.addEventListener(
    'fetch',
    (event) => event.respondWith(handleFetch(event.request)), // respondWith must be executed synchronously (but can be passed a Promise)
  )
} else {
  ;(async () => {
    if (window.crossOriginIsolated !== false) {
      return
    }

    const registration = await navigator.serviceWorker
      .register(window.document.currentScript.src)
      .catch((e) =>
        console.error('COOP/COEP Service Worker failed to register:', e),
      )

    if (registration) {
      console.log('COOP/COEP Service Worker registered', registration.scope)

      registration.addEventListener('updatefound', () => {
        console.log(
          'Reloading page to make use of updated COOP/COEP Service Worker.',
        )
        window.location.reload()
      })

      // If the registration is active, but it's not controlling the page
      if (registration.active && !navigator.serviceWorker.controller) {
        console.log('Reloading page to make use of COOP/COEP Service Worker.')
        window.location.reload()
      }
    }
  })()
}

// Code to deregister:
// let registrations = await navigator.serviceWorker.getRegistrations();
// for(let registration of registrations) {
//   await registration.unregister();
// }
