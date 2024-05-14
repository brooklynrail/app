"use client"
import Link from "next/link"
import { ArticlesIssues, ArticlesSections, Issues, Sections } from "../../../../lib/types"
import { PageType, getPermalink } from "../../../../lib/utils"
import { useState, useEffect } from "react"
import { CoverImage } from "./coverImage"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapPin } from "@fortawesome/free-solid-svg-icons"
import IssueRailHeader from "./header"
import Bylines from "./bylines"

interface ArticleListProps {
  sectionArticles: Array<ArticlesIssues>
  year: number
  month: number
}

const ArticleList = (props: ArticleListProps) => {
  const { sectionArticles, year, month } = props
  const list = sectionArticles.map((article: ArticlesIssues, i: number) => {
    const permalink = getPermalink({
      year: year,
      month: month,
      section: article.articles_slug.sections[0].sections_id.slug,
      slug: article.articles_slug.slug,
      type: PageType.Article,
    })

    const hide_bylines_downstream = article.articles_slug.hide_bylines_downstream

    return (
      <li key={i}>
        <h4>
          <Link href={`${permalink}`}>
            <span dangerouslySetInnerHTML={{ __html: article.articles_slug.title }} />
          </Link>
        </h4>
        {!hide_bylines_downstream && (
          <Bylines
            byline_override={article.articles_slug.byline_override}
            contributors={article.articles_slug.contributors}
          />
        )}
      </li>
    )
  })
  return list
}

interface IssueArticlesProps {
  issueData?: Issues
  issueSections?: Array<Sections>
}

const IssueArticles = (props: IssueArticlesProps) => {
  const { issueData, issueSections } = props

  if (!issueData || !issueSections) {
    return (
      <div className={`loading-issue-index`}>
        <LoadingIssueIndex />
      </div>
    )
  }

  const { year, month } = issueData

  // Create a map where each key is a section ID and each value is an array of articles for that section
  const articlesBySection: Record<string, ArticlesIssues[]> = issueData.articles.reduce(
    (acc: any, article: ArticlesIssues) => {
      // get the criticspage_id
      let criticspage: number = 0
      let criticspageArticles: ArticlesSections[] = []
      if (article.articles_slug.sections[0].sections_id.slug === "criticspage") {
        criticspage = article.articles_slug.sections[0].sections_id.id
        criticspageArticles = article.articles_slug.sections[0].sections_id.articles
      }
      // if the section for this article is editorsmessage,
      // change the section to criticspage
      if (article.articles_slug.sections[0].sections_id.slug === "editorsmessage") {
        article.articles_slug.sections[0].sections_id.id = criticspage
        article.articles_slug.sections[0].sections_id.slug = "criticspage"
        const articles = article.articles_slug.sections[0].sections_id.articles
        // append articles to the criticspageArticles array
        criticspageArticles.concat(articles)
      }

      const sectionId = article.articles_slug.sections[0].sections_id.id
      if (!acc[sectionId]) {
        acc[sectionId] = []
      }
      acc[sectionId].push(article)
      return acc
    },
    {},
  )

  return (
    <>
      {issueSections.map((section: Sections, i: number) => {
        if (section.slug === "publishersmessage") {
          return null // Skip rendering this section
        }

        // Check if there are articles for this section
        const sectionArticles = articlesBySection[section.id]
        if (!sectionArticles || sectionArticles.length === 0) {
          return null // Skip rendering this section
        }

        return (
          <div key={i}>
            <h3>{section.name}</h3>
            <ul>
              <ArticleList sectionArticles={sectionArticles} year={year} month={month} />
            </ul>
          </div>
        )
      })}
    </>
  )
}

const LoadingIssueIndex = () => {
  return [...Array(12)].map((_, index) => (
    <div key={index}>
      <h3>
        <span style={{ width: `100px` }}></span>
      </h3>
      <ul>
        <li>
          <h4>
            <span style={{ width: `200px` }}></span>
          </h4>
          <cite>
            <span style={{ width: `80px` }}></span>
          </cite>
        </li>
        <li>
          <h4>
            <span style={{ width: `235px` }}></span>
          </h4>
          <cite>
            <span style={{ width: `70px` }}></span>
          </cite>
        </li>
      </ul>
    </div>
  ))
}

interface PublishersMessageProps {
  issueData?: Issues
}

const PublishersMessage = ({ issueData }: PublishersMessageProps) => {
  if (!issueData) {
    return (
      <p className="publishers-message loading">
        <span></span>
        <span style={{ width: "75%" }}></span>
        <span style={{ width: "65%" }}></span>
      </p>
    )
  }
  return (
    <p className="publishers-message">
      <Link
        href="/2024/05/publishersmessage/Dear-Friends-and-Readers-may-24"
        title="A message from Publisher and Artistic Director, Phong Bui"
      >
        <strong>A message from Phong Bui</strong>, Publisher and Artistic Director
      </Link>
    </p>
  )
}

interface IssueRailProps {
  currentIssueBasics: Issues
}
const IssueRail = (props: IssueRailProps) => {
  const { currentIssueBasics } = props
  const [issueSections, setIssueSections] = useState<Sections[] | undefined>(undefined)
  const [issueData, setIssueData] = useState<Issues | undefined>(undefined)

  useEffect(() => {
    const fetchData = async () => {
      // if currentIssueBasics is not defined, fetch the current issue
      if (!issueData) {
        const issueAPI = currentIssueBasics.special_issue
          ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/special/${currentIssueBasics.slug}`
          : `${process.env.NEXT_PUBLIC_BASE_URL}/api/${currentIssueBasics.year}/${currentIssueBasics.month}`
        const issueResponse = await fetch(issueAPI, {
          next: { revalidate: 10 },
        })
        if (!issueData) {
          const fetchedIssueData = await issueResponse.json()
          setIssueData(fetchedIssueData)
        }
      }

      if (issueData && !issueSections) {
        const sectionsResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/sections?issueId=${issueData.id}`,
          {
            next: { revalidate: 10 },
          },
        )
        const fetchedSectionData = await sectionsResponse.json()
        setIssueSections(fetchedSectionData)
      }
    }

    fetchData().catch((error) => console.error("Failed to fetch data:", error))
  }, [issueSections, setIssueSections, issueData, setIssueData, currentIssueBasics])

  let logosrc = "/images/brooklynrail-logo.svg"
  if (currentIssueBasics.special_issue) {
    logosrc = `/images/brooklynrail-logo-issue-${currentIssueBasics.issue_number}.svg`
  }

  return (
    <section id="rail">
      <IssueRailHeader logosrc={logosrc} />

      <header className="issue-header">
        <h3 className="issue-name">
          <Link href={`/${currentIssueBasics.slug}/`}>{currentIssueBasics.title}</Link>
        </h3>

        <Link className="archive" href="/archive" title="All Issues Archive">
          <span>All Issues</span> <i className="fas fa-angle-double-right"></i>
        </Link>
      </header>

      <nav className="issue-index">
        <div className="issue-details">
          <div className="grid-row">
            <div className="grid-col-6">
              <CoverImage issueBasics={currentIssueBasics} />
            </div>
            <div className="grid-col-6">
              <div className="issue-links">
                <div className="related">
                  <p>
                    <Link
                      href="https://shop.brooklynrail.org/products/subscription"
                      title="Subscribe to the Rail in Print"
                      className="subscribe"
                    >
                      <strong>Subscribe</strong>
                    </Link>
                  </p>
                  <p className="find-us">
                    <Link href="/where-to-find-us">
                      <FontAwesomeIcon icon={faMapPin} /> Get <em>the RAIL</em> in print
                    </Link>
                  </p>
                </div>
                <PublishersMessage issueData={issueData} />
              </div>
            </div>
          </div>
        </div>

        <IssueArticles issueData={issueData} issueSections={issueSections} />
      </nav>
    </section>
  )
}
export default IssueRail
