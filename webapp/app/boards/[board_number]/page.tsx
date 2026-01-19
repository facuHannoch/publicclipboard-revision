"use client"

import { useParams } from 'next/navigation'
import { BoardCanvas } from './BoardCanvas'
import { BoardHeader } from './BoardHeader'
import { BoardStatusToast } from './BoardStatusToast'
import { BOARD_MAX, BOARD_MIN } from './board-constants'
import { useBoardSync } from './useBoardSync'

export default function BoardPage() {
  const params = useParams()
  const boardParam = params.board_number as string
  const boardNumber = Number.parseInt(boardParam, 10)
  const isBoardValid =
    Number.isFinite(boardNumber) && boardNumber >= BOARD_MIN && boardNumber <= BOARD_MAX

  const {
    objects,
    connectionStatus,
    statusMessage,
    pushStatus,
    createObject,
    updateObject,
    deleteObject,
    copyObject
  } = useBoardSync(boardNumber, isBoardValid)

  if (!isBoardValid) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-6 text-center text-zinc-800 dark:bg-zinc-900 dark:text-zinc-50">
        <div className="max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          <h1 className="mb-4 text-2xl font-semibold">Board not found</h1>
          <p className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">
            Boards are numbered {BOARD_MIN} to {BOARD_MAX}. Please choose a valid number.
          </p>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-zinc-800 px-6 py-2 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Go home
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-white dark:bg-zinc-900">
      <BoardHeader
        boardNumber={boardNumber}
        connectionStatus={connectionStatus}
      />
      <BoardCanvas
        objects={objects}
        onCreate={createObject}
        onUpdate={updateObject}
        onDelete={deleteObject}
        onCopy={copyObject}
        onStatus={pushStatus}
      />
      <BoardStatusToast message={statusMessage} />
    </div>
  )
}
