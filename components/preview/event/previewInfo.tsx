"use client"
import { useEffect, useRef, useState } from "react"
import { Events, EventsTypes } from "@/lib/types"
import { getPermalink, PageType } from "@/lib/utils"
import {
  generateFullNewsletter,
  generateSingleEventNewsletter,
  generateYouTubeCopy,
  generateYouTubeTags,
} from "@/lib/utils/events"
import { EditorInfo } from "../article/previewInfo"

interface PreviewInfoProps {
  directusUrl: string
  eventData: Events
  eventTypes: EventsTypes[]
}

const PreviewInfo = (props: PreviewInfoProps) => {
  const { status, user_updated, date_updated, start_date, slug } = props.eventData
  const preRef = useRef<HTMLPreElement>(null)
  const [showFullNewsletter, setShowFullNewsletter] = useState(false)
  const [showSingleEventNewsletter, setShowSingleEventNewsletter] = useState(false)
  const [showYouTubeCopy, setShowYouTubeCopy] = useState(false)
  const [showYouTubeTags, setShowYouTubeTags] = useState(false)
  const [currentEvents, setCurrentEvents] = useState<Events[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const youtube_copy = generateYouTubeCopy(props.eventData)
  const youtube_tags = generateYouTubeTags(props.eventData)
  const single_event_newsletter = generateSingleEventNewsletter({
    eventTypes: props.eventTypes,
    event: props.eventData,
  })

  const now = new Date()
  const startDate = new Date(start_date)
  const eventYear = startDate.getFullYear()
  const eventMonth = startDate.getMonth() + 1
  const eventDay = startDate.getDate()

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(`/api/events/upcoming-nse/?date=${now.toISOString()}`, {
          next: {
            tags: ["events"],
          },
        })

        if (!res.ok) {
          throw new Error(`API returned ${res.status}`)
        }

        const data = await res.json()
        setCurrentEvents(data)
      } catch (error) {
        console.error("Failed to fetch events:", error)
        setError(error instanceof Error ? error.message : "Failed to fetch events")
      } finally {
        setIsLoading(false)
      }
    }

    void fetchEvents()
  }, [])

  const permalink =
    status === "published"
      ? getPermalink({
          eventYear: eventYear,
          eventMonth: eventMonth,
          eventDay: eventDay,
          slug: slug,
          type: PageType.Event,
        })
      : null

  return (
    <div className="space-y-3">
      <div className="bg-slate-200 flex justify-between items-center">
        {user_updated && typeof user_updated !== "string" && (
          <div className="w-1/2">
            <EditorInfo {...user_updated} date={date_updated} status={status} permalink={permalink} />
          </div>
        )}
        <div className="flex flex-col space-y-1.5 pr-3">
          <button
            className="text-xs flex-none bg-white rounded-sm px-1 py-0.5 hover:underline"
            onClick={() => {
              setShowFullNewsletter(!showFullNewsletter)
              setShowSingleEventNewsletter(false)
              setShowYouTubeCopy(false)
              setShowYouTubeTags(false)
            }}
          >
            Full Newsletter
          </button>
          <button
            className="text-xs flex-none bg-white rounded-sm px-1 py-0.5 hover:underline"
            onClick={() => {
              setShowFullNewsletter(false)
              setShowSingleEventNewsletter(!showSingleEventNewsletter)
              setShowYouTubeCopy(false)
              setShowYouTubeTags(false)
            }}
          >
            Single Event Newsletter
          </button>
          <button
            className="text-xs flex-none bg-white rounded-sm px-1 py-0.5 hover:underline"
            onClick={() => {
              setShowFullNewsletter(false)
              setShowSingleEventNewsletter(false)
              setShowYouTubeCopy(!showYouTubeCopy)
              setShowYouTubeTags(false)
            }}
          >
            YouTube copy
          </button>
          <button
            className="text-xs flex-none bg-white rounded-sm px-1 py-0.5 hover:underline"
            onClick={() => {
              setShowFullNewsletter(false)
              setShowSingleEventNewsletter(false)
              setShowYouTubeCopy(false)
              setShowYouTubeTags(!showYouTubeTags)
            }}
          >
            YouTube tags
          </button>
        </div>
      </div>
      {isLoading && <div>Loading events...</div>}
      {error && <div className="text-red-500">Error: {error}</div>}
      {showFullNewsletter && currentEvents.length > 0 && (
        <pre
          className="bg-white rounded-md outline-dotted outline-indigo-500 p-6 max-h-96 text-xs overflow-auto"
          ref={preRef}
        >
          {generateFullNewsletter({
            allEvents: currentEvents,
            eventTypes: props.eventTypes,
          })}
        </pre>
      )}
      {showSingleEventNewsletter && (
        <pre
          className="bg-white rounded-md outline-dotted outline-indigo-500 p-6 max-h-96 text-xs overflow-auto"
          ref={preRef}
        >
          {single_event_newsletter}
        </pre>
      )}
      {showYouTubeCopy && (
        <pre
          className="bg-white rounded-md outline-dotted outline-indigo-500 p-6 max-h-96 text-xs overflow-auto"
          ref={preRef}
        >
          {youtube_copy}
        </pre>
      )}
      {showYouTubeTags && (
        <pre className="bg-white rounded-md outline-dotted outline-indigo-500 p-6 text-xs overflow-auto" ref={preRef}>
          {youtube_tags}
        </pre>
      )}
    </div>
  )
}

export default PreviewInfo
