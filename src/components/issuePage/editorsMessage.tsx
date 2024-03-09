import PromoThumb from "../promo/thumb"
import { PromoProps } from "."
import { Articles } from "../../../lib/types"
import { PageType, getPermalink } from "../../../lib/utils"

const EditorsMessage = (props: PromoProps) => {
  const { currentArticles, year, month } = props

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
            showImage={true}
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

export default EditorsMessage
