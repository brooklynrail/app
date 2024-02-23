import PromoThumb from "../promo/thumb"
import { PromoProps } from "."
import { Articles } from "../../../lib/types"

const EditorsMessage = (props: PromoProps) => {
  const { dateSlug, currentArticles } = props

  // Get the articles from currentArticles that are in the `editorsmessage` section
  const editorsMessage: Array<Articles> = []
  currentArticles.forEach((article: Articles) => {
    if (article.sections[0].sections_id.slug === "editorsmessage") {
      editorsMessage.push(article)
    }
  })

  return (
    <div className="collection">
      <h3>Editor's Message</h3>
      {editorsMessage.map((article: Articles, i: number) => {
        return (
          <PromoThumb
            key={`publishersmessage-${i}`}
            article={article}
            dateSlug={dateSlug}
            showImage={true}
            showSection={false}
          />
        )
      })}
    </div>
  )
}

export default EditorsMessage
