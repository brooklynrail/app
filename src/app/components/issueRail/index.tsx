import Link from "next/link"
import Image from "next/image"
import { usePopup } from "./popupProvider"
import { ArticlesIssues, Issues, Sections } from "../../../../lib/types"
import { PageType, getPermalink } from "../../../../lib/utils"
import { stripHtml } from "string-strip-html"

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
  issueBasics: Issues
}

const IssueArticles = (props: IssueArticlesProps) => {
  const { issueData, issueSections, issueBasics } = props
  const { year, month } = issueBasics

  if (!issueData || !issueSections) {
    return (
      <div className={`loading-issue-index`}>
        <LoadingIssueIndex />
      </div>
    )
  }

  // Create a map where each key is a section ID and each value is an array of articles for that section
  const articlesBySection: Record<string, ArticlesIssues[]> = issueData.articles.reduce(
    (acc: any, article: ArticlesIssues) => {
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
        // Check if there are articles for this section
        const sectionArticles = articlesBySection[section.id]
        if (!sectionArticles || sectionArticles.length === 0) {
          return <>NOPE</>
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
        <span style={{ width: `${Math.floor(Math.random() * 21) + 20}%` }}></span>
      </h3>
      <ul>
        <li>
          <h4>
            <span style={{ width: `${Math.floor(Math.random() * 51) + 35}%` }}></span>
          </h4>
          <cite>
            <span style={{ width: `${Math.floor(Math.random() * 21) + 15}%` }}></span>
          </cite>
        </li>
        <li>
          <h4>
            <span style={{ width: `${Math.floor(Math.random() * 71) + 35}%` }}></span>
          </h4>
          <cite>
            <span style={{ width: `${Math.floor(Math.random() * 31) + 35}%` }}></span>
          </cite>
        </li>
      </ul>
    </div>
  ))
}

interface CoverImagesProps {
  issueData?: Issues
}

export const CoverImage = (props: CoverImagesProps) => {
  const { issueData } = props

  const { setShowPopup, setImages } = usePopup()
  if (
    !issueData ||
    !issueData.cover_1 ||
    !issueData.cover_1.width ||
    !issueData.cover_1.height ||
    !issueData.cover_1.filename_disk
  ) {
    return <div className={`issue-covers loading`}></div>
  }

  const covers = [
    issueData.cover_1,
    issueData.cover_2,
    issueData.cover_3,
    issueData.cover_4,
    issueData.cover_5,
    issueData.cover_6,
  ]

  const handleClick = async (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault()
    setImages(covers)
    setShowPopup(true)
  }

  const alt = issueData.cover_1.caption
    ? stripHtml(issueData.cover_1.caption).result
    : `${issueData.title} — The Brooklyn Rail`

  return (
    <div className={`issue-covers`}>
      <div>
        <Image
          priority
          id={`cover-1`}
          src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}${issueData.cover_1.filename_disk}`}
          width={issueData.cover_1.width}
          height={issueData.cover_1.height}
          style={{
            width: "100%",
            height: "auto",
          }}
          alt={alt}
          onClick={(e: React.MouseEvent<Element, MouseEvent>) => handleClick(e)}
        />
      </div>
    </div>
  )
}

interface IssueRailProps {
  issueBasics: Issues
  issueSections?: Array<Sections>
  issueData?: Issues
}
const IssueRail = (props: IssueRailProps) => {
  const { issueBasics, issueSections, issueData } = props

  const { slug, title } = issueBasics

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
        <h3 className="issue-name">
          <Link href={`/${slug}/`}>{title}</Link>
        </h3>

        <Link className="archive" href="/archive" title="All Issues Archive">
          <span>All Issues</span> <i className="fas fa-angle-double-right"></i>
        </Link>
      </header>

      <nav className="issue-index">
        <div className="issue-details">
          <div className="grid-row">
            <div className="grid-col-6">
              <CoverImage {...{ issueBasics, issueData }} />
            </div>
            <div className="grid-col-6">
              <div className="issue-links">
                <div className="related">
                  <p>
                    <Link href="/where-to-find-us">
                      <strong>
                        Find <em>the RAIL</em> in print
                      </strong>
                    </Link>
                  </p>
                  <p>
                    <Link
                      href="https://shop.brooklynrail.org/products/subscription"
                      title="Subscribe to the Rail in Print"
                    >
                      <strong>Subscribe now</strong>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <IssueArticles issueData={issueData} issueSections={issueSections} issueBasics={issueBasics} />
      </nav>
    </section>
  )
}
export default IssueRail
