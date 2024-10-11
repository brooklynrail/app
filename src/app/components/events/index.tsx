"use client"

import Header, { HeaderType } from "../header"
import { useTheme } from "../theme"
import Paper from "../paper"
import { Events } from "../../../../lib/types"
import Link from "next/link"
import { EventsProps } from "@/app/events/page"
import EventCard from "./eventCard"
import Sponsor from "./sponsor"
import PastEventsPage from "./past"
import PastPageBody from "./pastPageBody"

const EventsPage = (props: EventsProps) => {
  const allEvents = props.allEvents.map((event: Events, index: number) => {
    return <EventCard key={index} event={event} />
  })

  return (
    <Paper pageClass="paper-events">
      <Header type={HeaderType.Default} />
      <main className="px-6 tablet-lg:px-3 pb-12 desktop:max-w-screen-widescreen mx-auto divide-y rail-divide">
        <div className="tablet-lg:px-6 space-y-9 divide-y rail-divide">
          <div className="pt-9 space-y-3 tablet-lg:space-y-6">
            <h1 className="font-bold text-4xl tablet-lg:text-5xl">Upcoming Events</h1>
            <p className="divide-x rail-divide">
              <Link className="pr-3 text-indigo-500 font-medium" href={`/events/past`}>
                Past Events
              </Link>
              <Link
                className="px-3 text-indigo-500 font-medium"
                href={`https://www.youtube.com/thebrooklynrail?sub_confirmation=1`}
              >
                Video Archive
              </Link>
            </p>
          </div>
          <div className="divide-y rail-divide">{allEvents}</div>
          <div>
            <Sponsor />
          </div>
        </div>
        <div className="mx-6">
          <div className="pt-9 space-y-3 tablet-lg:space-y-6">
            <h1 className="font-bold text-4xl tablet-lg:text-5xl">Past Events</h1>
            <p className="divide-x rail-divide">
              <Link className="pr-3 text-indigo-500 font-medium" href={`/events`}>
                Upcoming Events
              </Link>
              <Link
                className="px-3 text-indigo-500 font-medium"
                href={`https://www.youtube.com/thebrooklynrail?sub_confirmation=1`}
              >
                Video Archive
              </Link>
            </p>
          </div>
          <PastPageBody {...props} />
        </div>
      </main>
    </Paper>
  )
}

// format the time of start_date as 1 p.m. ET / 10 a.m. PT
export const formatTime = (date: Date, timeZone: string) => {
  const formattedTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: timeZone,
  }).format(date)

  const [time, period] = formattedTime.split(" ")
  const [hour, minute] = time.split(":")

  const formattedPeriod = period.toLowerCase().replace("am", "a.m.").replace("pm", "p.m.")

  return minute === "00" ? `${hour} ${formattedPeriod}` : `${hour}:${minute} ${formattedPeriod}`
}

export default EventsPage
