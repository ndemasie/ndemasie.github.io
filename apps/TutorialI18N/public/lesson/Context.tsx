import React from 'react'
import { useTranslation } from 'react-i18next'

export const Context: React.FC = () => {
  const { t, i18n } = useTranslation()

  i18n.addResourceBundle('en', 'defaultNS', {
    friend: 'A friend',
    friend_male: 'A boyfriend',
    friend_female: 'A girlfriend',

    context: 'A context',
    context_abstract: 'An abstract context',
    context_generic: 'A generic context',
  })

  return (
    <dl>
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

export default Context
