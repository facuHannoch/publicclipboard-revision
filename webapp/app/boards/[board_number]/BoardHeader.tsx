import type { ConnectionStatus } from './board-types'

const statusLabel = (status: ConnectionStatus) => {
  switch (status) {
    case 'connected':
      return 'Live'
    case 'connecting':
      return 'Connecting'
    case 'offline':
      return 'Offline'
  }
}

const statusClasses = (status: ConnectionStatus) => {
  switch (status) {
    case 'connected':
      return 'border-zinc-200 bg-white text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300'
    case 'connecting':
      return 'border-zinc-200 bg-zinc-50 text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300'
    case 'offline':
      return 'border-zinc-200 bg-white text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300'
  }
}

export const BoardHeader = ({
  boardNumber,
  connectionStatus
}: {
  boardNumber: number
  connectionStatus: ConnectionStatus
}) => {
  return (
    <nav className="absolute left-0 right-0 top-0 z-20 border-b border-zinc-100 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/80">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <a
            href="/"
            className="text-xl font-bold text-zinc-800 transition-colors hover:text-zinc-600 dark:text-zinc-50 dark:hover:text-zinc-200"
          >
            Public Clipboard
          </a>
          <div className="flex items-center gap-2 rounded-full bg-zinc-50 px-3 py-1 dark:bg-zinc-800">
            <span className="text-xs font-medium text-zinc-400 dark:text-zinc-400">Board</span>
            <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-50">#{boardNumber}</span>
          </div>
          <div
            className={`rounded-full border px-3 py-1 text-xs font-medium ${statusClasses(connectionStatus)}`}
          >
            {statusLabel(connectionStatus)}
          </div>
        </div>
        <a
          href="/"
          className="rounded-full bg-zinc-800 px-4 py-2 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          ← Home
        </a>
      </div>
    </nav>
  )
}
