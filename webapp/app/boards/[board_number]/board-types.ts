export type Coordinates = {
  x: number
  y: number
}

export type Size = {
  width: number
  height: number
}

export type TextObject = {
  id: string
  type: 'text'
  coordinates: Coordinates
  size: Size
  content: string
  createdBy: string
  createdAt: number
  modifiedBy: string
  modifiedAt: number
}

export type BoardState = {
  id: number
  objects: TextObject[]
  lastActivity: number
  history?: unknown[]
}

export type BoardUser = {
  userId: string
  userLabel: string
}

export type ConnectionStatus = 'connecting' | 'connected' | 'offline'

export type ServerMessage = {
  type:
    | 'board_state'
    | 'object_created'
    | 'object_updated'
    | 'object_deleted'
    | 'user_joined'
    | 'user_left'
    | 'error'
  payload?: Record<string, unknown>
}
