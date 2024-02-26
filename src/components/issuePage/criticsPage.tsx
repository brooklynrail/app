import { Articles } from "../../../lib/types"
import PromoSlim from "../promo/slim"
import { PromoProps } from "."

const CriticsPage = (props: PromoProps) => {
  const { dateSlug, currentArticles } = props

  // Get only the articles that are in the `criticspage` section from the currentArticles
  const criticsPage: Array<Articles> = []
  currentArticles.forEach((article: Articles) => {
    if (article.sections[0].sections_id.slug === "criticspage") {
      criticsPage.push(article)
    }
  })

  return (
    <>
      <h3>Critics Page</h3>
      <ul>
        {criticsPage.map((article: Articles, i: number) => {
          return <PromoSlim key={`criticspage-${i}`} i={i} article={article} dateSlug={dateSlug} />
        })}
      </ul>
    </>
  )
}

export default CriticsPage
