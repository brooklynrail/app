"use client"
import { useEffect, useState } from "react"
import { Events } from "../../../../lib/types"
import Link from "next/link"
import PastEventCard from "./pastEventCard"
import { useBreakpoints } from "@/app/hooks/useBreakpoints"

const limit = 16 * 2

const PastPageBody = (props: { initialEvents: Events[] }) => {
  const currentBreakpoint = useBreakpoints()
  const [groupCount, setGroupCount] = useState(1)
  const [allEvents, setAllEvents] = useState<Events[]>(props.initialEvents)
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
      const newEventsResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/events/past?limit=${limit}&offset=${currentPage * limit}`,
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
    const row = group.map((event, i) => <PastEventCard key={i} event={event} />)
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
      {hasMore && (
        <div className="text-center pt-6">
          <button
            onClick={loadMoreEvents}
            className="bg-indigo-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-600"
          >
            Load More Events
          </button>
        </div>
      )}
    </div>
  )
}

export default PastPageBody
