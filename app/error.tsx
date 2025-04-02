"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

// Handles errors for page content
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const router = useRouter()

  useEffect(() => {
    console.error("Error boundary caught:", {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
    })
  }, [error])

  const handleReset = () => {
    // Try the built-in reset first
    reset()

    // If that doesn't work, force a router refresh
    router.refresh()
  }

  return (
    <div className="p-6 flex flex-col items-center justify-center w-screen h-screen bg-white dark:bg-zinc-700">
      <h2 className="text-xl text-center font-bold mb-4">Something went wrong loading our page</h2>
      <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={handleReset}>
        Refresh
      </button>
    </div>
  )
}
