"use client"
import { Articles, Collections } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import FeaturedImage from "../featuredImage"
import CollectionHead from "./head"
import Bylines, { BylineType } from "./promos/bylines"
import Excerpt from "./promos/excerpt"
import Title from "./promos/title"

const CollectionDefault = (collection: Collections) => {
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
    <div key={collection.id} className={`collection collection-${section.slug}`}>
      <CollectionHead
        title={collection.title}
        permalink={section.featured ? sectionPermalink : null}
        description={section.description}
      />
      <div className="pl-6 py-3 divide-x rail-divide flex overflow-x-auto snap-mandatory snap-x scroll-smooth w-screen">
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
      <div
        key={i}
        className={`pt-1 pb-3 px-6 first:pl-0 first:tablet:pr-6 snap-center w-60 desktop:w-1/4 flex-none space-y-3`}
      >
        {featured_image && (
          <div className={`flex-none w-full`}>
            <FeaturedImage image={featured_image} title={title} hideCaption={true} permalink={permalink} />
          </div>
        )}
        <div className="flex flex-col space-y-3">
          <Title title={article.title} permalink={permalink} classes="text-lg tablet:text-2xl font-normal" />
          <Bylines article={article} type={BylineType.CollectionDefault} />
          <Excerpt excerpt={article.excerpt} classes={`excerpt-md`} />
        </div>
      </div>
    )
  })

  return <>{articles}</>
}

export default CollectionDefault
