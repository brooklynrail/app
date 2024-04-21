import parse from "html-react-parser"
import IssueRail from "../issueRail"
import Image from "next/image"
import Footer from "../footer"
import CoversPopup from "../issueRail/coversPopup"
import BodyText from "./bodyText"
import BodyCode from "./bodyCode"
import { Articles, DirectusFiles, Issues, Sections } from "../../../lib/types"
import { ArticleProps } from "@/pages/[year]/[month]/[section]/[slug]"
import ContributorsBox from "./contributors"
import { PageType, getPermalink } from "../../../lib/utils"
import Link from "next/link"

const FeaturedImage = (props: DirectusFiles) => {
  const { filename_disk, caption } = props
  const src = `${process.env.NEXT_PUBLIC_IMAGE_PATH}${filename_disk}?key=featured-image`
  const desc = caption ? <figcaption>{caption}</figcaption> : null

  return (
    <div className="featured-image">
      <div>
        <Image src={src} width={400} height={529} alt={caption ? caption : ""} />
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
  const { kicker, title, deck, featured_image, header_type } = articleData

  const kickerProps = { kicker, currentIssue, currentSection }

  const articleMeta = (
    <div className="article-meta">
      <div className="date">ISSUE DATE TKTK</div>

      <div className="share-tools">
        <Link className="twitter" href={`https://twitter.com/share?url=${permalink}`}>
          <i className="fab fa-twitter"></i>
        </Link>
        <Link className="facebook" href={`https://www.facebook.com/sharer.php?u=${permalink}`}>
          <i className="fab fa-facebook-f"></i>
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
              {featured_image ? <FeaturedImage {...featured_image} /> : null}
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

  return (
    <>
      <div className={`paper ${issueClass}`}>
        <div className="hatbox"></div>

        <main>
          <div className="grid-container">
            <div className="grid-row grid-gap-3">
              <div className="grid-col-12 tablet-lg:grid-col-4 desktop-lg:grid-col-3">
                <IssueRail {...props} />
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
                  {/* <NextPrev diff={false} {...props} /> */}
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
