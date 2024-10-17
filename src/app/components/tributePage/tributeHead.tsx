"use client"
import Title, { TitleType } from "../collections/promos/title"
import FeaturedImage from "../featuredImage"
import Blurb from "../collections/promos/blurb"
import TributeWritersList from "./writersList"
import { useArticleState } from "@/app/hooks/useArticleState"
import { Articles, Tributes } from "../../../../lib/types"
import { usePathname } from "next/navigation"

interface TributeHeadProps {
  thisTributeData: Tributes
  articleData: Articles
  permalink?: string
}

const TributeHead = (props: TributeHeadProps) => {
  const { thisTributeData, articleData, permalink } = props

  // This component is also used for the Colleciton on the homepage, but the styles differ a bit.
  // This checks if the page is a tribute page or not.
  const pathname = usePathname()
  const isTributePage = pathname.startsWith("/tribute")

  const { switchArticle } = useArticleState(articleData, thisTributeData.articles)

  const title = thisTributeData.title
  const deck = thisTributeData.deck
  const featured_image = thisTributeData.featured_image
  const blurb = thisTributeData.blurb

  return (
    <div className="px-6">
      <div className="grid grid-cols-4 tablet:grid-cols-12 gap-3 gap-y-6">
        <div className="col-span-4 tablet:col-span-12 tablet-lg:col-span-9">
          <div className="flex flex-col space-y-1 px-0 py-0 tablet-lg:py-0 tablet-lg:px-0">
            <Title
              title={title}
              type={isTributePage ? TitleType.Tribute : TitleType.CollectionTribute}
              permalink={permalink ? permalink : ""}
            />
            {deck && (
              <p
                className={`text-center tablet-lg:text-left font-thin text-3xl ${isTributePage ? "tablet-lg:text-5xl" : "tablet-lg:text-4xl"}`}
              >
                {deck}
              </p>
            )}
          </div>
        </div>
        <div className="col-span-4 tablet:col-span-12 tablet-lg:col-span-3 row-span-2 tablet-lg:col-start-10">
          <div className="flex flex-col justify-center px-0">
            {featured_image ? <FeaturedImage image={featured_image} title={title} /> : null}
          </div>
        </div>
        <div className="col-span-4 tablet:col-span-12 tablet-lg:col-span-9 desktop-lg:col-span-8">
          <div className={`flex flex-col space-y-6 px-0 tablet-lg:px-0 h-full justify-end`}>
            {blurb && <Blurb text={blurb} />}
            <div className="hidden tablet-lg:block pb-6">
              <TributeWritersList
                articles={thisTributeData.articles}
                tributeSlug={thisTributeData.slug}
                switchArticle={switchArticle}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TributeHead
