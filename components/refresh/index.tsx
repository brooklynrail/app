"use client"
import { RevalidateType } from "@/lib/utils/revalidate"
import Link from "next/link"
import { useState } from "react"

const Refresh = () => {
  const [url, setUrl] = useState("")
  const [message, setMessage] = useState<JSX.Element | string>("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)
    setMessage("Starting revalidation...")

    try {
      // Extract the path from the URL if it includes the domain
      const parsedUrl = new URL(url, window.location.origin)
      const path = parsedUrl.pathname + parsedUrl.search

      const pathAPIUrl = `/api/refresh/path?secret=${process.env.NEXT_PUBLIC_REVALIDATION_SECRET}&path=${path}`

      const response = await fetch(pathAPIUrl, {
        cache: "no-store",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        setMessage(
          <p className="text-green-400">
            <span>✅ Success: </span>
            <Link href={path} className="text-blue-400 underline">
              {`${process.env.NEXT_PUBLIC_BASE_URL}${path}`}
            </Link>
          </p>,
        )
      } else {
        const errorData = await response.text()
        setMessage(<p className="text-red-400">❌ Error: {errorData}</p>)
      }
    } catch (error) {
      console.error("Failed to revalidate path:", error)
      setMessage(<p className="text-red-400">❌ An error occurred. Please try again.</p>)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRevalidateSections = async () => {
    if (isLoading) {
      return
    }

    setIsLoading(true)
    setMessage("🔄 Revalidation started for all sections")

    try {
      const pageAPIUrl = `/api/refresh?secret=${process.env.NEXT_PUBLIC_REVALIDATION_SECRET}&type=${RevalidateType.Sections}`

      const response = await fetch(pageAPIUrl, {
        cache: "no-store",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        setMessage(<p className="text-green-400">✅ Successfully revalidated all section pages</p>)
        // Clear the message after 5 seconds only if it's still showing the success message
        setTimeout(() => {
          setMessage((currentMessage) =>
            currentMessage === "Successfully revalidated all section pages" ? "" : currentMessage,
          )
        }, 5000)
      } else {
        const errorData = await response.text()
        setMessage(<p className="text-red-400">❌ Error: {errorData}</p>)
      }
    } catch (error) {
      console.error("Failed to revalidate sections:", error)
      setMessage(<p className="text-red-400">❌ An error occurred while revalidating sections. Please try again.</p>)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full h-full space-y-6 min-h-screen bg-zinc-800 p-6">
      <div className="flex items-center space-x-3">
        <Link
          href="/"
          className=" text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="text-white">←</span> Home
        </Link>
      </div>
      <div className="flex flex-col space-y-3">
        <h2 className="text-lg font-normal text-white">Revalidate a single path</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL to revalidate"
              className="p-3 rounded w-1/2"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !url}
              className="p-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-zinc-800 text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Revalidating..." : "Revalidate path"}
            </button>
            <button
              type="button"
              onClick={() => {
                setUrl("")
                setMessage("")
              }}
              disabled={isLoading}
              className="p-3 bg-gray-500 hover:bg-gray-600 active:bg-gray-700 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-zinc-800 text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Clear
            </button>
          </div>
        </form>
      </div>

      <div className="flex flex-col space-y-3">
        <h2 className="text-lg font-normal text-white">Revalidate all sections</h2>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleRevalidateSections}
            disabled={isLoading}
            className="p-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-zinc-800 text-white rounded transition-colors w-fit disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Revalidating..." : "Revalidate"}
          </button>
        </div>
      </div>
      {message && <div className="mt-3 p-3 rounded bg-zinc-700 text-white">{message}</div>}
    </div>
  )
}

export default Refresh
