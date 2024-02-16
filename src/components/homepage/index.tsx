import { CoverImage } from "../issueRail"
import CoversPopup from "../issueRail/coversPopup"
import Footer from "../footer"
import InConversation from "./inConversation"
import ArtSeen from "./artSeen"
import { HomepageProps } from "@/pages"
import CriticsPage from "./criticsPage"
import EditorsMessage from "./editorsMessage"
import PublishersMessage from "./publishersMessage"
import AdsTile from "./adsTile"
import IssueSelect from "./issueSelect"
import CurrentSections from "./currentSections"
import RailPartners from "./railPartners"
import RailProjects from "./railProjects"
import Header from "./header"
import Ad970 from "./ad970"
import SlideShow from "./slideshow"
import TableOfContents from "./tableOfContents"

const Homepage = (props: HomepageProps) => {
  const { allIssues, currentIssue, currentSections, dateSlug } = props
  const ads = props.ads
  const { cover_1, cover_2, cover_3, cover_4, cover_5, cover_6 } = currentIssue
  const coverImageProps = { cover_1, cover_2, cover_3, cover_4, cover_5, cover_6 }
  const currentSectionsProps = { currentIssue, currentSections, dateSlug }
  const tocProps = { currentIssue, currentSections, dateSlug }

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
                      <IssueSelect allIssues={allIssues} />
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
                  <div className="grid-row">
                    <div className="grid-col-12">
                      <SlideShow {...props} />
                    </div>
                  </div>

                  <div className="grid-row grid-gap-4">
                    <div className="grid-col-6">
                      <InConversation {...props} />
                    </div>
                    <div className="grid-col-6">
                      <div className="collection">
                        <PublishersMessage {...props} />
                      </div>

                      <div className="collection">
                        <EditorsMessage {...props} />
                      </div>

                      <div className="collection">
                        <CriticsPage {...props} />
                      </div>

                      <div className="collection">
                        <ArtSeen {...props} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ad_column grid-col-2">
                  <AdsTile ads={ads} />
                </div>
              </div>
            </div>
            <div className="grid-container grid-container-desktop">
              <div className="grid-row grid-gap-3">
                <div className="grid-row">
                  <div className="grid-col-8 grid-offset-2">
                    <TableOfContents {...tocProps} />
                  </div>
                  <div className="grid-col-8 grid-offset-2">
                    <div style={{ margin: "25px 0px 25px 30px" }}>
                      <a href="/subscribe">
                        <img src="/images/subscribe-footer.png" />
                      </a>
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

export default Homepage
