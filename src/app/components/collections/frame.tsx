"use client"
import Link from "next/link"
import { Articles, Collections, Sections } from "../../../../lib/types"
import { getPermalink, getSectionData, PageType } from "../../../../lib/utils"
import CollectionHead from "./head"
import FeaturedImage from "../featuredImage"
import { stripHtml } from "string-strip-html"
import Bylines, { BylineType } from "./promos/bylines"
import Kicker from "./promos/kicker"
import Title, { TitleType } from "./promos/title"
import Excerpt, { ExcerptType } from "./promos/excerpt"
import { useEffect, useState } from "react"

const CollectionFrame = (collection: Collections) => {
  const { section } = collection
  if (!section) {
    return null
  }
  const limit = collection.limit || 4

  const { articles } = section

  // get the first article in the section.articles array
  const leadArticle = articles[0]
  // get the list of articles in the section.articles array minus the first article
  const restOfArticles = articles.slice(1)

  const sectionPermalink = getPermalink({
    sectionSlug: section.slug,
    type: PageType.SuperSection,
  })

  return (
    <div key={collection.id}>
      <div className="tablet:px-6 pb-16 border-b rail-border">
        <CollectionHead title={section.name} permalink={sectionPermalink} />
        <div className="hidden tablet:flex flex-col">
          <div className="grid grid-cols-4 tablet:grid-cols-12 gap-3">
            <div className="col-span-4 tablet:col-span-6 tablet:border-r rail-border">
              <div className="p-3 pl-0">
                <LeadPromo article={leadArticle} />
              </div>
            </div>
            <div
              className="col-span-4 tablet:col-span-6 tablet:col-start-7 tablet:divide-y rail-divide"
              itemType="http://schema.org/Article"
            >
              <Promos articles={restOfArticles} />
            </div>
          </div>
        </div>
        <div className="tablet:hidden px-3 divide-x rail-divide flex overflow-x-auto snap-mandatory snap-x scroll-smooth">
          {articles.map((article, i = 1) => {
            return (
              <div className="px-3">
                <div className="bg-green-300 h-48 w-[calc(100vw-3.5rem)]">Mobile PROMO</div>
              </div>
            )
          })}
          <Promos articles={articles} />
        </div>
      </div>
    </div>
  )
}

interface PromoProps {
  articles: Articles[]
}

const Promos = (props: PromoProps) => {
  const articles = props.articles.map((article, i = 1) => {
    const { issue, section, title, excerpt, featured_artwork, featured_image, kicker } = article
    const artwork = featured_artwork ? featured_artwork : featured_image
    const permalink = getPermalink({
      year: issue.year,
      month: issue.month,
      section: section.slug,
      slug: article.slug,
      type: PageType.Article,
    })

    return (
      <div key={i} className="p-3 pr-0">
        <div className="flex flex-col space-y-3">
          <div className="px-6 tablet:px-0">
            <Kicker article={article} />
          </div>
          <div className="flex space-x-6">
            <div className="flex flex-col space-y-3">
              <Title title={article.title} permalink={permalink} type={TitleType.Medium} />
              <Bylines article={article} type={BylineType.Default} />
              <Excerpt excerpt={article.excerpt} type={ExcerptType.Art} />
            </div>
            <div className="flex-none w-[336px]">
              {artwork && (
                <div className="">
                  <Link href={permalink} title={`Visit ${stripHtml(title).result}`}>
                    <FeaturedImage image={artwork} title={title} hideCaption={true} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  })

  return <>{articles}</>
}

interface LeadPromoProps {
  article: Articles
}
const LeadPromo = (props: LeadPromoProps) => {
  const { article } = props
  const { title, issue, section, featured_artwork, featured_image } = article

  const artwork = featured_artwork ? featured_artwork : featured_image
  const permalink = getPermalink({
    year: issue.year,
    month: issue.month,
    section: section.slug,
    slug: article.slug,
    type: PageType.Article,
  })

  return (
    <div className="flex flex-col space-y-3">
      <div className="px-6 tablet:px-0">
        <Kicker article={article} />
      </div>
      <div className="" itemType="http://schema.org/Article">
        {artwork && (
          <div className="px-6 tablet:px-0">
            <Link href={permalink} title={`Visit ${stripHtml(title).result}`}>
              <FeaturedImage image={artwork} title={title} />
            </Link>
          </div>
        )}
      </div>
      <div className="px-6 tablet:px-0 flex flex-col space-y-3">
        <Title title={article.title} permalink={permalink} type={TitleType.Lead} />
        <Bylines article={article} type={BylineType.Default} />
        <Excerpt excerpt={article.excerpt} type={ExcerptType.ArtLead} />
      </div>
    </div>
  )
}

export default CollectionFrame
