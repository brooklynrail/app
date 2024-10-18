"use client"
import Link from "next/link"
import { Articles, Collections } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"

import FeaturedImage from "../featuredImage"
import { stripHtml } from "string-strip-html"
import Bylines, { BylineType } from "./promos/bylines"
import Title, { TitleType } from "./promos/title"
import CollectionHead from "./head"
import Kicker from "./promos/kicker"

const CollectionBooks = (collection: Collections) => {
  const { section } = collection
  if (!section) {
    return null
  }

  const { articles } = section

  const sectionPermalink = getPermalink({
    sectionSlug: section.slug,
    type: PageType.SuperSection,
  })

  return (
    <div key={collection.id} className="">
      <CollectionHead title={section.name} permalink={section.featured ? sectionPermalink : null} />
      <div className="pl-6 divide-x rail-divide flex overflow-x-auto snap-mandatory snap-x scroll-smooth">
        <PromosBooks articles={articles} />
      </div>
    </div>
  )
}

interface PromoProps {
  articles: Articles[]
}

export const PromosBooks = (props: PromoProps) => {
  const articles = props.articles.map((article, i = 1) => {
    const { issue, section, title, excerpt, featured_image, kicker } = article

    const permalink = getPermalink({
      year: issue.year,
      month: issue.month,
      section: section.slug,
      slug: article.slug,
      type: PageType.Article,
    })

    return (
      <div key={i} className={`pt-1 pb-3 px-6 first:pl-0 first:tablet:pr-9 snap-center`}>
        <div className={`flex flex-col w-[calc(100vw-9.5rem)] tablet:w-auto space-y-3`}>
          <Kicker article={article} />
          <div
            className={`flex space-x-3 ${i === 0 ? "space-y-0 tablet:flex-row" : "tablet:flex-col tablet:space-y-3 tablet:space-x-0"}`}
          >
            {featured_image && (
              <div className={`flex-none w-32 tablet:w-card ${i === 0 ? "tablet-lg:w-[276px]" : "tablet-lg:w-44"}`}>
                <FeaturedImage image={featured_image} title={title} hideCaption={true} permalink={permalink} />
              </div>
            )}
            <div className="flex flex-col space-y-3">
              <Title
                title={article.title}
                permalink={permalink}
                type={i === 0 ? TitleType.CollectionBooksLead : TitleType.CollectionBooksPromo}
              />
              <Bylines article={article} type={BylineType.CollectionBooks} />
            </div>
          </div>
        </div>
      </div>
    )
  })

  return <>{articles}</>
}

export default CollectionBooks
