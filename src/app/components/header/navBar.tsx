"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Homepage, HomepageCollections } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import { CollectionType } from "../homepage"
import MenuButton from "./menuButton"

interface NavBarProps {
  navData: Homepage
}

const NavBar = (props: NavBarProps) => {
  const { navData } = props
  const pathname = usePathname()
  const isHomepage = pathname === "/"

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
      <li key={i}>
        <Link href={permalink} className="py-2 px-3 text-nowrap inline-block text-xs font-bold uppercase">
          {thisCollection.title}
        </Link>
      </li>
    )
  })

  return (
    <nav className="navbar sticky top-0 z-[11] border-b rail-border">
      <div className="flex justify-center items-center w-full px-3 tablet:px-6">
        <div className="py-1">
          <MenuButton collections={navData.collections} classes={`w-[7vw] h-[7vw]`} />
        </div>
        <ul className="px-3 flex items-center w-full overflow-x-auto no-scrollbar">
          {!isHomepage && home}
          {allCollections}
        </ul>
        <div className="hidden tablet:flex space-x-2">
          <SubscribeButton />
          <DonateButton />
        </div>
      </div>
    </nav>
  )
}

const SubscribeButton = () => {
  return (
    <Link href={"/subscribe"}>
      <button
        className={`shadow-lg bg-white text-zinc-800 font-medium text-xs tablet:text-sm px-2.5 py-1.5 tablet:px-2.5 tablet:py-1 rounded-sm uppercase hover:underline underline-offset-2`}
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
        className={`shadow-lg bg-red-500 text-white font-medium text-xs tablet:text-sm px-2.5 py-1.5 tablet:px-2.5 tablet:py-1 rounded-sm uppercase hover:underline underline-offset-2`}
      >
        Donate
      </button>
    </Link>
  )
}
export default NavBar
