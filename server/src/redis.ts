import { createClient } from 'redis'

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379'

export const redisClient = createClient({ url: redisUrl })

export const connectRedis = async (): Promise<void> => {
  if (redisClient.isOpen) return
  redisClient.on('error', (err) => {
    console.error('Redis error', err)
  })
  await redisClient.connect()
}
