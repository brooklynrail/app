"use client"

import { EventsProps } from "@/app/events/page"
import Link from "next/link"
import { Events } from "../../../../lib/types"
import Paper from "../paper"
import EventCard from "./eventCard"
import PastEventsList from "./pastEventsList"
import Sponsor from "./sponsor"

const EventsPage = (props: EventsProps) => {
  const { navData } = props
  const allEvents = props.allEvents.map((event: Events, index: number) => {
    return <EventCard key={index} event={event} eventTypes={props.eventTypes} priority={false} />
  })

  return (
    <Paper pageClass="theme-events" navData={navData}>
      <main className="px-3 tablet-lg:px-6 pb-12 desktop:max-w-screen-widescreen mx-auto divide-y rail-divide">
        <div className="space-y-9 divide-y rail-divide">
          <div className="pt-9 flex flex-col tablet-lg:flex-row tablet-lg:justify-between tablet-lg:items-end space-y-3 tablet-lg:space-y-0">
            <h1 className="font-bold text-4xl tablet-lg:text-5xl">Upcoming Events</h1>
            <p className="">
              <Link className="text-lg tablet-lg:text-2xl font-normal underline" href={`/events/past`}>
                Past Events
              </Link>
            </p>
          </div>
          <div className="divide-y rail-divide">
            {allEvents}
            <div className="py-12">
              <div className="max-w-screen-tablet mx-auto space-y-3">
                <div className="text-center text-lg">
                  <p>❄️</p>
                  <h2>The New Social Environment is on break</h2>
                </div>
                <p className="text-center">
                  We look forward to seeing you <strong>Monday, January 6, 2025</strong> for more live dialogues with
                  artists, filmmakers, writers, and poets. In the meantime, dive into our archive.
                </p>
                <p className="text-center">
                  <a href="https://brooklynrail.org/newsletter" title="Sign up for the newsletter">
                    <button
                      className="bg-zinc-800 dark:bg-slate-100 text-slate-100 dark:text-zinc-800 px-3 py-1 rounded-md"
                      type="button"
                      name="register"
                    >
                      <span>Get notified</span>
                    </button>
                  </a>
                </p>
              </div>
            </div>
            <div className="py-12">
              <div className="max-w-screen-tablet-lg mx-auto">
                <Sponsor />
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="pt-9 space-y-3 tablet-lg:space-y-6">
            <h1 className="font-bold text-4xl tablet-lg:text-5xl">Past Events</h1>
          </div>
          <PastEventsList {...props} />
        </div>
      </main>
    </Paper>
  )
}

export default EventsPage
