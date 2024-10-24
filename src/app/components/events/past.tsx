"use client"
import { PastEventsProps } from "@/app/events/past/page"
import Link from "next/link"
import Paper, { PaperType } from "../paper"
import PastEventsList from "./pastEventsList"

const limit = 16 * 2

const PastEventsPage = (props: PastEventsProps) => {
  const { navData } = props
  return (
    <Paper pageClass="paper-events-past" type={PaperType.Default} navData={navData}>
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
