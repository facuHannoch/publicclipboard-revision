"use client"

import { useCallback, useEffect, useRef, useState } from 'react'
import type {
  BoardState,
  BoardUser,
  ConnectionStatus,
  Coordinates,
  ServerMessage,
  Size,
  TextObject
} from './board-types'
import { createBoardSocket, fetchBoardState, postBoardAction } from './board-api'

const upsertObject = (objects: TextObject[], next: TextObject): TextObject[] => {
  const index = objects.findIndex((obj) => obj.id === next.id)
  if (index === -1) {
    return [...objects, next]
  }
  const updated = [...objects]
  updated[index] = next
  return updated
}

export const useBoardSync = (boardId: number, enabled: boolean) => {
  const [objects, setObjects] = useState<TextObject[]>([])
  const [user, setUser] = useState<BoardUser | null>(null)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('connecting')
  const socketRef = useRef<WebSocket | null>(null)

  const pushStatus = useCallback((message: string) => {
    setStatusMessage(message)
  }, [])

  useEffect(() => {
    if (!statusMessage) return
    const timer = setTimeout(() => setStatusMessage(null), 2500)
    return () => clearTimeout(timer)
  }, [statusMessage])

  const refreshBoard = useCallback(async () => {
    try {
      const board = await fetchBoardState(boardId)
      setObjects(board.objects)
    } catch (error) {
      pushStatus('Unable to reach server.')
    }
  }, [boardId, pushStatus])

  useEffect(() => {
    if (!enabled) return
    setConnectionStatus('connecting')
    refreshBoard()
  }, [enabled, boardId, refreshBoard])

  useEffect(() => {
    if (!enabled) return
    const socket = createBoardSocket()
    socketRef.current = socket
    setConnectionStatus('connecting')

    socket.onopen = () => {
      setConnectionStatus('connected')
      socket.send(
        JSON.stringify({ type: 'join_board', payload: { boardId } })
      )
    }

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data) as ServerMessage
        switch (message.type) {
          case 'board_state': {
            const board = message.payload?.board as BoardState | undefined
            const payloadUser = message.payload?.user as BoardUser | undefined
            if (board) {
              setObjects(board.objects)
            }
            if (payloadUser) {
              setUser(payloadUser)
            }
            return
          }
          case 'object_created': {
            const object = message.payload?.object as TextObject | undefined
            if (object) {
              setObjects((prev) => upsertObject(prev, object))
            }
            return
          }
          case 'object_updated': {
            const object = message.payload?.object as TextObject | undefined
            if (object) {
              setObjects((prev) => upsertObject(prev, object))
            }
            return
          }
          case 'object_deleted': {
            const id = message.payload?.id as string | undefined
            if (id) {
              setObjects((prev) => prev.filter((obj) => obj.id !== id))
            }
            return
          }
          case 'error': {
            const messageText = message.payload?.message as string | undefined
            pushStatus(messageText || 'Server error')
            refreshBoard()
            return
          }
          default:
            return
        }
      } catch {
        pushStatus('Invalid server message.')
      }
    }

    socket.onerror = () => {
      setConnectionStatus('offline')
    }

    socket.onclose = () => {
      setConnectionStatus('offline')
    }

    return () => {
      socket.close()
      socketRef.current = null
    }
  }, [boardId, enabled, pushStatus, refreshBoard])

  const sendAction = useCallback(
    async (type: string, payload?: Record<string, unknown>) => {
      const socket = socketRef.current
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type, payload }))
        return
      }

      try {
        await postBoardAction(boardId, { type, payload })
        await refreshBoard()
      } catch (error) {
        pushStatus('Unable to reach server.')
      }
    },
    [boardId, pushStatus, refreshBoard]
  )

  const createObject = useCallback(
    async (coordinates: Coordinates, size: Size, content: string) => {
      await sendAction('create_object', { coordinates, size, content })
    },
    [sendAction]
  )

  const updateObject = useCallback(
    async (
      id: string,
      updates: { coordinates?: Coordinates; size?: Size; content?: string }
    ) => {
      setObjects((prev) =>
        prev.map((obj) =>
          obj.id === id
            ? {
                ...obj,
                coordinates: updates.coordinates ?? obj.coordinates,
                size: updates.size ?? obj.size,
                content: updates.content ?? obj.content,
                modifiedAt: Date.now()
              }
            : obj
        )
      )
      await sendAction('update_object', { id, ...updates })
    },
    [sendAction]
  )

  const deleteObject = useCallback(
    async (id: string) => {
      setObjects((prev) => prev.filter((obj) => obj.id !== id))
      await sendAction('delete_object', { id })
    },
    [sendAction]
  )

  const copyObject = useCallback(
    async (id: string, _content: string) => {
      await sendAction('copy_content', { id })
    },
    [sendAction]
  )

  return {
    objects,
    user,
    connectionStatus,
    statusMessage,
    pushStatus,
    createObject,
    updateObject,
    deleteObject,
    copyObject
  }
}
