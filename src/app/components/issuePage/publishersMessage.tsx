import PromoThumb from "../promo/thumb"
import { PromoProps } from "."
import { PageType, getPermalink } from "../../../../lib/utils"
import { Articles } from "../../../../lib/types"

const PublishersMessage = (props: PromoProps) => {
  const { currentArticles, year, month, thisIssueData } = props

  // Filter the currentArticles to get only the articles in the `publishersmessage` section
  const publishersMessage: Articles[] = []
  currentArticles.forEach((articleIssue: Articles) => {
    if (articleIssue.section.slug === "publishersmessage") {
      publishersMessage.push(articleIssue)
    }
  })

  if (publishersMessage.length === 0) {
    return null
  }

  return (
    <div className="py-2 pb-3 flex flex-col space-y-1">
      <h3 className="font-bold text-md">From the Publisher & Artistic Director</h3>
      {publishersMessage.map((articleIssue: Articles, i: number) => {
        const article = articleIssue
        const permalink = getPermalink({
          year: year,
          month: month,
          section: article.section.slug,
          slug: article.slug,
          type: PageType.Article,
        })
        const sectionPermalink = getPermalink({
          issueSlug: thisIssueData.slug,
          section: article.section.slug,
          type: PageType.Section,
        })
        return (
          <PromoThumb
            key={`publishersmessage-${i}`}
            article={article}
            showImage={false}
            showSection={false}
            sectionPermalink={sectionPermalink}
            permalink={permalink}
          />
        )
      })}
    </div>
  )
}

export default PublishersMessage
