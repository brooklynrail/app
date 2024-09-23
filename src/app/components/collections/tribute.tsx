"use client"
import Link from "next/link"
import { Tributes } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import CollectionHead from "./head"
import FeaturedImage from "../featuredImage"
import { stripHtml } from "string-strip-html"

const CollectionTribute = (collection: Tributes) => {
  const { title, deck, summary, blurb, excerpt, curators, featured_image } = collection
  // ==================================================

  const permalink = getPermalink({
    tributeSlug: collection.slug,
    type: PageType.Tribute,
  })

  return (
    <>
      <div key={collection.id}>
        <div>
          <div className="px-6 pb-16 border-b-2 border-dotted border-black">
            <CollectionHead title={collection.title} slug={collection.slug} permalink={permalink} />

            <div className="grid grid-cols-4 tablet:grid-cols-8 gap-3">
              <div className="col-span-4 tablet:col-span-8">TKTK</div>
            </div>

            <div className={`col-span-4 tablet:col-span-4 tablet-lg:col-start-9`} itemType="http://schema.org/Article">
              {collection.featured_image && (
                <div className="">
                  <Link href={permalink} title={`Visit ${stripHtml(title).result}`}>
                    <FeaturedImage image={collection.featured_image} title={title} hideCaption={true} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CollectionTribute
