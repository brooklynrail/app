import PromoStandard from "../promo/standard"
import { PromoProps } from "."
import { PageType, getPermalink } from "../../../../lib/utils"
import { Articles, Issues } from "../../../../lib/types"

const FeaturedArticles = (props: PromoProps) => {
  const { currentArticles, year, month, thisIssueData } = props

  // Filter the currentArticles to get only the articles that are featured
  const featuredArticles: Articles[] = []
  currentArticles.forEach((article: Articles) => {
    if (article.featured) {
      featuredArticles.push(article)
    }
  })

  if (featuredArticles.length === 0) {
    return null
  }

  return (
    <>
      {featuredArticles.map((articleIssue: Articles, i: number) => {
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
          <PromoStandard
            key={`featured-${i}`}
            article={article}
            permalink={permalink}
            showImage={true}
            showSection={true}
            sectionPermalink={sectionPermalink}
          />
        )
      })}
    </>
  )
}

export default FeaturedArticles
