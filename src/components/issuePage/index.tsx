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
import { ArticlesIssues } from "../../../lib/types"
import Link from "next/link"
import SpecialIssue from "./layout/specialIssue"
import SpecialSection from "./layout/specialSection"
import IssueLayout from "./layout/issue"
import SectionLayout from "./layout/section"

export interface PromoProps {
  currentArticles: ArticlesIssues[]
  year: number
  month: number
}

const IssuePage = (props: IssuePageProps) => {
  const { allIssues, currentIssue, currentSections, permalink } = props
  const ads = props.ads
  const { cover_1, cover_2, cover_3, cover_4, cover_5, cover_6, year, month, slug, special_issue } = currentIssue
  const coverImageProps = { cover_1, cover_2, cover_3, cover_4, cover_5, cover_6 }
  const currentSectionsProps = { currentSections, year, month }
  const tocProps = { currentIssue, currentSections, permalink, year, month }
  const currentIssueSlug = currentIssue.slug

  const issueClass = `issue-${slug.toLowerCase()}`

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

                    <CurrentSections {...currentSectionsProps} />

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
