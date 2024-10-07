"use client"
import Link from "next/link"
import { Articles } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"

import FeaturedImage from "../featuredImage"
import { stripHtml } from "string-strip-html"
import Bylines, { BylineType } from "./promos/bylines"
import Title, { TitleType } from "./promos/title"

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
      <div key={i} className={`p-3 pb-3 px-6 first:pl-0 first:tablet:pr-9 snap-center`}>
        <div className={`flex flex-col w-[calc(100vw-9.5rem)] tablet:w-auto`}>
          <div
            className={`flex space-x-3 tablet:space-x-0 tablet:flex-col tablet:space-y-3 ${i === 0 && "space-y-0 tablet:flex-row tablet:space-x-3"}`}
          >
            {featured_image && (
              <div className={`flex-none w-32 tablet:w-card ${i === 0 ? "tablet-lg:w-[276px]" : "tablet-lg:w-44"}`}>
                <Link href={permalink} title={`Visit ${stripHtml(title).result}`}>
                  <FeaturedImage image={featured_image} title={title} hideCaption={true} />
                </Link>
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
