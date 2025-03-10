"use client"
import { PastEventsProps } from "@/lib/railTypes"
import { Events } from "@/lib/types"
import Link from "next/link"
import { useState } from "react"
import PastEventCard from "./pastEventCard"

interface PastEventsListProps {
  limit?: number
}

const PastEventsList = (props: PastEventsProps & PastEventsListProps) => {
  const { initialEvents, eventTypes } = props
  const [allEvents, setAllEvents] = useState<Events[]>(initialEvents)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  // Function to load more events
  const loadMoreEvents = async () => {
    try {
      const limit = props.limit || 32
      const offset = currentPage * limit
      const newEventsResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/events/past?limit=${limit}&offset=${offset}`,
        { next: { revalidate: 3600, tags: ["events"] } },
      )
      const newEvents = await newEventsResponse.json()
      if (!Array.isArray(newEvents)) {
        throw new Error("Fetched data is not an array")
      }

      if (newEvents.length < limit) {
        setHasMore(false)
      }
      setAllEvents((prev) => [...prev, ...newEvents])
      setCurrentPage((prev) => prev + 1)
    } catch (error) {
      console.error("Failed to load more events:", error)
    }
  }

  const allEventCards = allEvents.map((event, i) => {
    const priority = i < 3 ? true : false
    return <PastEventCard key={event.id} event={event} eventTypes={eventTypes} priority={priority} />
  })

  return (
    <div className="pb-9">
      {/* <div className="divide-y rail-divide">{eventGroups}</div> */}
      <div className={`py-3 tablet-lg:py-6`}>
        <div className={`grid items-start gap-0 grid-cols-1 tablet:grid-cols-3 desktop:grid-cols-4`}>
          {allEventCards}
        </div>
      </div>
      {props.limit && hasMore ? (
        <div className="text-center pt-6">
          <button
            onClick={loadMoreEvents}
            className="bg-indigo-500 text-white px-6 py-3 rounded-sm shadow-lg hover:bg-indigo-600 uppercase text-xl"
          >
            Load more
          </button>
        </div>
      ) : (
        <div className="text-center pt-6">
          <Link href="/events/past">
            <button className="bg-indigo-500 text-white px-6 py-3 rounded-sm shadow-lg hover:bg-indigo-600 uppercase text-xl">
              Past events
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default PastEventsList
