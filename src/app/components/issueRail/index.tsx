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
  section: Sections
}

const ArticleList = (props: ArticleListProps) => {
  const { sectionArticles, year, month, section } = props

  const list = sectionArticles.map((article: Articles, i: number) => {
    let permalink = getPermalink({
      year: year,
      month: month,
      section: article.section.slug,
      slug: article.slug,
      type: PageType.Article,
    })

    const hide_bylines_downstream = article.hide_bylines_downstream
    const guestCritic = article.section.slug === "editorsmessage"

    if (article.tribute && section.slug === "in-memoriam") {
      permalink = getPermalink({
        tributeSlug: article.tribute.slug,
        type: PageType.Tribute,
      })
      return (
        <li key={i} data-sort={article.sort} className="py-2 text-xs">
          <h4 className="leading-4 text-sm font-medium">
            <Link href={permalink} title={`${stripHtml(article.tribute.title).result}`}>
              <span>{parse(article.tribute.title)}</span>
            </Link>
          </h4>
        </li>
      )
    }

    return (
      <li key={i} data-sort={article.sort} className="py-2 text-xs">
        <h4 className="leading-4 text-sm font-medium">
          <Link href={permalink} title={`${stripHtml(article.title).result}`}>
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

        const sectionArticles = thisIssueData.articles.filter((article) => article.section.slug === section.slug)
        if (!sectionArticles || sectionArticles.length === 0) {
          return null // Skip rendering this section
        }

        const editorsMessage = thisIssueData.articles.find((article) => article.section.slug === "editorsmessage")
        if (section.slug === "criticspage" && editorsMessage) {
          sectionArticles.unshift(editorsMessage)
        }

        let tributes: string[] = []
        if (section.slug === "in-memoriam") {
          const inMemoriamArticles = sectionArticles.filter((article: Articles) => {
            if (article.tribute && !tributes.includes(article.tribute.slug)) {
              tributes.push(article.tribute.slug)
              return article
            }
            if (!article.tribute) return article
          })
          sectionArticles.length = 0
          sectionArticles.push(...inMemoriamArticles)
        }

        const sectionPermalink = getPermalink({
          issueSlug: thisIssueData.slug,
          section: section.slug,
          type: PageType.Section,
        })

        return (
          <div key={i}>
            <h3 className="pt-1 text-md font-bold uppercase">
              <Link prefetch={false} href={sectionPermalink}>
                {section.name}
              </Link>
            </h3>
            <ul className="desktop:pl-10 divide-y-[1px] rail-divide">
              <ArticleList sectionArticles={sectionArticles} year={year} month={month} section={section} />
            </ul>
          </div>
        )
      })}
    </>
  )
}

interface IssueRailProps {
  thisIssueData: Issues
  inMenu?: boolean
}

const IssueRail = (props: IssueRailProps) => {
  const { thisIssueData, inMenu } = props

  const issueSections = thisIssueData.articles
    .map((article) => article.section)
    .filter((section, index, self) => self.findIndex((s) => s.id === section.id) === index)

  let logosrc = "/images/brooklynrail-logo.svg"
  if (thisIssueData.special_issue) {
    logosrc = `/images/brooklynrail-logo-issue-${thisIssueData.issue_number}.svg`
  }

  const issuePermalink = getPermalink({
    issueSlug: thisIssueData.slug,
    type: PageType.Issue,
  })

  return (
    <section className="p-3 bg-gray-100 dark:bg-zinc-700 divide-y rail-divide space-y-4 sticky top-0">
      {!inMenu && <IssueRailHeader logosrc={logosrc} />}
      <div className={inMenu ? `` : `overflow-y-auto h-screen top-0`}>
        <header className="flex flex-col space-y-3 w-full">
          <div className="flex space-x-3 justify-between items-center pt-2">
            <h3 className="text-lg font-bold uppercase">
              <Link prefetch={false} href={issuePermalink}>
                {thisIssueData.title}
              </Link>
            </h3>
            <Link prefetch={false} className="archive" href="/archive" title="All Issues Archive">
              <span>All Issues</span> <i className="fas fa-angle-double-right"></i>
            </Link>
          </div>
          <div className="flex space-x-3">
            <div className="w-1/2">
              <CoverImage thisIssueData={thisIssueData} />
            </div>
            <div className="w-1/2">
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
                <Link prefetch={false} href="/where-to-find-us">
                  <FontAwesomeIcon icon={faMapPin} /> Get <em>the RAIL</em> in print
                </Link>
              </p>
            </div>
          </div>
        </header>

        <nav className="flex flex-col mt-6 border-t-2 rail-border divide-y-[1px] rail-divide space-y-6 pb-48">
          <IssueArticles thisIssueData={thisIssueData} issueSections={issueSections} />
        </nav>
      </div>
    </section>
  )
}

export default IssueRail
