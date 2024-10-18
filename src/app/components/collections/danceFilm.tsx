"use client"

import { Articles, Collections } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import FeaturedImage from "../featuredImage"
import Frame633 from "../section/frame633"
import FrameScrollable from "../section/frameScrollable"
import CollectionHead from "./head"
import Bylines, { BylineType } from "./promos/bylines"
import Excerpt, { ExcerptType } from "./promos/excerpt"
import Kicker from "./promos/kicker"
import Title, { TitleType } from "./promos/title"

const CollectionDanceFilm = (collection: Collections) => {
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

  // divide the restOfArticles into two arrays: ColB and ColC
  const midIndex = Math.ceil(restOfArticles.length / 2)
  const ColB = restOfArticles.slice(0, midIndex)
  const ColC = restOfArticles.slice(midIndex)

  return (
    <div key={collection.id} className="">
      <CollectionHead title={section.name} permalink={section.featured ? sectionPermalink : null} />
      <div className="hidden tablet-lg:block">
        <Frame633
          LeadPromo={<LeadPromo article={leadArticle} />}
          ColB={<Promos articles={ColB} />}
          ColC={<Promos articles={ColC} />}
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
                <FeaturedImage image={artwork} title={title} hideCaption={true} permalink={permalink} />
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

const Promos = (props: PromoProps) => {
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
      <div key={i} className="py-6 pb-8 flex flex-col space-y-3 bg-emerald-200">
        {artwork && (
          <div className="">
            <FeaturedImage image={artwork} title={title} hideCaption={true} permalink={permalink} />
          </div>
        )}
        <Kicker article={article} />
        <Title title={article.title} permalink={permalink} type={TitleType.Medium} />
        <Bylines article={article} type={BylineType.Default} />
        <Excerpt excerpt={article.excerpt} type={ExcerptType.Art} />
      </div>
    )
  })

  return <>{articles}</>
}

interface LeadPromoArtProps {
  article: Articles
}
export const LeadPromo = (props: LeadPromoArtProps) => {
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
      <div className="flex flex-col py-6">
        {artwork && (
          <div className="">
            <FeaturedImage image={artwork} title={title} permalink={permalink} />
          </div>
        )}
      </div>
      <div className="col-span-4 tablet:col-span-6">
        <div className="flex flex-col space-y-3">
          <Kicker article={article} />
          <Title title={article.title} permalink={permalink} type={TitleType.CollectionDance} />
          <Excerpt excerpt={article.excerpt} type={ExcerptType.Default} />
          <Bylines article={article} type={BylineType.CollectionDance} />
        </div>
      </div>
    </>
  )
}

export default CollectionDanceFilm
