import React from 'react'
import { useTranslation } from 'react-i18next'

export const Plurals: React.FC = () => {
  const { t, i18n } = useTranslation()

  i18n.addResourceBundle('en', 'defaultNS', {
    plural: 'Plural demonstration',
    plural_zero: 'No Example',
    plural_one: 'Example',
    plural_other: 'Examples',

    eg_count: '{{count}} Example',
    eg_count_other: '{{count}} Examples',

    ordinal_one: '{{count}}st st',
    ordinal_two: '{{count}}nd st',
    ordinal_few: '{{count}}rd st',
    ordinal_other: '{{count}}th st',
  })

  return (
    <dl>
      <dt>Plurals</dt>
      <dd>{t('plural')}</dd>
      <dd>{t('plural', { count: 0 })}</dd>
      <dd>{t('plural', { count: 1 })}</dd>
      <dd>{t('plural', { count: 2 })}</dd>

      <dt>Plural w/ count</dt>
      <dd>{t('eg_count', { count: 0 })}</dd>
      <dd>{t('eg_count', { count: 3 })}</dd>
      <dd>{t('eg_count', { count: undefined })}</dd>

      <dt>Plural ordinals</dt>
      <dd>{t('ordinal', { count: 1, ordinal: true })}</dd>
      <dd>{t('ordinal', { count: 2, ordinal: true })}</dd>
      <dd>{t('ordinal', { count: 3, ordinal: true })}</dd>
      <dd>{t('ordinal', { count: 4, ordinal: true })}</dd>
      <dd>{t('ordinal', { count: 31, ordinal: true })}</dd>
      <dd>{t('ordinal', { count: 32, ordinal: true })}</dd>
      <dd>{t('ordinal', { count: 33, ordinal: true })}</dd>
      <dd>{t('ordinal', { count: 34, ordinal: true })}</dd>
    </dl>
  )
}

export default Plurals
