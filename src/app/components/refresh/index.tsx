"use client"
import Link from "next/link"
import { useState } from "react"

const Refresh = () => {
  const [url, setUrl] = useState("")
  const [result, setResult] = useState<{ success: boolean; path?: string; error?: string } | null>(null)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    // Extract the path from the URL if it includes the domain
    const parsedUrl = new URL(url, window.location.origin)
    const path = parsedUrl.pathname + parsedUrl.search

    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/refresh/path?secret=${process.env.NEXT_PUBLIC_REVALIDATION_SECRET}&path=${path}`

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        setResult({ success: true, path })
      } else {
        const errorData = await response.text()
        setResult({ success: false, error: errorData })
      }
    } catch (error) {
      console.error("Failed to revalidate path:", error)
      setResult({ success: false, error: "An error occurred. Please try again." })
    }
  }

  return (
    <div className="w-full h-full min-h-screen bg-zinc-800 p-6">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL to revalidate"
          className="p-3 rounded w-1/2"
        />
        <button type="submit" className="ml-3 p-3 bg-blue-500 text-white rounded">
          Revalidate
        </button>
      </form>
      {result && (
        <div className="py-3 text-white">
          {result.success ? (
            <p>
              <span>Success: </span>
              <Link href={result.path!} className="text-blue-500 underline">
                {`${process.env.NEXT_PUBLIC_BASE_URL}${result.path}`}
              </Link>
            </p>
          ) : (
            <p>{result.error}</p>
          )}
        </div>
      )}
    </div>
  )
}

export default Refresh
