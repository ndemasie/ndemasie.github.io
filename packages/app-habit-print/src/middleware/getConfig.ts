import type { Request, Response, NextFunction } from 'express'

import { catchRequestError } from '../decorators/catchRequestError.ts'
import type { CalConfig } from '../types.ts'

const loadConfig = async (config: string) => {
  try {
    const path = new URL(`../config/${config}.ts`, import.meta.url).href
    return (await import(path))?.default as CalConfig
  } catch (error) {
    console.error(`Error loading "${config}" config:`, error)
  }
}

const configCache = new Map<string, CalConfig>()

export const getConfig = catchRequestError(
  async (req: Request, res: Response, next: NextFunction) => {
    const configId = req.params.configId

    if (!configCache.has(configId)) {
      const config = await loadConfig(configId)
      if (!config) {
        return next(new Error(`Config ${configId} not found`))
      }
      configCache.set(configId, config)
    }

    res.locals.config = configCache.get(configId)
    return next()
  },
)
