import parse from "html-react-parser"
import { Articles } from "../../../../lib/types"
import { ArticleProps } from "@/app/[year]/[month]/[section]/[slug]/page"
import { PageType, getPermalink } from "../../../../lib/utils"
import Link from "next/link"

export const NextPrev = (props: ArticleProps) => {
  const { thisIssueData, currentSection, articleData } = props
  const { slug } = articleData
  const issueName = thisIssueData.title

  const issuePermalink = getPermalink({
    year: thisIssueData.year,
    month: thisIssueData.month,
    type: PageType.Issue,
  })

  const issueArticles = thisIssueData.articles

  const articlesListCount = issueArticles.length
  // get the currentArticleIndex
  const currentArticleIndex = issueArticles.findIndex((article: Articles) => article.slug === slug)

  const prevLink = () => {
    // if is the first article
    if (currentArticleIndex == 0 || currentArticleIndex == articlesListCount) {
      return (
        <div className="prev">
          <Link href={issuePermalink}>
            <span>ISSUE</span>
            <h3 className="issueName">{issueName}</h3>
          </Link>
        </div>
      )
    }
    const prev: Articles = issueArticles[currentArticleIndex - 1]

    const prevPermalink = getPermalink({
      year: thisIssueData.year,
      month: thisIssueData.month,
      section: prev.section.slug,
      slug: prev.slug,
      type: PageType.Article,
    })
    const prevKicker = prev.kicker ? <span>{parse(prev.kicker)}</span> : null
    return (
      <div className="prev">
        <Link href={prevPermalink}>
          <span>Previous</span>
          <h4>
            {parse(prev.section.name)}
            {prevKicker}
          </h4>
          <h3>{parse(prev.title)}</h3>
        </Link>
      </div>
    )
  }

  const nextLink = () => {
    // if is the last article

    if (currentArticleIndex === articlesListCount - 1) {
      return (
        <div className="next">
          <Link href={issuePermalink}>
            <span>ISSUE</span>
            <h3 className="issueName">{issueName}</h3>
          </Link>
        </div>
      )
    }
    const nextPermalink = getPermalink({
      year: thisIssueData.year,
      month: thisIssueData.month,
      section: next.section.slug,
      slug: next.slug,
      type: PageType.Article,
    })
    const nextKicker = next.kicker ? <span>{parse(next.kicker)}</span> : null
    return (
      <div className="next">
        <Link href={nextPermalink}>
          <span>Next</span>
          <h4>
            {parse(next.section.name)}
            {nextKicker}
          </h4>

          <h3>{parse(next.title)}</h3>
        </Link>
      </div>
    )
  }

  const next: Articles = issueArticles[currentArticleIndex + 1]

  return (
    <nav className="next-prev">
      {prevLink()}
      {nextLink()}
    </nav>
  )
}

export default NextPrev
