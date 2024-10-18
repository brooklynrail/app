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

const CollectionFrame = (collection: Collections) => {
  const { section } = collection
  if (!section) {
    return null
  }

  const { articles } = section

  // get the first article in the section.articles array
  const leadArticle = articles[0]
  // get the list of articles in the section.articles array minus the first article
  const restOfArticles = articles.slice(1)

  const sectionPermalink = getPermalink({
    sectionSlug: section.slug,
    type: PageType.SuperSection,
  })

  // const promos =
  // section.slug === "artseen" ? <PromosArtSeen articles={restOfArticles} /> : <Promos articles={restOfArticles} />
  // const promosMobile =
  // section.slug === "artseen" ? <PromosArtSeen articles={articles} /> : <Promos articles={articles} />
  // const leadPromo = <LeadPromoArtSeen article={leadArticle} />

  return (
    <div key={collection.id}>
      <CollectionHead title={section.name} permalink={sectionPermalink} />
      {/* <Frame articles={articles} alt={false} /> */}
      {/* <FrameScrollable articles={articles} /> */}
      <div
        className="px-3 divide-x rail-divide flex overflow-x-auto snap-mandatory snap-x scroll-smooth"
        aria-hidden={true}
      >
        {/* {promosMobile} */}
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

interface LeadPromoProps {
  article: Articles
}
const LeadPromo = (props: LeadPromoProps) => {
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
    <div className="flex flex-col space-y-3">
      <div className="px-6 tablet:px-0">
        <Kicker article={article} />
      </div>
      <div className="" itemType="http://schema.org/Article">
        {artwork && (
          <div className="px-6 tablet:px-0">
            <FeaturedImage image={artwork} title={title} permalink={permalink} />
          </div>
        )}
      </div>
      <div className="px-6 tablet:px-0 flex flex-col space-y-3">
        <Title title={article.title} permalink={permalink} type={TitleType.Lead} />
        <Bylines article={article} type={BylineType.Default} />
        <Excerpt excerpt={article.excerpt} type={ExcerptType.ArtLead} />
      </div>
    </div>
  )
}

export default CollectionFrame
