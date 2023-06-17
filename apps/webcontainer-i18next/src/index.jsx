import * as i18n from 'i18next'
import * as React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { initReactI18next } from 'react-i18next'

import App from './App'

const LANG = {
  EN: 'en', // English
}

i18n.use(initReactI18next).init({
  resources: { [LANG.EN]: {} },
  lng: LANG.EN,
  fallbackLng: LANG.EN,
  interpolation: { escapeValue: false },
})

const root = createRoot(document.getElementById('root'))

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
