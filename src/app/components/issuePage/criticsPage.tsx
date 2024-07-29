import PromoSlim from "../promo/slim"
import { PromoProps } from "."
import { PageType, getPermalink } from "../../../../lib/utils"
import { Articles } from "../../../../lib/types"

const CriticsPage = (props: PromoProps) => {
  const { currentArticles, year, month } = props

  // Filter the currentArticles to get only the articles in the `criticspage` section
  const criticsPage: Articles[] = []
  currentArticles.forEach((articleIssue: Articles) => {
    if (articleIssue.section.slug === "criticspage") {
      criticsPage.push(articleIssue)
    }
  })

  if (criticsPage.length === 0) {
    return <></>
  }

  return (
    <div className="collection">
      <h3>Critics Page</h3>
      <ul>
        {criticsPage.map((article: Articles, i: number) => {
          const order = article.sort
          const permalink = getPermalink({
            year: year,
            month: month,
            section: article.section.slug,
            slug: article.slug,
            type: PageType.Article,
          })
          return <PromoSlim key={`criticspage-${i}`} i={i} article={article} permalink={permalink} order={order} />
        })}
      </ul>
    </div>
  )
}

export default CriticsPage
