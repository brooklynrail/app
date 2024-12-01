"use client"
import { Collections } from "../../../../lib/types"
import AdsTileStrip from "../ads/adsTileStrip"

const CollectionTileAds = (collection: Collections) => {
  return (
    <div key={collection.id} className="collection">
      <AdsTileStrip />
    </div>
  )
}

export default CollectionTileAds
