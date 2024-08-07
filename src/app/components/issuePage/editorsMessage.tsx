import PromoThumb from "../promo/thumb"
import { PromoProps } from "."
import { PageType, getPermalink } from "../../../../lib/utils"
import { Articles } from "../../../../lib/types"

const EditorsMessage = (props: PromoProps) => {
  const { currentArticles, year, month } = props

  // filter the currentArticles to get only the articles in the `editorsmessage` section
  const editorsMessage: Articles[] = []
  currentArticles.forEach((articleIssue: Articles) => {
    if (articleIssue.section.slug === "editorsmessage") {
      editorsMessage.push(articleIssue)
    }
  })

  if (editorsMessage.length === 0) {
    return <></>
  }

  return (
    <div className="collection">
      <h3>Editor's Message</h3>
      {editorsMessage.map((article: Articles, i: number) => {
        const order = article.sort
        // const article = articleIssue
        const permalink = getPermalink({
          year: year,
          month: month,
          section: article.section.slug,
          slug: article.slug,
          type: PageType.Article,
        })
        const sectionPermalink = getPermalink({
          year: year,
          month: month,
          section: article.section.slug,
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
