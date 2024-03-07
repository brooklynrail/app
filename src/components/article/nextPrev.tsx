import { Articles, ArticlesIssues } from "../../../lib/types"
import { ArticleProps } from "@/pages/[year]/[month]/[section]/[slug]"

interface NextPrevProps {
  diff: boolean
}

export const NextPrev = (props: ArticleProps & NextPrevProps) => {
  const { currentIssue, article } = props
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
    const prevPrimarySection = prev.sections[0].sections_id
    const prevPermalink = `/${currentIssue.year}/${currentIssue.month}/${prevPrimarySection.slug}/${prev.slug}/${diff}`
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
  const nextPrimarySection = next.sections[0].sections_id
  const nextPermalink = `/${currentIssue.year}/${currentIssue.month}/${nextPrimarySection.slug}/${next.slug}/${diff}`

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
