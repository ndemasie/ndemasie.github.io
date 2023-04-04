import React from 'react'
import { useTranslation } from 'react-i18next'

export const Namespaces: React.FC = () => {
  const { t, i18n } = useTranslation()

  i18n.addResourceBundle('en', 'defaultNS', {
    root: 'Example string in default namespace',
  })

  i18n.addResourceBundle('en', 'newNamespace', {
    root: 'I am in the "newNamespace"',
  })

  return (
    <div>
      <div>{t('root')}</div>
      <div>{t('newNamespace:root')}</div>
      <div>{t('root', { ns: 'newNamespace' })}</div>

      {/* Read more */}
      <a href="https://www.i18next.com/principles/namespaces">
        {t('action.answer_link')}
      </a>
    </div>
  )
}

export default Namespaces
