"use client"
import { Events, HomepageBanners } from "@/lib/types"
import { getPermalink, PageType } from "@/lib/utils"
import parse from "html-react-parser"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import style from "./banner.module.scss"
import Loading from "./loading"

interface NewSocialEnvironmentProps {
  banner: HomepageBanners
  layout: "wide" | "narrow"
}

// Content Component
const NewSocialEnvironment = (props: NewSocialEnvironmentProps) => {
  const { banner, layout } = props
  const [events, setEvents] = useState<Events[] | null>(null)
  const [loading, setLoading] = useState(true)
  const now = new Date()
  const today = now.toISOString().split("T")[0]

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const eventsData = await fetch(`/api/events/upcoming/?cache=${today}`, {
          cache: "no-store",
        })
        const events = await eventsData.json()

        if (!events || !Array.isArray(events)) {
          setEvents(null)
          throw new Error("Invalid data structure received")
        }

        setEvents(events)
      } catch (error) {
        console.error("❌ Error in loadEvents:", error)
      } finally {
        setLoading(false)
      }
    }

    void loadEvents()
  }, [banner])

  const { collections_id } = banner
  if (!collections_id) {
    console.log("⚠️ No collections_id in banner")
    return <></>
  }

  const allEvents = events && events.length > 0 && (
    <>
      {events.map((event: Events) => (
        <EventCard key={event.id} event={event} />
      ))}
    </>
  )

  if (layout === "wide") {
    return (
      <div className={`flex flex-col tablet-lg:flex-row divide-x rail-divide`}>
        <div className="px-3 tablet-lg:px-6 py-1.5 w-full tablet-lg:w-mobile desktop:w-mobile-lg flex-none">
          <h3 className="text-sm tablet-lg:text-lg font-medium">
            <Link href="/events">{collections_id.title}</Link>
          </h3>
          {collections_id.description && <div className="text-xs">{parse(collections_id.description)}</div>}
          <div className="hidden tablet:flex flex-wrap gap-x-3 gap-y-1.5 w-full pt-3">
            <Link
              href={`/events`}
              className={`p-1.5 rounded-sm text-center uppercase font-medium text-xs border rail-border`}
            >
              Current events
            </Link>
            <Link href={`/events/past`} className={`p-1.5 text-center uppercase font-medium text-xs`}>
              Past events
            </Link>
          </div>
        </div>
        <div className="flex divide-x rail-divide overflow-x-auto overflow-y-hidden no-scrollbar pl-3 tablet-lg:pl-6 pr-3 py-1.5 bg-opacity-60">
          {loading || !events ? (
            <Loading />
          ) : (
            <>
              {allEvents} <AllEventsCard type="past" />
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={`flex space-y-3 flex-col`}>
      <div className="w-full px-6">
        <h3 className="text-sm tablet-lg:text-lg font-medium">
          <Link href="/events">{collections_id.title}</Link>
        </h3>
        {collections_id.description && <div className="text-xs">{parse(collections_id.description)}</div>}
      </div>
      <div className="flex space-x-6">
        <div className="bg-opacity-60 flex divide-x rail-divide overflow-x-auto overflow-y-hidden no-scrollbar pl-6 pr-3">
          {loading || !events ? (
            <Loading />
          ) : (
            <>
              {allEvents} <AllEventsCard type="past" />
            </>
          )}
        </div>
      </div>
      <div className="hidden tablet:flex flex-wrap gap-x-3 gap-y-1.5 w-full pt-3 pl-6">
        <Link
          href={`/events`}
          className={`p-1.5 rounded-sm text-center uppercase font-medium text-xs border rail-border`}
        >
          Current events
        </Link>
        <Link href={`/events/past`} className={`p-1.5 text-center uppercase font-medium text-xs`}>
          Past events
        </Link>
      </div>
    </div>
  )
}

interface EventCardProps {
  event: Events
}

const EventCard = (props: EventCardProps) => {
  const { title, slug, start_date, people = [], featured_image } = props.event

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
    <div className="px-1.5 w-36 flex-none first:pl-0">
      <Link href={permalink} className={`block rounded-xl ${style.card} hover:no-underline relative overflow-hidden`}>
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

const FeaturedEventCard = (props: EventCardProps) => {
  const { title, slug, start_date, youtube_id } = props.event
  const startDate = new Date(start_date)

  const eventYear = startDate.getFullYear()
  const eventMonth = startDate.getMonth() + 1
  const eventMonthText = new Intl.DateTimeFormat("en-US", { month: "long" }).format(startDate)
  const eventDay = startDate.getDate()

  const kicker = `${eventMonthText} ${eventDay}, ${eventYear}`
  const youtube_image = `https://i.ytimg.com/vi/${youtube_id}/mqdefault.jpg`

  const permalink = getPermalink({
    eventYear,
    eventMonth,
    eventDay,
    slug,
    type: PageType.Event,
  })

  return (
    <div className="px-1.5 w-36 flex-none first:pl-0">
      <Link
        href={permalink}
        className={`block rounded-xl h-24 ${style.card} hover:no-underline relative overflow-hidden flex items-center justify-center`}
      >
        <Image
          className="h-full w-full -top-0 left-0 right-0 bottom-0 object-cover"
          priority={true}
          id={`event-${slug}`}
          src={youtube_image}
          width={128}
          height={96}
          alt="alt"
          sizes="15vw"
        />
      </Link>
      <div className="z-10 relative top-0 flex flex-col space-y-1.5">
        <p className="uppercase rail-text font-normal text-xs">{kicker}</p>
        <h3 className="text-xs rail-text font-bold leading-[14px]">
          <Link href={permalink}>{title}</Link>
        </h3>
      </div>
    </div>
  )
}

interface AllEventsCardProps {
  type?: "current" | "past"
}

const AllEventsCard = ({ type = "current" }: AllEventsCardProps) => (
  <div className="px-1.5 last:pr-0">
    <div className="bg-zinc-800 bg-opacity-20 rounded-xl w-32 h-24 px-3 flex flex-col justify-center items-center">
      <p className="text-xs uppercase">
        <Link href={type === "current" ? "/events" : "/events"}>
          {type === "current" ? "Current events" : "More events"} »
        </Link>
      </p>
    </div>
  </div>
)

export default NewSocialEnvironment
