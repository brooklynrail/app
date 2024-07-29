import PromoSlim from "../promo/slim"
import { PromoProps } from "."
import { PageType, getPermalink } from "../../../../lib/utils"
import { Articles } from "../../../../lib/types"

const ArtSeen = (props: PromoProps) => {
  const { currentArticles, year, month } = props

  // Filter the currentArticles to get only the articles in the `artseen` section
  const artSeen: Articles[] = []
  currentArticles.forEach((articleIssue: Articles) => {
    if (articleIssue.section.slug === "artseen") {
      artSeen.push(articleIssue)
    }
  })

  if (artSeen.length === 0) {
    return <></>
  }

  return (
    <div className="collection">
      <h3>ArtSeen</h3>
      <ul>
        {artSeen.map((article: Articles, i: number) => {
          const order = article.sort
          const permalink = getPermalink({
            year: year,
            month: month,
            section: article.section.slug,
            slug: article.slug,
            type: PageType.Article,
          })
          return <PromoSlim key={`artseen-${i}`} i={i} article={article} permalink={permalink} order={order} />
        })}
      </ul>
    </div>
  )
}

export default ArtSeen
