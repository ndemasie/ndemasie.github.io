import type { Request, Response, NextFunction } from 'express'

export const catchRequestError = (
  middleware: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<void>,
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await middleware(req, res, next)
    } catch (error) {
      console.log('CatchRequestError:', error)
      next(error)
    }
  }
}
