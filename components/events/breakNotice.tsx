"use client"

import parse from "html-react-parser"
import { EventsBreakDetails } from "@/lib/railTypes"

const BreakNotice = (props: { eventsBreakDetails: EventsBreakDetails }) => {
  const { eventsBreakDetails } = props

  if (
    !eventsBreakDetails.events_break_start ||
    !eventsBreakDetails.events_break_end ||
    !eventsBreakDetails.events_on_break
  ) {
    return null // no break dates, so no break notice
  }

  const startDate = new Date(eventsBreakDetails.events_break_start)
  const endDate = new Date(eventsBreakDetails.events_break_end)

  const startDateString = startDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  const endDateString = endDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  const now = new Date()
  const heading =
    now >= startDate && now <= endDate
      ? "The New Social Environment is on break"
      : `The New Social Environment is going on break starting ${startDateString}`

  const text = eventsBreakDetails.events_break_text
    ? parse(
        eventsBreakDetails.events_break_text
          .replace("{{end_date}}", endDateString)
          .replace("{{start_date}}", startDateString),
      )
    : `We look forward to seeing you after ${endDateString} for more live dialogues with artists, filmmakers, writers, and poets. In the meantime, dive into our archive.`

  return (
    <div className="py-12 space-y-3">
      <div className="max-w-screen-tablet-lg mx-auto space-y-3">
        <div className="text-center text-lg">
          <h2 className="text-xl font-medium">{heading}</h2>
        </div>
      </div>
      <div className="max-w-screen-tablet mx-auto space-y-3">
        <div className="text-center">{text}</div>
        <div className="text-center">
          <a href="https://brooklynrail.org/newsletter" title="Sign up for the newsletter">
            <button
              className="bg-zinc-800 dark:bg-slate-100 text-slate-100 dark:text-zinc-800 px-3 py-1 rounded-md"
              type="button"
              name="register"
            >
              <span>Get notified</span>
            </button>
          </a>
        </div>
      </div>
    </div>
  )
}

export default BreakNotice
