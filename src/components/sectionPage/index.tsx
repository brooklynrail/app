import { CoverImage } from "../issueRail"
import CoversPopup from "../issueRail/coversPopup"
import Footer from "../footer"
import { IssuePageProps } from "@/pages"
import IssueSelect from "../issuePage/issueSelect"
import CurrentSections from "../issuePage/currentSections"
import RailPartners from "../issuePage/railPartners"
import RailProjects from "../issuePage/railProjects"
import Header from "../issuePage/header"
import Ad970 from "../issuePage/ad970"
import AdsTile from "../issuePage/adsTile"
import SectionArticles from "./sectionArticles"

const SectionPage = (props: IssuePageProps) => {
  const { allIssues, currentIssue, currentSections, currentArticles, currentSlides, dateSlug } = props
  const ads = props.ads
  const { cover_1, cover_2, cover_3, cover_4, cover_5, cover_6 } = currentIssue
  const coverImageProps = { cover_1, cover_2, cover_3, cover_4, cover_5, cover_6 }
  const currentSectionsProps = { currentSections, dateSlug }
  const currentIssueSlug = currentIssue.slug

  return (
    <>
      <div className="paper">
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

                    <a className="search_btn" href="/search" title="Search All Issues">
                      <span>Search</span> <i className="fas fa-search"></i>
                    </a>
                    <a className="archives_btn" href="/archives" title="View Archive">
                      <span>View Archive</span>
                    </a>

                    <RailProjects />
                    <RailPartners />
                  </div>
                </div>
                <div className="grid-col-8">
                  <div className="grid-row grid-gap-4">
                    <div className="grid-col-12">
                      <header className="section">
                        <h2>Section Name</h2>
                      </header>
                    </div>
                  </div>
                  <div className="grid-row grid-gap-4">
                    <div className="grid-col-12">
                      <SectionArticles currentArticles={currentArticles} dateSlug={dateSlug} />
                    </div>
                  </div>
                </div>
                <div className="ad_column grid-col-2">
                  <AdsTile ads={ads} />
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

export default SectionPage
