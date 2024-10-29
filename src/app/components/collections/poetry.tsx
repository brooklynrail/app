"use client"
import Link from "next/link"
import { Articles, Collections } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import FrameScrollable from "../frames/frameScrollable"
import CollectionHead from "./head"
import Bylines, { BylineType } from "./promos/bylines"
import PoetryCard from "./promos/poetryCard"
import Title from "./promos/title"

const CollectionPoetry = (collection: Collections) => {
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
    <div key={collection.id} className={`collection theme`}>
      <CollectionHead title={collection.title} permalink={section.featured ? sectionPermalink : null} />
      <div className="">
        <FrameScrollable Promos={<Promos articles={articles} />} />
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
      <div key={i} className="px-3 tablet-lg:px-6 tablet-lg:first:pl-0 tablet-lg:last:pr-0 snap-center">
        <div className="flex flex-col space-y-3 flex-none w-[calc(65vw)] tablet-lg:w-[calc(33vw)]">
          <div className="flex flex-col space-y-3">
            <div className="flex flex-col space-y-3">
              <Link href={permalink}>
                <div className="flex justify-between items-start">
                  <Title title={article.title} classes="text-3xl tablet:text-4xl font-light font-serif" />
                </div>
              </Link>
              <Bylines article={article} type={BylineType.Default} />
            </div>
            <PoetryCard {...article} />
          </div>
        </div>
      </div>
    )
  })

  return <>{articles}</>
}

export default CollectionPoetry
