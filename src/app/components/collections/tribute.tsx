"use client"
import { Collections } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import FeaturedImage from "../featuredImage"
import TributeWritersList from "../tributePage/writersList"
import Blurb from "./promos/blurb"
import Title, { TitleType } from "./promos/title"

const CollectionTribute = (collection: Collections) => {
  const { tribute } = collection

  if (!tribute) {
    return null
  }
  const { title, deck, featured_image, blurb } = tribute

  const permalink = getPermalink({
    tributeSlug: tribute.slug,
    type: PageType.Tribute,
  })

  return (
    <>
      <div key={collection.id} className="rail-tribute-bg py-9">
        <div className="px-6">
          <div className="grid grid-cols-4 tablet:grid-cols-12 gap-3 gap-y-6">
            <div className="col-span-4 tablet:col-span-12 tablet-lg:col-span-9">
              <div className="flex flex-col space-y-1 px-0 py-0 tablet-lg:py-0 tablet-lg:px-0">
                <Title title={title} type={TitleType.CollectionTribute} permalink={permalink ? permalink : ""} />
                {deck && (
                  <p className={`text-center tablet-lg:text-left font-thin text-3xl tablet-lg:text-4xl`}>{deck}</p>
                )}
              </div>
            </div>
            <div className="col-span-4 tablet:col-span-12 tablet-lg:col-span-3 row-span-2 tablet-lg:col-start-10">
              {featured_image && (
                <div className="flex flex-col justify-center px-0">
                  <FeaturedImage image={featured_image} hideCaption={true} title={title} permalink={permalink} />
                </div>
              )}
            </div>
            <div className="col-span-4 tablet:col-span-12 tablet-lg:col-span-9 desktop-lg:col-span-8">
              <div className={`flex flex-col space-y-6 px-0 tablet-lg:px-0 h-full justify-end`}>
                {blurb && <Blurb text={blurb} />}
                <div className="">
                  <TributeWritersList articles={tribute.articles} tributeSlug={tribute.slug} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CollectionTribute
