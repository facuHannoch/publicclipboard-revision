export type BoardId = number

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

export type HistoryEntry = {
  action: 'create' | 'edit' | 'delete' | 'move' | 'copy'
  objectId: string
  user: string
  userIp: string
  timestamp: number
  details?: Record<string, unknown>
}

export type BoardState = {
  id: BoardId
  objects: TextObject[]
  lastActivity: number
  history: HistoryEntry[]
}

export type ClientMessage = {
  type:
    | 'join_board'
    | 'create_object'
    | 'update_object'
    | 'delete_object'
    | 'copy_content'
    | 'ban_user'
  payload?: Record<string, unknown>
}

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

export type ConnectionMeta = {
  boardId: BoardId
  userId: string
  userLabel: string
  ip: string
}
