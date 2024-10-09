"use client"
import parse from "html-react-parser"
import Footer from "../footer"
import CoversPopup from "../issueRail/coversPopup"
import Header, { HeaderType } from "../header"
import ThemeToggle from "../themeToggle"
import { useTheme } from "../theme"
import { PopupProvider } from "../issueRail/popupProvider"
import Paper from "../paper"
import { getPermalink, PageType } from "../../../../lib/utils"
import { Events } from "../../../../lib/types"
import Link from "next/link"
import { EventsProps } from "@/app/events/page"

const EventsPage = (props: EventsProps) => {
  const { theme, setTheme } = useTheme()

  const allEvents = props.allEvents.map((event: Events, index: number) => {
    return <EventCard key={index} event={event} />
  })

  return (
    <PopupProvider>
      <Paper pageClass="paper-page">
        <Header type={HeaderType.Default} />
        <main className="px-3 desktop:max-w-screen-widescreen mx-auto">
          <div className="px-6 space-y-9">
            <div className="pt-9 space-y-6">
              <h1 className="font-normal text-6xl font-serif text-center">Upcoming Events</h1>
              <p className="text-center divide-x rail-divide">
                <Link className="px-3 text-indigo-500 font-medium" href={``}>
                  Past Events
                </Link>
                <Link className="px-3 text-indigo-500 font-medium" href={``}>
                  Video Archive
                </Link>
              </p>
            </div>
            <div className="divide-y rail-divide">{allEvents}</div>
          </div>
        </main>
        <Footer />
      </Paper>
      <ThemeToggle {...{ theme, setTheme }} />
      <CoversPopup />
    </PopupProvider>
  )
}

const EventCard = ({ event }: { event: Events }) => {
  const { title, slug, deck, start_date, section, series } = event

  const eventDate = new Date(start_date)
  const eventyear = eventDate.getFullYear()
  const eventmonth = eventDate.getMonth() + 1
  const eventday = eventDate.getDate()

  const permalink = getPermalink({
    type: PageType.Event,
    eventYear: eventyear,
    eventMonth: eventmonth,
    eventDay: eventday,
    slug: slug,
  })

  // format the start_date as Monday, October 7
  const startDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(eventDate)

  const startTimeET = formatTime(eventDate, "America/New_York")
  const startTimePT = formatTime(eventDate, "America/Los_Angeles")

  return (
    <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3 gap-y-12 py-6">
      <div className="col-span-4 tablet-lg:col-span-3">
        <p className="font-bold">{startDate}</p>
        <p>
          {startTimeET} ET / {startTimePT} PT
        </p>
      </div>
      <div className="col-span-4 tablet-lg:col-span-6">
        <div className="flex flex-col space-y-1">
          <p className="flex space-x-3">
            {section && <span className="uppercase text-nowrap font-normal">{section.name}</span>}
            {series && <span className="border-l rail-border"></span>}
            {series && <span className="">#{series}</span>}
          </p>
          <div className="flex flex-col">
            <h2 className="text-2xl font-medium">
              <Link href={permalink}>{title}</Link>
            </h2>
            {deck && <p className="text-lg font-light">{parse(deck)}</p>}
          </div>
        </div>
      </div>
      <div className="col-span-4 tablet-lg:col-span-3">
        <div className="flex w-full justify-end items-center h-full">
          <Link href={permalink}>
            <button className="border-2 border-indigo-600 text-indigo-600 rounded-sm uppercase text-sm tablet:text-md py-1 px-3">
              Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

// format the time of start_date as 1 p.m. ET / 10 a.m. PT
export const formatTime = (date: Date, timeZone: string) => {
  const formattedTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: timeZone,
  }).format(date)

  const [time, period] = formattedTime.split(" ")
  const [hour, minute] = time.split(":")

  const formattedPeriod = period.toLowerCase().replace("am", "a.m.").replace("pm", "p.m.")

  return minute === "00" ? `${hour} ${formattedPeriod}` : `${hour}:${minute} ${formattedPeriod}`
}

export default EventsPage
