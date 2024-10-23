import { useEffect, useState } from "react"
import { Events, HomepageCollections, Issues } from "../../../../lib/types"
import { getCurrentIssueData, getPermalink, PageType } from "../../../../lib/utils"
import Link from "next/link"
import { CollectionType } from "../homepage"
import { formatTime, getUpcomingEventsBanner } from "../../../../lib/utils/events/utils"

interface MenuProps {
  closeMenu: () => void
  collections: HomepageCollections[]
}

const Menu = (props: MenuProps) => {
  const { closeMenu, collections } = props
  const [issue, setIssue] = useState<Issues | undefined>(undefined)
  const [currentEvents, setCurrentEvents] = useState<Events[] | undefined>(undefined)

  useEffect(() => {
    const fetchData = async () => {
      if (!currentEvents) {
        const events = getUpcomingEventsBanner()
        const [fetchedEvents] = await Promise.all([events])
        setCurrentEvents(fetchedEvents)
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
          {thisCollection.title}
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

  return (
    <>
      <div className="top-0 left-0 w-[calc(100vw-6rem)] max-w-screen-mobile-lg rail-bg h-screen fixed z-[100] overflow-y-auto !m-0">
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
              <div className="mt-4">
                <input type="text" placeholder="Search..." className="w-full p-2 border border-gray-300 rounded-md" />
              </div>
            </div>
          </div>
          {currentEvents && <EventCard event={currentEvents[0]} />}
          <div className="col-span-3">
            <div>
              <ul className="divide-y rail-divide">{allCollections}</ul>
              <div className="py-3 bg-slate-100 ">
                <ul className="py-3 block text-sm font-bold px-9 space-y-3">
                  <li className="">
                    <Link className="flex space-x-2 w-full" href={`/about/distributors`}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M9 16.5C8.825 16.5 8.675 16.45 8.55 16.35C8.425 16.25 8.33125 16.1187 8.26875 15.9562C8.03125 15.2562 7.73125 14.6 7.36875 13.9875C7.01875 13.375 6.525 12.6562 5.8875 11.8312C5.25 11.0062 4.73125 10.2188 4.33125 9.46875C3.94375 8.71875 3.75 7.8125 3.75 6.75C3.75 5.2875 4.25625 4.05 5.26875 3.0375C6.29375 2.0125 7.5375 1.5 9 1.5C10.4625 1.5 11.7 2.0125 12.7125 3.0375C13.7375 4.05 14.25 5.2875 14.25 6.75C14.25 7.8875 14.0312 8.8375 13.5938 9.6C13.1687 10.35 12.675 11.0938 12.1125 11.8312C11.4375 12.7312 10.925 13.4812 10.575 14.0812C10.2375 14.6687 9.95625 15.2937 9.73125 15.9562C9.66875 16.1312 9.56875 16.2688 9.43125 16.3688C9.30625 16.4563 9.1625 16.5 9 16.5ZM9 13.8187C9.2125 13.3937 9.45 12.975 9.7125 12.5625C9.9875 12.15 10.3875 11.6 10.9125 10.9125C11.45 10.2125 11.8875 9.56875 12.225 8.98125C12.575 8.38125 12.75 7.6375 12.75 6.75C12.75 5.7125 12.3813 4.83125 11.6438 4.10625C10.9188 3.36875 10.0375 3 9 3C7.9625 3 7.075 3.36875 6.3375 4.10625C5.6125 4.83125 5.25 5.7125 5.25 6.75C5.25 7.6375 5.41875 8.38125 5.75625 8.98125C6.10625 9.56875 6.55 10.2125 7.0875 10.9125C7.6125 11.6 8.00625 12.15 8.26875 12.5625C8.54375 12.975 8.7875 13.3937 9 13.8187ZM9 8.625C9.525 8.625 9.96875 8.44375 10.3312 8.08125C10.6937 7.71875 10.875 7.275 10.875 6.75C10.875 6.225 10.6937 5.78125 10.3312 5.41875C9.96875 5.05625 9.525 4.875 9 4.875C8.475 4.875 8.03125 5.05625 7.66875 5.41875C7.30625 5.78125 7.125 6.225 7.125 6.75C7.125 7.275 7.30625 7.71875 7.66875 8.08125C8.03125 8.44375 8.475 8.625 9 8.625Z"
                          fill="#18181B"
                        />
                      </svg>
                      <span>Find the Rail in print</span>
                    </Link>
                  </li>
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
                  <li className="">
                    <Link className="flex space-x-2 w-full" href={`/subscribe`}>
                      <span>Subscribe</span>
                    </Link>
                  </li>
                  <li className="">
                    <Link className="flex space-x-2 w-full" href={`/about/contact`}>
                      <span>Contact us</span>
                    </Link>
                  </li>
                  <li className="">
                    <Link className="flex space-x-2 w-full" href={`/about`}>
                      <span>About The Rail</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
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
