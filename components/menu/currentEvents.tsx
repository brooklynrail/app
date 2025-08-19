import Link from "next/link"
import { useEffect, useState } from "react"
import { Events } from "@/lib/types"
import { getPermalink, PageType } from "@/lib/utils"
import { formatTime } from "@/lib/utils/events"
import { EventsBreakDetails } from "@/lib/railTypes"

const CurrentEvents = (props: { eventsBreakDetails?: EventsBreakDetails }) => {
  const [currentEvents, setCurrentEvents] = useState<Events[] | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const upcomingEventsResponse = await fetch(`/api/events/upcoming-nse/`, {
          next: { revalidate: 86400, tags: ["events"] },
        })
        const upcomingEvents = await upcomingEventsResponse.json()
        if (Array.isArray(upcomingEvents)) {
          setCurrentEvents(upcomingEvents)
        } else {
          console.error("Fetched data is not an array")
        }
      } catch (error) {
        console.error("Failed to fetch Event data:", error)
      } finally {
        setLoading(false)
      }
    }

    void fetchData()
  }, []) // Empty dependency array to ensure the fetch only runs once

  if (loading || !currentEvents || currentEvents.length === 0) {
    return null
  }

  const onBreak = props.eventsBreakDetails && props.eventsBreakDetails.events_on_break
  const { title, start_date, slug } = currentEvents[0]

  const startDate = new Date(start_date + "Z")
  const today = new Date()
  const isToday = startDate.toDateString() === today.toDateString()
  const fullDate = startDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const startTimeET = formatTime(start_date, "America/New_York")
  const startTimePT = formatTime(start_date, "America/Los_Angeles")

  const eventYear = startDate.getFullYear()
  const eventMonth = startDate.getMonth() + 1
  const eventDay = startDate.getDate()

  const permalink = getPermalink({
    eventYear,
    eventMonth,
    eventDay,
    slug,
    type: PageType.Event,
  })

  if (onBreak) {
    return null
  }

  return (
    <div className="col-span-3 bg-zinc-800 text-slate-100 py-3">
      <div className="grid grid-cols-3 divide-x divide-white divide-dotted">
        <div className="col-span-2">
          <div className="px-3">
            <h4 className="font-bold text-sm">{isToday ? "Today" : fullDate}</h4>
            <p className="text-sm">
              <Link href={permalink}>
                <span className="block">
                  {startTimeET} ET / {startTimePT} PT
                </span>{" "}
                <strong>{title}</strong>
              </Link>
            </p>
          </div>
        </div>
        <div className="col-span-1">
          <div className="px-3 flex flex-col text-sm divide-y divide-white divide-dotted">
            <Link className="py-1.5 font-medium" href="/events">
              Upcoming events
            </Link>
            <Link className="py-1.5 font-medium" href="/events/past">
              Past events
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrentEvents
