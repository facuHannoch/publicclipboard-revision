import crypto from 'node:crypto'
import type { Size, Coordinates, TextObject } from './types.js'

const CANVAS_WIDTH = 3840
const CANVAS_HEIGHT = 2160

export const config = {
  canvasWidth: CANVAS_WIDTH,
  canvasHeight: CANVAS_HEIGHT,
  maxBoards: 200,
  minBoardId: 0,
  maxBoardId: 199,
  maxContentLength: 10000,
  historyLimit: 500,
  eventsLimit: 2000,
  rateLimitWindowMs: 60_000,
  rateLimitMax: 10,
  defaultBanDurationMs: 24 * 60 * 60 * 1000
}

export const isValidBoardId = (value: number): boolean => {
  return Number.isInteger(value) && value >= config.minBoardId && value <= config.maxBoardId
}

export const sanitizeContent = (content: string): string => {
  return content.slice(0, config.maxContentLength)
}

export const isWithinCanvas = (coordinates: Coordinates, size: Size): boolean => {
  const right = coordinates.x + size.width
  const bottom = coordinates.y + size.height
  return (
    coordinates.x >= 0 &&
    coordinates.y >= 0 &&
    right <= config.canvasWidth &&
    bottom <= config.canvasHeight
  )
}

export const objectsOverlap = (a: TextObject, b: TextObject): boolean => {
  return !(
    a.coordinates.x + a.size.width <= b.coordinates.x ||
    a.coordinates.x >= b.coordinates.x + b.size.width ||
    a.coordinates.y + a.size.height <= b.coordinates.y ||
    a.coordinates.y >= b.coordinates.y + b.size.height
  )
}

export const hasCollision = (objects: TextObject[], candidate: TextObject): boolean => {
  return objects.some((existing) => existing.id !== candidate.id && objectsOverlap(existing, candidate))
}

export const hashIp = (ip: string, salt: string): string => {
  const hash = crypto.createHash('sha256')
  hash.update(`${salt}:${ip}`)
  return hash.digest('hex')
}

export const now = (): number => Date.now()

export const toSafeNumber = (value: unknown): number | null => {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value)
    if (Number.isFinite(parsed)) return parsed
  }
  return null
}

export const safeString = (value: unknown, fallback = ''): string => {
  return typeof value === 'string' ? value : fallback
}

export const safeSize = (value: unknown): Size | null => {
  if (!value || typeof value !== 'object') return null
  const width = toSafeNumber((value as Size).width)
  const height = toSafeNumber((value as Size).height)
  if (width === null || height === null) return null
  return { width, height }
}

export const safeCoordinates = (value: unknown): Coordinates | null => {
  if (!value || typeof value !== 'object') return null
  const x = toSafeNumber((value as Coordinates).x)
  const y = toSafeNumber((value as Coordinates).y)
  if (x === null || y === null) return null
  return { x, y }
}
