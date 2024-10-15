"use client"

import Link from "next/link"
import { CollectionLinks, Collections, Events } from "../../../../../lib/types"
import parse from "html-react-parser"
import { useEffect, useState } from "react"
import { getUpcomingEventsBanner } from "../../../../../lib/utils/events/utils"

interface BannerNewSocialEnvironmentProps {
  banner: Collections
  first: boolean
  last: boolean
}

const BannerNewSocialEnvironment = (props: BannerNewSocialEnvironmentProps) => {
  const { banner } = props
  const [currentEvents, setCurrentEvents] = useState<Events[] | undefined>(undefined)

  useEffect(() => {
    const fetchData = async () => {
      if (!currentEvents) {
        const events = getUpcomingEventsBanner()
        const [fetchedEvents] = await Promise.all([events])
        setCurrentEvents(fetchedEvents)
      }
    }

    fetchData().catch((error) => console.error("Failed to fetch Event data on the Homepage:", error))
  }, [currentEvents])

  const first = props.first ? "pl-6" : ""
  const last = props.last ? "pr-6" : ""

  const links =
    banner.links &&
    banner.links.map((link: CollectionLinks, i: number) => {
      const first = i === 0 ? "border border-dotted border-indigo-50 px-0.5" : ""
      return (
        <Link href={link.url} className={`py-1 text-center text-indigo-50 uppercase font-medium text-xs ${first}`}>
          <button className="uppercase hover:underline">{link.text}</button>
        </Link>
      )
    })
  const events = currentEvents && currentEvents.map((event) => <EventCard event={event} />)
  events?.push(<AllEventsCard key="all-events" />)

  return (
    <div
      key={banner.id}
      className={`col-span-4 tablet:col-span-6 py-3 pb-6 px-6 bg-zinc-700 bg-opacity-70 ${first} ${last}`}
    >
      <div className="grid grid-cols-6 gap-3 gap-x-6">
        <div className="col-span-6 row-start-1">
          <h3 className="text-md font-medium text-indigo-50">
            <span className="">{parse(banner.title)}</span>
          </h3>
        </div>
        <div className="col-span-5 row-start-2">
          <div className="bg-pink-500 bg-opacity-60 w-full h-full flex divide-x divide-indigo-50 divide-dotted overflow-x-auto">
            {events}
          </div>
        </div>
        {links && (
          <div className="col-span-1 row-start-2">
            <div className="flex flex-col space-y-1">{links}</div>
          </div>
        )}
      </div>
    </div>
  )
}

interface EventCardProps {
  event: Events
}

const EventCard = (props: EventCardProps) => {
  const { title, slug, start_date } = props.event
  const startDate = new Date(start_date)
  const fullDay = startDate.toLocaleDateString("en-US", { weekday: "long" })
  return (
    <div className="p-3">
      <div className="bg-white bg-opacity-20 rounded-xl w-32 h-24">
        <span>{fullDay}</span>
        {title}
      </div>
    </div>
  )
}

const AllEventsCard = () => {
  return (
    <div className="p-3">
      <div className="bg-black bg-opacity-20 rounded-xl w-32 h-24">All events »</div>
    </div>
  )
}

export default BannerNewSocialEnvironment
