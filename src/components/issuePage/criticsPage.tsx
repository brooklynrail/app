import { Articles } from "../../../lib/types"
import PromoSlim from "../promo/slim"
import { PromoProps } from "."
import { PageType, getPermalink } from "../../../lib/utils"

const CriticsPage = (props: PromoProps) => {
  const { currentArticles, year, month } = props

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
          const permalink = getPermalink({
            year: year,
            month: month,
            section: article.sections[0].sections_id.slug,
            slug: article.slug,
            type: PageType.Article,
          })
          return <PromoSlim key={`criticspage-${i}`} i={i} article={article} permalink={permalink} />
        })}
      </ul>
    </>
  )
}

export default CriticsPage
