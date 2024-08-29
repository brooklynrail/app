import parse from "html-react-parser"
import { Articles } from "../../../../../lib/types"
import { getPermalink, PageType } from "../../../../../lib/utils"
import PromoSpecialSection from "../../promo/specialSection"
import { LayoutProps } from "./issue"
import SubscribeAd from "../subscribeAd"

const SpecialIssue = (props: LayoutProps) => {
  const { thisIssueData } = props

  const currentArticles = thisIssueData.articles

  const allArticles = currentArticles.map((article: Articles, i: number) => {
    const permalink = getPermalink({
      issueSlug: thisIssueData.slug,
      section: article.section.slug,
      type: PageType.SpecialIssueArticle,
      slug: article.slug,
    })
    const sectionPermalink = getPermalink({
      issueSlug: thisIssueData.slug,
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
      {(thisIssueData.summary || thisIssueData.credits) && (
        <header className="section">
          <div className="description">
            {thisIssueData.summary && <div className="blurb">{parse(thisIssueData.summary)}</div>}
            {thisIssueData.credits && <div className="credits">{parse(thisIssueData.credits)}</div>}
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
