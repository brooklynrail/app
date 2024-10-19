"use client"
import Link from "next/link"
import Header, { HeaderType } from "../header"
import Paper from "../paper"
import { PastEventsProps } from "@/app/events/past/page"
import PastEventsList from "./pastEventsList"

const limit = 16 * 2

const PastEventsPage = (props: PastEventsProps) => {
  return (
    <Paper pageClass="paper-events-past">
      <Header type={HeaderType.Events} />
      <main className="px-6 tablet-lg:px-3 pb-12 desktop:max-w-screen-widescreen mx-auto">
        <div className="space-y-9 divide-y rail-divide">
          <div className="pt-9 space-y-3 tablet-lg:space-y-6">
            <h1 className="font-bold text-4xl tablet-lg:text-5xl">Past Events</h1>
            <p className="">
              <Link className="text-indigo-500 font-medium" href={`/events`}>
                Upcoming Events
              </Link>
            </p>
          </div>
          <PastEventsList {...props} limit={32} />
        </div>
      </main>
    </Paper>
  )
}

export default PastEventsPage
