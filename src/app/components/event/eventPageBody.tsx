"use client"
import { EventProps } from "@/app/event/[year]/[month]/[day]/[slug]/page"
import Link from "next/link"
import { getPermalink, PageType } from "../../../../lib/utils"
import parse from "html-react-parser"
import { EventsPeople } from "../../../../lib/types"
import EventVideo from "./eventVideo"
import Sponsor from "../events/sponsor"
import { Person, Poets, SoundWaves } from "."

const EventPageBody = (props: EventProps) => {
  const { eventData } = props
  const { title, deck, start_date, excerpt, section, series, body_text, youtube_id, event_id } = eventData

  const isFutureEvent = new Date(start_date) > new Date()
  const eventsPermalink = getPermalink({
    type: PageType.Events,
  })

  const peopleList = eventData.people.map((person: EventsPeople, index: number) => {
    const { people_id } = person
    if (!people_id) {
      return null
    }
    return <Person key={index} person={people_id} index={index} />
  })

  const handleRegister = () => {
    const register = document.getElementById("register")
    if (register) {
      register.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <article className="h-entry py-6 tablet-lg:py-12">
      <div className="grid grid-cols-4 desktop:grid-cols-12 gap-3 gap-y-9">
        <div className="col-span-4 desktop:col-span-6 desktop:col-start-4">
          <div className="flex flex-col items-center justify-center space-y-3 tablet-lg:space-y-6">
            <p className="flex space-x-3 text-xs tablet-lg:text-sm">
              <span className="uppercase font-normal">
                <Link href={eventsPermalink}>Events</Link>
              </span>
              <span className="border-l rail-border"></span>
              {section && <span className="uppercase font-normal text-nowrap text-center">{section.name}</span>}
              {series && <span className="border-l rail-border"></span>}
              {series && <span className="">#{series}</span>}
            </p>
            <div className="flex flex-col space-y-6">
              <h1 className="text-3xl mobile-lg:text-4xl tablet-lg:text-5xl font-bold text-center p-name">
                {parse(title)}
              </h1>
              {deck && <p className="text-center text-xl tablet-lg:text-3xl font-light p-summary">{parse(deck)}</p>}
            </div>
            {isFutureEvent && (
              <button
                onClick={handleRegister}
                className="py-3 px-6 rounded-md text-lg uppercase bg-violet-800 text-white hover:underline underline-offset-4"
              >
                Register
              </button>
            )}
          </div>
        </div>

        {!isFutureEvent && youtube_id && <EventVideo title={title} youtube_id={youtube_id} />}

        <div
          className={`col-span-4 ${isFutureEvent ? `desktop:col-span-8 desktop:col-start-3` : `desktop:col-span-8 desktop:col-start-2`}`}
        >
          <div className="text-xl tablet-lg:text-3xl p-description">{excerpt}</div>
        </div>
        <div
          className={`col-span-4 ${isFutureEvent ? `desktop:col-span-8 desktop:col-start-3` : `desktop:col-span-8 desktop:col-start-2`}`}
        >
          <div className="flex flex-col space-y-9 tablet-lg:space-y-16">
            <div className="divide-y rail-divide space-y-6">
              <div className="space-y-3">
                <h3 className="text-lg tablet-lg:text-xl uppercase font-bold">In this Talk</h3>
                {body_text && <div className="text-xl tablet-lg:text-3xl content">{parse(body_text)}</div>}
              </div>
              {peopleList}
            </div>
            {eventData.poets && eventData.poets.length > 0 && (
              <>
                <div className="flex justify-center">
                  <SoundWaves />
                </div>
                <Poets poets={eventData.poets} />
              </>
            )}
            <div className="border-t rail-border">
              <Sponsor />
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default EventPageBody
