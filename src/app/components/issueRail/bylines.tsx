import Link from "next/link"
import { ArticlesContributors } from "../../../../lib/types"

interface BylinesProps {
  contributors: ArticlesContributors[]
  byline_override?: string | null
  guestCritic?: boolean
  hideBy?: boolean
  linked?: boolean
}
const Bylines = (props: BylinesProps) => {
  const { contributors, byline_override, guestCritic, hideBy, linked } = props
  if (!contributors || contributors.length === 0) {
    return null
  }
  const by = guestCritic ? <strong>Guest Critic:</strong> : "By"
  return (
    <cite>
      {byline_override ? (
        <span>{byline_override}</span>
      ) : (
        <>
          {!hideBy && <span>{by} </span>}
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
              return (
                <Link key={i} href={`/contributors/${contributor.contributors_id.slug}`}>
                  <span>
                    {!isFirst && separator}
                    {contributor.contributors_id.first_name} {contributor.contributors_id.last_name}
                  </span>
                </Link>
              )
            }
            return (
              <span key={i}>
                {!isFirst && separator}
                {contributor.contributors_id.first_name} {contributor.contributors_id.last_name}
              </span>
            )
          })}
        </>
      )}
    </cite>
  )
}
export default Bylines
