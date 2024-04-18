import { IssuePageProps } from "@/pages"
import { ArticlesIssues } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import PromoSpecialSection from "../../promo/specialSection"

const SpecialIssue = (props: IssuePageProps) => {
  const { currentIssue, currentArticles } = props

  const allArticles = currentArticles.map((article: ArticlesIssues, i: number) => {
    const permalink = getPermalink({
      issueSlug: currentIssue.slug,
      section: article.articles_slug.sections[0].sections_id.slug,
      type: PageType.SpecialIssueArticle,
      slug: article.articles_slug.slug,
    })
    const sectionPermalink = getPermalink({
      issueSlug: currentIssue.slug,
      section: article.articles_slug.sections[0].sections_id.slug,
      type: PageType.SpecialIssueSection,
      slug: article.articles_slug.sections[0].sections_id.slug,
    })
    return (
      <PromoSpecialSection
        key={`${i}-${article.articles_slug.slug}`}
        article={article.articles_slug}
        permalink={permalink}
        sectionPermalink={sectionPermalink}
        showImage={true}
        showSection={false}
        order={article.order}
      />
    )
  })

  return <div className="grid-col-8">{allArticles}</div>
}

export default SpecialIssue
