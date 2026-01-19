import { describe, expect, it } from 'vitest'
import { config, hasCollision, isValidBoardId, isWithinCanvas, sanitizeContent } from '../src/utils.js'
import type { TextObject } from '../src/types.js'

const baseObject = (id: string, x: number, y: number, w = 100, h = 100): TextObject => ({
  id,
  type: 'text',
  coordinates: { x, y },
  size: { width: w, height: h },
  content: 'hello',
  createdBy: 'Anonymous',
  createdAt: Date.now(),
  modifiedBy: 'Anonymous',
  modifiedAt: Date.now()
})

describe('utils', () => {
  it('validates board ids in range', () => {
    expect(isValidBoardId(config.minBoardId)).toBe(true)
    expect(isValidBoardId(config.maxBoardId)).toBe(true)
    expect(isValidBoardId(config.maxBoardId + 1)).toBe(false)
    expect(isValidBoardId(-1)).toBe(false)
  })

  it('sanitizes content length', () => {
    const long = 'a'.repeat(config.maxContentLength + 50)
    expect(sanitizeContent(long)).toHaveLength(config.maxContentLength)
  })

  it('checks canvas bounds', () => {
    expect(isWithinCanvas({ x: 0, y: 0 }, { width: 100, height: 100 })).toBe(true)
    expect(isWithinCanvas({ x: -1, y: 0 }, { width: 100, height: 100 })).toBe(false)
    expect(isWithinCanvas({ x: 1900, y: 1000 }, { width: 50, height: 50 })).toBe(false)
  })

  it('detects object collisions', () => {
    const a = baseObject('a', 0, 0, 100, 100)
    const b = baseObject('b', 50, 50, 100, 100)
    const c = baseObject('c', 200, 200, 100, 100)
    expect(hasCollision([a], b)).toBe(true)
    expect(hasCollision([a], c)).toBe(false)
  })
})
