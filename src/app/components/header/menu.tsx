import { useEffect, useState } from "react"
import { Events, HomepageCollections, Issues, Pages } from "../../../../lib/types"
import { getCurrentIssueData, getPermalink, PageType } from "../../../../lib/utils"
import Link from "next/link"
import parse from "html-react-parser"
import { CollectionType } from "../homepage"
import { formatTime, getUpcomingEventsBanner } from "../../../../lib/utils/events/utils"
import { getAllPages, getPageData } from "../../../../lib/utils/pages"

interface MenuProps {
  closeMenu: () => void
  collections: HomepageCollections[]
}

const Menu = (props: MenuProps) => {
  const { closeMenu, collections } = props
  const [issue, setIssue] = useState<Issues | undefined>(undefined)
  const [currentEvents, setCurrentEvents] = useState<Events[] | undefined>(undefined)
  const [currentPages, setCurrentPages] = useState<Pages[] | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!currentEvents) {
        const events = await getUpcomingEventsBanner()
        const [fetchedEvents] = await Promise.all([events])
        setCurrentEvents(fetchedEvents)
      }
    }

    fetchData().catch((error) => console.error("Failed to fetch Event data on the Homepage:", error))
  }, [currentEvents])

  useEffect(() => {
    const fetchData = async () => {
      if (!currentPages) {
        const pages = await getAllPages()
        const [fetchedPages] = await Promise.all([pages])
        setCurrentPages(fetchedPages)
      }
    }

    fetchData().catch((error) => console.error("Failed to fetch Event data on the Homepage:", error))
  }, [currentEvents])

  useEffect(() => {
    const fetchData = async () => {
      if (!issue) {
        const issueData = await getCurrentIssueData()
        // Fetch all the data in parallel
        const [fetchedIssue] = await Promise.all([issueData])
        // Update the state with the fetched data as it becomes available
        fetchedIssue && setIssue(fetchedIssue)
      }
    }
    // Call the fetchData function and handle any errors
    fetchData().catch((error) => console.error("Failed to fetch issue data:", error))
  }, [issue])

  const allCollections = collections.map((collection: HomepageCollections, i: number) => {
    const thisCollection = collection.collections_id
    if (!thisCollection) {
      return null
    }

    const permalink = (() => {
      switch (thisCollection.type) {
        case CollectionType.Section:
          if (!thisCollection.section || !thisCollection.section.featured) {
            return null
          }
          return getPermalink({
            sectionSlug: thisCollection.section.slug,
            type: PageType.SuperSection,
          })
        case CollectionType.Tribute:
          if (!thisCollection.tribute) {
            return null
          }
          return getPermalink({
            tributeSlug: thisCollection.tribute.slug,
            type: PageType.Tribute,
          })
        default:
          return null
      }
    })()

    if (!permalink) {
      return null
    }

    return (
      <li key={i} className="text-center">
        <Link href={permalink} className="py-3 block text-sm font-bold uppercase text-center">
          {parse(thisCollection.title)}
        </Link>
      </li>
    )
  })

  const arrow = (
    <svg width="13" height="20" viewBox="0 0 13 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.646447 9.64645C0.451184 9.84171 0.451184 10.1583 0.646447 10.3536L3.82843 13.5355C4.02369 13.7308 4.34027 13.7308 4.53553 13.5355C4.7308 13.3403 4.7308 13.0237 4.53553 12.8284L1.70711 10L4.53553 7.17157C4.7308 6.97631 4.7308 6.65973 4.53553 6.46447C4.34027 6.2692 4.02369 6.2692 3.82843 6.46447L0.646447 9.64645ZM1 10.5H13V9.5H1V10.5Z"
        fill="#18181B"
      />
    </svg>
  )

  const allPages = currentPages?.map((page: Pages, i: number) => {
    const permalink = getPermalink({
      slug: page.slug,
      type: PageType.Page,
    })
    return (
      <li key={i} className="">
        <Link href={permalink} className="block text-sm font-bold">
          {parse(page.title)}
        </Link>
      </li>
    )
  })

  return (
    <div className="top-0 left-0 w-[calc(100vw-6rem)] max-w-screen-mobile-lg rail-bg h-screen fixed z-[100] overflow-y-auto !m-0 bg-slate-50 dark:bg-zinc-700">
      <div className="grid grid-cols-3 gap-x-3">
        <div className="col-span-3">
          <div className="p-6">
            <div className="relative flex flex-row-reverse justify-between w-full ">
              <p
                onClick={closeMenu}
                className="hover:underline font-bold text-xs uppercase flex items-center space-x-1"
              >
                {arrow} <span>Close</span>
              </p>
              <p>
                <Link className="font-bold text-sm uppercase" href="/">
                  Home
                </Link>
              </p>
            </div>
            <div className="mt-4 hidden">
              <input type="text" placeholder="Search..." className="w-full p-2 border border-gray-300 rounded-md" />
            </div>
          </div>
        </div>
        {currentEvents && <EventCard event={currentEvents[0]} />}
        <div className="col-span-3">
          <div className="divide-y rail-divide">
            <ul className="divide-y rail-divide">{allCollections}</ul>
            <div className="py-3 bg-slate-100 dark:bg-zinc-700 pb-48">
              <ul className="py-3 block text-sm font-bold px-9 space-y-3">
                {allPages}
                <li className="">
                  <Link className="flex space-x-2 w-full" href={`/subscribe`}>
                    <span>Sign up for our newsletter</span>
                  </Link>
                </li>
                <li className="">
                  <Link className="flex space-x-2 w-full" href={`/instagram`}>
                    <span>Follow us on Instagram</span>
                  </Link>
                </li>
                <li className="">
                  <Link className="flex space-x-2 w-full" href={`/store`}>
                    <span>Visit our store</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
interface EventCardProps {
  event: Events
}
const EventCard = (props: EventCardProps) => {
  const { title, slug, start_date, end_date } = props.event

  // get the start date in this format:
  // Wed, Oct 16  at  1 p.m. ET / 10 a.m. PT
  const startDate = new Date(start_date + "Z")
  const endDate = new Date(end_date + "Z")

  const isSameDay = startDate.toDateString() === endDate.toDateString()

  // // Get the time in both Eastern and Pacific time
  const startTimeET = formatTime(start_date, "America/New_York")
  const startTimePT = formatTime(start_date, "America/Los_Angeles")

  const eventYear = startDate.getFullYear()
  const eventMonth = startDate.getMonth() + 1
  const eventDay = startDate.getDate()

  const permalink = getPermalink({
    eventYear: eventYear,
    eventMonth: eventMonth,
    eventDay: eventDay,
    slug: slug,
    type: PageType.Event,
  })

  const eventCard = (
    <div className="col-span-3 bg-zinc-800 text-slate-100 py-3">
      <div className="grid grid-cols-3 divide-x divide-white divide-dotted">
        <div className="col-span-2">
          <div className="px-3">
            <h4 className="font-bold text-sm">Today</h4>
            <p className="text-sm">
              <Link href={permalink}>
                <span className="block">
                  {startTimeET} ET / {startTimePT} PT
                </span>{" "}
                <strong>{title}</strong>
              </Link>
            </p>
          </div>
        </div>
        <div className="col-span-1">
          <div className="px-3 flex flex-col text-sm divide-y divide-white divide-dotted">
            <Link className="py-1.5 font-medium" href="/events">
              Upcoming events
            </Link>
            <Link className="py-1.5 font-medium" href="/events/past">
              Past events
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
  return eventCard
}

export default Menu
