import type { BoardId, BoardState, HistoryEntry, TextObject } from './types.js'
import { config, now } from './utils.js'

const boards = new Map<BoardId, BoardState>()

export const getBoard = (id: BoardId): BoardState | undefined => boards.get(id)

export const setBoard = (board: BoardState): void => {
  boards.set(board.id, board)
}

export const ensureBoard = (id: BoardId): BoardState => {
  const existing = boards.get(id)
  if (existing) return existing
  const created: BoardState = {
    id,
    objects: [],
    lastActivity: now(),
    history: []
  }
  boards.set(id, created)
  return created
}

export const upsertObject = (board: BoardState, object: TextObject): void => {
  const index = board.objects.findIndex((item) => item.id === object.id)
  if (index === -1) {
    board.objects.push(object)
  } else {
    board.objects[index] = object
  }
  board.lastActivity = now()
}

export const removeObject = (board: BoardState, objectId: string): TextObject | null => {
  const index = board.objects.findIndex((item) => item.id === objectId)
  if (index === -1) return null
  const [removed] = board.objects.splice(index, 1)
  board.lastActivity = now()
  return removed
}

export const recordHistory = (board: BoardState, entry: HistoryEntry): void => {
  board.history.unshift(entry)
  if (board.history.length > config.historyLimit) {
    board.history = board.history.slice(0, config.historyLimit)
  }
}
