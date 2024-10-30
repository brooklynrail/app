"use client"
import Link from "next/link"
import { Homepage, HomepageCollections } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import { CollectionType } from "../homepage"
import MenuButton from "../menu/menuButton"

interface NavBarProps {
  navData: Homepage
  isHomepage: boolean
}

const NavBar = (props: NavBarProps) => {
  const { navData, isHomepage } = props

  const home = (
    <li>
      <Link href={`/`} className="py-2 px-3 text-nowrap inline-block text-xs font-bold uppercase">
        Home
      </Link>
    </li>
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
        <Link href={permalink} className="py-2 px-2 tablet:px-3 text-nowrap inline-block text-xs font-bold uppercase">
          {thisCollection.title}
        </Link>
      </li>
    )
  })

  return (
    <nav className="navbar sticky top-0 z-[11] border-b rail-border">
      <div className="flex justify-center items-center w-full pl-3 tablet:px-6">
        <div className="py-1.5">
          <MenuButton collections={navData.collections} classes={`w-[8vw] h-[8vw]`} />
        </div>
        <ul className="pr-3 pl-1 flex items-center w-full overflow-x-auto no-scrollbar z-0">
          {!isHomepage && home}
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

const SubscribeButton = () => {
  return (
    <Link href={"/subscribe"}>
      <button
        className={`shadow-lg bg-white text-zinc-800 font-medium text-xs tablet:text-sm px-2.5 py-2 tablet:px-3 tablet:py-2.5 rounded-sm uppercase hover:underline underline-offset-2`}
      >
        Subscribe
      </button>
    </Link>
  )
}

const DonateButton = () => {
  return (
    <Link href={"/donate"}>
      <button
        className={`shadow-lg bg-red-500 text-white font-medium text-xs tablet:text-sm px-2.5 py-2 tablet:px-3 tablet:py-2.5 rounded-sm uppercase hover:underline underline-offset-2`}
      >
        Donate
      </button>
    </Link>
  )
}
export default NavBar
