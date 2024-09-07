"use client"
import Link from "next/link"
import { Articles, Issues, Sections } from "../../../../lib/types"
import { PageType, getPermalink } from "../../../../lib/utils"
import { CoverImage } from "./coverImage"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapPin } from "@fortawesome/free-solid-svg-icons"
import parse from "html-react-parser"
import IssueRailHeader from "./header"
import Bylines from "./bylines"
import { stripHtml } from "string-strip-html"

interface ArticleListProps {
  sectionArticles: Array<Articles>
  year: number
  month: number
}

const ArticleList = (props: ArticleListProps) => {
  const { sectionArticles, year, month } = props
  const list = sectionArticles.map((article: Articles, i: number) => {
    const permalink = getPermalink({
      year: year,
      month: month,
      section: article.section.slug,
      slug: article.slug,
      type: PageType.Article,
    })

    const hide_bylines_downstream = article.hide_bylines_downstream

    const guestCritic = article.section.slug === "editorsmessage"

    return (
      <li key={i} data-sort={article.sort}>
        <h4>
          <Link href={`${permalink}`} title={`${stripHtml(article.title).result} (${article.sort})`}>
            <span>{parse(article.title)}</span>
          </Link>
        </h4>
        {!hide_bylines_downstream && (
          <Bylines
            byline_override={article.byline_override}
            contributors={article.contributors}
            guestCritic={guestCritic}
          />
        )}
      </li>
    )
  })
  return list
}

interface IssueArticlesProps {
  thisIssueData: Issues
  issueSections: Array<Sections>
}

const IssueArticles = (props: IssueArticlesProps) => {
  const { thisIssueData, issueSections } = props

  const { year, month } = thisIssueData

  return (
    <>
      {issueSections.map((section: Sections, i: number) => {
        if (section.slug === "publishersmessage" || section.slug === "editorsmessage") {
          return null // Skip rendering this section
        }

        // Check if there are articles in this section in thisIssueData.articles
        const sectionArticles = thisIssueData.articles.filter((article) => article.section.slug === section.slug)
        if (!sectionArticles || sectionArticles.length === 0) {
          return null // Skip rendering this section
        }

        // get the editors message articls from thisIssueData.articles
        const editorsMessage = thisIssueData.articles.find((article) => article.section.slug === "editorsmessage")

        // if section is criticspage, add the editors message to the top of the list
        if (section.slug === "criticspage" && editorsMessage) {
          sectionArticles.unshift(editorsMessage)
        }

        const sectionPermalink = getPermalink({
          issueSlug: thisIssueData.slug,
          section: section.slug,
          type: PageType.Section,
        })

        return (
          <div key={i}>
            <h3>
              <Link href={sectionPermalink}>{section.name}</Link>
            </h3>
            <ul>
              <ArticleList sectionArticles={sectionArticles} year={year} month={month} />
            </ul>
          </div>
        )
      })}
    </>
  )
}

interface PublishersMessageProps {
  thisIssueData: Issues
}

const PublishersMessage = ({ thisIssueData }: PublishersMessageProps) => {
  const publishersMessage = thisIssueData.articles.find((article) => article.section.slug === "publishersmessage")

  if (!publishersMessage) {
    return <></>
  }

  const permalink = getPermalink({
    year: thisIssueData.year,
    month: thisIssueData.month,
    section: publishersMessage.section.slug,
    slug: publishersMessage.slug,
    type: PageType.Article,
  })
  return (
    <p className="publishers-message">
      <Link href={permalink} title="A message from Publisher and Artistic Director, Phong Bui">
        <strong>A message from Phong Bui</strong>, Publisher and Artistic Director
      </Link>
    </p>
  )
}

interface IssueRailProps {
  thisIssueData: Issues
}
const IssueRail = (props: IssueRailProps) => {
  const { thisIssueData } = props

  // make an array of all the sections used in thisIssueData.articles and remove any duplicates
  const issueSections = thisIssueData.articles
    .map((article) => article.section)
    .filter((section, index, self) => self.findIndex((s) => s.id === section.id) === index)

  let logosrc = "/images/brooklynrail-logo.svg"
  if (thisIssueData.special_issue) {
    logosrc = `/images/brooklynrail-logo-issue-${thisIssueData.issue_number}.svg`
  }

  return (
    <section id="rail">
      <IssueRailHeader logosrc={logosrc} />

      <header className="issue-header">
        <h3 className="issue-name">
          <Link href={`/${thisIssueData.slug}/`}>{thisIssueData.title}</Link>
        </h3>

        <Link className="archive" href="/archive" title="All Issues Archive">
          <span>All Issues</span> <i className="fas fa-angle-double-right"></i>
        </Link>
      </header>

      <nav className="issue-index">
        <div className="issue-details">
          <div className="grid-row">
            <div className="grid-col-6">
              <CoverImage thisIssueData={thisIssueData} />
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
                <PublishersMessage thisIssueData={thisIssueData} />
              </div>
            </div>
          </div>
        </div>

        <IssueArticles thisIssueData={thisIssueData} issueSections={issueSections} />
      </nav>
    </section>
  )
}
export default IssueRail
