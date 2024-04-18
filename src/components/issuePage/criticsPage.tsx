import { ArticlesIssues } from "../../../lib/types"
import PromoSlim from "../promo/slim"
import { PromoProps } from "."
import { PageType, getPermalink } from "../../../lib/utils"

const CriticsPage = (props: PromoProps) => {
  const { currentArticles, year, month } = props

  // Filter the currentArticles to get only the articles in the `criticspage` section
  const criticsPage: ArticlesIssues[] = []
  currentArticles.forEach((articleIssue: ArticlesIssues) => {
    if (articleIssue.articles_slug.sections[0].sections_id.slug === "criticspage") {
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
        {criticsPage.map((articleIssue: ArticlesIssues, i: number) => {
          const order = articleIssue.order
          const article = articleIssue.articles_slug
          const permalink = getPermalink({
            year: year,
            month: month,
            section: article.sections[0].sections_id.slug,
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
