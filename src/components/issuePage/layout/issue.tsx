import ArtSeen from "../artSeen"
import CriticsPage from "../criticsPage"
import EditorsMessage from "../editorsMessage"
import PublishersMessage from "../publishersMessage"
import SlideShow from "../slideshow"
import FeaturedArticles from "../featuredArticles"
import { ArticlesIssues, Issues } from "../../../../lib/types"

export interface LayoutProps {
  currentIssueData?: Issues
}

const IssueLayout = (props: LayoutProps) => {
  const { currentIssueData } = props

  if (!currentIssueData) {
    return <>Loading...</>
  }

  const { year, month } = currentIssueData
  const currentArticles = currentIssueData.articles

  // Filter the currentArticles to get only the articles with a slideshow image
  const currentSlides: ArticlesIssues[] = []
  currentArticles.forEach((articleIssue: ArticlesIssues) => {
    if (articleIssue.articles_slug.slideshow_image) {
      currentSlides.push(articleIssue)
    }
  })

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
            <PublishersMessage {...promoProps} />

            <EditorsMessage {...promoProps} />

            <CriticsPage {...promoProps} />

            <ArtSeen {...promoProps} />
          </div>
        </div>
      </div>
    </>
  )
}

export default IssueLayout
