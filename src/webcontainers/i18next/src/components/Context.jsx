import { useTranslation } from 'react-i18next'

export default function Context() {
  const { t, i18n } = useTranslation()

  i18n.addResourceBundle(i18n.language, 'translation', {
    friend: 'A friend',
    friend_male: 'A boyfriend',
    friend_female: 'A girlfriend',

    context: 'A context',
    context_abstract: 'An abstract context',
    context_generic: 'A generic context',
  })

  return (
    <dl id="context">
      <dt>Context</dt>
      <dd>{t('friend')}</dd>
      <dd>{t('friend', { context: 'male' })}</dd>
      <dd>{t('friend', { context: 'female' })}</dd>

      <dt>Any context</dt>
      <dd>{t('context')}</dd>
      <dd>{t('context', { context: 'abstract' })}</dd>
      <dd>{t('context', { context: 'generic' })}</dd>
    </dl>
  )
}
