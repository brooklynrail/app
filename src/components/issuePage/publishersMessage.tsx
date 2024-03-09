import PromoThumb from "../promo/thumb"
import { Articles } from "../../../lib/types"
import { PromoProps } from "."
import { PageType, getPermalink } from "../../../lib/utils"

const PublishersMessage = (props: PromoProps) => {
  const { currentArticles, year, month } = props
  // Get the articles from currentArticles that are in the `publishersmessage` section
  const publishersMessage: Array<Articles> = []
  currentArticles.forEach((article: Articles) => {
    if (article.sections[0].sections_id.slug === "publishersmessage") {
      publishersMessage.push(article)
    }
  })

  return (
    <div className="collection">
      <h3>From the Publisher & Artistic Director</h3>
      {publishersMessage.map((article: Articles, i: number) => {
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
          />
        )
      })}
    </div>
  )
}

export default PublishersMessage
