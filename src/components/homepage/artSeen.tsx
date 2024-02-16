import { HomepageProps } from "@/pages"
import { Articles } from "../../../lib/types"
import PromoSlim from "../promo/slim"

const ArtSeen = (props: HomepageProps) => {
  const { artSeen, dateSlug } = props

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
