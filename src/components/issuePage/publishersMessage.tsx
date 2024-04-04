import PromoThumb from "../promo/thumb"
import { ArticlesIssues } from "../../../lib/types"
import { PromoProps } from "."
import { PageType, getPermalink } from "../../../lib/utils"

const PublishersMessage = (props: PromoProps) => {
  const { currentArticles, year, month } = props

  // Filter the currentArticles to get only the articles in the `publishersmessage` section
  const publishersMessage: ArticlesIssues[] = []
  currentArticles.forEach((articleIssue: ArticlesIssues) => {
    if (articleIssue.articles_slug.sections[0].sections_id.slug === "publishersmessage") {
      publishersMessage.push(articleIssue)
    }
  })

  return (
    <div className="collection">
      <h3>From the Publisher & Artistic Director</h3>
      {publishersMessage.map((articleIssue: ArticlesIssues, i: number) => {
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
          <PromoThumb
            key={`publishersmessage-${i}`}
            article={article}
            showImage={false}
            showSection={false}
            permalink={permalink}
            year={year}
            month={month}
            order={order}
          />
        )
      })}
    </div>
  )
}

export default PublishersMessage
