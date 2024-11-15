"use client"
import style from "./banner.module.scss"
import Link from "next/link"
import parse from "html-react-parser"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Collections, Events } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"

const NewSocialEnvironment = () => {
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
        console.error("Failed to fetch Event data on the Homepage:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, []) // Empty dependency array ensures this runs only once

  const events = currentEvents?.map((event: Events, i: number) => <EventCard key={event.id} event={event} />)
  events?.push(<AllEventsCard key="all-events" />)

  return (
    <div
      className={`banner-card col-span-4 tablet-lg:col-span-6 pb-3 px-3 tablet-lg:px-6 tablet-lg:pb-0 order-first tablet-lg:order-last`}
    >
      <div className="grid grid-cols-3 tablet-lg:grid-cols-6 gap-3 tablet-lg:gap-x-6">
        <div className="col-span-3 tablet-lg:col-span-6 row-start-1">
          <h3 className="text-sm tablet-lg:text-lg font-medium">
            <Link href="/events">
              <span className="">The New Social Environment</span>
            </Link>
          </h3>
        </div>
        <div className="col-span-2 tablet-lg:col-span-5 row-start-2">
          <div className="h-24 bg-opacity-60 flex divide-x rail-divide overflow-x-auto no-scrollbar">
            {!loading && events}
          </div>
        </div>

        <div className="col-span-1 row-start-2">
          <div className="flex flex-col items-center justify-center space-y-1">
            <Link
              href={`/events`}
              className={`py-1 text-center uppercase font-medium text-xs border rail-border px-0.5 flex justify-center w-full`}
            >
              <button className="uppercase hover:underline">Upcoming Events</button>
            </Link>
            <Link
              href={`/events/past`}
              className={`py-1 text-center uppercase font-medium text-xs flex justify-center w-full`}
            >
              <button className="uppercase hover:underline">Past Events</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

interface EventCardProps {
  event: Events
}

const EventCard = (props: EventCardProps) => {
  const { title, slug, start_date, people, featured_image } = props.event
  const startDate = new Date(start_date)

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
  const main_image = featured_image
    ? `${process.env.NEXT_PUBLIC_IMAGE_PATH}${featured_image.filename_disk}?fit=cover&width=256&height=192&quality=85&modified_on=${featured_image.modified_on}`
    : firstPersonPortrait
      ? `${process.env.NEXT_PUBLIC_IMAGE_PATH}${firstPersonPortrait}?fit=cover&width=256&height=192&quality=85${firstPerson && `&modified_on=${firstPerson.modified_on}`}`
      : null

  const permalink = getPermalink({
    eventYear,
    eventMonth,
    eventDay,
    slug,
    type: PageType.Event,
  })

  return (
    <div className="px-1.5 first:pl-0">
      <Link
        href={permalink}
        className={`block rounded-xl w-32 h-24 ${style.card} hover:no-underline relative overflow-hidden`}
      >
        {main_image && (
          <Image
            className="absolute -top-0 left-0 right-0 bottom-0"
            priority={true}
            id={`event-${slug}`}
            src={main_image}
            width={128}
            height={96}
            alt="alt"
            sizes="15vw"
          />
        )}
        <div className="z-10 relative top-0 flex flex-col justify-between bg-zinc-800 bg-opacity-60 px-1.5 py-1 h-24">
          <p className="uppercase text-lime-200 font-normal text-xs">{fullDay}</p>
          <h3 className="text-xs text-white font-bold leading-[14px]">{title}</h3>
        </div>
      </Link>
    </div>
  )
}

const AllEventsCard = () => (
  <div className="px-1.5 last:pr-0">
    <div className="bg-zinc-800 bg-opacity-20 rounded-xl w-32 h-24 px-3 flex flex-col justify-center items-center">
      <p className="text-xs uppercase">
        <Link href={`/events`}>All events</Link> »
      </p>
    </div>
  </div>
)

export default NewSocialEnvironment
