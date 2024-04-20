import { CoverImage } from "../issueRail"
import CoversPopup from "../issueRail/coversPopup"
import { IssuePageProps, PageLayout } from "@/pages"
import AdsTile from "./adsTile"
import IssueSelect from "./issueSelect"
import CurrentSections from "./currentSections"
import RailPartners from "./railPartners"
import RailProjects from "./railProjects"
import Header from "./header"
import Ad970 from "./ad970"
import TableOfContents from "./tableOfContents"
import { ArticlesIssues, Sections } from "../../../lib/types"
import Link from "next/link"
import SpecialIssue from "./layout/specialIssue"
import SpecialSection from "./layout/specialSection"
import IssueLayout from "./layout/issue"
import SectionLayout from "./layout/section"
import { useEffect, useState } from "react"
import { getSectionsByIssueId } from "../../../lib/utils"

export interface PromoProps {
  currentArticles: ArticlesIssues[]
  year: number
  month: number
}

const IssuePage = (props: IssuePageProps) => {
  const { allIssues, currentIssue, permalink } = props
  const ads = props.ads
  const { cover_1, cover_2, cover_3, cover_4, cover_5, cover_6, year, month, slug, special_issue } = currentIssue
  const coverImageProps = { cover_1, cover_2, cover_3, cover_4, cover_5, cover_6 }
  const currentIssueSlug = currentIssue.slug
  const issueClass = `issue-${slug.toLowerCase()}`
  const [currentSections, setCurrentSections] = useState<Array<Sections> | undefined>(undefined)
  const tocProps = { currentIssue, currentSections, permalink, year, month }

  useEffect(() => {
    async function fetchData() {
      try {
        // Get only the sections that are used in the articles in the current issue
        const allSections = await getSectionsByIssueId(currentIssue.id)
        setCurrentSections(allSections)
      } catch (error) {
        console.error("Failed to fetch allSections:", error)
      }
    }
    fetchData().catch((error) => {
      console.error("Failed to run fetchData:", error)
    })
  }, [setCurrentSections, currentSections, currentIssue.id])

  let layout
  switch (props.layout) {
    case PageLayout.Section:
      layout = <SectionLayout {...props} />
      break
    case PageLayout.SpecialIssue:
      layout = <SpecialIssue {...props} />
      break
    case PageLayout.SpecialSection:
      layout = <SpecialSection {...props} />
      break
    default:
      layout = <IssueLayout {...props} />
      break
  }

  return (
    <>
      <div className={`paper ${issueClass}`}>
        <div className="hatbox"></div>
        <div className="wrapper home">
          <header role="banner">
            <div className="grid-container grid-container-desktop">
              <div className="grid-row">
                <div className="grid-col-12">
                  <Header />
                </div>
              </div>
            </div>
          </header>

          <section className="banner">
            <div className="grid-container grid-container-desktop">
              <div className="grid-row">
                <div className="grid-col-12">
                  <Ad970 ads={ads} />
                </div>
              </div>
            </div>
          </section>

          <section id="main">
            <div className="grid-container grid-container-desktop">
              <div className="grid-row grid-gap-3">
                <div className="grid-col-2">
                  <div id="issuecolumn">
                    <div className="youarehereissue">
                      <IssueSelect allIssues={allIssues} currentIssueSlug={currentIssueSlug} />
                      <CoverImage {...coverImageProps} />
                    </div>

                    <CurrentSections {...{ currentSections, year, month }} />

                    <Link className="search_btn" href="/search" title="Search All Issues">
                      <span>Search</span> <i className="fas fa-search"></i>
                    </Link>
                    <Link className="archives_btn" href="/archives" title="View Archive">
                      <span>View Archive</span>
                    </Link>

                    <RailProjects />
                    <RailPartners />
                  </div>
                </div>

                {layout}

                <div className="ad_column grid-col-2">
                  <AdsTile ads={ads} />
                </div>
              </div>
            </div>
            <div className="grid-container grid-container-desktop">
              <div className="grid-row grid-gap-3">
                <div className="grid-row">
                  <div className="grid-col-8 grid-offset-2">
                    {props.layout === PageLayout.Issue && <TableOfContents {...tocProps} />}
                    <div style={{ margin: "25px 0px 25px 30px" }}>
                      <Link href="/subscribe">
                        <img src="/images/subscribe-footer.png" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <CoversPopup />
    </>
  )
}

export default IssuePage
