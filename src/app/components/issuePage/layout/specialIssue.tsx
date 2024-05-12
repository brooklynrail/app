import parse from "html-react-parser"
import { ArticlesIssues } from "../../../../../lib/types"
import { getPermalink, PageType } from "../../../../../lib/utils"
import PromoSpecialSection from "../../promo/specialSection"
import { LayoutProps } from "./issue"

const SpecialIssue = (props: LayoutProps) => {
  const { issueData } = props

  const currentArticles = issueData.articles

  const allArticles = currentArticles.map((article: ArticlesIssues, i: number) => {
    const permalink = getPermalink({
      issueSlug: issueData.slug,
      section: article.articles_slug.sections[0].sections_id.slug,
      type: PageType.SpecialIssueArticle,
      slug: article.articles_slug.slug,
    })
    const sectionPermalink = getPermalink({
      issueSlug: issueData.slug,
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

  return (
    <div className="grid-col-8">
      <header className="section">
        <div className="description">
          {issueData.summary && <p className="blurb">{parse(issueData.summary)}</p>}
          {issueData.credits && <p className="credits">{parse(issueData.credits)}</p>}
        </div>
      </header>
      <div className="grid-row grid-gap-4">
        <div className="grid-col-12">
          <div className="collection">{allArticles}</div>
        </div>
      </div>
    </div>
  )
}

export default SpecialIssue
