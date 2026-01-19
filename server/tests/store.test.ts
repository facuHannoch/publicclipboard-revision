import { beforeEach, describe, expect, it } from 'vitest'
import { clearBoards, ensureBoard, getBoard, recordHistory, removeObject, setBoard, upsertObject } from '../src/store.js'
import { config } from '../src/utils.js'
import type { BoardState, HistoryEntry, TextObject } from '../src/types.js'

const makeBoard = (id = 1): BoardState => ({
  id,
  objects: [],
  lastActivity: Date.now(),
  history: []
})

const makeObject = (id: string): TextObject => ({
  id,
  type: 'text',
  coordinates: { x: 0, y: 0 },
  size: { width: 100, height: 100 },
  content: 'hello',
  createdBy: 'Anonymous',
  createdAt: Date.now(),
  modifiedBy: 'Anonymous',
  modifiedAt: Date.now()
})

const makeHistory = (objectId: string): HistoryEntry => ({
  action: 'create',
  objectId,
  user: 'Anonymous',
  userIp: 'hash',
  timestamp: Date.now()
})

describe('store', () => {
  beforeEach(() => {
    clearBoards()
    setBoard(makeBoard(99))
  })

  it('ensures boards are created', () => {
    const board = ensureBoard(2)
    expect(board.id).toBe(2)
    expect(getBoard(2)).toBeDefined()
  })

  it('upserts objects', () => {
    const board = ensureBoard(3)
    const obj = makeObject('obj-1')
    upsertObject(board, obj)
    expect(board.objects).toHaveLength(1)
    const updated = { ...obj, content: 'updated' }
    upsertObject(board, updated)
    expect(board.objects).toHaveLength(1)
    expect(board.objects[0].content).toBe('updated')
  })

  it('removes objects', () => {
    const board = ensureBoard(4)
    const obj = makeObject('obj-2')
    upsertObject(board, obj)
    const removed = removeObject(board, 'obj-2')
    expect(removed?.id).toBe('obj-2')
    expect(board.objects).toHaveLength(0)
  })

  it('caps history length', () => {
    const board = ensureBoard(5)
    for (let i = 0; i < config.historyLimit + 20; i += 1) {
      recordHistory(board, makeHistory(`obj-${i}`))
    }
    expect(board.history).toHaveLength(config.historyLimit)
  })
})
