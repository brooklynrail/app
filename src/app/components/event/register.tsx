"use client"

import { EventProps } from "@/app/event/[year]/[month]/[day]/[slug]/page"
import { eventStartDate, formatTime } from "../../../../lib/utils/events/utils"

const Register = (props: EventProps) => {
  const { eventData } = props
  const { title, deck, start_date, airtable_id } = eventData

  // get the start date in this format:
  // Wed, Oct 16  at  1 p.m. ET / 10 a.m. PT
  const startDate = new Date(start_date)
  const startDateString = eventStartDate(startDate)
  // Get the time in both Eastern and Pacific time
  const startTimeET = formatTime(startDate, "America/New_York")
  const startTimePT = formatTime(startDate, "America/Los_Angeles")

  return (
    <aside id="register" className="h-entry py-6 tablet-lg:py-12 bg-orange-100">
      <div className="px-6 desktop:max-w-screen-widescreen mx-auto">
        <div className="grid grid-cols-4 desktop:grid-cols-12 gap-3 gap-y-9">
          <div className="col-span-4 desktop:col-span-6 desktop:col-start-3">
            <div className="flex flex-col space-y-3">
              <h2 className="text-4xl font-bold">Register</h2>
              <div className="flex flex-col">
                <p className="text-lg font-bold">{title}</p>
                {deck && <p className="text-lg font-light">{deck}</p>}
                <p className="text-lg font-light">
                  {startDateString} at {startTimeET} ET / {startTimePT} PT
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
