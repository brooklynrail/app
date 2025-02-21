"use client"
import Link from "next/link"
import { useState } from "react"
import { PageType } from "../../../../lib/utils"
import { RevalidateType } from "../../../../lib/utils/revalidate"

const Refresh = () => {
  const [url, setUrl] = useState("")
  const [message, setMessage] = useState<JSX.Element | string>("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    // Extract the path from the URL if it includes the domain
    const parsedUrl = new URL(url, window.location.origin)
    const path = parsedUrl.pathname + parsedUrl.search

    const pathAPIUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/refresh/path?secret=${process.env.NEXT_PUBLIC_REVALIDATION_SECRET}&path=${path}`

    try {
      const response = await fetch(pathAPIUrl, {
        cache: "no-store",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        setMessage(
          <p>
            <span>Success: </span>
            <Link href={path} className="text-blue-500 underline">
              {`${process.env.NEXT_PUBLIC_BASE_URL}${path}`}
            </Link>
          </p>,
        )
      } else {
        const errorData = await response.text()
        setMessage(errorData)
      }
    } catch (error) {
      console.error("Failed to revalidate path:", error)
      setMessage("An error occurred. Please try again.")
    }
  }

  const handleRevalidateSections = async () => {
    if (isLoading) return

    setIsLoading(true)
    setMessage("Revalidation started for all sections")
    const pageAPIUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/refresh?secret=${process.env.NEXT_PUBLIC_REVALIDATION_SECRET}&type=${RevalidateType.Sections}`

    try {
      const response = await fetch(pageAPIUrl, {
        cache: "no-store",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        setMessage("Successfully revalidated all section pages")
        // Clear the message after 5 seconds only if it's still showing the success message
        setTimeout(() => {
          setMessage((currentMessage) =>
            currentMessage === "Successfully revalidated all section pages" ? "" : currentMessage,
          )
        }, 5000)
      }
    } catch (error) {
      console.error("Failed to revalidate sections:", error)
      setMessage("An error occurred while revalidating sections. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full h-full space-y-6 min-h-screen bg-zinc-800 p-6">
      <div className="flex flex-col space-y-3">
        <h2 className="text-lg font-normal text-white">Revalidate a single path</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL to revalidate"
            className="p-3 rounded w-1/2"
          />
          <button
            type="submit"
            className="ml-3 p-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-zinc-800 text-white rounded transition-colors"
          >
            Revalidate path
          </button>
          <button
            type="button"
            onClick={() => {
              setUrl("")
              setMessage("")
            }}
            className="ml-3 p-3 bg-gray-500 hover:bg-gray-600 active:bg-gray-700 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-zinc-800 text-white rounded transition-colors"
          >
            Clear
          </button>
        </form>
      </div>
      <div className="flex flex-col space-y-3">
        <div className="flex items-center space-x-3">
          <button
            onClick={handleRevalidateSections}
            disabled={isLoading}
            className="p-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-zinc-800 text-white rounded transition-colors w-fit disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Revalidating..." : "Revalidate all sections"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Refresh
