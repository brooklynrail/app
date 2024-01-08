import Link from "next/link"

const Bylines = ({ contributors }: any) => {
  return (
    <cite>
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

const ArticleList = ({ articles, sections }: any) => {
  // Create a map where each key is a section ID and each value is an array of articles for that section
  const articlesBySection = articles.reduce((acc: any, article: any) => {
    const sectionId = article.articles_id.sections[0].sections_id.id
    if (!acc[sectionId]) {
      acc[sectionId] = []
    }
    acc[sectionId].push(article)
    return acc
  }, {})

  return (
    <>
      {sections.map((section: any, i: number) => {
        // Check if there are articles for this section
        const sectionArticles = articlesBySection[section.id]
        if (!sectionArticles || sectionArticles.length === 0) {
          return null // Skip rendering this section
        }

        return (
          <div key={i}>
            <h3>{section.name}</h3>
            <ul>
              {sectionArticles.map((article: any, j: number) => (
                <li key={j}>
                  <h4>
                    <Link href="/2023/12/artseen/Picasso-in-Fontainebleau">
                      <span dangerouslySetInnerHTML={{ __html: article.articles_id.title }} />
                    </Link>
                  </h4>
                  <Bylines contributors={article.articles_id.contributors} />
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </>
  )
}

const IssueRail = (props: any) => {
  const { id, slug, title, deck, body } = props.issues

  return (
    <section id="rail">
      <header id="rail-header">
        <h2>
          <a href="/">
            <img src="/images/brooklynrail-logo.svg" alt="The Brooklyn Rail" title="Brooklyn Rail Home" />
          </a>
        </h2>
      </header>

      <header className="issue-header">
        <h3 className="issue-name">
          <Link href={`/${slug}/`}>{title}</Link>
        </h3>

        <a className="archive" href="/archive" title="All Issues Archive">
          <span>All Issues</span> <i className="fas fa-angle-double-right"></i>
        </a>
      </header>

      <nav className="issue-index">
        <div className="issue-details">
          <div className="grid-row">
            <div className="grid-col-4">
              <div className="issue-covers">
                <Link href={`/${slug}/`}>
                  <img
                    className="cover"
                    src="https://brooklynrail.imgix.net/content/issue/cover_image/241/br-dec-jan-rirkrit.jpg?w=200&q=80&fit=max"
                    alt="Rirkrit Tiravanija, &lt;em&gt;untitled 2017 (fear eats the soul) (white flag)&lt;/em&gt;, 2017. Flag, 72 feet ? 10 feet 6 inches. Courtesy the artist."
                  />
                  <img
                    className="cover2 hidden"
                    src="https://brooklynrail.imgix.net/content/issue/cover_image/241/br-dec-jan-emin.jpg?w=200&q=80&fit=max"
                    alt="Tracey Emin, &lt;em&gt;Dreaming of Another World,&lt;/em&gt; 2022. Acrylic on canvas, 36 x 48 1/16 inches. Courtesy the artist and White Cube."
                  />
                  <img
                    className="cover3 hidden"
                    src="https://brooklynrail.imgix.net/content/issue/cover_image/241/br-dec-jan-rosen.jpg?w=200&q=80&fit=max"
                    alt="Kay Rosen, &lt;em&gt;This Means War?!&lt;/em&gt;, 2016 - 2023, Billboard (1 of 10). Installation view: &lt;em&gt;Kay Rosen: Now and Then&lt;/em&gt;, Weserburg Museum for Modern Art, Bremen, Germany. Photo: Tobias Hubel."
                  />
                  <img
                    className="cover4 hidden"
                    src="https://brooklynrail.imgix.net/content/issue/cover_image/241/br-dec-jan-bechara.jpg?w=200&q=80&fit=max"
                    alt="Tony Bechara, &lt;em&gt;Random 28 (Red version),&lt;/em&gt; 2023. Acrylic on canvas, 24 x 24 inches. ? Tony Bechara. Courtesy Lisson Gallery."
                  />
                </Link>
              </div>
            </div>
            <div className="grid-col-8">
              <div className="issue-links">
                <div className="related">
                  <p>
                    <a href="/where-to-find-us">
                      <strong>
                        Find <em>the RAIL</em> in print
                      </strong>
                    </a>
                  </p>
                  <p>
                    <a
                      href="https://shop.brooklynrail.org/products/subscription"
                      title="Subscribe to the Rail in Print"
                    >
                      <strong>Subscribe now</strong>
                    </a>
                  </p>
                </div>

                <p>
                  <a
                    href="/2023/12/publishersmessage/Dear-Friends-and-Readers-dec-23"
                    title="A message from Publisher and Artistic Director, Phong Bui"
                  >
                    <strong>A message from Phong Bui</strong>
                  </a>
                  <br />
                  <em>Publisher and Artistic Director</em>
                </p>
              </div>
            </div>
          </div>
        </div>

        <ArticleList articles={props.issues.articles} sections={props.sections} />
      </nav>
    </section>
  )
}
export default IssueRail
