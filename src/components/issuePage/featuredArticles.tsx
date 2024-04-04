import PromoStandard from "../promo/standard"
import { ArticlesIssues } from "../../../lib/types"
import { PromoProps } from "."
import { PageType, getPermalink } from "../../../lib/utils"

const FeaturedArticles = (props: PromoProps) => {
  const { currentArticles, year, month } = props

  // Filter the currentArticles to get only the articles that are featured
  const featuredArticles: ArticlesIssues[] = []
  currentArticles.forEach((articleIssue: ArticlesIssues) => {
    if (articleIssue.articles_slug.featured) {
      featuredArticles.push(articleIssue)
    }
  })

  return (
    <div className="collection">
      {featuredArticles.map((articleIssue: ArticlesIssues, i: number) => {
        const order = articleIssue.order
        const article = articleIssue.articles_slug
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
            order={order}
          />
        )
      })}
    </div>
  )
}

export default FeaturedArticles
