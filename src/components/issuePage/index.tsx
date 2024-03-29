import { CoverImage } from "../issueRail"
import CoversPopup from "../issueRail/coversPopup"
import Footer from "../footer"
import ArtSeen from "./artSeen"
import { IssuePageProps } from "@/pages"
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
import FeaturedArticles from "./featuredArticles"
import { Articles } from "../../../lib/types"

export interface PromoProps {
  currentArticles: Array<Articles>
  year: number
  month: number
}

const IssuePage = (props: IssuePageProps) => {
  const { allIssues, currentIssue, currentSections, currentArticles, currentSlides, permalink } = props
  const ads = props.ads
  const { cover_1, cover_2, cover_3, cover_4, cover_5, cover_6, year, month } = currentIssue
  const coverImageProps = { cover_1, cover_2, cover_3, cover_4, cover_5, cover_6 }
  const currentSectionsProps = { currentSections, year, month }
  const tocProps = { currentSections, currentArticles, permalink, year, month }
  const currentIssueSlug = currentIssue.slug

  const promoProps = { currentArticles, year, month }
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
                  <div className="grid-row">
                    <div className="grid-col-12">
                      {currentSlides && <SlideShow currentSlides={currentSlides} year={year} month={month} />}
                    </div>
                  </div>

                  <div className="grid-row grid-gap-4">
                    <div className="grid-col-6">
                      <FeaturedArticles {...promoProps} />
                    </div>
                    <div className="grid-col-6">
                      <div className="collection">
                        <PublishersMessage {...promoProps} />
                      </div>

                      <div className="collection">
                        <EditorsMessage {...promoProps} />
                      </div>

                      <div className="collection">
                        <CriticsPage {...promoProps} />
                      </div>

                      <div className="collection">
                        <ArtSeen {...promoProps} />
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

export default IssuePage
