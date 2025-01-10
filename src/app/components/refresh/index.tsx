"use client"
import Link from "next/link"
import { useState } from "react"

const Refresh = () => {
  const [url, setUrl] = useState("")
  const [message, setMessage] = useState<JSX.Element | string>("")

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    // Extract the path from the URL if it includes the domain
    const parsedUrl = new URL(url, window.location.origin)
    const path = parsedUrl.pathname + parsedUrl.search

    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/refresh/path?secret=${process.env.NEXT_PUBLIC_REVALIDATION_SECRET}&path=${path}`

    try {
      const response = await fetch(apiUrl, {
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
      {message && <div className="py-3 text-white">{typeof message === "string" ? message : message}</div>}
    </div>
  )
}

export default Refresh
