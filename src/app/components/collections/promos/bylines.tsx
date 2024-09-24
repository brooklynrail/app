import { Articles } from "../../../../../lib/types"
import { getPermalink, PageType } from "../../../../../lib/utils"
import Link from "next/link"

export enum BylineType {
  None = "not-italic",
  Default = "text-sm not-italic",
  TributeArticle = "text-xl font-bold font-serif not-italic",
  CriticsPage = "text-2xl font-bold",
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

  if (hide_bylines_downstream) {
    return <></>
  }

  const byline_contents = (
    <>
      {byline_override ? (
        <span className="byline-override">{byline_override}</span>
      ) : (
        <>
          {!asTitle && !hideBy && <span>By </span>}
          {contributors.map((contributor: any, i: number) => {
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
            return (
              <span key={i} className="">
                {!isFirst && separator}
                {contributor.contributors_id.first_name} {contributor.contributors_id.last_name}
              </span>
            )
          })}
        </>
      )}
    </>
  )

  if (asTitle) {
    return (
      <h2 className={type}>
        <address className={`author`}>{byline_contents}</address>
      </h2>
    )
  }

  return <address className={`author ${type}`}>{byline_contents}</address>
}
export default Bylines