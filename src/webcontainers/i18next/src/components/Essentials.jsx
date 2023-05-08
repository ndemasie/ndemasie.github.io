import { useTranslation } from 'react-i18next'

export default function Essentials() {
  const { t, i18n } = useTranslation()

  const regionNamesEnglish = new Intl.DisplayNames(['en'], {
    type: 'region',
  })

  i18n.addResourceBundle('en', 'translation', {
    root: `Root string`,
    nested: {
      foo: 'Nested foo',
      deep: {
        bar: 'Deeply nested bar',
      },
    },
  })

  return (
    <dl id="essentials">
      <dt>Accessing keys</dt>
      <dd>{t('root')}</dd>
      <dd>{t('nested.foo')}</dd>
      <dd>{t('nested.deep.bar')}</dd>
      <dd>{t('nested.undefined')}</dd>

      <dt>Passing a default value</dt>
      <dd>{t('nested.undefined', regionNamesEnglish.of('DE'))}</dd>
    </dl>
  )
}
