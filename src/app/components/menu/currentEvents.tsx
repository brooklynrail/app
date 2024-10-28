import Link from "next/link"
import { useEffect, useState } from "react"
import { Events } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import { formatTime, getUpcomingEventsBanner } from "../../../../lib/utils/events/utils"

const CurrentEvents = () => {
  const [currentEvents, setCurrentEvents] = useState<Events[] | undefined>(undefined)

  useEffect(() => {
    const fetchData = async () => {
      if (!currentEvents) {
        const events = await getUpcomingEventsBanner()
        const [fetchedEvents] = await Promise.all([events])
        setCurrentEvents(fetchedEvents)
      }
    }

    fetchData().catch((error) => console.error("Failed to fetch Event data on the Homepage:", error))
  }, [currentEvents])

  if (!currentEvents || currentEvents.length === 0) {
    return null
  }

  const { title, start_date, end_date, slug } = currentEvents[0]

  // get the start date in this format:
  // Wed, Oct 16  at  1 p.m. ET / 10 a.m. PT
  const startDate = new Date(start_date + "Z")
  const endDate = new Date(end_date + "Z")

  const isSameDay = startDate.toDateString() === endDate.toDateString()

  // get the Day of the week
  const dayOfWeek = startDate.toLocaleString("en-US", { weekday: "long" })

  // // Get the time in both Eastern and Pacific time
  const startTimeET = formatTime(start_date, "America/New_York")
  const startTimePT = formatTime(start_date, "America/Los_Angeles")

  const eventYear = startDate.getFullYear()
  const eventMonth = startDate.getMonth() + 1
  const eventDay = startDate.getDate()

  const permalink = getPermalink({
    eventYear: eventYear,
    eventMonth: eventMonth,
    eventDay: eventDay,
    slug: slug,
    type: PageType.Event,
  })

  const eventCard = (
    <div className="col-span-3 bg-zinc-800 text-slate-100 py-3">
      <div className="grid grid-cols-3 divide-x divide-white divide-dotted">
        <div className="col-span-2">
          <div className="px-3">
            <h4 className="font-bold text-sm">{isSameDay ? `Today` : dayOfWeek}</h4>
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
  return eventCard
}

export default CurrentEvents
