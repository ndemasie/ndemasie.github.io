import { useTranslation } from 'react-i18next'

export default function Namespaces() {
  const { t, i18n } = useTranslation()

  i18n.addResourceBundle('en', 'translation', {
    root: 'Example string in default namespace',
  })

  i18n.addResourceBundle('en', 'newNamespace', {
    root: 'I am in the "newNamespace"',
  })

  return (
    <dl id="namespaces">
      <dt>Namespaces</dt>
      <dd>{t('root')}</dd>
      <dd>{t('newNamespace:root')}</dd>
      <dd>{t('root', { ns: 'newNamespace' })}</dd>
    </dl>
  )
}
