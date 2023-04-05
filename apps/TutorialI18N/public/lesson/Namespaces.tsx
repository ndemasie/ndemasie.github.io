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
    <dl>
      <dt>Namespaces</dt>
      <dd>{t('root')}</dd>
      <dd>{t('newNamespace:root')}</dd>
      <dd>{t('root', { ns: 'newNamespace' })}</dd>
    </dl>
  )
}

export default Namespaces
