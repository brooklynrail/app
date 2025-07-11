"use client"
import { HomePageProps } from "@/lib/railTypes"
import { Articles, HomepageCollections } from "@/lib/types"
import { useEffect } from "react"
import CollectionRailCommunity from "../collections/railCommunity"
import CollectionTileAds from "../collections/tileAds"
import CollectionTribute from "../collections/tribute"
import { usePageContext } from "../pageContext"
import Paper, { PaperType } from "../paper"
import { CollectionSection } from "./collections"

export interface PromoProps {
  currentArticles: Articles[]
  year: number
  month: number
}

export enum CollectionType {
  Section = "section",
  Tribute = "tribute",
  Banner = "banner",
  Ad = "ad",
  RailCommunity = "rail_community",
}

const HomePage = (props: HomePageProps) => {
  const { collectionsData, currentIssue, homepageHeaderData, navData, previewURL, eventsBreakDetails } = props
  const { setCurrentContext } = usePageContext()

  useEffect(() => {
    setCurrentContext("issue")
    return () => setCurrentContext(null) // Clear context on unmount if needed
  }, [setCurrentContext])

  const allCollections = collectionsData.collections.map((collection: HomepageCollections, i: number) => {
    const thisCollection = collection.collections_id
    if (!thisCollection) {
      return null
    }

    const collectionComponent = (() => {
      switch (thisCollection.type) {
        case CollectionType.Section:
          return <CollectionSection key={`${i}-${thisCollection.id}`} {...thisCollection} />
        case CollectionType.Tribute:
          return <CollectionTribute key={`${i}-${thisCollection.id}`} {...thisCollection} />
        case CollectionType.Ad:
          return <CollectionTileAds key={`${i}-${thisCollection.id}`} {...thisCollection} />
        case CollectionType.RailCommunity:
          return <CollectionRailCommunity key={`${i}-${thisCollection.id}`} {...thisCollection} />
        default:
          return null
      }
    })()

    return collectionComponent
  })

  return (
    <Paper
      pageClass={`theme-homepage`}
      type={PaperType.Homepage}
      navData={navData}
      currentIssue={currentIssue}
      homepageHeaderData={homepageHeaderData}
      eventsBreakDetails={eventsBreakDetails}
      collectionsData={collectionsData}
      previewURL={previewURL}
    >
      <main className="divide-y rail-divide">{allCollections}</main>
    </Paper>
  )
}

export default HomePage
