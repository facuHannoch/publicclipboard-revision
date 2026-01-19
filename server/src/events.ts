import { redisClient } from './redis.js'
import { config } from './utils.js'

export type AnalyticsEvent = {
  type:
    | 'object_created'
    | 'object_updated'
    | 'object_deleted'
    | 'object_copied'
    | 'navigate_board_landing'
    | 'navigate_board_app'
  boardId: number
  objectId?: string
  timestamp: number
  userIp?: string
}

const EVENTS_KEY = 'events'

export const recordEvent = async (event: AnalyticsEvent): Promise<void> => {
  try {
    await redisClient.lPush(EVENTS_KEY, JSON.stringify(event))
    await redisClient.lTrim(EVENTS_KEY, 0, config.eventsLimit - 1)
  } catch (error) {
    console.warn('Failed to record event', error)
  }
}
