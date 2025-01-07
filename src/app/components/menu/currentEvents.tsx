import Link from "next/link"
import { useEffect, useState } from "react"
import { Events } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import { formatTime } from "../../../../lib/utils/events"

const CurrentEvents = () => {
  const [currentEvents, setCurrentEvents] = useState<Events[] | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const upcomingEventsResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events/`)
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

    fetchData()
  }, []) // Empty dependency array to ensure the fetch only runs once

  if (loading || !currentEvents || currentEvents.length === 0) {
    return null
  }

  const { title, start_date, end_date, slug } = currentEvents[0]

  const startDate = new Date(start_date + "Z")
  const endDate = new Date(end_date + "Z")
  const isSameDay = startDate.toDateString() === endDate.toDateString()
  const dayOfWeek = startDate.toLocaleString("en-US", { weekday: "long" })

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

  return (
    <div className="col-span-3 bg-zinc-800 text-slate-100 py-3">
      <div className="grid grid-cols-3 divide-x divide-white divide-dotted">
        <div className="col-span-2">
          <div className="px-3">
            <h4 className="font-bold text-sm">{isSameDay ? "Today" : dayOfWeek}</h4>
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
