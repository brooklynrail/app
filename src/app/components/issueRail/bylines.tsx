import { ArticlesContributors } from "../../../../lib/types"

interface BylinesProps {
  contributors: ArticlesContributors[]
}
const Bylines = (props: BylinesProps) => {
  const { contributors } = props
  if (!contributors || contributors.length === 0) {
    return null
  }
  return (
    <cite>
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
    </cite>
  )
}
export default Bylines
