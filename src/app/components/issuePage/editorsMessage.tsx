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
    <div className="py-2 pb-3 flex flex-col space-y-1">
      <h3 className="font-bold text-md">Editor's Message</h3>
      {editorsMessage.map((article: Articles, i: number) => {
        // const article = articleIssue
        const permalink = getPermalink({
          year: year,
          month: month,
          section: article.section.slug,
          slug: article.slug,
          type: PageType.Article,
        })
        const sectionPermalink = getPermalink({
          issueSlug: article.issue.slug,
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
          />
        )
      })}
    </div>
  )
}

export default EditorsMessage
