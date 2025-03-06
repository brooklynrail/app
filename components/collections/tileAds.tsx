"use client"
import { Collections } from "@/lib/types"
import AdsTileStrip from "../ads/adsTileStrip"

const CollectionTileAds = (collection: Collections) => {
  return <AdsTileStrip collection={collection} />
}

export default CollectionTileAds
