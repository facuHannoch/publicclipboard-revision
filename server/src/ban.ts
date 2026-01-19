import { redisClient } from './redis.js'
import { config, now } from './utils.js'

const banKey = (boardId: number): string => `banned_ips:${boardId}`

export const isBanned = async (boardId: number, ip: string): Promise<boolean> => {
  const result = await redisClient.sIsMember(banKey(boardId), ip)
  return result
}

export const banIp = async (boardId: number, ip: string, durationMs = config.defaultBanDurationMs): Promise<void> => {
  const key = banKey(boardId)
  await redisClient.sAdd(key, ip)
  const ttlSeconds = Math.ceil(durationMs / 1000)
  await redisClient.expire(key, ttlSeconds)
  await redisClient.zAdd('ban_audit', {
    score: now(),
    value: JSON.stringify({ boardId, ip, durationMs })
  })
}
