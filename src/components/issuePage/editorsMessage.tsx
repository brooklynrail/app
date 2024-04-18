import PromoThumb from "../promo/thumb"
import { PromoProps } from "."
import { ArticlesIssues } from "../../../lib/types"
import { PageType, getPermalink } from "../../../lib/utils"

const EditorsMessage = (props: PromoProps) => {
  const { currentArticles, year, month } = props

  // filter the currentArticles to get only the articles in the `editorsmessage` section
  const editorsMessage: ArticlesIssues[] = []
  currentArticles.forEach((articleIssue: ArticlesIssues) => {
    if (articleIssue.articles_slug.sections[0].sections_id.slug === "editorsmessage") {
      editorsMessage.push(articleIssue)
    }
  })

  if (editorsMessage.length === 0) {
    return <></>
  }

  return (
    <div className="collection">
      <h3>Editor's Message</h3>
      {editorsMessage.map((articleIssue: ArticlesIssues, i: number) => {
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
          <PromoThumb
            key={`publishersmessage-${i}`}
            article={article}
            showImage={true}
            showSection={false}
            permalink={permalink}
            sectionPermalink={sectionPermalink}
            order={order}
          />
        )
      })}
    </div>
  )
}

export default EditorsMessage
