import parse from "html-react-parser"
import { Articles, Issues } from "../../../../lib/types"
import { ArticleProps } from "@/app/[year]/[month]/[section]/[slug]/page"
import { PageType, getIssueData, getPermalink, getSpecialIssueData } from "../../../../lib/utils"
import Link from "next/link"
import { useEffect, useState } from "react"

export const NextPrev = (props: ArticleProps) => {
  const { issueBasics, currentSection, articleData } = props
  const { slug } = articleData
  const issueName = issueBasics.title

  const [issueData, setIssueData] = useState<Issues | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      // TODO: Refactor this to use a single function to fetch issue data from APIs
      let issueDataPromise
      if (!issueData) {
        if (issueBasics.special_issue) {
          issueDataPromise = !issueData ? getSpecialIssueData({ slug: issueBasics.slug }) : Promise.resolve(issueData)
        } else {
          issueDataPromise = !issueData
            ? getIssueData({ year: issueBasics.year, month: issueBasics.month })
            : Promise.resolve(issueData)
        }
        // Fetch all the data in parallel
        const [fetchedIssueData] = await Promise.all([issueDataPromise])
        // Update the state with the fetched data as it becomes available
        setIssueData(fetchedIssueData)
      }
    }
    // Call the fetchData function and handle any errors
    fetchData().catch((error) => console.error("Failed to fetch data on Article page:", error))
  }, [issueBasics, issueData, setIssueData])

  if (!issueData || !currentSection) {
    return <LoadingNextPrev />
  }

  const issuePermalink = getPermalink({
    year: issueData.year,
    month: issueData.month,
    type: PageType.Issue,
  })

  const issueArticles = issueData.articles

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
      year: issueBasics.year,
      month: issueBasics.month,
      section: prev.section.slug,
      slug: prev.slug,
      type: PageType.Article,
    })
    const prevKicker = prev.kicker ? `<span>${parse(prev.kicker)}</span>` : null
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
      year: issueBasics.year,
      month: issueBasics.month,
      section: next.section.slug,
      slug: next.slug,
      type: PageType.Article,
    })
    const nextKicker = next.kicker ? `<span>${parse(next.kicker)}</span>` : null
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

const LoadingNextPrev = () => {
  return (
    <nav className="next-prev loading">
      <div className="prev">
        <div>
          <span className="nav"></span>
          <h4>
            <span style={{ width: `60px` }}></span>
          </h4>
          <h3>
            <span style={{ width: `255px` }}></span>
          </h3>
        </div>
      </div>
      <div className="next">
        <div>
          <span className="nav"></span>
          <h4>
            <span style={{ width: `60px` }}></span>
          </h4>
          <h3>
            <span style={{ width: `255px` }}></span>
          </h3>
        </div>
      </div>
    </nav>
  )
}
