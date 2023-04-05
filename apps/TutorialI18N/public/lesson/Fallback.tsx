import React from 'react'
import { useTranslation } from 'react-i18next'

export const Fallback: React.FC = () => {
  const { t, i18n } = useTranslation()

  i18n.addResourceBundle('en', 'defaultNS', {
    error: {
      '418': "I'm a teapot",
      undefined: 'Unknown HTTP error',
    },
  })

  return (
    <dl>
      <dt>Fallback key</dt>
      <dd>{t(`error.${418}`)}</dd>
      <dd>{t([`error.${428}`, 'error.undefined'])}</dd>

      <dt>CAREFUL! Never typeof 'undefined'</dt>
      <dd>
        {((opt) => t([`error.${428}`, String(opt)]))()}
      </dd>
      <dd>
        {((opt) => t([`error.${428}`, `error.${opt}`]))()}
      </dd>

      <dt>Avoid exists checks</dt>
      <dd>
        {i18n.exists(`error.${428}`)
          ? t(`error.${428}`)
          : t(`error.undefined`)}
      </dd>
    </dl>
  )
}

export default Fallback
