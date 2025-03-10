"use client"
import { Articles, Collections } from "@/lib/types"
import { getPermalink, PageType } from "@/lib/utils"
import Link from "next/link"
import FeaturedImage from "../featuredImage"
import Frame from "../frames/frame"
import CollectionHead from "./head"
import Bylines, { BylineType } from "./promos/bylines"
import Excerpt from "./promos/excerpt"
import Title from "./promos/title"

const CollectionCriticsPage = (collection: Collections) => {
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

  // Get all valid contributors
  const contributors = leadArticle.contributors
    .map(({ contributors_id }) => {
      if (!contributors_id) {
        return null
      }
      return `${contributors_id.first_name} ${contributors_id.last_name}`
    })
    .filter(Boolean)
  // Format the contributors list with appropriate separators
  const guestCritics = contributors.reduce((acc: string, name: string | null, i: number) => {
    if (i === 0) {
      return name || ""
    }

    let separator = ", "
    if (contributors.length === 2) {
      separator = " and "
    } else if (i === contributors.length - 1) {
      separator = ", and "
    }

    return acc + separator + name
  }, "")

  const guestCriticHead = `Guest Critic${contributors.length > 1 ? "s" : ""}: ${guestCritics}`

  return (
    <div key={collection.id} className={`collection theme-${section.slug}`}>
      <CollectionHead
        title={collection.title}
        description={section.description}
        kicker={leadArticle.issue.title}
        permalink={section.featured ? sectionPermalink : null}
        theme={`theme-${section.slug}`}
      />
      <div className="">
        <div className="px-6 pt-6 font-serif font-medium text-4xl">
          <h3>{guestCriticHead}</h3>
        </div>
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
  const articles = props.articles.map((article) => {
    const { issue, section } = article
    const permalink = getPermalink({
      year: issue.year,
      month: issue.month,
      section: section.slug,
      slug: article.slug,
      type: PageType.Article,
    })

    return (
      <div key={article.id} className="grid grid-cols-4 tablet:grid-cols-6 gap-x-3 gap-y-2 p-3 pb-3">
        <div className="col-span-4 tablet:col-span-6">
          <div className="flex flex-col space-y-1">
            <Link href={permalink}>
              <Bylines article={article} asTitle={true} type={BylineType.CollectionCriticsPage} hideBy={true} />
            </Link>
            <Title title={article.title} permalink={permalink} classes="pl-3 font-medium font-sans text-sm" />
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
  const { title, featured_image, issue, section } = article

  const permalink = getPermalink({
    year: issue.year,
    month: issue.month,
    section: section.slug,
    slug: article.slug,
    type: PageType.Article,
  })

  return (
    <div className="grid grid-cols-4 tablet-lg:grid-cols-6 gap-x-3 gap-y-2 pb-3">
      <div className="col-span-4 tablet-lg:col-span-3" itemType="http://schema.org/Article">
        {featured_image && (
          <div className="pr-3">
            <FeaturedImage
              image={featured_image}
              hideCaption={true}
              title={title}
              permalink={permalink}
              sizes={`(max-width: 640px) 100vw, 33vw`}
            />
          </div>
        )}
      </div>
      <div className="col-span-4 tablet-lg:col-span-3">
        <div className="flex flex-col space-y-3">
          <Title
            title={article.title}
            permalink={permalink}
            classes="font-normal font-serif text-4xl desktop-lg:text-5xl"
          />
          <Bylines article={article} type={BylineType.Default} />
          <Excerpt excerpt={article.excerpt} classes={`excerpt-lg`} />
        </div>
      </div>
    </div>
  )
}

export default CollectionCriticsPage
