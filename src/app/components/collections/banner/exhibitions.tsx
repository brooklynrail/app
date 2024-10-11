"use client"

import { Collections } from "../../../../../lib/types"

const BannerExhibitions = (collection: Collections) => {
  return (
    <div key={collection.id} className="col-span-4 tablet:col-span-3 py-3 pb-6 pr-6 bg-white bg-opacity-10">
      <div className="">Exhibitions</div>
    </div>
  )
}
export default BannerExhibitions
