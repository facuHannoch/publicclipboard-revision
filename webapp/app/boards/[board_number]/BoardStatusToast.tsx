export const BoardStatusToast = ({ message }: { message: string | null }) => {
  if (!message) return null
  return (
    <div className="fixed bottom-8 right-8 rounded-full bg-zinc-800 px-4 py-2 text-xs font-semibold text-white shadow-lg dark:bg-zinc-100 dark:text-zinc-900">
      {message}
    </div>
  )
}
