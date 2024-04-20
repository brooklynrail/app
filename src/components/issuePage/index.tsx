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
import { Ads, ArticlesIssues, Issues, Sections } from "../../../lib/types"
import Link from "next/link"
import SpecialIssue from "./layout/specialIssue"
import SpecialSection from "./layout/specialSection"
import IssueLayout from "./layout/issue"
import SectionLayout from "./layout/section"
import { useEffect, useState } from "react"
import { getAds, getAllIssues, getCurrentIssue, getCurrentIssueData, getSectionsByIssueId } from "../../../lib/utils"

export interface PromoProps {
  currentArticles: ArticlesIssues[]
  year: number
  month: number
}

const IssuePage = (props: IssuePageProps) => {
  const { permalink, currentIssue } = props
  const { year, month } = currentIssue
  const currentIssueSlug = currentIssue.slug
  const issueClass = `issue-${currentIssueSlug.toLowerCase()}`
  const [currentSections, setCurrentSections] = useState<Sections[] | undefined>(undefined)
  const [currentAds, setCurrentAds] = useState<Ads[] | undefined>(undefined)
  const [allIssues, setAllIssues] = useState<Issues[] | undefined>(undefined)
  const [currentIssueData, setCurrentIssueData] = useState<Issues | undefined>(undefined)
  const tocProps = { currentIssueData, currentSections, permalink, year, month }

  useEffect(() => {
    async function fetchSections() {
      try {
        // Get only the sections that are used in the articles in the current issue
        const allSections = await getSectionsByIssueId(currentIssue.id)
        setCurrentSections(allSections)
      } catch (error) {
        console.error("Failed to fetch allSections:", error)
      }
    }
    fetchSections().catch((error) => {
      console.error("Failed to run fetchSections:", error)
    })

    async function fetchAds() {
      try {
        // Get the published Ads
        const ads = await getAds()
        setCurrentAds(ads)
      } catch (error) {
        console.error("Failed to fetch All Ads:", error)
      }
    }
    fetchAds().catch((error) => {
      console.error("Failed to run fetchAds:", error)
    })

    async function fetchAllIssues() {
      try {
        // Get all the issues
        const allIssues = await getAllIssues()
        setAllIssues(allIssues)
      } catch (error) {
        console.error("Failed to fetch All Issues:", error)
      }
    }
    fetchAllIssues().catch((error) => {
      console.error("Failed to run fetchAllIssues:", error)
    })

    async function fetchCurrentIssueData() {
      try {
        // Get the Current issue
        // This is set in the Global Settings in the Studio
        const currentIssueData = await getCurrentIssueData()
        setCurrentIssueData(currentIssueData)
      } catch (error) {
        console.error("Failed to fetch Current Issue Data:", error)
      }
    }
    fetchCurrentIssueData().catch((error) => {
      console.error("Failed to run fetchCurrentIssueData:", error)
    })
  }, [
    setCurrentSections,
    currentSections,
    currentIssue.id,
    currentAds,
    setCurrentAds,
    allIssues,
    setAllIssues,
    currentIssueData,
    setCurrentIssueData,
  ])

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
      layout = <IssueLayout currentIssueData={currentIssueData} />
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

          <Ad970 currentAds={currentAds} />

          <section id="main">
            <div className="grid-container grid-container-desktop">
              <div className="grid-row grid-gap-3">
                <div className="grid-col-2">
                  <div id="issuecolumn">
                    <div className="youarehereissue">
                      <IssueSelect allIssues={allIssues} currentIssueSlug={currentIssueSlug} />
                      <CoverImage {...{ currentIssue }} />
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
