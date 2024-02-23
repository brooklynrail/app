import Link from "next/link"
import parse from "html-react-parser"
import IssueRail from "../issueRail"
import Image from "next/image"
import Footer from "../footer"
import CoversPopup from "../issueRail/coversPopup"
import BodyText from "./bodyText"
import BodyCode from "./bodyCode"

const Contributors = (contributors: any) => {
  return (
    <cite>
      {contributors.contributors.map((contributor: any, i: number) => {
        return (
          <footer key={i}>
            <section className="contributors">
              <h3>Contributor</h3>
              <h4>
                <Link href={`/contributor/${contributor.contributors_id.slug}`}>
                  {contributor.contributors_id.first_name} {contributor.contributors_id.last_name}
                </Link>
              </h4>
              <div dangerouslySetInnerHTML={{ __html: contributor.contributors_id.bio }} />
            </section>
          </footer>
        )
      })}
    </cite>
  )
}

const FeaturedImage = (props: any) => {
  const { description, filename_disk } = props
  const src = `http://localhost:8055/assets/${filename_disk}`
  const desc = description ? <figcaption>{description}</figcaption> : null

  return (
    <>
      <Image src={src} width={500} height={500} alt={description} />
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
  const primaryIssue = props.issues[0]
  const { year, month } = primaryIssue
  const permalink = `/${year}/${month}/${primarySection.slug}/${slug}/`
  const permalinkEncoded = `https://brooklynrail.org${permalink}`

  const articleMeta = (
    <div className="article-meta">
      <div className="date">{props.issues.title}</div>

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

export const ArticleBody = (props: any) => {
  const { body_type } = props.article
  const { type } = props

  switch (type ? type : body_type) {
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

export const NextPrev = (props: any) => {
  const { slug } = props.article
  const diff = props.diff ? `diff/` : ``
  const primaryIssue = props.issues[0]
  const articles = props.issues[0].articles
  const currentArticle = articles.find((article: any) => article.articles_slug.slug === slug)
  const currentIndex = articles.indexOf(currentArticle)

  const prevLink = () => {
    if (currentIndex == 0) {
      return <div className="prev"></div>
    }
    const prev = articles[currentIndex - 1].articles_slug
    const prevPrimarySection = prev.sections[0].sections_id
    const prevPermalink = `/${primaryIssue.year}/${primaryIssue.month}/${prevPrimarySection.slug}/${prev.slug}/${diff}`
    return (
      <div className="prev">
        <a href={prevPermalink}>
          <span>Previous</span>
          <h3>{prev.title}</h3>
        </a>
      </div>
    )
  }

  const next = articles[currentIndex + 1].articles_slug
  const nextPrimarySection = next.sections[0].sections_id
  const nextPermalink = `/${primaryIssue.year}/${primaryIssue.month}/${nextPrimarySection.slug}/${next.slug}/${diff}`

  return (
    <nav className="next-prev">
      {prevLink()}
      {next && (
        <div className="next">
          <a href={nextPermalink}>
            <span>Next</span>
            <h3>{next.title}</h3>
          </a>
        </div>
      )}
    </nav>
  )
}

const Article = (props: any) => {
  const { contributors } = props.article

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
                    <i className="fas fa-angle-double-left"></i> <span>{props.issues.title}</span> Issue
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

                  <Contributors contributors={contributors} />
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
