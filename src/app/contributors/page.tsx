import { Contributors } from "../../../lib/types"
import { getAllContributors, getPermalink, PageType } from "../../../lib/utils"
import Link from "next/link"

export default async function ContributorsIndex() {
  const contributorsData = await getData()

  const all = (
    <>
      {contributorsData.props.allContributors.map((contributor: Contributors, i: number) => {
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
    </>
  )
}

async function getData() {
  const allContributors = await getAllContributors()
  return {
    props: {
      allContributors,
    },
  }
}

export async function generateStaticParams() {
  const allContributors = await getAllContributors()

  return allContributors.map((contributor: Contributors) => {
    return {
      slug: contributor.slug,
    }
  })
}
