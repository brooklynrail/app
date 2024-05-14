import { ArticlesContributors } from "../../../../lib/types"

interface BylinesProps {
  contributors: ArticlesContributors[]
  byline_override?: string | null
}
const Bylines = (props: BylinesProps) => {
  const { contributors, byline_override } = props
  if (!contributors || contributors.length === 0) {
    return null
  }
  return (
    <cite>
      {byline_override ? (
        <span>{byline_override}</span>
      ) : (
        <>
          <span>By </span>
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
