"use client"
import Link from "next/link"
import { Articles, Collections, Sections } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import CollectionHead from "./head"
import FeaturedImage from "../featuredImage"
import { stripHtml } from "string-strip-html"
import Bylines, { BylineType } from "./promos/bylines"
import Title, { TitleType } from "./promos/title"
import Excerpt, { ExcerptType } from "./promos/excerpt"

const CollectionCriticsPage = (collection: Collections) => {
  const { section } = collection
  if (!section) {
    return null
  }
  const { articles } = section

  // get the first article in the section.articles array
  const leadArticle = articles[0]
  // get the list of articles in the section.articles array minus the first article
  const restOfArticles = articles.slice(1, 5)

  const sectionPermalink = getPermalink({
    sectionSlug: section.slug,
    type: PageType.SuperSection,
  })

  // const grid_rows = `grid-rows-${restOfArticles.length}`
  const grid_rows = `grid-rows-1`

  return (
    <>
      <div key={collection.id}>
        <div>
          <div className="px-6 pb-16 border-b rail-border">
            <CollectionHead title={section.name} permalink={sectionPermalink} />
            <div className={`grid grid-cols-4 tablet:grid-cols-12 ${grid_rows}`}>
              <div className="col-span-4 tablet:col-span-6 tablet:row-span-4 tablet:border-r rail-border tablet:pr-3">
                <div className="grid grid-cols-4 tablet:grid-cols-6 gap-3">
                  <div className="col-span-4 tablet:col-span-6">
                    <LeadPromo article={leadArticle} />
                  </div>
                </div>
              </div>
              <div
                className={`col-span-4 tablet:col-span-6 tablet-lg:col-start-7 row-start-1 tablet:ml-3 divide-y rail-divide`}
                itemType="http://schema.org/Article"
              >
                <Promos articles={restOfArticles} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

interface PromoProps {
  articles: Articles[]
}

const Promos = (props: PromoProps) => {
  const articles = props.articles.map((article, i = 1) => {
    const { issue, section, title, featured_image } = article
    const permalink = getPermalink({
      year: issue.year,
      month: issue.month,
      section: section.slug,
      slug: article.slug,
      type: PageType.Article,
    })

    return (
      <div key={i} className="grid grid-cols-4 tablet:grid-cols-6 gap-x-3 gap-y-2 p-3 pb-3">
        <div className="col-span-4 tablet:col-span-6">
          <div className="flex flex-col space-y-1">
            <Bylines article={article} asTitle={true} type={BylineType.CriticsPage} />
            <Title title={article.title} permalink={permalink} type={TitleType.XSmall} />
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
  const { title, featured_image, issue, section, contributors, promo_banner } = article

  const permalink = getPermalink({
    year: issue.year,
    month: issue.month,
    section: section.slug,
    slug: article.slug,
    type: PageType.Article,
  })

  return (
    <div className="grid grid-cols-4 tablet:grid-cols-6 gap-x-3 gap-y-2 pt-3 pb-3">
      <div className="col-span-4 tablet:col-span-3" itemType="http://schema.org/Article">
        {featured_image && (
          <div className="">
            <Link href={permalink} title={`Visit ${stripHtml(title).result}`}>
              <FeaturedImage image={featured_image} title={title} />
            </Link>
          </div>
        )}
      </div>
      <div className="col-span-4 tablet:col-span-3">
        <div className="flex flex-col space-y-3">
          <Title title={article.title} permalink={permalink} type={TitleType.CriticsPage} />
          <Bylines article={article} type={BylineType.Default} />
          <Excerpt excerpt={article.excerpt} type={ExcerptType.CriticsPage} />
        </div>
      </div>
    </div>
  )
}

export default CollectionCriticsPage
