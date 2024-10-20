"use client"
import Link from "next/link"
import { CollectionType } from "."
import { Homepage, HomepageCollections } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"

interface NavBarProps {
  homepageData: Homepage
}

const NavBar = (props: NavBarProps) => {
  const { homepageData } = props

  const allCollections = homepageData.collections.map((collection: HomepageCollections, i: number) => {
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
        <Link href={permalink} className="py-2 px-3 text-nowrap inline-block">
          {thisCollection.title}
        </Link>
      </li>
    )
  })

  return (
    <nav className="rail-bg pl-3">
      <ul className="text-sm font-bold flex w-full uppercase overflow-x-auto pr-3 no-scrollbar">
        {allCollections} {allCollections}
      </ul>
    </nav>
  )
}

export default NavBar
