"use client"
import Link from "next/link"
import { CollectionType } from "../homepage"
import { Homepage, HomepageCollections } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import MenuButton from "./menuButton"

interface NavBarProps {
  navData: Homepage
}

const NavBar = (props: NavBarProps) => {
  const { navData } = props

  const allCollections = navData.collections.map((collection: HomepageCollections, i: number) => {
    const thisCollection = collection.collections_id
    if (!thisCollection) {
      return null
    }

    const permalink = (() => {
      switch (thisCollection.type) {
        case CollectionType.Section:
          if (!thisCollection.section) {
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
      <li>
        <Link href={permalink} className="py-2 px-3 text-nowrap inline-block text-sm font-bold uppercase">
          {thisCollection.title}
        </Link>
      </li>
    )
  })

  return (
    <nav className="rail-bg pl-3 sticky top-0 z-[11] border-b rail-border">
      <ul className="flex items-center w-full overflow-x-auto pr-3 no-scrollbar">
        <li className="py-2 px-3 inline-block">
          <MenuButton classes={`w-[7vw] h-[7vw]`} />
        </li>
        {allCollections}
      </ul>
    </nav>
  )
}

export default NavBar
