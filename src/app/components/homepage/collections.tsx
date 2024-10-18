"use client"
import { Collections } from "../../../../lib/types"
import CollectionArt from "../collections/art"
import CollectionArtSeen from "../collections/artSeen"
import CollectionBooks from "../collections/books"
import CollectionCriticsPage from "../collections/criticspage"
import CollectionMusic from "../collections/music"
import CollectionPoetry from "../collections/poetry"

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

export const CollectionSection = (collection: Collections) => {
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
      return <CollectionCriticsPage {...collection} />
      break
    case Collection.Dance:
      console.log("Dance")
      break
    case Collection.Film:
      console.log("Film")
      break
    case Collection.Music:
      return <CollectionMusic {...collection} />
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
