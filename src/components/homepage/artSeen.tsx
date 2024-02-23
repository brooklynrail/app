import { Articles } from "../../../lib/types"
import PromoSlim from "../promo/slim"
import { PromoProps } from "."

const ArtSeen = (props: PromoProps) => {
  const { dateSlug, currentArticles } = props

  // Get only the articles that are in the `criticspage` section from the currentArticles
  const artSeen: Array<Articles> = []
  currentArticles.forEach((article: Articles) => {
    if (article.sections[0].sections_id.slug === "artseen") {
      artSeen.push(article)
    }
  })

  return (
    <>
      <h3>ArtSeen</h3>
      <ul>
        {artSeen.map((article: Articles, i: number) => {
          return <PromoSlim key={`artseen-${i}`} i={i} article={article} dateSlug={dateSlug} />
        })}
      </ul>
    </>
  )
}

export default ArtSeen
