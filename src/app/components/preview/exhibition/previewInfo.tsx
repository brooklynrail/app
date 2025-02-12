import { useEffect, useRef, useState } from "react"
import { Events, EventsTypes, Exhibitions } from "../../../../../lib/types"
import { getPermalink, PageType } from "../../../../../lib/utils"
import {
  generateFullNewsletter,
  generateSingleEventNewsletter,
  generateYouTubeCopy,
  generateYouTubeTags,
  getUpcomingEvents,
} from "../../../../../lib/utils/events"
import { EditorInfo } from "../article/previewInfo"

interface PreviewInfoProps {
  directusUrl: string
  exhibitionData: Exhibitions
}

const PreviewInfo = (props: PreviewInfoProps) => {
  const { status, user_updated, date_updated, start_date, slug } = props.exhibitionData

  const permalink =
    status === "published"
      ? getPermalink({
          slug: slug,
          type: PageType.Exhibition,
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
      </div>
    </div>
  )
}

export default PreviewInfo
