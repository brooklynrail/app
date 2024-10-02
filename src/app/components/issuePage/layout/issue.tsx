import ArtSeen from "../artSeen"
import CriticsPage from "../criticsPage"
import EditorsMessage from "../editorsMessage"
import PublishersMessage from "../publishersMessage"
import SlideShow from "../slideshow"
import FeaturedArticles from "../featuredArticles"
import { Articles, Issues, Sections, Tributes } from "../../../../../lib/types"
import { PageLayout } from "@/app/page"
import TableOfContents from "../tableOfContents"
import InMemoriam from "../inMemoriam"
import IssueSelect from "../issueSelect"
import { CoverImage } from "../../issueRail/coverImage"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapPin } from "@fortawesome/free-solid-svg-icons"
import AdsTileStrip from "../../ads/adsTileStrip"
import { IssuePageProps } from "@/app/issues/[issueSlug]/page"

export interface LayoutProps {
  thisIssueData: Issues
  currentSection?: Sections
  tributesData: Tributes[]
}

const IssueLayout = (props: IssuePageProps) => {
  const { thisIssueData, issueSections, permalink, tributesData, allIssues } = props
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

  const promoProps = { currentArticles, year, month, thisIssueData }
  const tocProps = { thisIssueData, currentSections, permalink, year, month }

  return (
    <div className="divide-y-[1px] rail-divide">
      <div className="flex pb-3 space-x-3 justify-between tablet:justify-normal tablet-lg:hidden">
        <div className="w-1/2 tablet:w-36">
          <CoverImage thisIssueData={thisIssueData} />
        </div>
        <div className="flex flex-col space-y-3">
          <div className="flex flex-col tablet:flex-row space-y-3 tablet:space-y-0 tablet:space-x-3 tablet:justify-between tablet:items-center">
            <h3 className="text-lg font-bold uppercase">{thisIssueData.title}</h3>
            <IssueSelect currentIssueSlug={thisIssueData.slug} allIssues={allIssues} />
          </div>
          <div>
            <p>
              <Link
                href="https://shop.brooklynrail.org/products/subscription"
                title="Subscribe to the Rail in Print"
                className="uppercase"
              >
                <strong>Subscribe</strong>
              </Link>
            </p>
            <p className="find-us">
              <Link prefetch={false} href="/where-to-find-us">
                <FontAwesomeIcon icon={faMapPin} /> Get <em>the RAIL</em> in print
              </Link>
            </p>
          </div>
        </div>
      </div>
      {currentSlides && <SlideShow currentSlides={currentSlides} year={year} month={month} />}
      <div className="grid grid-cols-4 tablet-lg:grid-cols-8 gap-6">
        <div className="col-span-4 py-1">
          <div className="flex flex-col divide-y-[1px] rail-divide">
            {tributesData && tributesData.length > 0 && <InMemoriam tributesData={tributesData} />}
            <FeaturedArticles {...promoProps} />
            <AdsTileStrip />
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
  )
}

export default IssueLayout
