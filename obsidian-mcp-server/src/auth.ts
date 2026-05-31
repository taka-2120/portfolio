import type { Request, Response, NextFunction } from 'express'

const AUTH_TOKEN = process.env.AUTH_TOKEN

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!AUTH_TOKEN) {
    res.status(500).json({ error: 'AUTH_TOKEN not configured' })
    return
  }
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ') || header.slice(7) !== AUTH_TOKEN) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }
  next()
}
