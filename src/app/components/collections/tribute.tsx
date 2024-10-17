"use client"
import Link from "next/link"
import { Collections, Tributes } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import CollectionHead from "./head"
import FeaturedImage from "../featuredImage"
import { stripHtml } from "string-strip-html"
import parse from "html-react-parser"
import Title, { TitleType } from "./promos/title"
import TributeWritersList from "../tributePage/writersList"
import TributeHead from "../tributePage/tributeHead"

const CollectionTribute = (collection: Collections) => {
  const { tribute } = collection

  if (!tribute) {
    return null
  }

  const permalink = getPermalink({
    tributeSlug: tribute.slug,
    type: PageType.Tribute,
  })

  return (
    <>
      <div key={collection.id} className="py-9">
        <TributeHead thisTributeData={tribute} articleData={tribute.articles[0]} permalink={permalink} />
        {/* <div className="grid grid-cols-4 tablet:grid-cols-12 gap-3">
          <div className="col-span-4 tablet:col-span-8">
            <div className="flex flex-col justify-between h-full space-y-4 px-3">
              <div className="flex flex-col space-y-6">
                <div className="flex flex-col space-y-3">
                  <Title title={collection.title} permalink={permalink} type={TitleType.Tribute} />
                  {collection.deck && <p className="text-center font-thin text-5xl">{collection.deck}</p>}
                </div>
                <div className="text-3xl text-center font-serif font-light">{blurb && parse(blurb)}</div>
              </div>
              <div className="flex flex-col space-y-3">
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
        </div> */}
      </div>
    </>
  )
}

export default CollectionTribute
