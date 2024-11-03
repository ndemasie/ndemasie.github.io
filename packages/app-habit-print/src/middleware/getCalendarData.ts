import type { Request, Response, NextFunction } from 'express'
import RRule from 'rrule'

import { catchRequestError } from '../decorators/catchRequestError.ts'
import type { ReqCalendarData } from '../types.ts'

const calDataCache = new Map<string, ReqCalendarData>()

export const getCalendarData = catchRequestError(
  async (req: Request, res: Response, next: NextFunction) => {
    const configId = req.params.configId
    const config = res.locals.config

    if (!config) {
      return next(new Error(`Unable to load calendarData. Config missing`))
    }

    if (!calDataCache.has(configId)) {
      const data: ReqCalendarData = {}
      const startMonth = new Date(
        new Date().getUTCFullYear(),
        new Date().getMonth(),
        0,
        1,
      )
      const endMonth = new Date(
        new Date().getUTCFullYear(),
        new Date().getMonth() + 1,
        0,
        1,
      )

      for (const event of config?.events ?? []) {
        data[event.name] ??= {}

        for (const recurrence of event.recurrence) {
          const rrule = new RRule.RRule(recurrence)

          for (const date of rrule.between(startMonth, endMonth)) {
            data[event.name][date.getDate()] ??= []
            data[event.name][date.getDate()].push(date)
          }
        }
      }

      calDataCache.set(configId, data)
    }

    res.locals.calendarData = calDataCache.get(configId)
    return next()
  },
)
