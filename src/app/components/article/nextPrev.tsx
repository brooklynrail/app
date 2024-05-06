import { Articles, Issues } from "../../../../lib/types"
import { ArticleProps } from "@/app/[year]/[month]/[section]/[slug]/page"
import { PageType, getPermalink } from "../../../../lib/utils"
import Link from "next/link"

interface NextPrevProps {
  diff: boolean
  issueData?: Issues
}

export const NextPrev = (props: ArticleProps & NextPrevProps) => {
  const { issueBasics, currentSection, articleData, issueData } = props
  const { slug } = articleData
  const issueName = issueBasics.title
  const issueSlug = issueBasics.slug

  if (!issueData || !currentSection) {
    return <>Loading...</>
  }

  const issueArticles = issueData.articles

  const articlesListCount = issueArticles.length
  // get the currentArticleIndex
  const currentArticleIndex = issueArticles.findIndex((article: any) => article.articles_slug.slug === slug)

  const prevLink = () => {
    // if is the first article
    if (currentArticleIndex == 0 || currentArticleIndex == articlesListCount) {
      return (
        <div className="prev">
          <Link href={issueSlug}>
            <span>ISSUE</span>
            <h3>{issueName}</h3>
          </Link>
        </div>
      )
    }
    const prev: Articles = issueArticles[currentArticleIndex - 1].articles_slug
    const prevPermalink = getPermalink({
      year: issueBasics.year,
      month: issueBasics.month,
      section: currentSection.slug,
      slug: prev.slug,
      type: PageType.Article,
    })
    return (
      <div className="prev">
        <Link href={prevPermalink}>
          <span>Previous</span>
          <h3>{prev.title}</h3>
        </Link>
      </div>
    )
  }

  const next = issueArticles[currentArticleIndex + 1].articles_slug
  const nextPermalink = getPermalink({
    year: issueBasics.year,
    month: issueBasics.month,
    section: currentSection.slug,
    slug: next.slug,
    type: PageType.Article,
  })

  return (
    <nav className="next-prev">
      {prevLink()}
      {next && (
        <div className="next">
          <Link href={nextPermalink}>
            <span>Next</span>
            <h3>{next.title}</h3>
          </Link>
        </div>
      )}
    </nav>
  )
}

export default NextPrev
