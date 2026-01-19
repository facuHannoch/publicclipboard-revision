import http from 'node:http'
import crypto from 'node:crypto'
import express from 'express'
import cors from 'cors'
import { WebSocketServer } from 'ws'
import type WebSocket from 'ws'

import { connectRedis } from './redis.js'
import { loadBoard, saveBoard } from './persistence.js'
import { ensureBoard, getBoard, recordHistory, removeObject, setBoard, upsertObject } from './store.js'
import { addToRoom, getRoomSockets, nextUserLabel, removeFromRoom, type ClientSocket } from './rooms.js'
import { banIp, isBanned } from './ban.js'
import { recordEvent } from './events.js'
import {
  config,
  hashIp,
  isValidBoardId,
  now,
  safeCoordinates,
  safeSize,
  safeString,
  sanitizeContent,
  toSafeNumber,
  isWithinCanvas,
  hasCollision
} from './utils.js'
import { checkRateLimit } from './rateLimit.js'
import type { BoardId, ClientMessage, ServerMessage, TextObject, HistoryEntry } from './types.js'

const app = express()
app.use(cors())
app.use(express.json({ limit: '1mb' }))

const server = http.createServer(app)
const wss = new WebSocketServer({ server })

const ipSalt = process.env.IP_HASH_SALT || 'publicclipboard'

const getClientIp = (req: http.IncomingMessage): string => {
  const header = req.headers['x-forwarded-for']
  if (typeof header === 'string' && header.length > 0) {
    return header.split(',')[0].trim()
  }
  if (Array.isArray(header) && header.length > 0) {
    return header[0]
  }
  return req.socket.remoteAddress || 'unknown'
}

const sendMessage = (socket: WebSocket, message: ServerMessage): void => {
  if (socket.readyState !== WebSocket.OPEN) return
  socket.send(JSON.stringify(message))
}

const broadcast = (boardId: BoardId, message: ServerMessage, exclude?: ClientSocket): void => {
  const sockets = getRoomSockets(boardId)
  sockets.forEach((socket) => {
    if (exclude && socket === exclude) return
    sendMessage(socket, message)
  })
}

const loadOrCreateBoard = async (boardId: BoardId) => {
  const cached = getBoard(boardId)
  if (cached) return cached
  const stored = await loadBoard(boardId)
  if (stored) {
    setBoard(stored)
    return stored
  }
  return ensureBoard(boardId)
}

const validateActionRate = (ip: string): boolean => {
  return checkRateLimit(ip)
}

const handleCreateObject = async (boardId: BoardId, payload: Record<string, unknown>, socket: ClientSocket) => {
  const board = await loadOrCreateBoard(boardId)
  const coordinates = safeCoordinates(payload.coordinates)
  const size = safeSize(payload.size)
  const content = sanitizeContent(safeString(payload.content))

  if (!coordinates || !size) {
    sendMessage(socket, { type: 'error', payload: { message: 'Invalid coordinates or size' } })
    return
  }

  const object: TextObject = {
    id: crypto.randomUUID(),
    type: 'text',
    coordinates,
    size,
    content,
    createdBy: socket.meta?.userLabel || 'Anonymous',
    createdAt: now(),
    modifiedBy: socket.meta?.userLabel || 'Anonymous',
    modifiedAt: now()
  }

  if (!isWithinCanvas(object.coordinates, object.size)) {
    sendMessage(socket, { type: 'error', payload: { message: 'Object outside canvas bounds' } })
    return
  }

  if (hasCollision(board.objects, object)) {
    sendMessage(socket, { type: 'error', payload: { message: 'Object overlaps with existing content' } })
    return
  }

  upsertObject(board, object)

  const entry: HistoryEntry = {
    action: 'create',
    objectId: object.id,
    user: socket.meta?.userLabel || 'Anonymous',
    userIp: hashIp(socket.meta?.ip || '', ipSalt),
    timestamp: now(),
    details: { coordinates, size }
  }
  recordHistory(board, entry)

  await saveBoard(board)
  await recordEvent({ type: 'object_created', boardId, objectId: object.id, timestamp: now() })

  broadcast(boardId, { type: 'object_created', payload: { object } })
}

const handleUpdateObject = async (boardId: BoardId, payload: Record<string, unknown>, socket: ClientSocket) => {
  const board = await loadOrCreateBoard(boardId)
  const objectId = safeString(payload.id)
  const existing = board.objects.find((obj) => obj.id === objectId)
  if (!existing) {
    sendMessage(socket, { type: 'error', payload: { message: 'Object not found' } })
    return
  }

  const coordinates = safeCoordinates(payload.coordinates) ?? existing.coordinates
  const size = safeSize(payload.size) ?? existing.size
  const content = payload.content !== undefined ? sanitizeContent(safeString(payload.content)) : existing.content

  const updated: TextObject = {
    ...existing,
    coordinates,
    size,
    content,
    modifiedBy: socket.meta?.userLabel || 'Anonymous',
    modifiedAt: now()
  }

  if (!isWithinCanvas(updated.coordinates, updated.size)) {
    sendMessage(socket, { type: 'error', payload: { message: 'Object outside canvas bounds' } })
    return
  }

  if (hasCollision(board.objects, updated)) {
    sendMessage(socket, { type: 'error', payload: { message: 'Object overlaps with existing content' } })
    return
  }

  upsertObject(board, updated)

  const entry: HistoryEntry = {
    action: payload.coordinates ? 'move' : 'edit',
    objectId: updated.id,
    user: socket.meta?.userLabel || 'Anonymous',
    userIp: hashIp(socket.meta?.ip || '', ipSalt),
    timestamp: now(),
    details: { coordinates, size }
  }
  recordHistory(board, entry)

  await saveBoard(board)
  await recordEvent({ type: 'object_updated', boardId, objectId: updated.id, timestamp: now() })

  broadcast(boardId, { type: 'object_updated', payload: { object: updated } })
}

const handleDeleteObject = async (boardId: BoardId, payload: Record<string, unknown>, socket: ClientSocket) => {
  const board = await loadOrCreateBoard(boardId)
  const objectId = safeString(payload.id)
  if (!objectId) {
    sendMessage(socket, { type: 'error', payload: { message: 'Missing object id' } })
    return
  }

  const removed = removeObject(board, objectId)
  if (!removed) {
    sendMessage(socket, { type: 'error', payload: { message: 'Object not found' } })
    return
  }

  const entry: HistoryEntry = {
    action: 'delete',
    objectId: removed.id,
    user: socket.meta?.userLabel || 'Anonymous',
    userIp: hashIp(socket.meta?.ip || '', ipSalt),
    timestamp: now()
  }
  recordHistory(board, entry)

  await saveBoard(board)
  await recordEvent({ type: 'object_deleted', boardId, objectId: removed.id, timestamp: now() })

  broadcast(boardId, { type: 'object_deleted', payload: { id: removed.id } })
}

const handleCopyContent = async (boardId: BoardId, payload: Record<string, unknown>, socket: ClientSocket) => {
  const objectId = safeString(payload.id)
  if (!objectId) return
  const board = await loadOrCreateBoard(boardId)
  const entry: HistoryEntry = {
    action: 'copy',
    objectId,
    user: socket.meta?.userLabel || 'Anonymous',
    userIp: hashIp(socket.meta?.ip || '', ipSalt),
    timestamp: now()
  }
  recordHistory(board, entry)
  await saveBoard(board)
  await recordEvent({ type: 'object_copied', boardId, objectId, timestamp: now() })
}

const handleBanUser = async (boardId: BoardId, payload: Record<string, unknown>, socket: ClientSocket) => {
  const targetUserId = safeString(payload.userId)
  if (!targetUserId) {
    sendMessage(socket, { type: 'error', payload: { message: 'Missing user id' } })
    return
  }

  const durationMs = toSafeNumber(payload.durationMs) ?? config.defaultBanDurationMs
  const sockets = getRoomSockets(boardId)
  const target = [...sockets].find((client) => client.meta?.userId === targetUserId)
  if (!target?.meta?.ip) {
    sendMessage(socket, { type: 'error', payload: { message: 'User not found' } })
    return
  }

  await banIp(boardId, target.meta.ip, durationMs)
  sendMessage(target, { type: 'error', payload: { message: 'You have been banned from this board.' } })
  target.close()
}

const handleClientMessage = async (socket: ClientSocket, message: ClientMessage) => {
  if (!socket.meta || socket.meta.boardId < 0) {
    if (message.type !== 'join_board') {
      sendMessage(socket, { type: 'error', payload: { message: 'Must join board first' } })
      return
    }

    const boardId = toSafeNumber(message.payload?.boardId ?? message.payload?.id)
    if (boardId === null || !isValidBoardId(boardId)) {
      sendMessage(socket, { type: 'error', payload: { message: 'Invalid board id' } })
      return
    }

    const ip = socket.meta?.ip || 'unknown'
    if (await isBanned(boardId, ip)) {
      sendMessage(socket, { type: 'error', payload: { message: 'You are banned from this board' } })
      socket.close()
      return
    }

    const board = await loadOrCreateBoard(boardId)
    const { userId, userLabel } = nextUserLabel(boardId)
    socket.meta = { boardId, userId, userLabel, ip }
    addToRoom(boardId, socket)

    sendMessage(socket, {
      type: 'board_state',
      payload: { board, user: { userId, userLabel } }
    })

    broadcast(boardId, { type: 'user_joined', payload: { userId, userLabel } }, socket)
    return
  }

  // if (!validateActionRate(socket.meta.ip)) {
  //   sendMessage(socket, { type: 'error', payload: { message: 'Rate limit exceeded' } })
  //   return
  // }

  switch (message.type) {
    case 'create_object':
      await handleCreateObject(socket.meta.boardId, message.payload ?? {}, socket)
      return
    case 'update_object':
      await handleUpdateObject(socket.meta.boardId, message.payload ?? {}, socket)
      return
    case 'delete_object':
      await handleDeleteObject(socket.meta.boardId, message.payload ?? {}, socket)
      return
    case 'copy_content':
      await handleCopyContent(socket.meta.boardId, message.payload ?? {}, socket)
      return
    case 'ban_user':
      await handleBanUser(socket.meta.boardId, message.payload ?? {}, socket)
      return
    default:
      sendMessage(socket, { type: 'error', payload: { message: 'Unknown message type' } })
  }
}

wss.on('connection', (socket: ClientSocket, req) => {
  socket.meta = {
    boardId: -1,
    userId: '',
    userLabel: '',
    ip: getClientIp(req)
  }

  socket.on('message', async (data) => {
    try {
      const parsed = JSON.parse(data.toString()) as ClientMessage
      await handleClientMessage(socket, parsed)
    } catch (error) {
      sendMessage(socket, { type: 'error', payload: { message: 'Invalid message format' } })
    }
  })

  socket.on('close', () => {
    if (!socket.meta || socket.meta.boardId < 0) return
    const { boardId, userId, userLabel } = socket.meta
    removeFromRoom(boardId, socket)
    broadcast(boardId, { type: 'user_left', payload: { userId, userLabel } })
  })
})

app.get('/health', (_req, res) => {
  res.json({ ok: true, time: now() })
})

app.get('/api/boards/:id', async (req, res) => {
  const boardId = toSafeNumber(req.params.id)
  if (boardId === null || !isValidBoardId(boardId)) {
    res.status(400).json({ error: 'Invalid board id' })
    return
  }
  const board = await loadOrCreateBoard(boardId)
  res.json(board)
})

app.get('/api/boards/:id/history', async (req, res) => {
  const boardId = toSafeNumber(req.params.id)
  if (boardId === null || !isValidBoardId(boardId)) {
    res.status(400).json({ error: 'Invalid board id' })
    return
  }
  const board = await loadOrCreateBoard(boardId)
  res.json({ history: board.history })
})

app.post('/api/boards/:id/actions', async (req, res) => {
  const boardId = toSafeNumber(req.params.id)
  if (boardId === null || !isValidBoardId(boardId)) {
    res.status(400).json({ error: 'Invalid board id' })
    return
  }

  const ip = getClientIp(req)
  if (!(await isBanned(boardId, ip))) {
    const type = safeString(req.body?.type)
    const payload = (req.body?.payload ?? {}) as Record<string, unknown>
    const mockSocket = { meta: { boardId, userId: 'rest', userLabel: 'Anonymous', ip } } as ClientSocket

    // if (!validateActionRate(ip)) {
    //   res.status(429).json({ error: 'Rate limit exceeded' })
    //   return
    // }

    switch (type) {
      case 'create_object':
        await handleCreateObject(boardId, payload, mockSocket)
        res.json({ ok: true })
        return
      case 'update_object':
        await handleUpdateObject(boardId, payload, mockSocket)
        res.json({ ok: true })
        return
      case 'delete_object':
        await handleDeleteObject(boardId, payload, mockSocket)
        res.json({ ok: true })
        return
      case 'copy_content':
        await handleCopyContent(boardId, payload, mockSocket)
        res.json({ ok: true })
        return
      default:
        res.status(400).json({ error: 'Unknown action type' })
        return
    }
  }

  res.status(403).json({ error: 'You are banned from this board' })
})

const port = Number(process.env.PORT || 8080)

const start = async () => {
  await connectRedis()
  server.listen(port, () => {
    console.log(`Server listening on ${port}`)
  })
}

start().catch((error) => {
  console.error('Failed to start server', error)
  process.exit(1)
})
