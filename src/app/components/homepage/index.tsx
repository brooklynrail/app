"use client"
import { HomePageProps } from "@/app/page"
import { Articles, HomepageCollections } from "../../../../lib/types"
import CollectionTribute from "../collections/tribute"
import Paper, { PaperType } from "../paper"
import { CollectionSection } from "./collections"
import AdsTileStrip from "../ads/adsTileStrip"

export interface PromoProps {
  currentArticles: Articles[]
  year: number
  month: number
}

export enum CollectionType {
  Section = "section",
  Tribute = "tribute",
  Banner = "banner",
}

const HomePage = (props: HomePageProps) => {
  const { homepageData, currentIssue, banners, navData, covers } = props

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
        default:
          return null
      }
    })()

    if (i === 1) {
      return (
        <div key={`${i}-ads-${thisCollection.id}`}>
          {collectionComponent}
          <AdsTileStrip />
        </div>
      )
    }

    return collectionComponent
  })

  return (
    <Paper
      pageClass="paper-homepage"
      type={PaperType.Homepage}
      navData={navData}
      banners={banners}
      currentIssue={currentIssue}
      covers={covers}
    >
      <main className="divide-y rail-divide">{allCollections}</main>
    </Paper>
  )
}

export default HomePage
