"use client"
import Link from "next/link"
import Image from "next/image"
import { Articles, ArticlesIssues, ArticlesSections, Issues, Sections } from "../../../../lib/types"
import { PageType, getPermalink } from "../../../../lib/utils"
import { useState, useEffect } from "react"
import { CoverImage } from "./coverImage"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapPin } from "@fortawesome/free-solid-svg-icons"

const Bylines = ({ contributors }: any) => {
  return (
    <cite>
      <span>By </span>
      {contributors.map((contributor: any, i: number) => {
        const isLast = i === contributors.length - 1
        const isFirst = i === 0
        let separator = ", "

        if (contributors.length > 2 && isLast) {
          separator = ", and "
        } else if (contributors.length === 2 && isLast) {
          separator = " and "
        } else if (isLast) {
          separator = ""
        }

        return (
          <span key={i}>
            {!isFirst && separator}
            {contributor.contributors_id.first_name} {contributor.contributors_id.last_name}
          </span>
        )
      })}
    </cite>
  )
}

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
        {!hide_bylines_downstream && <Bylines contributors={article.articles_slug.contributors} />}
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

  console.log("articlesBySection", articlesBySection)

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

interface IssueTitleProps {
  issueData?: Issues
}
const IssueTitle = ({ issueData }: IssueTitleProps) => {
  if (!issueData) {
    return <h3 className="issue-name loading"></h3>
  }
  return (
    <h3 className="issue-name">
      <Link href={`/${issueData.slug}/`}>{issueData.title}</Link>
    </h3>
  )
}

const PublishersMessage = ({ issueData }: IssueTitleProps) => {
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
  currentIssueData?: Issues
}
const IssueRail = (props: IssueRailProps) => {
  const { currentIssueData } = props
  const [issueSections, setIssueSections] = useState<Sections[] | undefined>(undefined)
  const [issueData, setIssueData] = useState<Issues | undefined>(currentIssueData)

  useEffect(() => {
    const fetchData = async () => {
      if (!issueData) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/currentIssue`, {
          next: { revalidate: 10 },
        })
        const fetchedIssueData = await res.json()
        setIssueData(fetchedIssueData)
      } else {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/sections?issueId=${issueData.id}`, {
          next: { revalidate: 10 },
        })
        const fetchedSectionData = await res.json()
        setIssueSections(fetchedSectionData)
      }
    }

    fetchData().catch((error) => console.error("Failed to fetch data:", error))
  }, [issueSections, setIssueSections, issueData, setIssueData])

  return (
    <section id="rail">
      <header id="rail-header">
        <h2>
          <Link href="/">
            <Image
              priority
              src="/images/brooklynrail-logo.svg"
              alt="The Brooklyn Rail"
              title="Brooklyn Rail Home"
              width={296}
              height={38.48}
            />
          </Link>
        </h2>
      </header>

      <header className="issue-header">
        <IssueTitle issueData={issueData} />

        <Link className="archive" href="/archive" title="All Issues Archive">
          <span>All Issues</span> <i className="fas fa-angle-double-right"></i>
        </Link>
      </header>

      <nav className="issue-index">
        <div className="issue-details">
          <div className="grid-row">
            <div className="grid-col-6">
              <CoverImage {...{ issueData }} />
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
