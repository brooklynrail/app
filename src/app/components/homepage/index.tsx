"use client"
import { HomePageProps } from "@/app/page"
import Header, { HeaderType } from "../header"
import { Articles, Collections, HomepageBanners, HomepageCollections, Issues } from "../../../../lib/types"
import Paper from "../paper"
import CollectionArt from "../collections/art"
import CollectionArtSeen from "../collections/artSeen"
import CollectionBooks from "../collections/books"
import CollectionPoetry from "../collections/poetry"
import BannerCurrentIssue from "../collections/banner/currentIssue"
import BannerExhibitions from "../collections/banner/exhibitions"
import BannerNewSocialEnvironment from "../collections/banner/newSocialEnvironment"
import CollectionCriticsPage from "../collections/criticspage"

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
      // case CollectionType.Banner:
      //   return <CollectionBanner key={`${i}-${thisCollection.id}`} {...thisCollection} />
      case CollectionType.Section:
        return <CollectionSection key={`${i}-${thisCollection.id}`} {...thisCollection} />
      case CollectionType.Tribute:
        console.log("Tribute")
        return null
      // return <CollectionTribute {...thisCollection} />
      default:
        // console.log("Default")
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

export enum Collection {
  Art = "art",
  ArtSeen = "artseen",
  Books = "books",
  CriticsPage = "criticspage",
  Dance = "dance",
  Film = "film",
  Music = "music",
  Theater = "theater",
  Poetry = "poetry",
}

const CollectionSection = (collection: Collections) => {
  const { section } = collection
  console.log("CollectionSection", section)
  if (!section) {
    return null
  }

  switch (section.slug) {
    case Collection.Art:
      return <CollectionArt {...collection} />
    case Collection.ArtSeen:
      return <CollectionArtSeen {...collection} />
    case Collection.Books:
      return <CollectionBooks {...collection} />
    case Collection.CriticsPage:
      return <CollectionCriticsPage {...collection} />
      break
    case Collection.Dance:
      console.log("Dance")
      break
    case Collection.Film:
      console.log("Film")
      break
    case Collection.Music:
      console.log("Music")
      break
    case Collection.Theater:
      console.log("Theater")
      break
    case Collection.Poetry:
      return <CollectionPoetry {...collection} />
    default:
      console.log("Default")
      break
  }
}

export default HomePage
