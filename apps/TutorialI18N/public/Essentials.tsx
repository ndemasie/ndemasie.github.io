import React from 'react'
import { useTranslation } from 'react-i18next'

const regionNamesEnglish = new Intl.DisplayNames(['en'], { type: 'region' })

export const Essential: React.FC = () => {
  const { t, i18n } = useTranslation()

  i18n.addResourceBundle('en', 'defaultNS', {
    root: `Root string`,
    nested: {
      foo: 'Nested example',
      unknown: "I don't know",
    },
  })

  return (
    <div>
      {/* Accessing keys */}
      <div>{t('root')}</div>
      <div>{t('nested.foo')}</div>
      <div>{t('nested.unspecified')}</div>

      {/* Passing a default value */}
      <div>{t('lang.EN', regionNamesEnglish.of('DE'))}</div>

      {/* Read more */}
      <a href="https://www.i18next.com/translation-function/essentials">
        {t('action.answer_link')}
      </a>
    </div>
  )
}

export default Essential
