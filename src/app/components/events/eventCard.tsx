"use client"
import parse from "html-react-parser"
import { getPermalink, PageType } from "../../../../lib/utils"
import { Events, EventsTypes } from "../../../../lib/types"
import Link from "next/link"
import { formatEventDate, formatTime, getEventTypeText } from "../../../../lib/utils/events/utils"

export interface EventCardProps {
  event: Events
  eventTypes: EventsTypes[]
  priority: boolean
}

const EventCard = (props: EventCardProps) => {
  const { event, eventTypes } = props
  const { title, slug, deck, start_date, end_date, all_day, type, series } = event

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

  // get the start date in this format:
  // Wed, Oct 16  at  1 p.m. ET / 10 a.m. PT
  const startDate = new Date(start_date)
  const endDate = new Date(end_date)
  const isSameDay = startDate.toDateString() === endDate.toDateString()
  const startDateString = formatEventDate(startDate, endDate, isSameDay)
  // Get the time in both Eastern and Pacific time
  const startTimeET = formatTime(start_date, "America/New_York")
  const startTimePT = formatTime(start_date, "America/Los_Angeles")

  return (
    <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3 tablet-lg:gap-y-12 py-6">
      <div className="col-span-4 tablet-lg:col-span-3">
        <p className="font-bold pr-12">{startDateString}</p>
        {isSameDay && !all_day && (
          <p>
            {startTimeET} ET / {startTimePT} PT
          </p>
        )}
      </div>
      <div className="order-first tablet-lg:order-none col-span-4 tablet-lg:col-span-6">
        <div className="flex flex-col space-y-1">
          <p className="flex space-x-3 text-sm">
            {type && <span className="uppercase text-nowrap font-normal">{parse(eventTypeText)}</span>}
            {series && <span className="border-l rail-border"></span>}
            {series && <span className="">#{series}</span>}
          </p>
          <div className="flex flex-col">
            <h2 className="text-3xl font-bold">
              <Link href={permalink}>{title}</Link>
            </h2>
            {deck && <p className="text-lg font-normal">{parse(deck)}</p>}
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
