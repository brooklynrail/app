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
import { useArticleContext } from "@/app/context/ArticleProvider"

interface ArticleListProps {
  sectionArticles: Array<Articles>
  year: number
  month: number
}

const ArticleList = (props: ArticleListProps) => {
  const { sectionArticles, year, month } = props

  const list = sectionArticles.map((article: Articles, i: number) => {
    const { setArticleSlug, currentArticle } = useArticleContext()

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
      <li key={i} data-sort={article.sort} className="py-2 text-xs">
        <h4 className="leading-4 text-sm font-medium">
          <Link
            prefetch={false}
            href={`${permalink}`}
            title={`${stripHtml(article.title).result} (${article.sort})`}
            onClick={(e) => {
              e.preventDefault() // Prevent the default link behavior
              setArticleSlug(article.slug) // Trigger article change
            }}
          >
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

        // if the current section is In Memoriam, show only the articles that do not have a article.tribute or have an empty article.tribute array
        let tributes: string[] = []
        if (section.slug === "in-memoriam") {
          const inMemoriamArticles = sectionArticles.filter((article: Articles) => {
            if (article.tribute) {
              // if the article.tribute is not included in the tributes array, return the article
              if (!tributes.includes(article.tribute.slug)) {
                // push the article.tribute to the tributes array without duplicates
                tributes.push(article.tribute.slug)
                return article
              }
            }
            // if the article.tribute is empty, return the article
            if (!article.tribute) {
              return article
            }
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
      <Link prefetch={false} href={permalink} title="A message from Publisher and Artistic Director, Phong Bui">
        <strong>A message from Phong Bui</strong>, Publisher and Artistic Director
      </Link>
    </p>
  )
}

interface IssueRailProps {
  thisIssueData: Issues
  inMenu?: boolean
}
const IssueRail = (props: IssueRailProps) => {
  const { thisIssueData, inMenu } = props

  // make an array of all the sections used in thisIssueData.articles and remove any duplicates
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

        <nav className="flex flex-col mt-6 border-t-2 rail-border divide-y-[1px] rail-divide space-y-6">
          <IssueArticles thisIssueData={thisIssueData} issueSections={issueSections} />
        </nav>
      </div>
    </section>
  )
}
export default IssueRail
