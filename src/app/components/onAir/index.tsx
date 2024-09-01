import Link from "next/link"
import { useEffect, useState } from "react"
import { EventOld } from "@/app/api/events/route"

const OnAir = () => {
  // Use UseEffect to pull in the events API data at /api/events
  const [events, setEvents] = useState<EventOld[] | undefined>(undefined)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/events")
        const data = await response.json()

        if (Array.isArray(data)) {
          setEvents(data)
        } else {
          console.error("Unexpected data format:", data)
        }
      } catch (error) {
        console.error("Failed to fetch data:", error)
      }
    }

    // Fetch events only once when the component mounts
    fetchData()
  }, [])

  // get the last item in the events array
  const nextEvent = events && events[events.length - 1]

  // format the next event time like "1pm ET / 10am PT"
  const nextEventTime =
    nextEvent &&
    new Date(nextEvent.start_date).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: nextEvent.start_date.endsWith(":00") ? undefined : "2-digit",
      timeZoneName: "short",
    })

  return (
    <div className="onair">
      <Link href={nextEvent ? nextEvent.url : `/events`}>
        <div className="bar">
          <div className="bug">
            <h4>TODAY</h4>
          </div>
          {nextEvent ? (
            <div className="marquee">
              {[...Array(10)].map((_, i) => (
                <>
                  <p key={i} aria-hidden={i == 0 ? false : true}>
                    <span>
                      <strong>{nextEvent.title}</strong>
                    </span>
                    <span>{nextEventTime}</span>
                    <span className="register">Sign up</span>
                  </p>
                </>
              ))}
            </div>
          ) : (
            <div className="marquee">
              {[...Array(20)].map((_, i) => (
                <p key={i} aria-hidden={i == 0 ? false : true}>
                  Loading...
                </p>
              ))}
            </div>
          )}
        </div>
      </Link>
    </div>
  )
}

interface OnAirEventProps {
  nextEvent: EventOld
}

const OnAirEvent = ({ nextEvent }: OnAirEventProps) => {
  return (
    <>
      <div className="event">
        <div className="marquee">
          <ul>
            <li>
              <Link href={nextEvent.url}>
                {nextEvent.title} {nextEvent.deck}
              </Link>
            </li>
          </ul>
          <ul aria-hidden="true">
            <li>
              <Link href={nextEvent.url}>
                {nextEvent.title} {nextEvent.deck}
              </Link>
              <span> • </span>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default OnAir
