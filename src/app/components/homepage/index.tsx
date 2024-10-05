"use client"
import CoversPopup from "../issueRail/coversPopup"
import { HomePageProps } from "@/app/page"
import Header, { HeaderType } from "../header"
import { Articles, Collections, HomepageCollections, Sections, Tributes } from "../../../../lib/types"
import { PopupProvider } from "../issueRail/popupProvider"
import CollectionArt from "../collections/art"
import CollectionArtSeen from "../collections/artSeen"
import CollectionTribute from "../collections/tribute"
import CollectionCriticsPage from "../collections/criticspage"
import Paper from "../paper"
import Footer from "../footer"
import ThemeToggle from "../themeToggle"
import { useTheme } from "../theme"

export interface PromoProps {
  currentArticles: Articles[]
  year: number
  month: number
}

enum CollectionType {
  Section = "section",
  Tribute = "tribute",
}

const HomePage = (props: HomePageProps) => {
  const { homepageData } = props
  const { theme, setTheme } = useTheme()

  const allCollections = homepageData.collections.map((collection: HomepageCollections, i: number) => {
    const thisCollection = collection.collections_id
    if (!thisCollection) {
      return null
    }

    switch (thisCollection.type) {
      case CollectionType.Section:
        return <CollectionSection key={`${i}-${thisCollection.id}`} {...thisCollection} />
      case CollectionType.Tribute:
        return <></>
      // return <CollectionTribute {...thisCollection} />
      default:
        return null
    }
  })

  return (
    <PopupProvider>
      <Paper pageClass="paper-search">
        <header role="banner">
          <div className="grid grid-cols-4 tablet:grid-cols-12 gap-4 desktop:gap-3 gap-y-4">
            <div className="col-span-12">
              <Header type={HeaderType.Default} />
            </div>
          </div>
        </header>

        <main>{allCollections}</main>
        <Footer />
      </Paper>
      <ThemeToggle {...{ theme, setTheme }} />
      <CoversPopup />
    </PopupProvider>
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
}

const CollectionSection = (collection: Collections) => {
  const { title, section } = collection
  if (!section) {
    return null
  }

  switch (section.slug) {
    case Collection.Art:
      return <CollectionArt {...collection} />
    case Collection.ArtSeen:
      return <CollectionArtSeen {...collection} />
    case Collection.Books:
      console.log("Books")
      break
    case Collection.CriticsPage:
      return <CollectionCriticsPage {...collection} />
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

export default HomePage
