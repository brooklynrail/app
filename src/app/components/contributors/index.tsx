"use client"
import IssueRail from "../issueRail"
import Header from "../header"
import { useTheme } from "../theme"
import { Contributors, Homepage, Issues } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import Paper, { PaperType } from "../paper"
import Link from "next/link"

interface ContributorsPageProps {
  thisIssueData: Issues
  allContributors: Contributors[]
  navData: Homepage
}

const ContributorsPage = (props: ContributorsPageProps) => {
  const { thisIssueData, allContributors, navData } = props

  const all = (
    <>
      {allContributors.map((contributor: Contributors, i: number) => {
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
    <Paper pageClass="paper-contributor" type={PaperType.Default} navData={navData}>
      <main className="px-3 desktop:max-w-screen-widescreen mx-auto">
        <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3 gap-x-6 desktop-lg:gap-x-12">
          <div className="col-span-4 tablet-lg:col-span-8 desktop-lg:col-span-9">
            <div className="pb-12">
              <header className="py-12">
                <h1 className="font-light text-5xl">Contributors</h1>
              </header>
              <div className="contributors">{all}</div>
            </div>
          </div>
        </div>
      </main>
    </Paper>
  )
}

export default ContributorsPage
