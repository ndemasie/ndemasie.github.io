/** @jsxImportSource @emotion/react */
import React, { Suspense, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useCounter, useHash } from 'react-use'

// import 'animate.css'

import '../../components/BaseButton'
import '../../types/global'
import Repl from './components/Repl'
import { lessons } from './data'
import './i18n'
import { styles } from './styles'

const Loading: React.FC = () => {
  const { t } = useTranslation()
  return <div>{t('common:loading')}</div>
}

const App: React.FC = () => {
  const { t } = useTranslation()
  const [count, countActions] = useCounter(0, lessons.length, 0)
  const [, setHash] = useHash()

  // Sync count of lesson to URL hash
  useEffect(() => {
    const hash = lessons.at(count)?.key
    setHash(`#${hash}`)
  }, [count, setHash])

  return (
    <Suspense fallback={<Loading />}>
      <Repl app="/src/webcontainers/i18next/fileSystemTree.json" />

      <div css={styles.footer}>
        {!!count && (
          <my-button class="fill" onClick={() => countActions.dec()}>
            {t('common:back')}
          </my-button>
        )}
        <my-button class="fill" onClick={() => countActions.inc()}>
          {t('common:next')}
        </my-button>
      </div>
    </Suspense>
  )
}

export default App
