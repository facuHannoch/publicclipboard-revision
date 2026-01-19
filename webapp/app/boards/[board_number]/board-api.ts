import type { BoardState } from './board-types'

const API_BASE =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:8080'

const WS_BASE =
  process.env.NEXT_PUBLIC_WS_URL || API_BASE.replace(/^http/, 'ws')

export const fetchBoardState = async (boardId: number): Promise<BoardState> => {
  const response = await fetch(`${API_BASE}/api/boards/${boardId}`)
  if (!response.ok) {
    throw new Error('Failed to load board state')
  }
  return response.json() as Promise<BoardState>
}

export const postBoardAction = async (
  boardId: number,
  action: { type: string; payload?: Record<string, unknown> }
): Promise<void> => {
  const response = await fetch(`${API_BASE}/api/boards/${boardId}/actions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(action)
  })

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as
      | { error?: string }
      | null
    throw new Error(payload?.error || 'Failed to send action')
  }
}

export const createBoardSocket = (): WebSocket => {
  return new WebSocket(WS_BASE)
}
