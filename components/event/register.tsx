"use client"

import { EventProps } from "@/app/event/[year]/[month]/[day]/[slug]/page"
import { formatEventDate, formatTime } from "@/lib/utils/events"

const Register = (props: EventProps) => {
  const { eventData } = props
  const { title, deck, start_date, end_date, airtable_id, all_day } = eventData

  // get the start date in this format:
  // Wed, Oct 16  at  1 p.m. ET / 10 a.m. PT
  const startDate = new Date(start_date)
  const endDate = new Date(end_date)
  const isSameDay = startDate.toDateString() === endDate.toDateString()
  const dateString = formatEventDate(startDate, endDate, isSameDay)
  // Get the time in both Eastern and Pacific time
  const startTimeET = formatTime(start_date, "America/New_York")
  const startTimePT = formatTime(start_date, "America/Los_Angeles")

  return (
    <aside id="register" className="h-entry py-6 tablet-lg:py-12 bg-orange-100">
      <div className="px-6 desktop:max-w-screen-widescreen mx-auto">
        <div className="grid grid-cols-4 desktop:grid-cols-12 gap-3 gap-y-9">
          <div className="col-span-4 desktop:col-span-6 desktop:col-start-3">
            <div className="flex flex-col space-y-3">
              <h2 className="text-4xl font-bold">Register</h2>
              <div className="flex flex-col space-y-3">
                <div className="">
                  <p className="text-lg font-bold">{title}</p>
                  {deck && <p className="font-light">{deck}</p>}
                </div>
                <p className="font-light space-x-3">
                  <span>{dateString}</span>{" "}
                  {isSameDay && !all_day && (
                    <span>
                      {startTimeET} Eastern / {startTimePT} Pacific
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className="event-register">
              <script src="https://static.airtable.com/js/embed/embed_snippet_v1.js"></script>
              <iframe
                className="airtable-embed airtable-dynamic-height my-12"
                src={`https://airtable.com/embed/shrZwZHHxdeEANeeT?backgroundColor=orangeLight&prefill_Event+IDs=${airtable_id}`}
                frameBorder="0"
                width="100%"
                height="1300"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Register
