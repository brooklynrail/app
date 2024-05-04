import Image from "next/image"
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
import { getAds, getAllIssues, getIssueData, getSectionsByIssueId, getSpecialIssueData } from "../../../lib/utils"

export interface PromoProps {
  currentArticles: ArticlesIssues[]
  year: number
  month: number
}

const IssuePage = (props: IssuePageProps) => {
  const { permalink, issueBasics, currentSection } = props

  const [currentSections, setCurrentSections] = useState<Sections[] | undefined>(undefined)
  const [currentAds, setCurrentAds] = useState<Ads[] | undefined>(undefined)
  const [allIssues, setAllIssues] = useState<Issues[] | undefined>(undefined)
  const [issueData, setIssueData] = useState<Issues | undefined>(undefined)

  useEffect(() => {
    const fetchData = async () => {
      const sections = !currentSections ? getSectionsByIssueId(issueBasics.id) : Promise.resolve(currentSections)
      const ads = !currentAds ? getAds() : Promise.resolve(currentAds)
      const issues = !allIssues ? getAllIssues() : Promise.resolve(allIssues)
      let issueDataPromise
      if (issueBasics.special_issue) {
        issueDataPromise = !issueData ? getSpecialIssueData({ slug: issueBasics.slug }) : Promise.resolve(issueData)
      } else {
        issueDataPromise = !issueData
          ? getIssueData({ year: issueBasics.year, month: issueBasics.month })
          : Promise.resolve(issueData)
      }

      // Fetch all the data in parallel
      const [fetchedSections, fetchedAds, fetchedIssues, fetchedIssueData] = await Promise.all([
        sections,
        ads,
        issues,
        issueDataPromise,
      ])

      // Update the state with the fetched data as it becomes available
      setCurrentSections(fetchedSections)
      setCurrentAds(fetchedAds)
      setAllIssues(fetchedIssues)
      setIssueData(fetchedIssueData)
    }

    // Call the fetchData function and handle any errors
    fetchData().catch((error) => console.error("Failed to fetch data:", error))
  }, [currentSections, issueBasics, currentAds, allIssues, issueData])

  if (!issueBasics) {
    return <></>
  }

  const { year, month, slug } = issueBasics
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
                      <IssueSelect allIssues={allIssues} currentIssueSlug={slug} />
                      <CoverImage {...{ issueBasics, issueData }} />
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
                        <Image src="/images/subscribe-footer.png" alt="Subscribe" />
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
