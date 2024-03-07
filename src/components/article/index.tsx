import parse from "html-react-parser"
import IssueRail from "../issueRail"
import Image from "next/image"
import Footer from "../footer"
import CoversPopup from "../issueRail/coversPopup"
import BodyText from "./bodyText"
import BodyCode from "./bodyCode"
import { DirectusFiles } from "../../../lib/types"
import { ArticleProps } from "@/pages/[year]/[month]/[section]/[slug]"
import NextPrev from "./nextPrev"
import ContributorsBox from "./contributors"

const FeaturedImage = (props: DirectusFiles) => {
  const { filename_disk, caption } = props
  const src = `${process.env.NEXT_PUBLIC_IMAGE_PATH}${filename_disk}`
  const desc = caption ? <figcaption>{caption}</figcaption> : null

  return (
    <>
      <Image src={src} width={500} height={500} alt={caption ? caption : ""} />
      {desc}
    </>
  )
}

export const Kicker = (props: any) => {
  const { sections, kicker, year, month, primarySection } = props
  if (!sections && !kicker) {
    return <></>
  }
  return (
    <h6 className="kicker">
      {sections && (
        <>
          <a href={`/${year}/${month}/${primarySection.slug}/`} title={`Go to the ${primarySection.name} section`}>
            {primarySection.name}
          </a>
          <span className="divider"></span>
        </>
      )}
      {kicker && <span>{kicker}</span>}
    </h6>
  )
}

const ArticleHead = (props: any) => {
  const { kicker, sections, title, deck, featured_image, slug, header_type } = props.article
  const primarySection = sections[0].sections_id
  const primaryIssue = props.currentIssue
  const { year, month } = primaryIssue
  const permalink = `/${year}/${month}/${primarySection.slug}/${slug}/`
  const permalinkEncoded = `https://brooklynrail.org${permalink}`

  const articleMeta = (
    <div className="article-meta">
      <div className="date">{primaryIssue.title}</div>

      <div className="share-tools">
        <a className="twitter" href={`https://twitter.com/share?url=${permalinkEncoded}`}>
          <i className="fab fa-twitter"></i>
        </a>
        <a className="facebook" href={`https://www.facebook.com/sharer.php?u=${permalinkEncoded}`}>
          <i className="fab fa-facebook-f"></i>
        </a>
      </div>
    </div>
  )

  if (header_type === "diptych") {
    return (
      <header className="article-header diptych">
        <div className="grid-row grid-gap-4">
          <div className="grid-col-12 tablet:grid-col-7">
            <Kicker {...{ sections, kicker, year, month, primarySection }} />
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
  }

  return (
    <header className="article-header">
      <Kicker {...{ sections, kicker, year, month, primarySection }} />
      <h1>{parse(title)}</h1>
      {deck && <h2 className="deck">{parse(deck)}</h2>}
      <div className="article-meta">
        <div className="date">DEC 23-JAN 24</div>
      </div>
    </header>
  )
}

export const ArticleBody = (props: ArticleProps) => {
  const { body_type } = props.article

  switch (body_type) {
    case `body_text`:
      return (
        <>
          <p className="body-label">Body Text</p>
          <BodyText {...props.article} />
        </>
      )
    case `body_code`:
      return (
        <>
          <p className="body-label">Body Code</p>
          <BodyCode {...props.article} />
        </>
      )
    default:
      return <></>
  }
}

const Article = (props: ArticleProps) => {
  const { article } = props
  const { contributors } = article

  return (
    <>
      <div className="paper">
        <div className="hatbox"></div>

        <main>
          <div className="grid-container">
            <div className="grid-row grid-gap-3">
              <div className="grid-col-12 tablet-lg:grid-col-4 desktop-lg:grid-col-3">
                <IssueRail {...props} />
              </div>

              <div className="grid-col-12 tablet-lg:grid-col-8 desktop-lg:grid-col-9">
                <header id="article_header">
                  <a className="mobile_nav_btn" href="">
                    <i className="fas fa-angle-double-left"></i> <span>{props.currentIssue.title}</span> Issue
                  </a>

                  <nav>
                    <div>
                      <a className="btn search" href="/search" title="Search the Rail">
                        <i className="fas fa-search"></i>
                      </a>
                    </div>
                    <div>
                      <a
                        className="btn btn-sm donate"
                        href="https://brooklynrail.org/donate?a"
                        title="Donate to the Brooklyn Rail"
                      >
                        <span>Donate</span>
                      </a>
                    </div>
                  </nav>
                </header>

                <div className="ad ad_970">
                  <p>Advertisement</p>
                  <div></div>
                </div>

                <article className="article">
                  <NextPrev diff={false} {...props} />
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
