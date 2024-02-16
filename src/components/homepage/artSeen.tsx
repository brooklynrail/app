import { HomepageProps } from "@/pages"
import { Articles } from "../../../lib/types"
import PromoSlim from "../promo/slim"

const ArtSeen = (props: HomepageProps) => {
  const { currentIssue, artSeen } = props
  const { year, month } = currentIssue
  const dateSlug = `${year}/${month}`

  return (
    <>
      <h3>ArtSeen</h3>
      <ul>
        <>
          {artSeen.map((article: Articles, i: number) => {
            return <PromoSlim key={i} i={i} article={article} dateSlug={dateSlug} />
          })}
        </>
      </ul>
    </>
  )
}

export default ArtSeen
