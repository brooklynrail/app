import PromoStandard from "../promo/standard"
import { Articles } from "../../../lib/types"
import { PromoProps } from "."
import { PageType, getPermalink } from "../../../lib/utils"

const FeaturedArticles = (props: PromoProps) => {
  const { currentArticles, year, month } = props

  // Get only the Featured articles from currentArticles
  const featuredArticles: Array<Articles> = []
  currentArticles.forEach((article: Articles) => {
    if (article.featured) {
      featuredArticles.push(article)
    }
  })

  return (
    <section className="collection">
      {featuredArticles.map((article: Articles, i: number) => {
        const permalink = getPermalink({
          year: year,
          month: month,
          section: article.sections[0].sections_id.slug,
          slug: article.slug,
          type: PageType.Article,
        })
        return (
          <PromoStandard
            key={`featured-${i}`}
            article={article}
            permalink={permalink}
            showImage={true}
            showSection={true}
            year={year}
            month={month}
          />
        )
      })}
    </section>
  )
}

export default FeaturedArticles
