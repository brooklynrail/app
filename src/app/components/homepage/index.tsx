"use client"
import CoversPopup from "../issueRail/coversPopup"
import { HomePageProps } from "@/app/page"
import Header from "../header"
import { Articles, Sections, Tributes } from "../../../../lib/types"
import { PopupProvider } from "../issueRail/popupProvider"
import CollectionArt from "../collections/art"
import CollectionArtSeen from "../collections/artSeen"

export interface PromoProps {
  currentArticles: Articles[]
  year: number
  month: number
}

const HomePage = (props: HomePageProps) => {
  const { homepageData } = props

  const allCollections = homepageData.collections.map((collection) => {
    if (collection.collection === "sections" && "name" in collection.item) {
      return <CollectionSection key={collection.item.slug} {...collection.item} />
    } else if (collection.collection === "tributes" && "title" in collection.item) {
      return <CollectionTribute key={collection.item.slug} {...collection.item} />
    }
    return null
  })

  // const { slug } = thisIssueData
  const issueClass = `issue-}`

  return (
    <>
      <PopupProvider>
        <div className={`paper ${issueClass}`}>
          <div className="wrapper home">
            <header role="banner">
              <div className="grid grid-cols-4 tablet:grid-cols-12 gap-4 desktop:gap-3 gap-y-4">
                <div className="col-span-12">
                  <Header />
                </div>
              </div>
            </header>

            <main>{allCollections}</main>
          </div>
        </div>
        <CoversPopup />
      </PopupProvider>
    </>
  )
}

export enum Collection {
  Art = "art",
  ArtSeen = "artseen",
  Books = "books",
  Dance = "dance",
  Film = "film",
  Music = "music",
  Theater = "theater",
}

const CollectionSection = (collection: Sections) => {
  const { slug } = collection

  switch (slug) {
    case Collection.Art:
      return <CollectionArt {...collection} />
    case Collection.ArtSeen:
      return <CollectionArtSeen {...collection} />
    case Collection.Books:
      console.log("Books")
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
    default:
      console.log("Default")
      break
  }
}

const CollectionTribute = (collection: Tributes) => {
  return <CollectionTribute {...collection} />
}

export default HomePage
