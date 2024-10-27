"use client"
import { useEffect, useState } from "react"
import { Events } from "../../../../lib/types"
import PastEventCard from "./pastEventCard"
import { useBreakpoints } from "@/app/hooks/useBreakpoints"
import { PastEventsProps } from "@/app/events/past/page"
import Link from "next/link"

interface PastEventsListProps {
  limit?: number
}

const PastEventsList = (props: PastEventsProps & PastEventsListProps) => {
  const { initialEvents, eventTypes } = props
  const currentBreakpoint = useBreakpoints()
  const [groupCount, setGroupCount] = useState(1)
  const [allEvents, setAllEvents] = useState<Events[]>(initialEvents)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    const calculateGroupNumber = () => {
      switch (currentBreakpoint) {
        case "tablet-lg":
        case "desktop":
          return 3
        case "desktop-lg":
        case "widescreen":
          return 4
        default:
          return 1
      }
    }
    setGroupCount(calculateGroupNumber())
  }, [currentBreakpoint])

  // Utility function to split array into groups
  const groupArray = (array: Events[], groupSize: number) => {
    const groups = []
    for (let i = 0; i < array.length; i += groupSize) {
      groups.push(array.slice(i, i + groupSize))
    }
    return groups
  }

  // Function to load more events
  const loadMoreEvents = async () => {
    try {
      const limit = props.limit || 32
      const offset = currentPage * limit
      const newEventsResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/events/past?limit=${limit}&offset=${offset}`,
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

  const eventGroups = groupArray(allEvents, groupCount).map((group, index) => {
    const row = group.map((event, i) => <PastEventCard key={i} event={event} eventTypes={eventTypes} />)
    return (
      <div
        key={index}
        className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-0 divide-x rail-divide tablet-lg:py-3 pb-3"
      >
        {row}
      </div>
    )
  })

  return (
    <div className="pb-9">
      <div className="divide-y rail-divide">{eventGroups}</div>
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
