/** @jsxImportSource @emotion/react */
import React, { Suspense, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useCounter } from 'react-use'

import 'animate.css'
import 'highlight.js/styles/github-dark.css'

import '../../types/global'
import CodeQuestionAnswer from './components/CodeQuestionAnswer'
import Intro from './components/Intro'
import { lessons, Lesson } from './data'
import './i18n'
import { styles } from './styles'

const Loading: React.FC = () => {
  const { t } = useTranslation()
  return <div>{t('common:loading')}</div>
}

const App: React.FC = () => {
  const { t } = useTranslation()
  const [count, counterActions] = useCounter(0)

  const curLesson = useMemo(() => {
    return lessons.at(count) ?? lessons.at(-1) ?? lessons[0]
  }, [count])

  const renderLesson = useCallback(
    (type: Lesson['type']) => {
      console.log('renderLesson', type)
      switch (type) {
        case 'Intro':
          return <Intro lesson={curLesson} />
        case 'CodeQuestionAnswer':
          return <CodeQuestionAnswer key={curLesson.key} lesson={curLesson} />
        default:
      }
    },
    [curLesson],
  )

  return (
    <Suspense fallback={<Loading />}>
      {renderLesson(curLesson.type)}

      <div css={styles.footer}>
        {!!count && (
          <my-button class="fill" onClick={() => counterActions.dec()}>
            {t('common:back')}
          </my-button>
        )}
        <my-button class="fill" onClick={() => counterActions.inc()}>
          {t('common:next')}
        </my-button>
      </div>
    </Suspense>
  )
}

export default App
