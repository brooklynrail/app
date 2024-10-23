"use client"
import style from "./banner.module.scss"
import Link from "next/link"
import { CollectionLinks, Collections, Events } from "../../../../../lib/types"
import parse from "html-react-parser"
import { useEffect, useState } from "react"
import { getUpcomingEventsBanner } from "../../../../../lib/utils/events/utils"
import { getPermalink, PageType } from "../../../../../lib/utils"
import Image from "next/image"

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

  const first = props.first ? "pl-3 tablet:pl-6" : ""
  const last = props.last ? "pr-3 tablet:pr-6" : ""

  const links =
    banner.links &&
    banner.links.map((link: CollectionLinks, i: number) => {
      const first = i === 0 ? "border border-dotted border-indigo-50 px-0.5" : ""
      return (
        <Link
          key={i}
          href={link.url}
          className={`py-1 text-center text-indigo-50 uppercase font-medium text-xs ${first}`}
        >
          <button className="uppercase hover:underline">{link.text}</button>
        </Link>
      )
    })
  const events = currentEvents && currentEvents.map((event: Events, i: number) => <EventCard key={i} event={event} />)
  events?.push(<AllEventsCard key="all-events" />)

  return (
    <div
      key={banner.id}
      className={`col-span-4 tablet:col-span-6 py-3 pb-6 px-3 tablet:px-6 bg-zinc-800 bg-opacity-90 ${first} ${last}`}
    >
      <div className="grid grid-cols-3 tablet:grid-cols-6 gap-3 tablet:gap-x-6">
        <div className="col-span-3 tablet:col-span-6 row-start-1">
          <h3 className="text-sm tablet-lg:text-md font-medium text-indigo-50">
            <span className="">{parse(banner.title)}</span>
          </h3>
        </div>
        <div className="col-span-2 tablet:col-span-5 row-start-2">
          <div className=" h-24 bg-opacity-60 flex divide-x divide-indigo-50 divide-dotted overflow-x-auto">
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
  const { title, slug, start_date, people } = props.event
  const startDate = new Date(start_date)

  // If the startDate is today...
  const today = new Date()
  const fullDay =
    startDate.toDateString() === today.toDateString()
      ? "Today"
      : new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(startDate)

  const eventYear = startDate.getFullYear()
  const eventMonth = startDate.getMonth() + 1
  const eventDay = startDate.getDate()

  const firstPerson = people[0] && people[0].people_id ? people[0].people_id.portrait : null
  const firstPersonPortrait = firstPerson && firstPerson.filename_disk ? firstPerson.filename_disk : null

  const permalink = getPermalink({
    eventYear: eventYear,
    eventMonth: eventMonth,
    eventDay: eventDay,
    slug: slug,
    type: PageType.Event,
  })

  return (
    <div className="px-3 first:pl-0">
      <Link
        href={permalink}
        className={`block rounded-xl w-32 h-24 ${style.card} hover:no-underline relative overflow-hidden`}
      >
        {firstPersonPortrait && (
          <Image
            className={`absolute -top-0 left-0 right-0 bottom-0`}
            priority
            id={`event-${slug}`}
            src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}${firstPersonPortrait}?key=nse-promo`}
            width={128}
            height={96}
            alt={"alt"}
            sizes="20vw"
          />
        )}
        <div
          className={`z-10 relative top-0 flex flex-col justify-between bg-zinc-800 bg-opacity-60 px-1.5 py-1 h-24 ${style.card}`}
        >
          <p className="uppercase text-lime-200 font-normal text-xs">{fullDay}</p>
          <h3 className="text-xs text-white font-bold leading-[14px]">{title}</h3>
        </div>
      </Link>
    </div>
  )
}

const AllEventsCard = () => {
  return (
    <div className="px-3 last:pr-0">
      <div
        className={`bg-white bg-opacity-20 rounded-xl w-32 h-24 px-3 ${style.card} flex flex-col justify-center items-center`}
      >
        <p className="text-indigo-50 text-xs uppercase">
          <Link href={`/events`}>All events</Link> »
        </p>
      </div>
    </div>
  )
}

export default BannerNewSocialEnvironment
