import parse from "html-react-parser"
import Footer from "../footer"
import CoversPopup from "../issueRail/coversPopup"
import { ArticleBody, ArticleType, Kicker } from "."
import NextPrev from "./nextPrev"
import { ArticleProps } from "@/pages/[year]/[month]/[section]/[slug]"

const ArticleHead = (props: ArticleProps) => {
  const { kicker, sections, title, deck, featured_image, slug, header_type } = props.article
  const primarySection = sections[0].sections_id
  const { year, month } = props.currentIssue

  if (header_type === "diptych") {
    return (
      <header className="article-header diptych">
        <div className="grid-row">
          <div className="grid-col-12 tablet:grid-col-8 tablet:grid-offset-2">
            <Kicker {...{ sections, kicker, year, month, primarySection }} />
            <h1>{parse(title)}</h1>
            {deck && <h2 className="deck">{parse(deck)}</h2>}
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

const ArticleDiff = (props: ArticleProps) => {
  return (
    <>
      <div className="paper">
        <main className="diff">
          <div className="guide" />
          <div className="grid-container">
            <ArticleHead {...props} />
            <NextPrev diff={true} {...props} />
            <div className="grid-row grid-gap-0">
              <div className="grid-col-12 tablet-lg:grid-col-6">
                <article className="article article-diff">
                  <ArticleBody type={ArticleType.BodyText} {...props} />
                </article>
              </div>
              <div className="grid-col-12 tablet-lg:grid-col-6">
                <article className="article article-diff">
                  <ArticleBody type={ArticleType.BodyCode} {...props} />
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

export default ArticleDiff
