// import ArraysObjects from './public/lesson/ArraysObjects'
import Context from './public/lesson/Context'
import Essentials from './public/lesson/Essentials'
import Fallback from './public/lesson/Fallback'
import Interpolation from './public/lesson/Interpolation'
import Namespaces from './public/lesson/Namespaces'
import Nesting from './public/lesson/Nesting'
import Plurals from './public/lesson/Plurals'

export type Lesson = {
  type: 'Intro' | 'CodeQuestionAnswer'
  key: string
  publicRef?: string
  component?: any
  externalHref?: string
}

export const lessons: Lesson[] = [
  {
    key: 'Intro',
    type: 'Intro',
  },
  {
    key: 'Essentials',
    type: 'CodeQuestionAnswer',
    publicRef: '/apps/TutorialI18N/public/lesson/Essentials.tsx',
    component: <Essentials />,
    externalHref: 'https://www.i18next.com/translation-function/essentials',
  },
  {
    key: 'Interpolation',
    type: 'CodeQuestionAnswer',
    publicRef: '/apps/TutorialI18N/public/lesson/Interpolation.tsx',
    component: <Interpolation />,
    externalHref: 'https://www.i18next.com/translation-function/interpolation',
  },
  {
    key: 'Namespaces',
    type: 'CodeQuestionAnswer',
    publicRef: '/apps/TutorialI18N/public/lesson/Namespaces.tsx',
    component: <Namespaces />,
    externalHref: 'https://www.i18next.com/principles/namespaces',
  },
  {
    key: 'Fallback',
    type: 'CodeQuestionAnswer',
    publicRef: '/apps/TutorialI18N/public/lesson/Fallback.tsx',
    component: <Fallback />,
    externalHref: 'https://www.i18next.com/principles/fallback#key-fallback',
  },
  {
    key: 'Context',
    type: 'CodeQuestionAnswer',
    publicRef: '/apps/TutorialI18N/public/lesson/Context.tsx',
    component: <Context />,
    externalHref: 'https://www.i18next.com/translation-function/context',
  },
  {
    key: 'Plurals',
    type: 'CodeQuestionAnswer',
    publicRef: '/apps/TutorialI18N/public/lesson/Plurals.tsx',
    component: <Plurals />,
    externalHref: 'https://www.i18next.com/translation-function/plurals',
  },
  {
    key: 'Nesting',
    type: 'CodeQuestionAnswer',
    publicRef: '/apps/TutorialI18N/public/lesson/Nesting.tsx',
    component: <Nesting />,
    externalHref: 'https://www.i18next.com/translation-function/nesting',
  },
  // {
  //   type: 'CodeQuestionAnswer',
  //   key: 'ArraysObjects',
  //   publicRef: '/apps/TutorialI18N/public/lesson/ArraysObjects.tsx',
  //   component: <ArraysObjects />,
  //   externalHref:
  //     'https://www.i18next.com/translation-function/objects-and-arrays',
  // },
]
