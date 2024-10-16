import { useRef, useState } from "react"
import { Events } from "../../../../../lib/types"
import { getPermalink, PageType } from "../../../../../lib/utils"
import { generateYouTubeCopy, generateYouTubeTags } from "../../../../../lib/utils/events/utils"
import { EditorInfo } from "../article/previewInfo"

interface PreviewInfoProps {
  directusUrl: string
  eventData: Events
}

const PreviewInfo = (props: PreviewInfoProps) => {
  const { status, user_updated, date_updated, start_date, slug } = props.eventData
  const youtubeRef = useRef<HTMLPreElement>(null)
  const [showYouTubeCopy, setShowYouTubeCopy] = useState(false)
  const [showYouTubeTags, setShowYouTubeTags] = useState(false)

  const youtube_copy = generateYouTubeCopy(props.eventData)
  const youtube_tags = generateYouTubeTags(props.eventData)

  const startDate = new Date(start_date)
  const eventYear = startDate.getFullYear()
  const eventMonth = startDate.getMonth() + 1
  const eventDay = startDate.getDate()

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
          <EditorInfo {...user_updated} date={date_updated} status={status} permalink={permalink} />
        )}
        <div className="flex flex-col space-y-3 pr-3">
          <button
            className="text-xs flex-none bg-white rounded-sm px-1 py-0.5 hover:underline"
            onClick={() => {
              setShowYouTubeCopy(!showYouTubeCopy)
              setShowYouTubeTags(false)
            }}
          >
            YouTube copy
          </button>
          <button
            className="text-xs flex-none  bg-white rounded-sm px-1 py-0.5 hover:underline"
            onClick={() => {
              setShowYouTubeTags(!showYouTubeTags)
              setShowYouTubeCopy(false)
            }}
          >
            YouTube tags
          </button>
        </div>
      </div>
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
