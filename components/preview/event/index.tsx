"use client"
import { useState, useEffect } from "react"
import Password from "../password"
import PreviewHeader from "../previewHead"
import Paper from "../../paper"
import EventPageBody from "../../event/eventPageBody"
import Register from "../../event/register"
import PreviewInfo from "./previewInfo"
import { EventPreviewProps } from "@/lib/railTypes"

const EventPreview = (props: EventPreviewProps) => {
  const { eventData, isEnabled, previewPassword, directusUrl, navData } = props
  const [isStudioPreview, setIsStudioPreview] = useState(false)
  const cookieSlug = `rail_preview_${eventData.slug}`

  useEffect(() => {
    if (window.location.href.includes("draftMode")) {
      setIsStudioPreview(true)
    }
  }, [])

  // Convert both dates to UTC for consistent timezone comparison
  const endDateUTC = new Date(eventData.end_date).toISOString()
  const nowUTC = new Date().toISOString()
  const isFutureEvent = endDateUTC > nowUTC

  const previewURL = `${process.env.NEXT_PUBLIC_BASE_URL}/preview/event/${eventData.id}/`
  return (
    <Password previewPassword={previewPassword} cookieSlug={cookieSlug} isEnabled={isEnabled}>
      <Paper pageClass={`theme-events`} hidePopup={true} navData={navData} previewURL={previewURL}>
        <main className="px-6">
          <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3">
            <div className="col-span-4 tablet-lg:col-span-12">
              {isStudioPreview && (
                <div className="py-2 flex flex-col space-y-6">
                  <PreviewInfo eventData={eventData} directusUrl={directusUrl} eventTypes={props.eventTypes} />
                </div>
              )}
            </div>
          </div>
          <EventPageBody {...props} navData={navData} />
        </main>
        {isFutureEvent && <Register {...props} />}
      </Paper>
    </Password>
  )
}

export default EventPreview
