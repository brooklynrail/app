import PromoSlim from "../promo/slim"
import { PromoProps } from "."
import { PageType, getPermalink } from "../../../../lib/utils"
import { Articles } from "../../../../lib/types"
import PromoThumb from "../promo/thumb"

const CriticsPage = (props: PromoProps) => {
  const { currentArticles, year, month, thisIssueData } = props

  // Filter the currentArticles to get only the articles in the `criticspage` section
  const criticsPage: Articles[] = []
  currentArticles.forEach((articleIssue: Articles) => {
    if (articleIssue.section.slug === "criticspage") {
      criticsPage.push(articleIssue)
    }
  })

  if (criticsPage.length === 0) {
    return null
  }

  // Filter the criticspage array and get the first "featured" article
  const leadArticle = criticsPage.filter((article) => article.featured)[0] || null
  const restOfArticles = leadArticle ? criticsPage.filter((article) => article !== leadArticle) : criticsPage

  return (
    <div className="py-2 pb-3 flex flex-col space-y-1">
      <h3 className="font-bold text-md">Critics Page</h3>
      <Lead leadArticle={leadArticle} />
      <ul>
        {restOfArticles.map((article: Articles, i: number) => {
          const permalink = getPermalink({
            year: year,
            month: month,
            section: article.section.slug,
            slug: article.slug,
            type: PageType.Article,
          })
          return <PromoSlim key={`criticspage-${i}`} i={i} article={article} permalink={permalink} />
        })}
      </ul>
    </div>
  )
}

interface LeadProps {
  leadArticle: Articles
}
const Lead = (props: LeadProps) => {
  const { leadArticle } = props

  if (!leadArticle) {
    return null
  }
  const leadPermalink = getPermalink({
    year: leadArticle.issue.year,
    month: leadArticle.issue.month,
    section: leadArticle.section.slug,
    slug: leadArticle.slug,
    type: PageType.Article,
  })
  return (
    <PromoThumb
      article={leadArticle}
      showImage={true}
      showSection={false}
      permalink={leadPermalink}
      sectionPermalink={""}
    />
  )
}

export default CriticsPage
