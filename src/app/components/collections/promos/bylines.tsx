import { Articles } from "../../../../../lib/types"

export enum BylineType {
  Default = "default",
  CriticsPage = "critics-page",
}

interface BylinesProps {
  article: Articles
  asTitle?: boolean
  type: BylineType
}

const Bylines = (props: BylinesProps) => {
  const { article, asTitle, type } = props
  const { contributors, byline_override, hide_bylines, hide_bylines_downstream } = article

  if (hide_bylines_downstream) {
    return <></>
  }

  const byline = (
    <>
      {byline_override ? (
        <span className="byline-override">{byline_override}</span>
      ) : (
        <>
          {!asTitle && <span>By </span>}
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

  if (!asTitle) {
    return <cite className={`text-sm not-italic`}>{byline}</cite>
  }

  return (
    <h2 className="text-2xl font-bold">
      <cite className={`not-italic`}>{byline}</cite>
    </h2>
  )
}
export default Bylines
