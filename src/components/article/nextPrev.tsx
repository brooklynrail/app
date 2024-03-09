import { Articles, ArticlesIssues } from "../../../lib/types"
import { ArticleProps } from "@/pages/[year]/[month]/[section]/[slug]"
import { PageType, getPermalink } from "../../../lib/utils"

interface NextPrevProps {
  diff: boolean
}

export const NextPrev = (props: ArticleProps & NextPrevProps) => {
  const { currentIssue, currentSection, article, permalink } = props
  const { slug } = article
  const diff = props.diff ? `diff/` : ``
  const issueName = currentIssue.title
  const issueSlug = currentIssue.slug

  const articlesList: any = currentIssue.articles
  const articlesListCount = articlesList.length
  // get the currentArticleIndex
  const currentArticleIndex = articlesList.findIndex((article: any) => article.articles_slug.slug === slug)

  const prevLink = () => {
    // if is the first article
    if (currentArticleIndex == 0 || currentArticleIndex == articlesListCount) {
      return (
        <div className="prev">
          <a href={issueSlug}>
            <span>ISSUE</span>
            <h3>{issueName}</h3>
          </a>
        </div>
      )
    }
    const prev: Articles = articlesList[currentArticleIndex - 1].articles_slug
    const prevPermalink = getPermalink({
      year: currentIssue.year,
      month: currentIssue.month,
      section: currentSection.slug,
      slug: prev.slug,
      type: PageType.Article,
    })
    return (
      <div className="prev">
        <a href={prevPermalink}>
          <span>Previous</span>
          <h3>{prev.title}</h3>
        </a>
      </div>
    )
  }

  const next = articlesList[currentArticleIndex + 1].articles_slug
  const nextPermalink = getPermalink({
    year: currentIssue.year,
    month: currentIssue.month,
    section: currentSection.slug,
    slug: next.slug,
    type: PageType.Article,
  })

  return (
    <nav className="next-prev">
      {prevLink()}
      {next && (
        <div className="next">
          <a href={nextPermalink}>
            <span>Next</span>
            <h3>{next.title}</h3>
          </a>
        </div>
      )}
    </nav>
  )
}

export default NextPrev
