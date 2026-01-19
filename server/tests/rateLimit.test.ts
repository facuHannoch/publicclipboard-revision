import { describe, expect, it } from 'vitest'
import { checkRateLimit } from '../src/rateLimit.js'
import { config } from '../src/utils.js'

describe('rateLimit', () => {
  it('blocks after max events in window', () => {
    const key = '127.0.0.1'
    for (let i = 0; i < config.rateLimitMax; i += 1) {
      expect(checkRateLimit(key)).toBe(true)
    }
    expect(checkRateLimit(key)).toBe(false)
  })
})
