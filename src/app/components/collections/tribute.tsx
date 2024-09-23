"use client"
import Link from "next/link"
import { Tributes } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import CollectionHead from "./head"
import FeaturedImage from "../featuredImage"
import { stripHtml } from "string-strip-html"
import parse from "html-react-parser"
import Title, { TitleType } from "./promos/title"
import TributeWritersList from "../tributePage/writersList"

const CollectionTribute = (collection: Tributes) => {
  const { title, deck, summary, blurb, excerpt, curators, featured_image } = collection
  // ==================================================

  const permalink = getPermalink({
    tributeSlug: collection.slug,
    type: PageType.Tribute,
  })

  return (
    <>
      <div key={collection.id} className="px-6 py-9 border-b-2 border-dotted border-black">
        <div className="grid grid-cols-4 tablet:grid-cols-12 gap-3">
          <div className="col-span-4 tablet:col-span-8">
            <div className="flex flex-col justify-between h-full space-y-4 px-3">
              <div className="flex flex-col space-y-6">
                <div className="flex flex-col space-y-3">
                  <Title title={title} permalink={permalink} type={TitleType.Tribute} />
                  {deck && <p className="text-center font-thin text-5xl">{deck}</p>}
                </div>
                <div className="text-3xl text-center font-serif font-light">{blurb && parse(blurb)}</div>
              </div>
              <div className="flex flex-col space-y-3">
                <div className="text-sm">{summary && parse(summary)}</div>
                <TributeWritersList articles={collection.articles} tributeSlug={collection.slug} />
              </div>
            </div>
          </div>

          <div className="col-span-4 tablet:col-span-4 tablet-lg:col-start-9" itemType="http://schema.org/Article">
            {featured_image && (
              <div className="">
                <Link href={permalink} title={`Visit ${stripHtml(title).result}`}>
                  <FeaturedImage image={featured_image} title={title} hideCaption={true} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default CollectionTribute
