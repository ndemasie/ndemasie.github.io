import RRule from 'rrule'

declare global {
  interface Date {
    startWeekDate: (options?: { weekStartDay: number }) => number
    endWeekDate: (options?: { weekStartDay: number }) => number
    startMonth: () => Date
    endMonth: () => Date
  }

  namespace Express {
    interface Locals {
      calendarData?: ReqCalendarData
      config?: CalConfig
      days?: number[]
      eventByName?: Record<string, CalConfig['events'][]>
    }
  }
}

export type CalConfig = {
  name: string
  defaultRecurrence: Partial<RRule.Options>
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
