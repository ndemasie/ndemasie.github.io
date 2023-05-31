import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { Role } from './context/user'

i18n.use(initReactI18next)
i18n.init({
  resources: {
    en: {
      common: {
        back: 'Back',
        next: 'Next',
        loading: 'Loading',
      },
      translation: {
        role: {
          [Role.Leader]: {
            label: 'Leader',
            activeParticiple: 'Leading',
          },
          [Role.Participant]: {
            label: 'Participant',
            activeParticiple: 'Participating',
          },
        },
        role_lead_request: 'Become leader',
        role_lead_cease: 'Stop leading',
        infoStatus: '{{name}}, you are {{action, lowercase}}',
        infoStatus_leader_zero: '$t(infoStatus)',
        infoStatus_leader_one: '$t(infoStatus) {{count}} other',
        infoStatus_leader_other: '$t(infoStatus) {{count}} others',
        infoStatus_participant_zero: '$t(infoStatus)',
        infoStatus_participant_one: '$t(infoStatus) with {{count}} other',
        infoStatus_participant_other: '$t(infoStatus) with {{count}} others',
        infoStatus_follow_zero:
          '$t(infoStatus, {"action": "following"}) {{leaderName}}',
        infoStatus_follow_one:
          '$t(infoStatus, {"action": "following"}) {{leaderName}} with {{count}} other',
        infoStatus_follow_other:
          '$t(infoStatus, {"action": "following"}) {{leaderName}} with {{count}} others',
      },
    },
  },
  ns: ['translation', 'common'],
  defaultNS: ['translation'],
  fallbackNS: ['common'],
  fallbackLng: 'en',
  debug: false,
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
})

i18n.services?.formatter?.add('lowercase', (value) => value.toLocaleLowerCase())

export default i18n
