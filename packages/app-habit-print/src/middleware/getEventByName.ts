import type { Request, Response, NextFunction } from 'express'

import { catchRequestError } from '../decorators/catchRequestError.ts'

const keyBy = <T extends Record<string, any>, K extends keyof T>(
  arr: T[],
  key: K,
) => {
  return arr.reduce(
    (acc, item) => {
      acc[item[key]] = item
      return acc
    },
    {} as Record<K, T>,
  )
}

export const getEventByName = catchRequestError(
  async (req: Request, res: Response, next: NextFunction) => {
    const config = res.locals.config

    if (!config) {
      return next(new Error(`Unable to load eventByName. Config missing`))
    }

    res.locals.eventByName = keyBy(config.events, 'name')
    return next()
  },
)
