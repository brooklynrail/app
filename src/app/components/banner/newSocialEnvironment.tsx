"use client"
import style from "./banner.module.scss"
import Link from "next/link"
import parse from "html-react-parser"
import { useEffect, useState, useMemo } from "react"
import Image from "next/image"
import { Collections, Events, HomepageBanners } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"

interface NewSocialEnvironmentProps {
  banner: HomepageBanners
}

const NewSocialEnvironment = (props: NewSocialEnvironmentProps) => {
  const { banner } = props
  const [currentEvents, setCurrentEvents] = useState<Events[] | undefined>(undefined)
  const [featuredEvents, setFeaturedEvents] = useState<Events[] | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  if (!banner.collections_id) {
    return null
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // First fetch current events
        const currentResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events/`)
        if (!currentResponse.ok) throw new Error("Failed to fetch current events")
        const currentEvents = await currentResponse.json()
        const currentEventsArray = Array.isArray(currentEvents) ? currentEvents : []
        setCurrentEvents(currentEventsArray)

        // Only fetch featured events if we have less than 4 current events
        if (currentEventsArray.length < 4) {
          const featuredResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events/featured/`)
          if (!featuredResponse.ok) throw new Error("Failed to fetch featured events")
          const featuredEvents = await featuredResponse.json()
          setFeaturedEvents(Array.isArray(featuredEvents) ? featuredEvents : [])
        }
      } catch (error) {
        console.error("Failed to fetch events:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Create separate cards for current and featured events
  const currentEventCards = useMemo(() => {
    return (currentEvents || []).map((event: Events) => <EventCard key={event.id} event={event} />)
  }, [currentEvents])

  const featuredEventCards = useMemo(() => {
    return (featuredEvents || []).map((event: Events) => <FeaturedEventCard key={event.id} event={event} />)
  }, [featuredEvents])

  const bannerTitle = banner.collections_id.title
  const bannerDescription = banner.collections_id.description

  return (
    <div
      className={`banner-card col-span-4 tablet-lg:col-span-6 pb-3 pl-3 tablet-lg:pl-6 tablet-lg:pb-0 order-first tablet-lg:order-last`}
    >
      <div className="flex flex-col space-y-3 h-full">
        <div className="w-full">
          <h3 className="text-sm tablet-lg:text-lg font-medium">
            <Link href="/events">{bannerTitle}</Link>
          </h3>
          {bannerDescription && <div className="text-xs">{parse(bannerDescription)}</div>}
        </div>
        <div className="flex space-x-6 h-full pb-3">
          <div className="bg-opacity-60 flex divide-x rail-divide overflow-x-auto no-scrollbar">
            {currentEventCards}
            {featuredEventCards}
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="col-span-1 row-start-2 hidden">
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
  const { title, slug, start_date, people, series, featured_image, youtube_id } = props.event
  const startDate = new Date(start_date)

  const today = new Date()
  const fullDay =
    startDate.toDateString() === today.toDateString()
      ? "Today"
      : new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(startDate)

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
