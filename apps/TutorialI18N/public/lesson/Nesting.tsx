import React from 'react'
import { useTranslation } from 'react-i18next'

export const Nesting: React.FC = () => {
  const { t, i18n } = useTranslation()

  i18n.addResourceBundle('en', 'defaultNS', {
    hello: 'Hello $t(world)',
    world: 'world',
  })

  return (
    <dl>
      <dt>Nesting</dt>
      <dd>{t('hello')}</dd>
    </dl>
  )
}

export default Nesting
