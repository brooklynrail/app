"use client"
import { HomePageProps } from "@/app/page"
import Header, { HeaderType } from "../header"
import { Articles, Collections, HomepageCollections, Issues } from "../../../../lib/types"
import Paper from "../paper"
import { useTheme } from "../theme"
import CollectionArt from "../collections/art"
import CollectionArtSeen from "../collections/artSeen"
import CollectionBooks from "../collections/books"
import CollectionPoetry from "../collections/poetry"
import BannerCurrentIssue from "../collections/banner/currentIssue"
import BannerExhibitions from "../collections/banner/exhibitions"
import BannerNewSocialEnvironment from "../collections/banner/newSocialEnvironment"

export interface PromoProps {
  currentArticles: Articles[]
  year: number
  month: number
}

enum CollectionType {
  Section = "section",
  Tribute = "tribute",
  Banner = "banner",
}

const HomePage = (props: HomePageProps) => {
  const { homepageData, currentIssue } = props

  // get only the collections where type equals "banner"
  // const banners = homepageData.collections
  //   .filter((collection: HomepageCollections) => {
  //     return collection.collections_id && collection.collections_id.type === CollectionType.Banner
  //   })
  //   .map((collection: HomepageCollections) => collection.collections_id)
  let banners: Collections[] = []
  homepageData.collections.map((collection: HomepageCollections) => {
    if (collection.collections_id && collection.collections_id.type === CollectionType.Banner) {
      banners.push(collection.collections_id)
    }
  })

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
        console.log("Default")
        return null
    }
  })

  return (
    <Paper pageClass="paper-homepage">
      <header role="banner">
        <div className="grid grid-cols-4 tablet:grid-cols-12 gap-4 desktop:gap-3 gap-y-4">
          <div className="col-span-12">
            <Header type={HeaderType.Default} />
          </div>
        </div>
      </header>

      <main className="divide-y rail-divide">
        {banners && <Banner collections={banners} currentIssue={currentIssue} />}
        {allCollections}
      </main>
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

enum BannerType {
  CurrentIssue = "Current Issue",
  TheNewSocialEnvironment = "The New Social Environment",
  Exhibitions = "Exhibitions",
}

interface BannerProps {
  collections: Collections[]
  currentIssue: Issues
}

const Banner = (props: BannerProps) => {
  const { collections, currentIssue } = props

  const allBanners = collections.map((collection: Collections, index: number) => {
    console.log("collection", collection)
    const { banner_type } = collection
    switch (banner_type) {
      case BannerType.CurrentIssue:
        return <BannerCurrentIssue key={index} collection={collection} currentIssue={currentIssue} />
      case BannerType.Exhibitions:
        return <BannerExhibitions key={index} {...collection} />
      case BannerType.TheNewSocialEnvironment:
        return <BannerNewSocialEnvironment key={index} {...collection} />
      default:
        console.log("Default")
        return null
    }
  })
  return (
    <div className="px-6">
      <div className="grid grid-cols-4 tablet:grid-cols-12 gap-x-3">{allBanners}</div>
    </div>
  )
}

const CollectionSection = (collection: Collections) => {
  const { section } = collection
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
      console.log("Dance")
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
