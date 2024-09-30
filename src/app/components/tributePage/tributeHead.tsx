"use client"
import { TributePageProps } from "@/app/tribute/[tributeSlug]/page"
import Title, { TitleType } from "../collections/promos/title"
import FeaturedImage from "../featuredImage"
import Blurb from "../collections/promos/blurb"
import TributeWritersList from "./writersList"

const TributeHead = (props: TributePageProps) => {
  const { thisTributeData } = props

  const title = thisTributeData.title
  const deck = thisTributeData.deck
  const featured_image = thisTributeData.featured_image
  const blurb = thisTributeData.blurb

  return (
    <div className="tablet-lg:border-b-[1px] rail-border py-3">
      <div className="px-6 grid grid-cols-4 tablet:grid-cols-12 gap-3 gap-y-6">
        <div className="col-span-4 tablet:col-span-12 tablet-lg:col-span-9">
          <div className="flex flex-col space-y-3 px-0 tablet-lg:px-6">
            <Title title={title} type={TitleType.Tribute} />
            {deck && <p className="font-thin text-4xl desktop-lg:text-5xl">{deck}</p>}
          </div>
        </div>
        <div className="col-span-4 tablet:col-span-12 tablet-lg:col-span-3 row-span-2 tablet-lg:col-start-10">
          <div className="flex flex-col justify-center pt-6 px-6">
            {featured_image ? <FeaturedImage image={featured_image} title={title} /> : null}
          </div>
        </div>
        <div className="col-span-4 tablet:col-span-12 tablet-lg:col-span-9">
          <div className="flex flex-col space-y-6 px-0 tablet-lg:px-6">
            {blurb && <Blurb text={blurb} />}
            <TributeWritersList articles={thisTributeData.articles} tributeSlug={thisTributeData.slug} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TributeHead
