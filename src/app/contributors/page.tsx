import { Contributors, Issues } from "../../../lib/types"
import { getAllContributors, getCurrentIssueBasics, getPermalink, PageType } from "../../../lib/utils"
import Link from "next/link"
import IssueRail from "../components/issueRail"

export default async function ContributorsIndex() {
  const data = await getData()

  const all = (
    <>
      {data.allContributors.map((contributor: Contributors, i: number) => {
        const permalink = getPermalink({
          slug: contributor.slug,
          type: PageType.Contributor,
        })

        return (
          <h3 key={i}>
            <Link href={permalink} title={`${contributor.first_name} ${contributor.last_name}`}>
              {contributor.first_name} {contributor.last_name}
            </Link>
          </h3>
        )
      })}
    </>
  )

  return (
    <>
      <main>
        <div className="grid-container">
          <div className="grid-row grid-gap-3">
            <div className="grid-col-12 tablet-lg:grid-col-4 desktop-lg:grid-col-3">
              <></>
            </div>

            <div className="grid-col-12 tablet-lg:grid-col-8 desktop-lg:grid-col-9">
              <header id="article_header">
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

              <article className="article">
                <div className="grid-row grid-gap-4">
                  <div className="grid-col-12">
                    <header className="section">
                      <h2>Contributors</h2>
                    </header>
                  </div>
                </div>
                <div className="grid-row grid-gap-4">
                  <div className="grid-col-12">
                    <div className="contributors">{all}</div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

async function getData() {
  let allContributors = await getAllContributors()
  // filter out contributors with no articles
  allContributors = allContributors.filter((contributor: Contributors) => contributor.articles.length > 0)
  const currentIssueBasics: Issues = await getCurrentIssueBasics()
  return {
    currentIssueBasics,
    allContributors,
  }
}
