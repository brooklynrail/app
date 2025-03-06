"use client"
import { Articles, Collections } from "@/lib/types"
import { getPermalink, PageType } from "@/lib/utils"
import FeaturedImage from "../featuredImage"
import CollectionHead from "./head"
import Bylines, { BylineType } from "./promos/bylines"
import Title, { TitleType } from "./promos/title"

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
    <div key={collection.id} className="collection theme">
      <CollectionHead title={collection.title} permalink={section.featured ? sectionPermalink : null} />
      <div className="pl-6 py-3 divide-x rail-divide flex overflow-x-auto snap-mandatory snap-x scroll-smooth">
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
      <div key={article.id} className={`pt-1 pb-3 px-6 first:pl-0 first:tablet:pr-9 snap-center`}>
        <div className={`flex flex-col w-[calc(100vw-9.5rem)] tablet:w-auto space-y-3`}>
          <div
            className={`flex space-x-3 ${i === 0 ? "space-y-0 tablet:flex-row" : "tablet:flex-col tablet:space-y-3 tablet:space-x-0"}`}
          >
            {featured_image && (
              <div className={`flex-none w-28 tablet:w-card ${i === 0 ? "tablet-lg:w-[276px]" : "tablet-lg:w-44"}`}>
                <FeaturedImage
                  image={featured_image}
                  title={title}
                  hideCaption={true}
                  permalink={permalink}
                  sizes={`33vw`}
                />
              </div>
            )}
            <div className={i === 0 ? `flex flex-col space-y-3` : `flex flex-col space-y-1.5`}>
              <Title
                title={article.title}
                permalink={permalink}
                classes={i === 0 ? `text-lg tablet:text-3xl font-normal` : `text-lg tablet:text-xl font-normal`}
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
