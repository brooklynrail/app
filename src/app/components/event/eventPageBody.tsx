"use client"
import Link from "next/link"
import { getPermalink, PageType } from "../../../../lib/utils"
import parse from "html-react-parser"
import { EventsPeople } from "../../../../lib/types"
import EventVideo from "./eventVideo"
import Sponsor from "../events/sponsor"
import { Poets, SoundWaves } from "."
import ReactMarkdown from "react-markdown"
import Person from "./person"
import { EventProps } from "@/app/event/[year]/[month]/[day]/[slug]/page"
import { formatEventDate, EventTypes, formatTime, getEventTypeText } from "../../../../lib/utils/events/utils"

const EventPageBody = (props: EventProps) => {
  const { eventData, eventTypes } = props
  const { title, deck, start_date, end_date, summary, type, series, body, youtube_id, airtable_id } = eventData

  // Get the readable event type text
  const eventTypeText = getEventTypeText(type, eventTypes)

  const railProduced = type === EventTypes.TheNewSocialEnvironment || type === EventTypes.CommonGround
  const isFutureEvent = new Date(start_date) > new Date()

  // get the start date in this format:
  // Wed, Oct 16  at  1 p.m. ET / 10 a.m. PT
  const startDate = new Date(start_date + "Z")
  const endDate = new Date(end_date + "Z")
  const dateString = formatEventDate(startDate, endDate)
  const isSameDay = startDate.toDateString() === endDate.toDateString()

  // Get the time in both Eastern and Pacific time
  const startTimeET = formatTime(start_date, "America/New_York")
  const startTimePT = formatTime(start_date, "America/Los_Angeles")

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
      <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3 gap-y-9 tablet-lg:gap-y-16 desktop:gap-y-20">
        <div className="col-span-4 tablet-lg:col-span-12 desktop:col-span-6 desktop:col-start-4">
          <div className="flex flex-col items-center justify-center space-y-3 tablet-lg:space-y-6">
            <p className="flex space-x-3 text-xs tablet-lg:text-sm">
              <span className="uppercase font-normal">
                <Link href={eventsPermalink}>Events</Link>
              </span>
              <span className="border-l rail-border"></span>
              {type && <span className="uppercase font-normal text-nowrap text-center">{parse(eventTypeText)}</span>}
              {series && <span className="border-l rail-border"></span>}
              {series && <span className="">#{series}</span>}
            </p>
            <div className="flex flex-col space-y-3 tablet-lg:space-y-6">
              <h1 className="text-3xl mobile-lg:text-4xl tablet-lg:text-5xl font-bold text-center p-name">
                {parse(title)}
              </h1>
              {deck && <p className="text-center text-2xl tablet-lg:text-4xl font-light p-summary">{parse(deck)}</p>}
              <p className="text-xl text-center font-light space-x-3">
                <strong>{dateString}</strong>{" "}
                {isSameDay && (
                  <span>
                    {startTimeET} Eastern / {startTimePT} Pacific
                  </span>
                )}
              </p>
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

        {railProduced && (
          <div className="col-span-4 tablet-lg:col-span-10 tablet-lg:col-start-2 desktop:col-span-6 desktop:col-start-4">
            <div className="text-md tablet-lg:text-lg text-center p-description bg-white dark:bg-zinc-700 py-3 tablet:py-6 px-3 tablet:px-6 rounded-xl space-y-1">
              <p>These free events are produced by The Brooklyn Rail.</p>
              <p>
                Help us raise <span className="font-medium">$200,000</span> by Dec 31.{" "}
                <Link
                  className="text-violet-600 dark:text-violet-400 block tablet:inline mt-1 tablet:mt-0 hover:no-underline"
                  href={`/donate`}
                >
                  <span className="underline">Leave a donation</span> ✨🌈
                </Link>
              </p>
            </div>
          </div>
        )}

        <div className="col-span-4 tablet-lg:col-span-10 tablet-lg:col-start-2 desktop:col-span-8 desktop:col-start-3 space-y-9">
          <div className="text-xl tablet-lg:text-3xl p-description">{parse(summary)}</div>

          <div className="divide-y rail-divide space-y-12">
            <div className="space-y-3">
              <h3 className="text-lg tablet-lg:text-xl uppercase font-bold">In this Talk</h3>
              {body && (
                <div className="text-xl tablet-lg:text-3xl content">
                  <ReactMarkdown>{body}</ReactMarkdown>
                </div>
              )}
            </div>
            {peopleList}
          </div>

          {eventData.poets && eventData.poets.length > 0 && (
            <>
              <Poets poets={eventData.poets} />
            </>
          )}

          <div className="space-y-9">
            <div className="flex justify-center">
              <SoundWaves />
            </div>
            <Sponsor />
          </div>
        </div>
      </div>
    </article>
  )
}

export default EventPageBody
