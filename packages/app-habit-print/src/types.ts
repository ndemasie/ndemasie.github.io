import * as RRule from 'rrule'

export type CalConfig = {
  name: string
  events: {
    name: string
    type: string
    recurrence: (Pick<RRule.Options, 'freq'> & Partial<RRule.Options>)[]
  }[]
}

export type ReqCalendarData = {
  [event: string]: {
    [date: string]: Date[]
  }
}
