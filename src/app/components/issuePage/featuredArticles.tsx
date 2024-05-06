import PromoStandard from "../promo/standard"
import { ArticlesIssues } from "../../../../lib/types"
import { PromoProps } from "."
import { PageType, getPermalink } from "../../../../lib/utils"

const FeaturedArticles = (props: PromoProps) => {
  const { currentArticles, year, month } = props

  // Filter the currentArticles to get only the articles that are featured
  const featuredArticles: ArticlesIssues[] = []
  currentArticles.forEach((articleIssue: ArticlesIssues) => {
    if (articleIssue.articles_slug.featured) {
      featuredArticles.push(articleIssue)
    }
  })

  if (featuredArticles.length === 0) {
    return <></>
  }

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
        const sectionPermalink = getPermalink({
          year: year,
          month: month,
          section: article.sections[0].sections_id.slug,
          type: PageType.Section,
        })
        return (
          <PromoStandard
            key={`featured-${i}`}
            article={article}
            permalink={permalink}
            showImage={true}
            showSection={true}
            sectionPermalink={sectionPermalink}
            order={order}
          />
        )
      })}
    </div>
  )
}

export default FeaturedArticles
