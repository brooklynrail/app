import { useEffect, useRef, useState } from "react"
import { Events, EventsTypes } from "../../../../../lib/types"
import { getPermalink, PageType } from "../../../../../lib/utils"
import {
  generateNewsletter,
  generateYouTubeCopy,
  generateYouTubeTags,
  getUpcomingEvents,
} from "../../../../../lib/utils/events"
import { EditorInfo } from "../article/previewInfo"

interface PreviewInfoProps {
  directusUrl: string
  eventData: Events
  eventTypes: EventsTypes[]
}

const PreviewInfo = (props: PreviewInfoProps) => {
  const { status, user_updated, date_updated, start_date, slug } = props.eventData
  const youtubeRef = useRef<HTMLPreElement>(null)
  const [showNewsletterCopy, setShowNewsletterCopy] = useState(false)
  const [showYouTubeCopy, setShowYouTubeCopy] = useState(false)
  const [showYouTubeTags, setShowYouTubeTags] = useState(false)

  const youtube_copy = generateYouTubeCopy(props.eventData)
  const youtube_tags = generateYouTubeTags(props.eventData)

  const startDate = new Date(start_date)
  const eventYear = startDate.getFullYear()
  const eventMonth = startDate.getMonth() + 1
  const eventDay = startDate.getDate()

  const [currentEvents, setCurrentEvents] = useState<Events[] | undefined>(undefined)

  useEffect(() => {
    const fetchData = async () => {
      if (!currentEvents) {
        const allEvents = await getUpcomingEvents()
        const [fetchedEvents] = await Promise.all([allEvents])
        setCurrentEvents(fetchedEvents)
      }
    }
    fetchData().catch((error) => console.error("Failed to fetch all events data on the preview page:", error))
  }, [currentEvents])

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
        <div className="flex space-x-3 pr-3">
          <button
            className="text-xs flex-none bg-white rounded-sm px-1 py-0.5 hover:underline"
            onClick={() => {
              setShowNewsletterCopy(!showNewsletterCopy)
              setShowYouTubeCopy(false)
              setShowYouTubeTags(false)
            }}
          >
            Newsletter
          </button>
          <button
            className="text-xs flex-none bg-white rounded-sm px-1 py-0.5 hover:underline"
            onClick={() => {
              setShowNewsletterCopy(false)
              setShowYouTubeCopy(!showYouTubeCopy)
              setShowYouTubeTags(false)
            }}
          >
            YouTube copy
          </button>
          <button
            className="text-xs flex-none  bg-white rounded-sm px-1 py-0.5 hover:underline"
            onClick={() => {
              setShowNewsletterCopy(false)
              setShowYouTubeCopy(false)
              setShowYouTubeTags(!showYouTubeTags)
            }}
          >
            YouTube tags
          </button>
        </div>
      </div>
      {showNewsletterCopy && currentEvents && (
        <pre
          className="bg-white rounded-md outline-dotted outline-indigo-500 p-6 max-h-96 text-xs overflow-auto"
          ref={youtubeRef}
        >
          {generateNewsletter({ allEvents: currentEvents, eventTypes: props.eventTypes })}
        </pre>
      )}
      {showYouTubeCopy && (
        <pre
          className="bg-white rounded-md outline-dotted outline-indigo-500 p-6 max-h-96 text-xs overflow-auto"
          ref={youtubeRef}
        >
          {youtube_copy}
        </pre>
      )}
      {showYouTubeTags && (
        <pre
          className="bg-white rounded-md outline-dotted outline-indigo-500 p-6 text-xs overflow-auto"
          ref={youtubeRef}
        >
          {youtube_tags}
        </pre>
      )}
    </div>
  )
}

export default PreviewInfo
