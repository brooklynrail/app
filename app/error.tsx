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
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Something went wrong loading this page!</h2>
      <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={() => reset()}>
        Try again
      </button>
    </div>
  )
}
