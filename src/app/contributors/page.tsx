import { Contributors, Issues } from "../../../lib/types"
import { getAllContributors, getCurrentIssueData, getPermalink, PageType } from "../../../lib/utils"
import Link from "next/link"
import IssueRail from "../components/issueRail"
import { notFound } from "next/navigation"

// Dynamic segments not included in generateStaticParams are generated on demand.
// See: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamicParams = true

// Next.js will invalidate the cache when a
// request comes in, at most once every 5 mins.
export const revalidate = process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? 600 : 0

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
              <IssueRail thisIssueData={data.thisIssueData} />
            </div>

            <div className="grid-col-12 tablet-lg:grid-col-8 desktop-lg:grid-col-9">
              <header id="article_header">
                <nav>
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
  if (!allContributors || allContributors.length === 0) {
    return notFound()
  }
  // filter out contributors with no articles
  allContributors = allContributors.filter((contributor: Contributors) => contributor.articles.length > 0)
  const thisIssueData = await getCurrentIssueData()

  if (!thisIssueData) {
    return notFound()
  }

  return {
    thisIssueData,
    allContributors,
  }
}
