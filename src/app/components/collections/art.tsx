"use client"

import Link from "next/link"
import { Articles, Collections } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import CollectionHead from "./head"
import FeaturedImage from "../featuredImage"
import { stripHtml } from "string-strip-html"
import Bylines, { BylineType } from "./promos/bylines"
import Kicker from "./promos/kicker"
import Title, { TitleType } from "./promos/title"
import Excerpt, { ExcerptType } from "./promos/excerpt"
import Frame from "../section/frame"
import FrameScrollable from "../section/frameScrollable"

const CollectionArt = (collection: Collections) => {
  const { section } = collection
  if (!section) {
    return null
  }

  const { articles } = section

  const sectionPermalink = getPermalink({
    sectionSlug: section.slug,
    type: PageType.SuperSection,
  })

  // get the first article in the section.articles array
  const leadArticle = articles[0]
  // get the list of articles in the section.articles array minus the first article
  const restOfArticles = articles.slice(1)

  return (
    <div key={collection.id} className="">
      <CollectionHead title={section.name} permalink={section.featured ? sectionPermalink : null} />
      <div className="hidden tablet-lg:block">
        <Frame
          LeadPromo={<LeadPromoArt article={leadArticle} />}
          Promos={<PromosArt articles={restOfArticles} />}
          alt={false}
        />
      </div>
      <div className="tablet-lg:hidden">
        <FrameScrollable Promos={<PromosMobile articles={articles} />} />
      </div>
    </div>
  )
}

const PromosMobile = (props: PromoProps) => {
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
      <div key={i} className="p-3 tablet:pr-0 snap-center">
        <div className="flex flex-col space-y-3 flex-none w-[calc(100vw-6.5rem)] tablet:w-auto">
          <div className="hidden tablet:block">
            <Kicker article={article} />
          </div>
          <div className="!mt-0 tablet:mt-auto flex flex-col-reverse tablet:flex-row tablet:space-x-6">
            <div className="pt-3 tablet:pt-0 flex flex-col space-y-3">
              <div className="tablet:hidden">
                <Kicker article={article} />
              </div>
              <Title title={article.title} permalink={permalink} type={TitleType.Medium} />
              <Bylines article={article} type={BylineType.Default} />
              <Excerpt excerpt={article.excerpt} type={ExcerptType.Art} />
            </div>
            {artwork && (
              <div className="flex-none tablet:w-card desktop-lg:w-[336px]">
                <Link href={permalink} title={`Visit ${stripHtml(title).result}`}>
                  <FeaturedImage image={artwork} title={title} hideCaption={true} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  })

  return <>{articles}</>
}

interface PromoProps {
  articles: Articles[]
}

export const PromosArt = (props: PromoProps) => {
  const articles = props.articles.map((article, i = 1) => {
    const { issue, section, title, featured_artwork, featured_image, kicker } = article
    const artwork = featured_artwork ? featured_artwork : featured_image
    const permalink = getPermalink({
      year: issue.year,
      month: issue.month,
      section: section.slug,
      slug: article.slug,
      type: PageType.Article,
    })

    return (
      <div key={i} className="grid grid-cols-4 tablet:grid-cols-6 gap-3 pt-3 tablet:px-3 pb-6">
        <div className="col-span-4 tablet:col-span-6">
          <Kicker article={article} />
        </div>
        <div className="col-span-4 tablet:col-span-6 tablet-lg:col-span-2 desktop-lg:col-span-3 tablet-lg:order-last">
          {artwork && (
            <div className="">
              <Link href={permalink} title={`Visit ${stripHtml(title).result}`}>
                <FeaturedImage image={artwork} title={title} hideCaption={true} />
              </Link>
            </div>
          )}
        </div>
        <div className="col-span-4 tablet:col-span-6 tablet-lg:col-span-4 desktop-lg:col-span-3">
          <div className="flex flex-col space-y-3">
            <Title title={article.title} permalink={permalink} type={TitleType.Medium} />
            <Bylines article={article} type={BylineType.Default} />
            <Excerpt excerpt={article.excerpt} type={ExcerptType.Art} />
          </div>
        </div>
      </div>
    )
  })

  return <>{articles}</>
}

interface LeadPromoArtProps {
  article: Articles
}
export const LeadPromoArt = (props: LeadPromoArtProps) => {
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
    <>
      <div className="grid grid-cols-4 tablet:grid-cols-6 gap-x-3 gap-y-3">
        <div className="col-span-4 tablet:col-span-6">
          <div className="">
            <Kicker article={article} />
          </div>
        </div>
        <div className="col-span-4 tablet:col-span-6" itemType="http://schema.org/Article">
          {artwork && (
            <div className="">
              <Link href={permalink} title={`Visit ${stripHtml(title).result}`}>
                <FeaturedImage image={artwork} title={title} />
              </Link>
            </div>
          )}
        </div>
        <div className="col-span-4 tablet:col-span-6">
          <div className="flex flex-col space-y-3">
            <Title title={article.title} permalink={permalink} type={TitleType.Lead} />
            <Bylines article={article} type={BylineType.Default} />
            <Excerpt excerpt={article.excerpt} type={ExcerptType.ArtLead} />
          </div>
        </div>
      </div>
    </>
  )
}

export default CollectionArt
