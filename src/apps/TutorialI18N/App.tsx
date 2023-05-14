/** @jsxImportSource @emotion/react */
import type { FileSystemTree } from '@webcontainer/api'
import React, { Suspense, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAsync, useCounter, useHash } from 'react-use'

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
  const [count, countActions] = useCounter(0)
  const [, setHash] = useHash()

  const files = useAsync(async () => {
    const response = await fetch(
      '/src/webcontainers/i18next/fileSystemTree.json',
    )
    if (!response.ok) {
      throw new Error('not loaded')
    }
    return response.json() as Promise<FileSystemTree>
  })

  // Sync count of lesson to URL hash
  useEffect(() => {
    const hash = lessons.at(count)?.key
    setHash(`#${hash}`)
  }, [count, setHash])

  return (
    <Suspense fallback={<Loading />}>
      {!files.loading && !files.error && !!files.value && (
        <Repl fileSystemTree={files.value} />
      )}

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
