"use client"
import { Articles, Collections } from "@/lib/types"
import { getPermalink, PageType } from "@/lib/utils"
import FeaturedImage from "../featuredImage"
import CollectionHead from "./head"
import Bylines, { BylineType } from "./promos/bylines"
import Title from "./promos/title"

const CollectionTheater = (collection: Collections) => {
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
        <Promos articles={articles} />
      </div>
    </div>
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
      <div key={article.id} className={`pt-1 pb-3 px-6 first:pl-0 first:tablet:pr-6 snap-center`}>
        <div className={`flex flex-col w-[calc(100vw-9.5rem)] tablet:w-auto space-y-3`}>
          {featured_image && (
            <div className={`flex-none tablet:w-card ${i === 0 ? "tablet-lg:w-[476px]" : "tablet-lg:w-44"}`}>
              <FeaturedImage
                image={featured_image}
                title={title}
                hideCaption={true}
                permalink={permalink}
                sizes={`(max-width: 640px) 85vw, 33vw`}
              />
            </div>
          )}
          <div className="flex flex-col space-y-1.5">
            <Title
              title={article.title}
              permalink={permalink}
              classes={i === 0 ? "text-lg tablet:text-4xl font-light" : "text-2xl font-normal"}
            />
            <Bylines article={article} type={BylineType.CollectionBooks} />
          </div>
        </div>
      </div>
    )
  })

  return <>{articles}</>
}

export default CollectionTheater
