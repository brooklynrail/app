"use client"
import { Collections } from "../../../../lib/types"
import CollectionArt from "../collections/art"
import CollectionArtSeen from "../collections/artSeen"
import CollectionBooks from "../collections/books"
import CollectionCriticsPage from "../collections/criticspage"
import CollectionDanceFilm from "../collections/danceFilm"
import CollectionDefault from "../collections/default"
import CollectionMusic from "../collections/music"
import CollectionPoetry from "../collections/poetry"
import CollectionTheater from "../collections/theater"

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
    case Collection.Dance:
      return <CollectionDanceFilm {...collection} />
    case Collection.Film:
      return <CollectionDanceFilm {...collection} />
    case Collection.Music:
      return <CollectionMusic {...collection} />
    case Collection.Theater:
      return <CollectionTheater {...collection} />
    case Collection.Poetry:
      return <CollectionPoetry {...collection} />
    default:
      return <CollectionDefault {...collection} />
  }
}
