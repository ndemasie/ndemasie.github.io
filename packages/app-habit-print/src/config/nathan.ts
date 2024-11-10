import RRule from 'rrule'

import type { CalConfig } from '../types.ts'

export default {
  name: 'Nathan',
  defaultRecurrence: {
    wkst: 0, // Sunday
  },
  events: [
    {
      name: 'Fish oil',
      type: 'checkbox',
      recurrence: [
        {
          freq: RRule.Frequency.DAILY,
          tzid: 'America/New_York',
          byweekday: RRule.ALL_WEEKDAYS,
        },
      ],
    },
    {
      name: 'AG1',
      type: 'checkbox',
      recurrence: [
        {
          freq: RRule.Frequency.DAILY,
          tzid: 'America/New_York',
          byweekday: RRule.ALL_WEEKDAYS,
        },
      ],
    },
    {
      name: '💧',
      type: 'checkbox',
      recurrence: [
        {
          freq: RRule.Frequency.HOURLY,
          interval: 8,
          tzid: 'America/New_York',
          byweekday: RRule.ALL_WEEKDAYS,
        },
      ],
    },
    {
      name: '🏋️‍♂️',
      type: 'checkbox',
      recurrence: [
        {
          freq: RRule.Frequency.DAILY,
          tzid: 'America/New_York',
          byweekday: RRule.ALL_WEEKDAYS,
        },
      ],
    },
    {
      name: '🍔🍗',
      type: 'list',
      recurrence: [
        {
          freq: RRule.Frequency.DAILY,
          tzid: 'America/New_York',
          byweekday: RRule.ALL_WEEKDAYS,
        },
      ],
    },
  ],
} satisfies CalConfig
