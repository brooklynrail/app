"use client"
import { PastEventsProps } from "@/app/events/past/page"
import Link from "next/link"
import Paper from "../paper"
import PastEventsList from "./pastEventsList"
import SearchField from "../search/searchField"

const PastEventsPage = (props: PastEventsProps) => {
  const { navData } = props
  return (
    <Paper pageClass="theme-events" navData={navData}>
      <main className="px-3 tablet-lg:px-6 pb-12 desktop:max-w-screen-widescreen mx-auto">
        <div className="space-y-6 divide-y rail-divide">
          <div className="pt-9">
            <div className="flex justify-between items-center">
              <div className="space-y-3">
                <h1 className="font-bold text-4xl tablet-lg:text-5xl">Past Events</h1>
                <p className="">
                  <Link className="text-indigo-500 font-medium" href={`/events`}>
                    Upcoming Events
                  </Link>
                </p>
              </div>
              <div className="hidden tablet-lg:block w-72 desktop:w-96">
                <SearchField />
              </div>
            </div>
          </div>
          <PastEventsList {...props} limit={32} />
        </div>
      </main>
    </Paper>
  )
}

export default PastEventsPage
