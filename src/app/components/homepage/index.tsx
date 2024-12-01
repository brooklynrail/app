"use client"
import { HomePageProps } from "@/app/page"
import { Articles, HomepageCollections } from "../../../../lib/types"
import CollectionTribute from "../collections/tribute"
import Paper, { PaperType } from "../paper"
import { CollectionSection } from "./collections"
import AdsTileStrip from "../ads/adsTileStrip"
import { PageContextProvider, usePageContext } from "../pageContext"
import { useEffect } from "react"
import CollectionTileAds from "../collections/tileAds"
import CollectionRailCommunity from "../collections/railCommunity"

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
  const { homepageData, currentIssue, banners, navData } = props
  const { setCurrentContext } = usePageContext()

  useEffect(() => {
    setCurrentContext("issue")
    return () => setCurrentContext(null) // Clear context on unmount if needed
  }, [setCurrentContext])

  const allCollections = homepageData.collections.map((collection: HomepageCollections, i: number) => {
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
      pageClass="paper-homepage"
      type={PaperType.Homepage}
      navData={navData}
      banners={banners}
      currentIssue={currentIssue}
    >
      <main className="divide-y rail-divide">{allCollections}</main>
    </Paper>
  )
}

export default HomePage
