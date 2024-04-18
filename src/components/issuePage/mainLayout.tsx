import ArtSeen from "./artSeen"
import { IssuePageProps } from "@/pages"
import CriticsPage from "./criticsPage"
import EditorsMessage from "./editorsMessage"
import PublishersMessage from "./publishersMessage"
import SlideShow from "./slideshow"
import FeaturedArticles from "./featuredArticles"

const MainLayout = (props: IssuePageProps) => {
  const { currentIssue, currentArticles, currentSlides } = props
  const { year, month } = currentIssue

  const promoProps = { currentArticles, year, month }

  return (
    <>
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
    </>
  )
}

export default MainLayout
