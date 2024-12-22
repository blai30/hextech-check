'use client' // Error boundaries must be Client Components

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Error({
  error,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-full w-full flex flex-col items-center justify-center flex-grow gap-8">
      <h2 className="text-4xl font-light">Something went wrong!</h2>
      <button
        onClick={() => router.push('/')}
        className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
      >
        Back to home page
      </button>
    </div>
  )
}
