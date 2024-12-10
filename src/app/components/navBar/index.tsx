"use client"
import Link from "next/link"
import { usePostHog } from "posthog-js/react"
import { Homepage, HomepageCollections } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import { CollectionType } from "../homepage"
import { useMenu } from "@/app/hooks/useMenu"

interface NavBarProps {
  navData: Homepage
  isHomepage: boolean
}

const NavBar = (props: NavBarProps) => {
  const { navData, isHomepage } = props
  const posthog = usePostHog()

  const handleNavClick = (linkName: string, linkType: "menu" | "collection" | "home" | "cta") => {
    posthog?.capture("used_navbar", {
      link_name: linkName,
      link_type: linkType,
      path: window.location.pathname,
    })
  }

  const homeLinks = (
    <>
      <li>
        <Link
          href={`/`}
          className="py-2 px-3 text-nowrap inline-block text-xs font-bold uppercase hover:underline-offset-4 hover:decoration-solid"
          onClick={() => handleNavClick("Home", "home")}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          href={`/archive`}
          className="py-2 px-3 text-nowrap inline-block text-xs font-bold uppercase hover:underline-offset-4 hover:decoration-solid"
          onClick={() => handleNavClick("Issues", "collection")}
        >
          Issues
        </Link>
      </li>
      <li>
        <Link
          href={`/events`}
          className="py-2 px-3 text-nowrap inline-block text-xs font-bold uppercase hover:underline-offset-4 hover:decoration-solid"
          onClick={() => handleNavClick("Events", "collection")}
        >
          Events
        </Link>
      </li>
      <li>
        <Link
          href={`https://singing-in-unison.brooklynrail.org/`}
          className="py-2 px-3 text-nowrap inline-block text-xs font-bold uppercase hover:underline-offset-4 hover:decoration-solid"
          onClick={() => handleNavClick("Exhibitions", "collection")}
        >
          Exhibitions
        </Link>
      </li>
    </>
  )

  const allCollections = navData.collections.map((collection: HomepageCollections, i: number) => {
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
          // skip if it's the publisher's message
          if (thisCollection.section.slug === "publishersmessage") {
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
      <li key={`nav-${thisCollection.id}`}>
        <Link
          href={permalink}
          className="py-2 px-2 tablet:px-3 text-nowrap inline-block text-xs font-medium uppercase hover:underline-offset-4 hover:decoration-solid"
          onClick={() => handleNavClick(thisCollection.title, "collection")}
        >
          {thisCollection.title}
        </Link>
      </li>
    )
  })

  return (
    <nav className="navbar sticky top-0 z-[11] border-b rail-border">
      <div className="flex justify-center items-center w-full pl-3 tablet-lg:px-6">
        <div className="py-1.5">
          <MenuButton onMenuClick={() => handleNavClick("Menu Toggle", "menu")} />
        </div>
        <ul className="pr-3 pl-1 flex items-center w-full overflow-x-auto no-scrollbar z-0">
          {!isHomepage && homeLinks}
          {allCollections}
        </ul>
        <div className="hidden tablet:flex space-x-3 z-[2]">
          <SubscribeButton />
          <DonateButton />
        </div>
        <div className="navbar-fade hidden tablet:block pl-3 absolute right-0 -z-1 w-[18rem] h-full bg-gradient-to-r from-transparent from-1% to-white dark:to-zinc-800 to-15%"></div>
      </div>
    </nav>
  )
}

const MenuButton = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const { toggleMenu } = useMenu()

  const pathfill = "fill-zinc-900 dark:fill-slate-100"
  const strokefill = "stroke-zinc-900 dark:stroke-slate-100"

  return (
    <div className="" onClick={onMenuClick}>
      <div className={`w-[42px] h-[42px] shadow-lg rounded-sm bg-white dark:bg-zinc-700 hover:cursor-pointer`}>
        <svg
          onClick={toggleMenu}
          className="w-[42px] h-[42px]"
          viewBox="0 0 27 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4 8H12" className={strokefill} strokeLinecap="round" />
          <path d="M4 14H12" className={strokefill} strokeLinecap="round" />
          <path d="M4 21H18" className={strokefill} strokeLinecap="round" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.056 10.1863C14.2524 12.3401 15.347 14.7375 17.5008 15.5411C19.6545 16.3446 22.0519 15.2501 22.8555 13.0963C23.659 10.9425 22.5645 8.54513 20.4107 7.74157C18.2569 6.93801 15.8596 8.03257 15.056 10.1863ZM14.1191 9.83678C13.1225 12.508 14.48 15.4814 17.1512 16.478C18.5496 16.9997 20.0308 16.8763 21.2678 16.2569L22.2525 18.4136C22.3672 18.6648 22.6638 18.7755 22.915 18.6608C23.1662 18.5461 23.2769 18.2495 23.1622 17.9983L22.1218 15.7197C22.8551 15.1515 23.4443 14.3788 23.7924 13.4459C24.789 10.7746 23.4315 7.80128 20.7603 6.80466C18.0891 5.80804 15.1157 7.16557 14.1191 9.83678Z"
            className={pathfill}
          />
        </svg>
      </div>
    </div>
  )
}

const SubscribeButton = () => {
  const posthog = usePostHog()

  return (
    <Link
      href={"/subscribe"}
      prefetch={false}
      onClick={() =>
        posthog?.capture("used_navbar", {
          link_name: "Subscribe",
          link_type: "action",
          path: window.location.pathname,
        })
      }
    >
      <button
        className={`shadow-lg bg-white text-zinc-800 font-medium text-xs tablet:text-sm px-2.5 py-2 tablet:px-3 tablet:py-2.5 rounded-sm uppercase hover:underline underline-offset-2`}
      >
        Subscribe
      </button>
    </Link>
  )
}

const DonateButton = () => {
  const posthog = usePostHog()

  return (
    <Link
      href={"/donate"}
      prefetch={false}
      onClick={() => {
        posthog?.capture("used_navbar", {
          link_name: "Donate",
          link_type: "action",
          path: window.location.pathname,
        })
        posthog?.capture("clicked_donate", {
          location: "navbar",
        })
      }}
    >
      <button
        className={`shadow-lg bg-red-500 text-white font-medium text-xs tablet:text-sm px-2.5 py-2 tablet:px-3 tablet:py-2.5 rounded-sm uppercase hover:underline underline-offset-2`}
      >
        Donate
      </button>
    </Link>
  )
}
export default NavBar
