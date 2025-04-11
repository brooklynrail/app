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

  const handleRevalidate = async (type: RevalidateType | string) => {
    if (isLoading) {
      return
    }

    setIsLoading(true)
    setMessage(`🔄 Revalidation started for ${type}`)

    try {
      const pageAPIUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/refresh?secret=${process.env.NEXT_PUBLIC_REVALIDATION_SECRET}&type=${type}`

      const response = await fetch(pageAPIUrl, {
        cache: "no-store",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        setMessage(<p className="text-green-400">✅ Successfully revalidated {type}</p>)
        // Clear the message after 5 seconds only if it's still showing the success message
        setTimeout(() => {
          setMessage((currentMessage) => (currentMessage === `Successfully revalidated ${type}` ? "" : currentMessage))
        }, 5000)
      } else {
        const errorData = await response.text()
        setMessage(<p className="text-red-400">❌ Error: {errorData}</p>)
      }
    } catch (error) {
      console.error(`Failed to revalidate ${type}:`, error)
      setMessage(<p className="text-red-400">❌ An error occurred while revalidating {type}. Please try again.</p>)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRevalidateAPIRoutes = async (routes: string[], name: string) => {
    if (isLoading) {
      return
    }

    setIsLoading(true)
    setMessage(`🔄 Revalidating all ${name} API routes...`)

    try {
      // Revalidate each route
      await Promise.all(
        routes.map(async (route) => {
          const pathAPIUrl = `/api/refresh/path?secret=${process.env.NEXT_PUBLIC_REVALIDATION_SECRET}&path=${route}`
          const response = await fetch(pathAPIUrl, {
            cache: "no-store",
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })

          if (!response.ok) {
            throw new Error(`Failed to revalidate ${route}: ${response.statusText}`)
          }
        }),
      )

      setMessage(<p className="text-green-400">✅ Successfully revalidated all {name} API routes</p>)
      setTimeout(() => {
        setMessage((currentMessage) =>
          currentMessage === `Successfully revalidated all ${name} API routes` ? "" : currentMessage,
        )
      }, 5000)
    } catch (error) {
      console.error(`Failed to revalidate ${name} API routes:`, error)
      setMessage(
        <p className="text-red-400">❌ An error occurred while revalidating {name} API routes. Please try again.</p>,
      )
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
          <div className="flex flex-col tablet-lg:flex-row tablet-lg:items-center space-y-3 tablet-lg:space-y-0 tablet-lg:space-x-3">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL to revalidate"
              className="p-3 rounded w-full tablet-lg:w-1/2"
              disabled={isLoading}
            />
            <div className="space-x-3">
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
          </div>
        </form>
      </div>

      {message && <div className="mt-3 p-3 rounded bg-zinc-700 text-white">{message}</div>}

      <div className="flex flex-col space-y-3 w-2/3">
        <h2 className="text-lg font-normal text-white">Revalidate by type</h2>
        <div className="grid grid-cols-1 tablet-lg:grid-cols-2 gap-3">
          <button
            onClick={() => handleRevalidate(RevalidateType.Homepage)}
            disabled={isLoading}
            className="p-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-zinc-800 text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Revalidating..." : "Revalidate Homepage"}
          </button>
          <button
            onClick={() => handleRevalidate(RevalidateType.Sections)}
            disabled={isLoading}
            className="p-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-zinc-800 text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Revalidating..." : "Revalidate Sections"}
          </button>
          <button
            onClick={() => handleRevalidate(RevalidateType.Issues)}
            disabled={isLoading}
            className="p-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-zinc-800 text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Revalidating..." : "Revalidate Issues"}
          </button>
          <button
            onClick={() => handleRevalidate(RevalidateType.Events)}
            disabled={isLoading}
            className="p-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-zinc-800 text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Revalidating..." : "Revalidate Events"}
          </button>
          <button
            onClick={() => handleRevalidate(RevalidateType.Articles)}
            disabled={isLoading}
            className="p-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-zinc-800 text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Revalidating..." : "Revalidate Articles"}
          </button>
          <button
            onClick={() => handleRevalidate(RevalidateType.Contributors)}
            disabled={isLoading}
            className="p-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-zinc-800 text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Revalidating..." : "Revalidate Contributors"}
          </button>
          <button
            onClick={() => handleRevalidate(RevalidateType.Tributes)}
            disabled={isLoading}
            className="p-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-zinc-800 text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Revalidating..." : "Revalidate Tributes"}
          </button>
          <button
            onClick={() => handleRevalidate(RevalidateType.Ads)}
            disabled={isLoading}
            className="p-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-zinc-800 text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Revalidating..." : "Revalidate Ads"}
          </button>
          <button
            onClick={() => handleRevalidate(RevalidateType.Pages)}
            disabled={isLoading}
            className="p-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-zinc-800 text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Revalidating..." : "Revalidate Pages"}
          </button>
          <button
            onClick={() => handleRevalidate(RevalidateType.GlobalSettings)}
            disabled={isLoading}
            className="p-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-zinc-800 text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Revalidating..." : "Revalidate Global Settings"}
          </button>
        </div>
      </div>

      <div className="flex flex-col space-y-3 w-2/3">
        <h2 className="text-lg font-normal text-white">Revalidate API routes</h2>
        <div className="grid grid-cols-1 tablet-lg:grid-cols-2 gap-3">
          <button
            onClick={() =>
              handleRevalidateAPIRoutes(
                [
                  "/api/events",
                  "/api/events/past",
                  "/api/events/upcoming",
                  "/api/events/upcoming-nse",
                  "/api/events/featured",
                ],
                "Events",
              )
            }
            disabled={isLoading}
            className="p-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-zinc-800 text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Revalidating..." : "Revalidate Events API Routes"}
          </button>
          <button
            onClick={() =>
              handleRevalidateAPIRoutes(["/api/article", "/api/article/[slug]", "/api/article/id/[id]"], "Article")
            }
            disabled={isLoading}
            className="p-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-zinc-800 text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Revalidating..." : "Revalidate Article API Routes"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Refresh
