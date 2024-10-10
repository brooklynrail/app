"use client"
import Link from "next/link"
import { Articles, ArticlesContributors, Collections } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import CollectionHead from "./head"
import FeaturedImage from "../featuredImage"
import { stripHtml } from "string-strip-html"
import Title, { TitleType } from "./promos/title"
import Kicker from "./promos/kicker"
import parse from "html-react-parser"
import Frame from "../section/frame"
import FrameScrollable from "../section/frameScrollable"
import styles from "./collection.module.scss"

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

  // get the first article in the section.articles array
  const leadArticle = articles[0]
  // get the list of articles in the section.articles array minus the first article
  const restOfArticles = articles.slice(1)

  return (
    <div key={collection.id} className={`pb-3 bg-stone-100 dark:bg-stone-700`}>
      <CollectionHead title={section.name} permalink={sectionPermalink} classes="bg-stone-100 dark:bg-stone-700" />
      <div className="hidden tablet-lg:block">
        <Frame
          LeadPromo={<LeadPromoPoetry article={leadArticle} />}
          Promos={<PromosPoetry articles={restOfArticles} />}
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
              <Link href={permalink} title={`Visit ${stripHtml(title).result}`}>
                <FeaturedImage image={artwork} title={title} hideCaption={true} />
              </Link>
            </div>
          )}
          <div className="flex flex-col space-y-3">
            <Bylines {...article} />
            <Excerpt {...article} />
          </div>
        </div>
      </div>
    )
  })

  return <>{articles}</>
}

const PromosPoetry = (props: PromoProps) => {
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
      <div key={i} className="py-6 px-3">
        <div className="pb-3">
          <Bylines {...article} />
        </div>
      </div>
    )
  })

  return <>{articles}</>
}

interface LeadPromoProps {
  article: Articles
}
const LeadPromoPoetry = (props: LeadPromoProps) => {
  const { article } = props
  const { title, issue, section, featured_artwork, featured_image, hide_bylines_downstream } = article

  return (
    <div className="flex flex-col space-y-3">
      <div className="" itemType="http://schema.org/Article"></div>
      <div className="px-6 tablet:px-0 flex flex-col space-y-3">
        <Bylines {...article} />
        <Excerpt {...article} />
      </div>
    </div>
  )
}

const Excerpt = (article: Articles) => {
  const { body_text } = article

  // find all of the text between the first instance of [poetry] and the second [/poetry] tags
  const poetryRegex = /\[poetry\]([\s\S]*?)\[\/poetry\]/
  const poetryMatch = body_text && body_text.match(poetryRegex)
  if (poetryMatch) {
    console.log("poetryMatch", poetryMatch[1])
    return (
      <div className={`bg-white relative h-[calc(100vh-25rem)] overflow-hidden`}>
        <div className="absolute bg-gradient-to-t from-stone-50 h-full w-full top-0 bottom-0"></div>
        <div className="p-3">{parse(poetryMatch[1])}</div>
      </div>
    )
  }

  return <div>{body_text && parse(body_text)}</div>
}

const Bylines = (article: Articles) => {
  const { contributors, issue, section } = article
  const permalink = getPermalink({
    year: issue.year,
    month: issue.month,
    section: section.slug,
    slug: article.slug,
    type: PageType.Article,
  })
  return (
    <p className="flex flex-row space-x-3 text-xl">
      <span>By</span>
      {contributors.map((contributor: ArticlesContributors, i: number) => {
        if (!contributor.contributors_id) {
          return null
        }
        const isLast = i === contributors.length - 1
        const isFirst = i === 0
        let separator = ", "

        if (contributors.length > 2 && isLast) {
          separator = ", and "
        } else if (contributors.length === 2 && isLast) {
          separator = " and "
        } else if (isLast) {
          separator = ""
        }

        return (
          <address className={`font-bold author not-italic`}>
            <Link key={i} rel="author" href={permalink} className="url fn n">
              {!isFirst && separator}
              {contributor.contributors_id.first_name} {contributor.contributors_id.last_name}
            </Link>
          </address>
        )
      })}
    </p>
  )
}

export default CollectionPoetry
