import parse from "html-react-parser"
import { Articles } from "../../../../../lib/types"
import { getPermalink, PageType } from "../../../../../lib/utils"
import PromoSpecialSection from "../../promo/specialSection"
import { LayoutProps } from "./issue"
import SubscribeAd from "../subscribeAd"

const SpecialIssue = (props: LayoutProps) => {
  const { issueData } = props

  const currentArticles = issueData.articles

  const allArticles = currentArticles.map((article: Articles, i: number) => {
    const permalink = getPermalink({
      issueSlug: issueData.slug,
      section: article.section.slug,
      type: PageType.SpecialIssueArticle,
      slug: article.slug,
    })
    const sectionPermalink = getPermalink({
      issueSlug: issueData.slug,
      section: article.section.slug,
      type: PageType.SpecialIssueSection,
      slug: article.section.slug,
    })
    return (
      <PromoSpecialSection
        key={`${i}-${article.slug}`}
        article={article}
        permalink={permalink}
        sectionPermalink={sectionPermalink}
        showImage={true}
        showSection={false}
        order={article.sort}
      />
    )
  })

  return (
    <div className="grid-col-8">
      {(issueData.summary || issueData.credits) && (
        <header className="section">
          <div className="description">
            {issueData.summary && <div className="blurb">{parse(issueData.summary)}</div>}
            {issueData.credits && <div className="credits">{parse(issueData.credits)}</div>}
          </div>
        </header>
      )}
      <div className="grid-row grid-gap-4">
        <div className="grid-col-12">
          <div className="collection">{allArticles}</div>
        </div>
      </div>
      <SubscribeAd />
    </div>
  )
}

export default SpecialIssue
