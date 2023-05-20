/** @jsxImportSource @emotion/react */
import React from 'react'
import { useTranslation } from 'react-i18next'

import 'animate.css'
import 'highlight.js/styles/github-dark.css'

import '../../../components/BaseButton'
import { Lesson } from '../data'
import '../i18n'

type Props = {
  lesson: Lesson
}

const Intro: React.FC<Props> = ({ lesson }) => {
  const { t } = useTranslation()

  return <div>{t(`lesson:${lesson.key}.content`)}</div>
}

export default Intro
