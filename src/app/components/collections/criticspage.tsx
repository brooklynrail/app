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
import Frame from "../section/frame"
import styles from "./collection.module.scss"

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

  const guestCritic = leadArticle.contributors[0].contributors_id
    ? `${leadArticle.contributors[0].contributors_id?.first_name} ${leadArticle.contributors[0].contributors_id?.last_name}`
    : ""

  const collectionTitle = `Guest Critic: ${guestCritic}`

  return (
    <div key={collection.id} className={`rail-criticspage-bg ${styles.criticspage}`}>
      <CollectionHead
        title={collectionTitle}
        kicker={leadArticle.issue.title}
        permalink={section.featured ? sectionPermalink : null}
        classes={`rail-criticspage-bg collection-${section.slug}`}
      />
      <div className="">
        <Frame
          LeadPromo={<LeadPromo article={leadArticle} />}
          Promos={<Promos articles={restOfArticles} />}
          alt={false}
        />
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
      <div key={i} className="grid grid-cols-4 tablet:grid-cols-6 gap-x-3 gap-y-2 p-3 pb-3">
        <div className="col-span-4 tablet:col-span-6">
          <div className="flex flex-col space-y-1">
            <Link href={permalink}>
              <Bylines article={article} asTitle={true} type={BylineType.CollectionCriticsPage} />
            </Link>
            <Title title={article.title} permalink={permalink} type={TitleType.CollectionCriticsPagePromo} />
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
    <div className="grid grid-cols-4 tablet:grid-cols-6 gap-x-3 gap-y-2 pb-3">
      <div className="col-span-4 tablet:col-span-3" itemType="http://schema.org/Article">
        {featured_image && (
          <div className="pr-3">
            <FeaturedImage image={featured_image} title={title} permalink={permalink} />
          </div>
        )}
      </div>
      <div className="col-span-4 tablet:col-span-3">
        <div className="flex flex-col space-y-3">
          <Title title={article.title} permalink={permalink} type={TitleType.CollectionCriticsPage} />
          <Bylines article={article} type={BylineType.Default} />
          <Excerpt excerpt={article.excerpt} type={ExcerptType.CriticsPage} />
        </div>
      </div>
    </div>
  )
}

export default CollectionCriticsPage
