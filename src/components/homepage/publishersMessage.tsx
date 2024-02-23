import PromoThumb from "../promo/thumb"
import { Articles } from "../../../lib/types"
import { PromoProps } from "."

const PublishersMessage = (props: PromoProps) => {
  const { dateSlug, currentArticles } = props
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
        return (
          <PromoThumb
            key={`publishersmessage-${i}`}
            article={article}
            dateSlug={dateSlug}
            showImage={false}
            showSection={false}
          />
        )
      })}
    </div>
  )
}

export default PublishersMessage
