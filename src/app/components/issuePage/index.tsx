"use client"
import CoversPopup from "../issueRail/coversPopup"
import { IssuePageProps, PageLayout } from "@/app/page"
import AdsTile from "../ads/adsTile"
import IssueSelect from "./issueSelect"
import CurrentSections from "./currentSections"
import RailPartners from "./railPartners"
import RailProjects from "./railProjects"
import Header from "./header"
import Ad970 from "../ads/ad970"
import { Ads, Articles } from "../../../../lib/types"
import Link from "next/link"
import SpecialIssue from "./layout/specialIssue"
import SpecialSection from "./layout/specialSection"
import IssueLayout from "./layout/issue"
import SectionLayout from "./layout/section"
import { useEffect, useState } from "react"
import { getAds } from "../../../../lib/utils"
import { PopupProvider } from "../issueRail/popupProvider"
import { CoverImage } from "../issueRail/coverImage"
import PreviewHeader from "../preview/previewHead"
import TableOfContentsPage from "./layout/tableOfContentsPage"

export interface PromoProps {
  currentArticles: Articles[]
  year: number
  month: number
}

const IssuePage = (props: IssuePageProps) => {
  const { thisIssueData, currentSection, issueSections, previewURL, allIssues } = props
  const [currentAds, setCurrentAds] = useState<Ads[] | undefined>(undefined)

  useEffect(() => {
    const fetchData = async () => {
      if (!currentAds) {
        const ads = getAds()
        // Fetch all the data in parallel
        const [fetchedAds] = await Promise.all([ads])
        // Update the state with the fetched data as it becomes available
        setCurrentAds(fetchedAds)
      }
    }
    // Call the fetchData function and handle any errors
    fetchData().catch((error) => console.error("Failed to fetch data on Issue Page:", error))
  }, [currentAds])

  const { slug } = thisIssueData
  const issueClass = `issue-${slug.toLowerCase()}`

  let layout
  switch (props.layout) {
    case PageLayout.Section:
      layout = <SectionLayout thisIssueData={thisIssueData} currentSection={currentSection} />
      break
    case PageLayout.SpecialSection:
      layout = <SpecialSection thisIssueData={thisIssueData} currentSection={currentSection} />
      break
    case PageLayout.SpecialIssue:
      layout = <SpecialIssue thisIssueData={thisIssueData} />
      break
    case PageLayout.TableOfContents:
      layout = <TableOfContentsPage {...props} />
      break
    default:
      layout = <IssueLayout {...props} />
      break
  }

  return (
    <>
      <PopupProvider>
        <div className={`paper ${issueClass}`}>
          {previewURL && <PreviewHeader previewURL={previewURL} />}
          <div className="wrapper home">
            <header role="banner">
              <div className="grid-container grid-container-desktop">
                <div className="grid-row">
                  <div className="grid-col-12">
                    <Header
                      special_issue={thisIssueData.special_issue}
                      issue_number={thisIssueData.issue_number}
                      title={thisIssueData.title}
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
                        <IssueSelect currentIssueSlug={slug} allIssues={allIssues} />
                        <CoverImage thisIssueData={thisIssueData} />
                      </div>

                      <CurrentSections issueSections={issueSections} thisIssueData={thisIssueData} />

                      {/* <Link className="search_btn" href="/search" title="Search All Issues">
                        <span>Search</span> <i className="fas fa-search"></i>
                      </Link> */}
                      <Link className="archives_btn" href="/archive" title="View Archive">
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
            </section>
          </div>
        </div>
        <CoversPopup />
      </PopupProvider>
    </>
  )
}

export default IssuePage
