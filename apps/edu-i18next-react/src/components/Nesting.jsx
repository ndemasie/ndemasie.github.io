import { useTranslation } from 'react-i18next'

export default function Nesting() {
  const { t, i18n } = useTranslation()

  i18n.addResourceBundle(i18n.language, 'translation', {
    hello: 'Hello $t(world)',
    world: 'world',
  })

  return (
    <dl id="nesting">
      <dt>Nesting</dt>
      <dd>{t('hello')}</dd>
    </dl>
  )
}
