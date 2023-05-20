/** @jsxImportSource @emotion/react */
import highlightJs from 'highlight.js/lib/core'
import typescript from 'highlight.js/lib/languages/typescript'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAsync } from 'react-use'

import 'animate.css'
import 'highlight.js/styles/github-dark.css'

import '../../../components/BaseButton'
import { Lesson } from '../data'
import '../i18n'
import { styles } from '../styles'

type Props = {
  lesson: Lesson
}

const Training: React.FC<Props> = ({ lesson }) => {
  const { t } = useTranslation()

  const [show, setShow] = useState(false)

  const questionFile = useAsync(async () => {
    if (!lesson.publicRef) {
      return
    }

    try {
      const response = await fetch(lesson.publicRef)
      if (response.ok) {
        return response.text()
      }
    } catch (e) {
      /* empty */
    }
  }, [])

  // Highlight init
  useEffect(() => {
    highlightJs.registerLanguage('typescript', typescript)
    highlightJs.highlightAll()
  })

  return (
    <>
      <div css={styles.container}>
        <h2 css={styles.questionTitle}>{t(`lesson:${lesson.key}.title`)}</h2>

        <div
          css={styles.questionCard}
          className="animate__animated animate__backInLeft"
        >
          <pre>
            <code css={styles.codeblock} className="language-typescript">
              {!questionFile.loading && questionFile.value}
            </code>
          </pre>
        </div>

        <h2 css={styles.answerTitle}>{t('answer_title')}</h2>

        <div
          css={styles.answerCard}
          className="hljs animate__animated animate__fadeIn"
        >
          {show ? (
            lesson?.component
          ) : (
            <my-button class="raise" onClick={() => setShow(true)}>
              {t('action.show_answer')}
            </my-button>
          )}
        </div>
      </div>
    </>
  )
}

export default Training
