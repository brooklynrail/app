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
    <div className="py-2 pb-3 flex flex-col space-y-1">
      <h3 className="font-bold">Critics Page</h3>
      <ul>
        {criticsPage.map((article: Articles, i: number) => {
          const permalink = getPermalink({
            year: year,
            month: month,
            section: article.section.slug,
            slug: article.slug,
            type: PageType.Article,
          })
          return <PromoSlim key={`criticspage-${i}`} i={i} article={article} permalink={permalink} />
        })}
      </ul>
    </div>
  )
}

export default CriticsPage
