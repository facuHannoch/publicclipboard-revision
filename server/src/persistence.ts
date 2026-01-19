import type { BoardId, BoardState } from './types.js'
import { redisClient } from './redis.js'

const boardKey = (id: BoardId): string => `board:${id}`

export const loadBoard = async (id: BoardId): Promise<BoardState | null> => {
  const data = await redisClient.get(boardKey(id))
  if (!data) return null
  try {
    const parsed = JSON.parse(data) as BoardState
    return parsed
  } catch (error) {
    console.warn('Failed to parse board', id, error)
    return null
  }
}

export const saveBoard = async (board: BoardState): Promise<void> => {
  await redisClient.set(boardKey(board.id), JSON.stringify(board))
}
