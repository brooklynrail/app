"use client"
import { useEffect, useState } from "react"
import Header, { HeaderType } from "../header"
import Paper from "../paper"
import { Events } from "../../../../lib/types"
import Link from "next/link"
import PastEventCard from "./pastEventCard"
import { useBreakpoints } from "@/app/hooks/useBreakpoints"

import { PastEventsProps } from "@/app/events/past/page"
import PastEventsList from "./pastEventsList"

const limit = 16 * 2

const PastEventsPage = (props: PastEventsProps) => {
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

  return (
    <Paper pageClass="paper-events-past">
      <Header type={HeaderType.Events} />
      <main className="px-6 tablet-lg:px-3 pb-12 desktop:max-w-screen-widescreen mx-auto">
        <div className="space-y-9 divide-y rail-divide">
          <div className="pt-9 space-y-3 tablet-lg:space-y-6">
            <h1 className="font-bold text-4xl tablet-lg:text-5xl">Past Events</h1>
            <p className="">
              <Link className="text-indigo-500 font-medium" href={`/events`}>
                Upcoming Events
              </Link>
            </p>
          </div>
          <PastEventsList {...props} limit={32} />
        </div>
      </main>
    </Paper>
  )
}

export default PastEventsPage
