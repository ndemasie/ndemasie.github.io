export type Lesson = {
  key: string
  filename: `${string}.jsx`
  externalRef?: string
}

export const lessons: Lesson[] = [
  {
    key: 'essentials',
    filename: 'Essentials.jsx',
    externalRef: 'https://www.i18next.com/translation-function/essentials',
  },
  {
    key: 'interpolation',
    filename: 'Interpolation.jsx',
    externalRef: 'https://www.i18next.com/translation-function/interpolation',
  },
  {
    key: 'namespaces',
    filename: 'Namespaces.jsx',
    externalRef: 'https://www.i18next.com/principles/namespaces',
  },
  {
    key: 'fallback',
    filename: 'Fallback.jsx',
    externalRef: 'https://www.i18next.com/principles/fallback#key-fallback',
  },
  {
    key: 'context',
    filename: 'Context.jsx',
    externalRef: 'https://www.i18next.com/translation-function/context',
  },
  {
    key: 'plurals',
    filename: 'Plurals.jsx',
    externalRef: 'https://www.i18next.com/translation-function/plurals',
  },
  {
    key: 'nesting',
    filename: 'Nesting.jsx',
    externalRef: 'https://www.i18next.com/translation-function/nesting',
  },
  // {
  //   key: 'objects-and-arrays',
  //   filename: 'ObjectsAndArrays.jsx',
  //   externalRef:
  //     'https://www.i18next.com/translation-function/objects-and-arrays',
  // },
]
