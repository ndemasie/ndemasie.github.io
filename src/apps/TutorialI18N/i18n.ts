import { default as i18n } from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: {
        back: 'Back',
        next: 'Next',
        loading: 'Loading',
      },
      defaultNS: {
        action: {
          show_answer: 'Show Answer',
          answer_link: 'Read more',
        },
        question_title: 'Question',
        answer_title: 'Answer',
      },
      lesson: {
        ArraysObjects: {
          title: 'Arrays and Objects',
          content: '',
        },
        Interpolation: {
          title: 'Interpolation',
          content: '',
        },
        Namespaces: {
          title: 'Namespaces',
          content: '',
        },
        Nesting: {
          title: 'Nesting',
          content: '',
        },
        Context: {
          title: 'Context',
          content: '',
        },
        Essentials: {
          title: 'Essentials',
          content: '',
        },
        Plurals: {
          title: 'Plurals',
          content: '',
        },
        Fallback: {
          title: 'Fallback',
          content: '',
        },
        Intro: {
          title: 'Intro',
          content: "Let's begin",
        },
      },
    },
  },
  ns: ['defaultNS', 'common'],
  defaultNS: ['defaultNS'],
  fallbackNS: ['common'],
  fallbackLng: 'en',
  debug: false,
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
})

export default i18n
