"use client"

import { useEffect } from "react"

// Handles errors for page content
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("Error boundary caught:", {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
    })
  }, [error])

  return (
    <div className="p-6 flex flex-col items-center justify-center w-screen h-screen bg-white dark:bg-zinc-700">
      <h2 className="text-xl text-center font-bold mb-4">Something went wrong loading this page!</h2>
      <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={() => reset()}>
        Try again
      </button>
    </div>
  )
}
