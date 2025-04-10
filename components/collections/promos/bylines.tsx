import { Articles, ArticlesContributors } from "@/lib/types"
import { getPermalink, PageType } from "@/lib/utils"
import Link from "next/link"

export enum BylineType {
  Option = "option",
  None = "not-italic",
  Default = "text-sm not-italic",
  DancePromo = "not-italic text-sm",
  TOC = "not-italic inline text-sm",
  ArticleHeadDiptych = "tablet-lg:text-lg font-sans not-italic text-md",
  ArticleHead = "text-md tablet-lg:text-lg font-sans not-italic",
  SectionPromo = "font-sans text-sm not-italic",
  CollectionArtSeen = "text-sm font-sans not-italic",
  CollectionBooks = "not-italic text-sm font-sans",
  CollectionDefault = "text-sm tablet:text-md font-sans",
  SectionDefault = "text-sm font-sans",
  CollectionDance = "text-sm not-italic font-sans",
  TributeArticle = "text-lg tablet-lg:text-lg font-bold font-sans not-italic",
  TributeNextPrev = "text-sm tablet-lg:text-md font-medium font-sans not-italic",
  TributeWritersList = "text-sm not-italic inline",
  CriticsPage = "text-2xl font-bold",
  CriticsPagePromos = "text-2xl tablet-lg:text-3xl font-normal bold font-serif",
  CollectionCriticsPage = "font-normal font-serif text-3xl",
  CriticsPageList = "text-3xl font-normal font-serif",
}

interface BylinesProps {
  article: Articles
  asTitle?: boolean
  hideBy?: boolean
  linked?: boolean
  type: BylineType
}

const Bylines = (props: BylinesProps) => {
  const { article, asTitle, type, hideBy, linked } = props
  const { contributors, byline_override, hide_bylines, hide_bylines_downstream } = article

  if (hide_bylines_downstream || article.contributors.length === 0) {
    return <></>
  }

  const byline_contents = (
    <>
      {byline_override ? (
        <span className="byline-override">{byline_override}</span>
      ) : (
        <>
          {!hideBy && <span>By </span>}
          {contributors.map((contributor: ArticlesContributors, i: number) => {
            if (!contributor.contributors_id) {
              return <></>
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

            const key = `${i}-${contributor.contributors_id.id}`

            if (linked) {
              const permalink = getPermalink({
                slug: contributor.contributors_id.slug,
                type: PageType.Contributor,
              })

              return (
                <span key={key}>
                  {!isFirst && separator}
                  <Link rel="author" href={permalink} className="url fn n">
                    {contributor.contributors_id.first_name} {contributor.contributors_id.last_name}
                  </Link>
                </span>
              )
            }

            if (type === BylineType.Option) {
              return `${!isFirst ? separator : ""} ${contributor.contributors_id.first_name} ${contributor.contributors_id.last_name}`
            }

            return (
              <span
                key={key}
                className={
                  type === BylineType.CollectionArtSeen ||
                  type === BylineType.CollectionBooks ||
                  type === BylineType.CollectionDance ||
                  type === BylineType.DancePromo ||
                  type === BylineType.SectionDefault ||
                  type === BylineType.CollectionDefault ||
                  type === BylineType.TOC
                    ? "font-bold"
                    : ""
                }
              >
                {!isFirst && separator}
                {contributor.contributors_id.first_name} {contributor.contributors_id.last_name}
              </span>
            )
          })}
        </>
      )}
    </>
  )

  if (type === BylineType.Option) {
    return <>{byline_contents}</>
  }

  if (asTitle) {
    return (
      <h2 className={type}>
        <address className={`author not-italic`}>{byline_contents}</address>
      </h2>
    )
  }

  return <address className={`author not-italic ${type}`}>{byline_contents}</address>
}
export default Bylines
