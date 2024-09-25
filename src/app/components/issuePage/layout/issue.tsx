import ArtSeen from "../artSeen"
import CriticsPage from "../criticsPage"
import EditorsMessage from "../editorsMessage"
import PublishersMessage from "../publishersMessage"
import SlideShow from "../slideshow"
import FeaturedArticles from "../featuredArticles"
import { Articles, Issues, Sections } from "../../../../../lib/types"
import { IssuePageProps, PageLayout } from "@/app/page"
import TableOfContents from "../tableOfContents"
import SubscribeAd from "../subscribeAd"
import InMemoriam from "../inMemoriam"

export interface LayoutProps {
  thisIssueData: Issues
  currentSection?: Sections
}

const IssueLayout = (props: IssuePageProps) => {
  const { thisIssueData, issueSections, permalink, tributesData } = props
  const currentSections = issueSections
  const { year, month } = thisIssueData
  const currentArticles = thisIssueData.articles

  // Filter the currentArticles to get only the articles with a slideshow image
  const currentSlides: Articles[] = []
  currentArticles.forEach((article: Articles) => {
    if (article.slideshow_image) {
      currentSlides.push(article)
    }
  })

  const promoProps = { currentArticles, year, month }
  const tocProps = { thisIssueData, currentSections, permalink, year, month }

  return (
    <>
      <div className="divide-y-[1px] rail-divide">
        {currentSlides && <SlideShow currentSlides={currentSlides} year={year} month={month} />}
        <div className="grid grid-cols-4 tablet-lg:grid-cols-8 gap-6">
          <div className="col-span-4 py-1">
            <div className="flex flex-col divide-y-[1px] rail-divide">
              <FeaturedArticles {...promoProps} />
              {tributesData && <InMemoriam tributesData={tributesData} />}
            </div>
          </div>
          <div className="col-span-4 tablet-lg:col-start-5 py-1">
            <div className="flex flex-col divide-y-[1px] rail-divide">
              <PublishersMessage {...promoProps} />
              <EditorsMessage {...promoProps} />
              <CriticsPage {...promoProps} />
              <ArtSeen {...promoProps} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-8 gap-6">
          <div className="col-span-8">{props.layout === PageLayout.Issue && <TableOfContents {...tocProps} />}</div>
        </div>
      </div>
    </>
  )
}

export default IssueLayout
