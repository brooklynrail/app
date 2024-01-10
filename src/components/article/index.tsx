import Link from "next/link"
import IssueRail from "../issueRail"
import Image from "next/image"
import Footer from "../footer"
import CoversPopup from "../issueRail/coversPopup"

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

const ArticleHead = (props: any) => {
  const { kicker, sections, title, deck, featured_image, slug, header_type } = props.article
  const primarySection = sections[0].sections_id
  const primaryIssue = props.issues[0]
  const { year, month } = primaryIssue
  const permalink = `/${year}/${month}/${primarySection.slug}/${slug}/`
  const permalinkEncoded = `https://brooklynrail.org${permalink}`

  const kickerBlock = () => {
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
      <header className="diptych">
        <div className="grid-row grid-gap-4">
          <div className="grid-col-12 tablet:grid-col-7">
            {kickerBlock}
            <h1 dangerouslySetInnerHTML={{ __html: title }} />
            {deck && <h2 className="deck">{deck}</h2>}
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
    <header>
      {kickerBlock}
      <h1 dangerouslySetInnerHTML={{ __html: title }} />
      {deck && <h2 className="deck">{deck}</h2>}
      <div className="article-meta">
        <div className="date">DEC 23-JAN 24</div>
      </div>
    </header>
  )
}

const Article = (props: any) => {
  const { body, contributors } = props.article

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
                  <ArticleHead {...props} />

                  <section className="content">
                    <div dangerouslySetInnerHTML={{ __html: body }} />
                  </section>

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
