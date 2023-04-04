import React from 'react'
import { useTranslation } from 'react-i18next'

export const ArraysObjects: React.FC = () => {
  const { t, i18n } = useTranslation()

  i18n.addResourceBundle('en', 'defaultNS', {
    tree: {
      branch: 'branch',
      squirrel: '🐿️',
      spider: '🕷️',
    },
    animals: ['🐓', '🐄', '🐐', '🐖', '{{pet}}'],
  })

  return (
    <dl>
      <dt>Array</dt>
      <dd>{t('animals')}</dd>
      <dd>{t('animals.2')}</dd>
      <dd>
        {t('animals', { pet: '🐶', joinArrays: ', ' })}
      </dd>
      <dd>{t('animals', { returnObjects: true })}</dd>

      <dt>Object </dt>
      <dd>{t('tree')}</dd>
      <dd>{t('tree', { returnObjects: true })}</dd>
    </dl>
  )
}

export default ArraysObjects
