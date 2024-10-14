"use client"
import Header, { HeaderType } from "../header"
import Paper from "../paper"
import { EventProps } from "@/app/event/[year]/[month]/[day]/[slug]/page"
import { EventsPeople, EventsPeople1 } from "../../../../lib/types"
import Register from "./register"
import EventPageBody from "./eventPageBody"
import Person from "./person"

const EventPage = (props: EventProps) => {
  const { eventData } = props
  const { start_date } = eventData

  const isFutureEvent = new Date(start_date) > new Date()

  return (
    <Paper pageClass="paper-event">
      <Header type={HeaderType.Default} />
      <main className="px-6 desktop:max-w-screen-widescreen mx-auto h-event">
        <EventPageBody {...props} />
      </main>
      {isFutureEvent && eventData.airtable_id && <Register {...props} />}
    </Paper>
  )
}

export const Poets = ({ poets }: { poets: EventsPeople1[] }) => {
  const poetArray: Array<string> = []
  const allPoets =
    poets &&
    poets.map((person: EventsPeople, index: number) => {
      const { people_id } = person
      if (!people_id) {
        return null
      }
      const { display_name } = people_id
      poetArray.push(display_name)
      return <Person key={index} person={people_id} index={index} />
    })
  const poetNames = poetArray.join(", ")
  return (
    <div className="divide-y rail-divide space-y-6">
      <p className="text-xl tablet-lg:text-3xl py-3">
        {`The Rail has a tradition of ending our conversations with a poetry reading, and we’re fortunate to have ${poetNames} reading.`}
      </p>
      <div className="pt-6">{allPoets}</div>
    </div>
  )
}

export const SoundWaves = () => {
  return (
    <svg
      className="w-card-lg"
      viewBox="0 0 242 19"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Group-2" transform="translate(1.000000, 1.000000)">
          <path
            d="M0 9C10-1.66666667 20-1.66666667 30 9 40 19.6666667 50 19.6666667 60 9 70-1.66666667 80-1.66666667 90 9c10 10.6666667 20 10.6666667 30 0 10-10.66666667 20-10.66666667 30 0 10 10.6666667 20 10.6666667 30 0 10-10.66666667 20-10.66666667 30 0 10 10.6666667 20 10.6666667 30 0"
            id="Path-3"
            stroke="#70f"
          ></path>
          <path
            d="M0 8.5C8.33333333-2.83333333 16.6666667-2.83333333 25 8.5c8.3333333 11.3333333 16.6666667 11.3333333 25 0 8.3333333-11.33333333 16.6666667-11.33333333 25 0C83.3333333 19.8333333 91.6666667 19.8333333 1e2 8.5c8.333333-11.33333333 16.666667-11.33333333 25 0C133.333333 19.8333333 141.666667 19.8333333 150 8.5 158.333333-2.83333333 166.666667-2.83333333 175 8.5 183.333333 19.8333333 191.666667 19.8333333 2e2 8.5"
            id="Path-4"
            stroke="#bb7fff"
          ></path>
        </g>
      </g>
    </svg>
  )
}

export default EventPage
