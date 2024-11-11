"use client"
import parse from "html-react-parser"
import Image from "next/image"
import Link from "next/link"
import { getPermalink, PageType } from "../../../../lib/utils"
import { getEventTypeText } from "../../../../lib/utils/events/utils"
import { EventCardProps } from "./eventCard"
import style from "./events.module.scss"

const PastEventCard = (props: EventCardProps) => {
  const { event, eventTypes, priority } = props
  const { title, slug, deck, start_date, type, series, youtube_id } = event

  // Get the readable event type text
  const eventTypeText = getEventTypeText(type, eventTypes)

  const eventDate = new Date(start_date)
  const eventyear = eventDate.getFullYear()
  const eventmonth = eventDate.getMonth() + 1
  const eventday = eventDate.getDate()

  const permalink = getPermalink({
    type: PageType.Event,
    eventYear: eventyear,
    eventMonth: eventmonth,
    eventDay: eventday,
    slug: slug,
  })

  // format the start_date as Monday, October 7
  const startDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(eventDate)

  const youtube_image = `https://i.ytimg.com/vi/${youtube_id}/mqdefault.jpg`

  return (
    <div className={`tablet:px-3 pb-3 tablet:border-l rail-border ${style.card}`}>
      <div className="py-3 flex-col border-t rail-border">
        <div className="flex flex-col space-y-3 tablet-lg:space-y-6">
          <Link className="relative" href={permalink}>
            <Image
              src={youtube_image}
              alt={title}
              width={800}
              height={800}
              sizes="30vw"
              priority={priority}
              className="rounded"
            />
            <PlayButton />
          </Link>
          <div className="flex flex-col space-y-1.5">
            <p className="flex space-x-1.5 text-xs">
              {type && <span className="uppercase font-normal">{parse(eventTypeText)}</span>}
              {series && <span className="">#{series}</span>}
            </p>

            <h2 className="text-xl tablet-lg:text-2xl font-bold">
              <Link href={permalink}>{title}</Link>
            </h2>
            <p className="text-xs uppercase">{startDate}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const PlayButton = () => {
  return (
    <button className="absolute bottom-3 left-3">
      <svg
        className="relative w-10 h-10 tablet-lg:w-14 tablet-lg:h-14"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0.5" y="0.5" width="59" height="59" rx="3.5" fill="#18181B" fill-opacity="0.7" />
        <rect x="0.5" y="0.5" width="59" height="59" rx="3.5" stroke="white" />
        <path d="M43 30L22.75 41.6913L22.75 18.3087L43 30Z" fill="white" />
      </svg>
    </button>
  )
}

export default PastEventCard
