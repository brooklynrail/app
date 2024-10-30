import parse from "html-react-parser"
import Link from "next/link"
import { useEffect, useState } from "react"
import { HomepageCollections, Issues } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import { getCurrentIssueData } from "../../../../lib/utils/homepage"
import { CollectionType } from "../homepage"

interface CurrentCollectionsProps {
  collections: HomepageCollections[]
}

const CurrentCollections = (props: CurrentCollectionsProps) => {
  const { collections } = props
  const [issue, setIssue] = useState<Issues | undefined>(undefined)

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
      <li key={`menu-${thisCollection.id}`} className="text-center">
        <Link href={permalink} className="py-3 block text-sm font-bold uppercase text-center">
          {parse(thisCollection.title)}
        </Link>
      </li>
    )
  })

  return (
    <ul className="divide-y rail-divide">
      {allCollections}
      <li className="text-center">
        <Link
          href={`https://intranslation.brooklynrail.org/`}
          className="py-3 block text-sm font-bold uppercase text-center"
        >
          InTranslation
        </Link>
      </li>
    </ul>
  )
}

export default CurrentCollections
