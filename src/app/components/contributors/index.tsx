"use client"
import IssueRail from "../issueRail"
import Footer from "../footer"
import CoversPopup from "../issueRail/coversPopup"
import Header, { HeaderType } from "../header"
import ThemeToggle from "../themeToggle"
import { useTheme } from "../theme"
import { PopupProvider } from "../issueRail/popupProvider"
import { Contributors, Issues } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import Paper from "../paper"
import Link from "next/link"

interface ContributorsPageProps {
  thisIssueData: Issues
  allContributors: Contributors[]
}

const ContributorsPage = (props: ContributorsPageProps) => {
  const { thisIssueData, allContributors } = props
  const { theme, setTheme } = useTheme()

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
    <>
      <PopupProvider>
        <Paper pageClass="paper-contributor">
          <main className="px-3 desktop:max-w-screen-widescreen mx-auto">
            <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3 gap-x-6 desktop-lg:gap-x-12">
              <aside className="hidden tablet-lg:block col-span-4 tablet-lg:col-span-4 desktop-lg:col-span-3">
                <IssueRail thisIssueData={thisIssueData} />
              </aside>

              <div className="col-span-4 tablet-lg:col-span-8 desktop-lg:col-span-9">
                <Header type={HeaderType.Article} />

                <div className="pb-12">
                  <header className="py-12">
                    <h1 className="font-light text-5xl">Contributors</h1>
                  </header>
                  <div className="contributors">{all}</div>
                </div>
              </div>
            </div>
          </main>
          <Footer />
          <ThemeToggle {...{ theme, setTheme }} />
          <CoversPopup />
        </Paper>
      </PopupProvider>
    </>
  )
}

export default ContributorsPage
