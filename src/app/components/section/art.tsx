"use client"

import { SectionProps } from "."
import { Articles } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import Bylines, { BylineType } from "../collections/promos/bylines"
import Excerpt from "../collections/promos/excerpt"
import Kicker from "../collections/promos/kicker"
import Title, { TitleType } from "../collections/promos/title"
import FeaturedImage from "../featuredImage"
import Frame from "../frames/frame"

const SectionArt = (props: SectionProps) => {
  const { articlesData } = props

  // Utility function to split array into groups
  const groupArray = (array: Articles[], groupSize: number) => {
    const groups = []
    for (let i = 0; i < array.length; i += groupSize) {
      groups.push(array.slice(i, i + groupSize))
    }
    return groups
  }

  // Split articles into groups of 4
  const articleGroups = groupArray(articlesData, 4).map((group, index) => {
    const leadArticle = group[0]
    const restOfArticles = group.slice(1)
    return (
      <div className="px-3">
        <Frame
          key={index}
          LeadPromo={<LeadPromoArt article={leadArticle} />}
          Promos={<PromosArt articles={restOfArticles} />}
          alt={index % 2 !== 0}
        />
      </div>
    )
  })
  return articleGroups
}

interface PromoProps {
  articles: Articles[]
}

const PromosArt = (props: PromoProps) => {
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
      <div key={i} className="grid grid-cols-4 tablet:grid-cols-6 gap-3 pt-3 pb-6">
        <div className="col-span-4 tablet:col-span-6">
          <Kicker article={article} />
        </div>
        <div className="col-span-4 tablet:col-span-6 tablet-lg:col-span-2 desktop-lg:col-span-3 tablet-lg:order-last">
          {artwork && (
            <div className="">
              <FeaturedImage image={artwork} title={title} hideCaption={true} permalink={permalink} />
            </div>
          )}
        </div>
        <div className="col-span-4 tablet:col-span-6 tablet-lg:col-span-4 desktop-lg:col-span-3">
          <div className="flex flex-col space-y-3">
            <Title title={article.title} permalink={permalink} classes="text-3xl tablet:text-4xl font-light" />
            <Bylines article={article} type={BylineType.Default} />
            <Excerpt excerpt={article.excerpt} />
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
const LeadPromoArt = (props: LeadPromoArtProps) => {
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
              <FeaturedImage image={artwork} hideCaption={true} title={title} permalink={permalink} />
            </div>
          )}
        </div>
        <div className="col-span-4 tablet:col-span-6">
          <div className="flex flex-col space-y-3">
            <Title h2 title={article.title} permalink={permalink} type={TitleType.Lead} />
            <Bylines article={article} type={BylineType.Default} />
            <Excerpt excerpt={article.excerpt} classes="excerpt-2xl" />
          </div>
        </div>
      </div>
    </>
  )
}

export default SectionArt
