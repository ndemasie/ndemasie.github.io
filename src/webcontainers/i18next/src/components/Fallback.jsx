import { useTranslation } from 'react-i18next'

export default function Fallback() {
  const { t, i18n } = useTranslation()

  i18n.addResourceBundle('en', 'translation', {
    error: {
      418: "I'm a teapot",
      undefined: 'Unknown HTTP error',
    },
  })

  return (
    <dl id="fallback">
      <dt>Fallback key</dt>
      <dd>{t(`error.${418}`)}</dd>
      <dd>{t([`error.${428}`, 'error.undefined'])}</dd>

      <dt>CAREFUL! Never typeof 'undefined'</dt>
      <dd>{((opt) => t([`error.${428}`, String(opt)]))()}</dd>
      <dd>{((opt) => t([`error.${428}`, `error.${opt}`]))()}</dd>

      <dt>Avoid exists checks</dt>
      <dd>{i18n.exists(`error.${428}`) ? t(`error.${428}`) : t(`error.undefined`)}</dd>
    </dl>
  )
}
