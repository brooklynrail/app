"use client"
import parse from "html-react-parser"
import Link from "next/link"
import { Articles, Collections } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import Frame from "../frames/frame"
import FrameScrollable from "../frames/frameScrollable"
import CollectionHead from "./head"
import Bylines, { BylineType } from "./promos/bylines"
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

  // get the first article in the section.articles array
  const leadArticle = articles[0]
  // get the list of articles in the section.articles array minus the first article
  const restOfArticles = articles.slice(1)

  return (
    <div key={collection.id} className={`collection theme`}>
      <CollectionHead title={collection.title} permalink={section.featured ? sectionPermalink : null} />
      {/* <div className="hidden tablet-lg:block">
        <Frame
          LeadPromo={<LeadPromo article={leadArticle} />}
          Promos={<PromosPoetry articles={restOfArticles} />}
          alt={false}
        />
      </div> */}
      <div className="">
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
      <div key={i} className="px-6 tablet-lg:first:pl-0 tablet-lg:last:pr-0 snap-center">
        <div className="flex flex-col space-y-3 flex-none w-[calc(65vw)] tablet-lg:w-[calc(33vw)]">
          <div className="flex flex-col space-y-3">
            <div className="pb-3 flex flex-col space-y-3">
              <Title permalink={permalink} title={article.title} classes="font-bold text-xl" />
              <Bylines article={article} type={BylineType.Default} />
            </div>
            <Link href={permalink}>
              <PoetryCard {...article} />
            </Link>
          </div>
        </div>
      </div>
    )
  })

  return <>{articles}</>
}

const PromosPoetry = (props: PromoProps) => {
  const articles = props.articles.map((article, i = 1) => {
    const { issue, section } = article

    const permalink = getPermalink({
      year: issue.year,
      month: issue.month,
      section: section.slug,
      slug: article.slug,
      type: PageType.Article,
    })

    return (
      <div key={i} className="py-6 px-3">
        <div className="pb-3 flex justify-between items-start">
          <div className="pb-3 flex flex-col space-y-3">
            <Title permalink={permalink} title={article.title} classes="font-bold text-xl" />
            <Bylines article={article} type={BylineType.Default} />
          </div>
          <Link href={permalink}>
            <svg width="64" height="37" viewBox="0 0 64 37" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M49.7071 19.0723C50.0976 18.6818 50.0976 18.0487 49.7071 17.6581L43.3431 11.2942C42.9526 10.9036 42.3195 10.9036 41.9289 11.2942C41.5384 11.6847 41.5384 12.3179 41.9289 12.7084L47.5858 18.3652L41.9289 24.0221C41.5384 24.4126 41.5384 25.0458 41.9289 25.4363C42.3195 25.8268 42.9526 25.8268 43.3431 25.4363L49.7071 19.0723ZM15 19.3652H49V17.3652H15V19.3652Z"
                fill="#EEF2FF"
                className="fill-zinc-800 dark:fill-slate-50"
              />
            </svg>
          </Link>
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
  const { issue, section } = article

  const permalink = getPermalink({
    year: issue.year,
    month: issue.month,
    section: section.slug,
    slug: article.slug,
    type: PageType.Article,
  })

  return (
    <div className="flex flex-col space-y-3">
      <div className="" itemType="http://schema.org/Article"></div>
      <div className="px-6 tablet:px-0 flex flex-col space-y-3">
        <Title permalink={permalink} title={article.title} classes="font-bold text-xl" />
        <Bylines article={article} type={BylineType.Default} />
        <PoetryCard {...article} />
      </div>
    </div>
  )
}

const PoetryCard = (article: Articles) => {
  const { body_text } = article

  // find all of the text between the first instance of [poetry] and the second [/poetry] tags
  const poetryRegex = /\[poetry\]([\s\S]*?)\[\/poetry\]/
  const poetryMatch = body_text && body_text.match(poetryRegex)

  if (poetryMatch) {
    return (
      <div className={`bg-white relative h-[calc(100vh-45rem)] overflow-hidden shadow-lg`}>
        <div className="absolute bg-gradient-to-t from-stone-50 h-full w-full top-0 bottom-0"></div>
        <div className="p-3 text-zinc-800">{parse(poetryMatch[1])}</div>
      </div>
    )
  }

  return <div className="bg-lime-400">{body_text && parse(body_text)}</div>
}

export default CollectionPoetry
