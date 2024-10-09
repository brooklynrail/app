"use client"
import Footer from "../footer"
import CoversPopup from "../issueRail/coversPopup"
import Header, { HeaderType } from "../header"
import ThemeToggle from "../themeToggle"
import { useTheme } from "../theme"
import { PopupProvider } from "../issueRail/popupProvider"
import Paper from "../paper"
import { EventProps } from "@/app/event/[year]/[month]/[day]/[slug]/page"
import Link from "next/link"
import { getPermalink, PageType } from "../../../../lib/utils"
import parse from "html-react-parser"
import { EventsPeople, EventsPeople1, People } from "../../../../lib/types"
import PortraitImage from "../portraitImage"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInstagram } from "@fortawesome/free-brands-svg-icons"
import { faGlobeAmericas } from "@fortawesome/free-solid-svg-icons"
import { formatTime } from "../events"
import Register from "./register"
import EventVideo from "./eventVideo"

const EventPage = (props: EventProps) => {
  const { eventData } = props
  const { title, deck, start_date, end_date, excerpt, section, series, body_text, youtube_id, event_id } = eventData
  const { theme, setTheme } = useTheme()

  const isFutureEvent = new Date(start_date) > new Date()
  const eventsPermalink = getPermalink({
    type: PageType.Events,
  })

  // get the start date in this format:
  // Wed, Oct 16  at  1 p.m. ET / 10 a.m. PT
  const startDate = new Date(start_date)
  const startDateString = startDate.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  })

  const startTimeET = formatTime(startDate, "America/New_York")
  const startTimePT = formatTime(startDate, "America/Los_Angeles")

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
    <PopupProvider>
      <Paper pageClass="paper-event">
        <Header type={HeaderType.Default} />
        <main className="px-3 desktop:max-w-screen-widescreen mx-auto h-event">
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
                    {deck && (
                      <p className="text-center text-xl tablet-lg:text-3xl font-light p-summary">{parse(deck)}</p>
                    )}
                  </div>
                  {isFutureEvent && (
                    <button
                      onClick={handleRegister}
                      className="py-3 px-6 rounded-md text-lg uppercase bg-purple-800 text-white hover:underline underline-offset-4"
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
                </div>
              </div>
            </div>
          </article>
        </main>
        {isFutureEvent && <Register {...props} />}
        <Footer />
      </Paper>
      <ThemeToggle {...{ theme, setTheme }} />
      <CoversPopup />
    </PopupProvider>
  )
}

const Person = ({ person, index }: { person: People; index: number }) => {
  const { bio, instagram, portrait, display_name, website } = person
  const instagram_url = `https://www.instagram.com/${instagram}`
  return (
    <div key={index} className="flex flex-col space-y-3 pt-3">
      <div className="space-y-1">
        <h3 className="font-bold text-xl p-name">{display_name}</h3>
        <div className="text-md tablet-lg:text-lg content-bio p-note">
          {portrait ? (
            <div className="float-right ml-3">
              <PortraitImage image={portrait} title={display_name} />
            </div>
          ) : null}
          <p>{parse(bio)}</p>
        </div>
        {website && (
          <p className="text-sm space-x-1 flex items-center !mb-1">
            <FontAwesomeIcon className="relative top-[1px] no-underline" icon={faGlobeAmericas} />
            <Link href={website} target="_blank" rel="noopener noreferrer u-url">
              {person.website}
            </Link>
          </p>
        )}
        {instagram && (
          <p className="text-sm space-x-1 flex items-center">
            <FontAwesomeIcon className="relative top-[1px] no-underline" icon={faInstagram} />
            <Link href={instagram_url} target="_blank" rel="noopener noreferrer u-url">
              {instagram}
            </Link>
          </p>
        )}
      </div>
    </div>
  )
}

const Poets = ({ poets }: { poets: EventsPeople1[] }) => {
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

const SoundWaves = () => {
  return (
    <svg
      className="w-card-lg"
      viewBox="0 0 242 19"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
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
