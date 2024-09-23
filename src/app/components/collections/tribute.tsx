"use client"
import Link from "next/link"
import { Articles, Sections, Tributes } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import CollectionHead from "./head"
import FeaturedImage from "../featuredImage"
import { stripHtml } from "string-strip-html"
import parse from "html-react-parser"
import Bylines from "./promos/bylines"
import Kicker from "./promos/kicker"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import Title, { TitleType } from "./promos/title"

const CollectionTribute = (collection: Tributes) => {
  const { title, deck, summary, blurb, excerpt, curators, featured_image } = collection
  // ==================================================

  // get the first article in the section.articles array
  const leadArticle = collection.articles[0]
  // get the list of articles in the section.articles array minus the first article
  const restOfArticles = collection.articles.slice(1, 5)

  const permalink = getPermalink({
    section: collection.slug,
    type: PageType.Section,
  })

  // const grid_rows = `grid-rows-${restOfArticles.length}`
  const grid_rows = `grid-rows-1`

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
