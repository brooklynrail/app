"use client"
import parse from "html-react-parser"
import { getPermalink, PageType } from "../../../../lib/utils"
import { Events } from "../../../../lib/types"
import Link from "next/link"
import { formatTime } from "."

const EventCard = ({ event }: { event: Events }) => {
  const { title, slug, deck, start_date, type, series } = event

  console.log(event.type)

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
  }).format(eventDate)

  const startTimeET = formatTime(eventDate, "America/New_York")
  const startTimePT = formatTime(eventDate, "America/Los_Angeles")

  return (
    <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3 tablet-lg:gap-y-12 py-6">
      <div className="col-span-4 tablet-lg:col-span-3">
        <p className="font-bold">{startDate}</p>
        <p>
          {startTimeET} ET / {startTimePT} PT
        </p>
      </div>
      <div className="order-first tablet-lg:order-none col-span-4 tablet-lg:col-span-6">
        <div className="flex flex-col space-y-1">
          <p className="flex space-x-3 text-sm">
            {type && <span className="uppercase text-nowrap font-normal">{parse(type)}</span>}
            {series && <span className="border-l rail-border"></span>}
            {series && <span className="">#{series}</span>}
          </p>
          <div className="flex flex-col">
            <h2 className="text-3xl font-medium">
              <Link href={permalink}>{title}</Link>
            </h2>
            {deck && <p className="text-lg font-light">{parse(deck)}</p>}
          </div>
        </div>
      </div>
      <div className="order-last tablet-lg:order-none col-span-4 tablet-lg:col-span-3">
        <div className="flex w-full tablet-lg:justify-end">
          <Link href={permalink}>
            <button className="border-2 border-indigo-600 text-indigo-600 rounded-sm uppercase text-sm tablet:text-md py-1 px-3">
              Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default EventCard
