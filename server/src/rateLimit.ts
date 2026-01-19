import { config, now } from './utils.js'

const buckets = new Map<string, number[]>()

export const checkRateLimit = (key: string): boolean => {
  const timestamps = buckets.get(key) ?? []
  const cutoff = now() - config.rateLimitWindowMs
  const filtered = timestamps.filter((ts) => ts > cutoff)
  if (filtered.length >= config.rateLimitMax) {
    buckets.set(key, filtered)
    return false
  }
  filtered.push(now())
  buckets.set(key, filtered)
  return true
}
