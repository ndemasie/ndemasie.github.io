/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { Suspense, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useCounter, useHash } from 'react-use'

import '../../components/BaseButton'
import '../../types/global'
import Repl from './components/Repl'
import { lessons } from './data'
import './i18n'
import { styles } from './styles'

const WEBCONTAINER_APP_I18N = '/src/webcontainers/i18next/fileSystemTree.json'

const Loading: React.FC = () => {
  const { t } = useTranslation()
  return <div>{t('common:loading')}</div>
}

const StyledButton = ({ className, ...props }) => (
  <my-button {...props} class={className} />
)

const App: React.FC = () => {
  const MAX_LESSON = lessons.length - 1

  const { t } = useTranslation()
  const [count, countActions] = useCounter(0, MAX_LESSON, 0)
  const [, setHash] = useHash()

  // Sync count of lesson to URL hash
  useEffect(() => {
    const hash = lessons.at(count)?.key
    setHash(`#${hash}`)
  }, [count, setHash])

  return (
    <Suspense fallback={<Loading />}>
      <Repl app={WEBCONTAINER_APP_I18N} />

      <div css={styles.footer}>
        <StyledButton
          className="fill"
          onClick={() => countActions.dec()}
          css={css({ visibility: count ? 'visible' : 'hidden' })}
        >
          {t('common:back')}
        </StyledButton>

        <StyledButton
          className="fill"
          onClick={() => countActions.inc()}
          css={css({
            visibility: count < MAX_LESSON ? 'visible' : 'hidden',
          })}
        >
          {t('common:next')}
        </StyledButton>
      </div>
    </Suspense>
  )
}

export default App
