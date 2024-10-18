"use client"
import { HomePageProps } from "@/app/page"
import { Articles, HomepageCollections } from "../../../../lib/types"
import CollectionTribute from "../collections/tribute"
import Header, { HeaderType } from "../header"
import Paper from "../paper"
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
}

const HomePage = (props: HomePageProps) => {
  const { homepageData, currentIssue, banners } = props

  const allCollections = homepageData.collections.map((collection: HomepageCollections, i: number) => {
    const thisCollection = collection.collections_id
    if (!thisCollection) {
      return null
    }

    switch (thisCollection.type) {
      case CollectionType.Section:
        return <CollectionSection key={`${i}-${thisCollection.id}`} {...thisCollection} />
      case CollectionType.Tribute:
        return <CollectionTribute key={`${i}-${thisCollection.id}`} {...thisCollection} />
      default:
        return null
    }
  })

  return (
    <Paper pageClass="paper-homepage">
      <Header type={HeaderType.Default} banners={banners} currentIssue={currentIssue} />

      <main className="divide-y rail-divide">{allCollections}</main>
    </Paper>
  )
}

export default HomePage
