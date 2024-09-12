import { Articles } from "../../../../../lib/types"
import styles from "./promos.module.scss"

interface BylinesProps {
  article: Articles
}

const Bylines = (props: BylinesProps) => {
  const { article } = props
  const { contributors, byline_override, hide_bylines, hide_bylines_downstream } = article

  const by = "By"

  return (
    <cite className={styles.byline}>
      {byline_override ? (
        <span className="byline-override">{byline_override}</span>
      ) : (
        <>
          <span>{by} </span>
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
              <span key={i} className={styles.name}>
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