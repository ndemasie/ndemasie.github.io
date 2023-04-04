import React from 'react'
import { useTranslation } from 'react-i18next'

const regionNamesEnglish = new Intl.DisplayNames(['en'], {
  type: 'region',
})

export const Essentials: React.FC = () => {
  const { t, i18n } = useTranslation()

  i18n.addResourceBundle('en', 'defaultNS', {
    root: `Root string`,
    nested: {
      foo: 'Nested foo',
      deep: {
        bar: 'Deeply nested bar',
      },
    },
  })

  return (
    <dl>
      <dt>Accessing keys</dt>
      <dd>{t('root')}</dd>
      <dd>{t('nested.foo')}</dd>
      <dd>{t('nested.deep.bar')}</dd>
      <dd>{t('nested.undefined')}</dd>

      <dt>Passing a default value</dt>
      <dd>
        {t('nested.undefined', regionNamesEnglish.of('DE'))}
      </dd>
    </dl>
  )
}

export default Essentials
