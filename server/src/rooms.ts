import type { BoardId } from './types.js'
import type WebSocket from 'ws'
import type { ConnectionMeta } from './types.js'

export type ClientSocket = WebSocket & { meta?: ConnectionMeta }

const rooms = new Map<BoardId, Set<ClientSocket>>()
const userCounters = new Map<BoardId, number>()

export const addToRoom = (boardId: BoardId, socket: ClientSocket): void => {
  const set = rooms.get(boardId) ?? new Set<ClientSocket>()
  set.add(socket)
  rooms.set(boardId, set)
}

export const removeFromRoom = (boardId: BoardId, socket: ClientSocket): void => {
  const set = rooms.get(boardId)
  if (!set) return
  set.delete(socket)
  if (set.size === 0) {
    rooms.delete(boardId)
  }
}

export const getRoomSockets = (boardId: BoardId): Set<ClientSocket> => {
  return rooms.get(boardId) ?? new Set<ClientSocket>()
}

export const nextUserLabel = (boardId: BoardId): { userId: string; userLabel: string } => {
  const current = userCounters.get(boardId) ?? 0
  const next = current + 1
  userCounters.set(boardId, next)
  return { userId: `user-${boardId}-${next}`, userLabel: `Anonymous #${next}` }
}
