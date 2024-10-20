import { Articles, ArticlesContributors } from "../../../../../lib/types"
import { getPermalink, PageType } from "../../../../../lib/utils"
import Link from "next/link"

export enum BylineType {
  Option = "option",
  None = "not-italic",
  Default = "text-sm not-italic",
  TOC = "text-sm not-italic inline",
  ArticleHeadDiptych = "text-md tablet-lg:text-lg font-sans not-italic",
  ArticleHead = "text-md tablet-lg:text-lg font-sans not-italic",
  SectionPromo = "text-md font-sans not-italic",
  CollectionArtSeen = "text-lg font-sans not-italic",
  CollectionBooks = "text-xs tablet:text-lg font-sans not-italic",
  CollectionDefault = "text-xs tablet:text-lg font-sans not-italic",
  CollectionDance = "text-xs tablet:text-xl not-italic font-sans",
  TributeArticle = "text-lg tablet-lg:text-lg font-bold font-sans not-italic",
  TributeNextPrev = "text-sm tablet-lg:text-md font-medium font-sans not-italic",
  TributeWritersList = "text-sm not-italic inline",
  CriticsPage = "text-2xl font-bold",
  CollectionCriticsPage = "text-3xl font-normal font-serif",
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

            if (linked) {
              const permalink = getPermalink({
                slug: contributor.contributors_id.slug,
                type: PageType.Contributor,
              })

              return (
                <Link key={i} rel="author" href={permalink} className="url fn n">
                  {!isFirst && separator}
                  {contributor.contributors_id.first_name} {contributor.contributors_id.last_name}
                </Link>
              )
            }

            if (type === BylineType.Option) {
              return `${!isFirst ? separator : ""} ${contributor.contributors_id.first_name} ${contributor.contributors_id.last_name}`
            }

            return (
              <span
                key={i}
                className={
                  type === BylineType.CollectionArtSeen ||
                  type === BylineType.CollectionBooks ||
                  type === BylineType.CollectionDance ||
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

  return <address className={`author ${type}`}>{byline_contents}</address>
}
export default Bylines
