"use client"
import { Articles, Collections } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import FeaturedImage from "../featuredImage"
import FrameScrollable from "../section/frameScrollable"
import FrameThirds from "../section/frameThirds"
import CollectionHead from "./head"
import Bylines, { BylineType } from "./promos/bylines"
import Excerpt from "./promos/excerpt"
import Kicker from "./promos/kicker"
import Title, { TitleType } from "./promos/title"

const CollectionMusic = (collection: Collections) => {
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
        <FrameThirds
          LeadPromo={<LeadPromoMusic article={leadArticle} />}
          Promos={<PromosMusic articles={restOfArticles} />}
          alt={false}
        />
      </div>
      <div className="tablet-lg:hidden">
        <FrameScrollable Promos={<PromosMobile articles={articles} />} />
      </div>
    </div>
  )
}

interface PromoProps {
  articles: Articles[]
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
      <div key={i} className="px-3 py-1 tablet:pr-0 snap-center">
        <div className="flex flex-col space-y-3 flex-none w-[calc(100vw-6.5rem)] tablet:w-auto">
          <Kicker article={article} />
          {artwork && (
            <div className="flex-none tablet:w-card desktop-lg:w-[336px]">
              <FeaturedImage image={artwork} title={title} hideCaption={true} permalink={permalink} />
            </div>
          )}
          <div className="flex flex-col space-y-3">
            <Title title={article.title} permalink={permalink} type={TitleType.Small} />
            <Bylines article={article} type={BylineType.Default} />
          </div>
        </div>
      </div>
    )
  })

  return <>{articles}</>
}

const PromosMusic = (props: PromoProps) => {
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
        <div className="flex flex-col w-[calc(100vw-6.5rem)] tablet:w-auto">
          <div className="flex flex-col space-y-3 tablet:space-y-0 tablet:flex-row tablet:space-x-6">
            {artwork && (
              <div className="flex-none tablet:w-60 desktop-lg:w-80">
                <FeaturedImage image={artwork} title={title} hideCaption={true} permalink={permalink} />
              </div>
            )}
            <div className="flex flex-col space-y-1">
              <Kicker article={article} />
              <Title title={article.title} permalink={permalink} type={TitleType.Small} />
              <Bylines article={article} type={BylineType.CollectionArtSeen} />
              <Excerpt excerpt={article.excerpt} classes={`text-sm tablet-lg:text-md  font-normal`} />
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
const LeadPromoMusic = (props: LeadPromoProps) => {
  const { article } = props
  const { title, issue, section, featured_image } = article

  const permalink = getPermalink({
    year: issue.year,
    month: issue.month,
    section: section.slug,
    slug: article.slug,
    type: PageType.Article,
  })

  return (
    <div className="flex flex-col space-y-3">
      <div className="" itemType="http://schema.org/Article">
        {featured_image && (
          <div className="px-6 tablet:px-0">
            <FeaturedImage image={featured_image} title={title} hideCaption={true} permalink={permalink} />
          </div>
        )}
      </div>
      <div className="px-6 tablet:px-0 flex flex-col space-y-3">
        <Kicker article={article} />
        <Title title={article.title} permalink={permalink} type={TitleType.LeadArtSeen} />
        <Bylines article={article} type={BylineType.CollectionArtSeen} />
        <Excerpt excerpt={article.excerpt} classes={`text-sm tablet-lg:text-md  font-normal`} />
      </div>
    </div>
  )
}

export default CollectionMusic
