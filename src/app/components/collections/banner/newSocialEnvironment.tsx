"use client"

import { Collections } from "../../../../../lib/types"

const BannerNewSocialEnvironment = (collection: Collections) => {
  return (
    <div key={collection.id} className="col-span-4 tablet:col-span-6 py-3 pb-6 pr-6 bg-white bg-opacity-10">
      <div className="">The New Social Environment</div>
    </div>
  )
}
export default BannerNewSocialEnvironment
