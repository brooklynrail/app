"use client"
import Image from "next/image"
import CoversPopup from "../issueRail/coversPopup"
import { IssuePageProps, PageLayout } from "@/app/page"
import AdsTile from "./adsTile"
import IssueSelect from "./issueSelect"
import CurrentSections from "./currentSections"
import RailPartners from "./railPartners"
import RailProjects from "./railProjects"
import Header from "./header"
import Ad970 from "./ad970"
import TableOfContents from "./tableOfContents"
import { Ads, ArticlesIssues, Sections } from "../../../../lib/types"
import Link from "next/link"
import SpecialIssue from "./layout/specialIssue"
import SpecialSection from "./layout/specialSection"
import IssueLayout from "./layout/issue"
import SectionLayout from "./layout/section"
import { useEffect, useState } from "react"
import { getAds, getSectionsByIssueId } from "../../../../lib/utils"
import { PopupProvider } from "../issueRail/popupProvider"
import { CoverImage } from "../issueRail/coverImage"

export interface PromoProps {
  currentArticles: ArticlesIssues[]
  year: number
  month: number
}

const IssuePage = (props: IssuePageProps) => {
  const { permalink, issueData, currentSection } = props

  const [currentSections, setCurrentSections] = useState<Sections[] | undefined>(undefined)
  const [currentAds, setCurrentAds] = useState<Ads[] | undefined>(undefined)

  useEffect(() => {
    const fetchData = async () => {
      if (!currentSections || !currentAds) {
        const sections = getSectionsByIssueId(issueData.id)
        const ads = getAds()
        // Fetch all the data in parallel
        const [fetchedSections, fetchedAds] = await Promise.all([sections, ads])
        // Update the state with the fetched data as it becomes available
        setCurrentSections(fetchedSections)
        setCurrentAds(fetchedAds)
      }
    }

    // Call the fetchData function and handle any errors
    fetchData().catch((error) => console.error("Failed to fetch data:", error))
  }, [currentSections, issueData, currentAds])

  const { year, month, slug } = issueData
  const issueClass = `issue-${slug.toLowerCase()}`
  const tocProps = { issueData, currentSections, permalink, year, month }

  let layout
  switch (props.layout) {
    case PageLayout.Section:
      layout = <SectionLayout issueData={issueData} currentSection={currentSection} />
      break
    case PageLayout.SpecialSection:
      layout = <SpecialSection issueData={issueData} currentSection={currentSection} />
      break
    case PageLayout.SpecialIssue:
      layout = <SpecialIssue issueData={issueData} />
      break
    default:
      layout = <IssueLayout issueData={issueData} />
      break
  }

  return (
    <>
      <PopupProvider>
        <div className={`paper ${issueClass}`}>
          <div className="hatbox"></div>
          <div className="wrapper home">
            <header role="banner">
              <div className="grid-container grid-container-desktop">
                <div className="grid-row">
                  <div className="grid-col-12">
                    <Header
                      special_issue={issueData.special_issue}
                      issue_number={issueData.issue_number}
                      title={issueData.title}
                    />
                  </div>
                </div>
              </div>
            </header>

            <Ad970 currentAds={currentAds} />

            <section id="main">
              <div className="grid-container grid-container-desktop">
                <div className="grid-row grid-gap-3">
                  <div className="grid-col-2">
                    <div id="issuecolumn">
                      <div className="youarehereissue">
                        <IssueSelect currentIssueSlug={slug} />
                        <CoverImage issueBasics={issueData} />
                      </div>

                      <CurrentSections {...{ currentSections, issueData }} />

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
                    <AdsTile currentAds={currentAds} />
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
                          <Image src="/images/subscribe-footer.png" alt="Subscribe" width={565} height={105} />
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
      </PopupProvider>
    </>
  )
}

export default IssuePage
