import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react'
import { useHash } from 'react-use'

export type Lesson = {
  key: string
  filename: `${string}.jsx`
  externalRef?: string
}

export type LessonState = {
  participantCount: number
  leaderId: string | null
  leaderName: string | null
  hash: string
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

// Context
const LessonContext = createContext<ReturnType<typeof Context> | null>(null)
const Context = () => {
  const [, setHash] = useHash()

  const [lessonState, setLessonState] = useReducer(
    (state: LessonState, payload: Partial<LessonState>) => {
      const update = Object.entries(payload).reduce((acc, [key, value]) => {
        if (!acc.hasOwnProperty(key)) return acc
        if (acc[key] === value) return acc

        if (key === 'hash' && value && typeof value === 'string') {
          acc[key] = value.startsWith('#') ? value : `#${value}`
          setHash(acc[key]) // Side-effect
          return acc
        }

        acc[key] = value
        return acc
      }, state)

      return update as LessonState
    },
    {
      participantCount: 1,
      leaderId: null,
      leaderName: null,
      hash: `#${lessons.at(0)?.key}`,
    },
    (initArg) => {
      setHash(initArg?.hash)
      return initArg
    },
  )

  return {
    lessonState,
    setLessonState,
  }
}

// Hook
export const useLessonContext = () => {
  const context = useContext(LessonContext)
  if (!context) throw new Error('Context used before provider')

  const { lessonState, setLessonState } = context

  const curLesson = useMemo(() => {
    const key = String(lessonState.hash).replace('#', '')
    return lessons.find((lesson) => lesson.key === key) ?? lessons.at(0)
  }, [lessonState.hash])

  const curLessonIndex = useMemo(() => {
    const key = String(lessonState.hash).replace('#', '')
    return lessons.findIndex((lesson) => lesson.key === key)
  }, [lessonState.hash])

  const goBack = useCallback(() => {
    if (curLessonIndex < 0) return
    setLessonState({ hash: lessons[curLessonIndex - 1]?.key })
  }, [curLessonIndex, setLessonState])

  const goForward = useCallback(() => {
    if (curLessonIndex < 0) return
    if (curLessonIndex >= lessons.length) return
    setLessonState({ hash: lessons[curLessonIndex + 1]?.key })
  }, [curLessonIndex, setLessonState])

  return {
    goBack,
    goForward,
    curLesson,
    curLessonIndex,
    LESSON_COUNT: lessons.length,
    ...context,
  }
}

// Provider
export const LessonProvider: React.FC<any> = ({ children }) => {
  const context = Context()
  return <LessonContext.Provider value={context} children={children} />
}
