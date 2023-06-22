import { useTranslation } from 'react-i18next'

export default function Context() {
  const { t, i18n } = useTranslation()

  i18n.addResourceBundle(i18n.language, 'translation', {
    key_number: 'Value: {{val, number()}}',
    key_number2: 'Value: {{val, number()}}',
    key_number3: 'Value: {{val, number(maximumFractionDigits: 2)}}',
    key_number4: 'Score: {{val, number}}',
    key_number5:
      'Risk score: {{val, number(style: percent; minimumFractionDigits: 2; maximumFractionDigits: 2)}}',

    key_dateTime: 'Date: {{val, datetime}}',
    key_dateTimeOptions: 'Datetime: {{val, datetime}}',

    key_relativeTime: 'Published: {{val, relativetime(quarter)}}',
    key_relativeTimeOptions: 'Last updated: {{val, relativetime(hour)}}',

    key_currency: '{{usd, currency(USD)}} is worth {{eur, currency}}',
  })

  return (
    <dl id="formatting">
      <dt>Formatting Numbers</dt>
      <dd>{t('key_number', { val: 12345.678 })}</dd>
      <dd>{t('key_number2', { val: 12345.678, maximumFractionDigits: 1 })}</dd>
      <dd>{t('key_number3', { val: 12345.678 })}</dd>
      <dd>{t('key_number4', { val: 0.97654, style: 'percent' })}</dd>
      <dd>{t('key_number5', { val: 0.1415926 })}</dd>

      <dt>Formatting Datetime</dt>
      <dd>{t('key_dateTime', { val: Date.now(), lng: 'de' })}</dd>
      <dd>
        {t('key_dateTimeOptions', {
          val: Date.now(),
          formatParams: {
            val: {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            },
          },
        })}
      </dd>
      <dd>{t('key_relativeTime', { val: -3 })}</dd>
      <dd>{t('key_relativeTimeOptions', { val: -3, style: 'narrow' })}</dd>

      <dt>Formatting Currency</dt>
      <dd>
        {t('key_currency', {
          usd: 1,
          eur: 0.917,
          formatParams: { eur: { currency: 'EUR' } },
        })}
      </dd>
    </dl>
  )
}
