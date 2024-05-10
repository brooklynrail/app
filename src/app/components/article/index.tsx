"use client"
import parse from "html-react-parser"
import IssueRail from "../issueRail"
import Image from "next/image"
import Footer from "../footer"
import CoversPopup from "../issueRail/coversPopup"
import BodyText from "./bodyText"
import BodyCode from "./bodyCode"
import { Articles, ArticlesContributors, DirectusFiles, Issues, Sections } from "../../../../lib/types"
import { ArticleProps } from "@/app/[year]/[month]/[section]/[slug]/page"
import ContributorsBox from "./contributors"
import { PageType, getIssueData, getPermalink, getSpecialIssueData } from "../../../../lib/utils"
import Link from "next/link"
import NextPrev from "./nextPrev"
import { useEffect, useState } from "react"
import { stripHtml } from "string-strip-html"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { faSquareFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons"

interface FeaturedImageProps {
  image: DirectusFiles
  title: string
}
const FeaturedImage = (props: FeaturedImageProps) => {
  const { filename_disk, caption } = props.image
  const src = `${process.env.NEXT_PUBLIC_IMAGE_PATH}${filename_disk}?key=featured-image`
  const desc = caption ? <figcaption>{caption}</figcaption> : null
  const alt = caption ? caption : `${stripHtml(props.title).result}`

  return (
    <div className="featured-image">
      <div>
        <Image
          priority
          src={src}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          width={400}
          height={529}
          style={{
            width: "100%",
            height: "auto",
          }}
          alt={alt}
        />
        {desc}
      </div>
    </div>
  )
}

interface KickerProps {
  kicker?: string | null
  currentIssue?: Issues
  currentSection?: Sections
}
export const Kicker = (props: KickerProps) => {
  const { kicker, currentIssue, currentSection } = props
  if (!currentIssue || !currentSection) {
    return <></>
  }
  const { year, month } = currentIssue

  const sectionPermalink = getPermalink({
    year: year,
    month: month,
    section: currentSection.slug,
    type: PageType.Section,
  })

  if (!currentSection && !kicker) {
    return <></>
  }
  return (
    <h6 className="kicker">
      {currentSection && (
        <>
          <Link href={sectionPermalink} title={`Go to the ${currentSection.name} section`}>
            {currentSection.name}
          </Link>
          <span className="divider"></span>
        </>
      )}
      {kicker && <span>{kicker}</span>}
    </h6>
  )
}

interface ArticleHeadProps {
  permalink: string
  currentIssue?: Issues
  currentSection?: Sections
  articleData: Articles
}

export const ArticleHead = (props: ArticleHeadProps) => {
  const { permalink, currentIssue, currentSection, articleData } = props
  const { kicker, title, deck, featured_image, header_type, contributors, hide_bylines } = articleData

  const kickerProps = { kicker, currentIssue, currentSection }

  const authors = contributors.map((contributor: ArticlesContributors, i: number) => {
    const contribPermalink = getPermalink({ type: PageType.Contributor, slug: contributor.contributors_id.slug })

    let separator
    // if there are two authors, use " and " as the separator
    if (contributors.length === 2 && i === 0) {
      separator = " and "
      // if there are more than two authors, and this is the last iteration, use ", and "
    } else if (contributors.length > 2 && i == contributors.length - 2) {
      separator = ", and "
      // if there are more than two authors, use ", " as the separator
    } else if (i < contributors.length - 1) {
      separator = ", "
    }
    // if there is only one author, don't use a separator

    const author = (
      <span key={i}>
        <Link itemProp="author" href={contribPermalink}>
          {contributor.contributors_id.first_name} {contributor.contributors_id.last_name}
        </Link>
        {separator}
      </span>
    )
    return author
  })

  const articleMeta = (
    <div className="article-meta ooo">
      <div className="date">MAY 2024</div>

      {!hide_bylines && (
        <cite className="byline">
          <span>By </span>
          {authors}
        </cite>
      )}

      {currentIssue && <div className="date">{currentIssue.title}</div>}

      <div className="share-tools">
        <Link className="twitter" href={`https://twitter.com/share?url=${permalink}`}>
          <FontAwesomeIcon icon={faTwitter} />
        </Link>
        <Link className="facebook" href={`https://www.facebook.com/sharer.php?u=${permalink}`}>
          <FontAwesomeIcon icon={faSquareFacebook} />
        </Link>
      </div>
    </div>
  )
  switch (header_type) {
    case "diptych":
      return (
        <header className="article-header diptych">
          <div className="grid-row grid-gap-4">
            <div className="grid-col-12 tablet:grid-col-7">
              <Kicker {...kickerProps} />
              <h1>{parse(title)}</h1>
              {deck && <h2 className="deck">{parse(deck)}</h2>}
              {articleMeta}
            </div>

            <div className="grid-col-12 tablet:grid-col-5">
              {featured_image ? <FeaturedImage image={featured_image} title={title} /> : null}
            </div>
          </div>
        </header>
      )
    default:
      return (
        <header className="article-header">
          <Kicker {...kickerProps} />
          <h1>{parse(title)}</h1>
          {deck && <h2 className="deck">{parse(deck)}</h2>}
          {articleMeta}
        </header>
      )
  }
}

export enum ArticleType {
  BodyText = "body_text",
  BodyCode = "body_code",
}
interface ArticleBodyProps {
  type?: ArticleType
  articleData: Articles
}

export const ArticleBody = (props: ArticleBodyProps) => {
  const { type, articleData } = props
  const { body_type } = articleData

  switch (type ? type : body_type) {
    case `body_text`:
      return (
        <>
          <p className="body-label">Body Text</p>
          <BodyText {...articleData} />
        </>
      )
    case `body_code`:
      return (
        <>
          <p className="body-label">Body Code</p>
          <BodyCode {...articleData} />
        </>
      )
    default:
      return <></>
  }
}

const Article = (props: ArticleProps) => {
  const { articleData, issueBasics, currentSection } = props
  const { contributors } = articleData

  const issueClass = `issue-${issueBasics.slug.toLowerCase()}`

  const [issueSections, setIssueSections] = useState<Sections[] | undefined>(undefined)
  const [issueData, setIssueData] = useState<Issues | undefined>(undefined)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/sections?issueId=${issueBasics.id}`, {
        next: { revalidate: 10 },
      })
      const sections = await res.json()

      // TODO: Refactor this to use a single function to fetch issue data from APIs
      let issueDataPromise
      if (issueBasics.special_issue) {
        issueDataPromise = !issueData ? getSpecialIssueData({ slug: issueBasics.slug }) : Promise.resolve(issueData)
      } else {
        issueDataPromise = !issueData
          ? getIssueData({ year: issueBasics.year, month: issueBasics.month })
          : Promise.resolve(issueData)
      }
      // Fetch all the data in parallel
      const [fetchedSections, fetchedIssueData] = await Promise.all([sections, issueDataPromise])

      // Update the state with the fetched data as it becomes available
      setIssueSections(fetchedSections)
      setIssueData(fetchedIssueData)
    }

    // Call the fetchData function and handle any errors
    fetchData().catch((error) => console.error("Failed to fetch data:", error))
  }, [issueBasics, issueSections, setIssueSections, issueData, setIssueData])

  return (
    <>
      <div className={`paper ${issueClass}`}>
        <div className="hatbox"></div>

        <main>
          <div className="grid-container">
            <div className="grid-row grid-gap-3">
              <div className="grid-col-12 tablet-lg:grid-col-4 desktop-lg:grid-col-3">
                <IssueRail currentIssueData={issueData} />
              </div>

              <div className="grid-col-12 tablet-lg:grid-col-8 desktop-lg:grid-col-9">
                <header id="article_header">
                  <Link className="mobile_nav_btn" href="">
                    <i className="fas fa-angle-double-left"></i> <span>{props.issueBasics.title}</span> Issue
                  </Link>

                  <nav>
                    <div>
                      <Link className="btn search" href="/search" title="Search the Rail">
                        <i className="fas fa-search"></i>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                      </Link>
                    </div>
                    <div>
                      <Link
                        className="btn btn-sm donate"
                        href="https://brooklynrail.org/donate?a"
                        title="Donate to the Brooklyn Rail"
                      >
                        <span>Donate</span>
                      </Link>
                    </div>
                  </nav>
                </header>

                <div className="ad ad_970">
                  <p>Advertisement</p>
                  <div></div>
                </div>

                <article className="article">
                  <NextPrev {...props} currentSection={currentSection} issueData={issueData} />
                  <ArticleHead {...props} />
                  <ArticleBody {...props} />

                  <ContributorsBox contributors={contributors} />
                </article>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
      <CoversPopup />
    </>
  )
}

export default Article
