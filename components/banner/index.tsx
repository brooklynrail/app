"use client"
import { Homepage, Issues } from "@/lib/types"
import CurrentIssue from "./currentIssue"
import NewSocialEnvironment from "./newSocialEnvironment"
import Exhibition from "./exhibitions"

interface BannerProps {
  currentIssue: Issues
  homepageHeaderData: Homepage
}

enum BannerType {
  CurrentIssue = "Current Issue",
  NewSocialEnvironment = "The New Social Environment",
  Exhibition = "Exhibition",
}

const Banners = (props: BannerProps) => {
  const { currentIssue, homepageHeaderData } = props

  if (!homepageHeaderData.banners) {
    return <></>
  }

  // Find each banner by type
  const currentIssueBanner = homepageHeaderData.banners.find(
    (banner) => banner.collections_id?.banner_type === BannerType.CurrentIssue,
  )

  const NSEBanner = homepageHeaderData.banners.find(
    (banner) => banner.collections_id?.banner_type === BannerType.NewSocialEnvironment,
  )

  const exhibitionBanner = homepageHeaderData.banners.find(
    (banner) => banner.collections_id?.banner_type === BannerType.Exhibition,
  )

  const rows = exhibitionBanner ? "grid-rows-1" : ""
  const rowspan = exhibitionBanner ? "row-span-1" : ""

  return (
    <div className="bg-white dark:bg-zinc-700 border-b rail-border">
      <div className={`grid grid-cols-4 tablet-lg:grid-cols-12 tablet-lg:divide-x rail-divide ${rows}`}>
        <div
          className={`col-span-4 tablet-lg:col-span-6 pt-3 px-3 pb-6 tablet-lg:px-6 ${rowspan} border-t rail-border tablet-lg:border-t-0 tablet-lg:order-first`}
        >
          {currentIssueBanner && <CurrentIssue currentIssue={currentIssue} banner={currentIssueBanner} />}
        </div>

        {/* <div className="banner-card col-span-4 tablet-lg:col-span-6 pb-3 pl-3 tablet-lg:pl-6 tablet-lg:pb-0 order-first tablet-lg:order-last"></div> */}
        {NSEBanner && (
          <div className="col-span-4 tablet-lg:col-span-6 tablet-lg:col-start-7 pt-3 pb-3 pl-3 tablet-lg:pl-6 border-t-1 border-dotted border-zinc-800 tablet-lg:border-t-0 order-first tablet-lg:order-last">
            <NewSocialEnvironment banner={NSEBanner} />
          </div>
        )}
        {/* {exhibitionBanner && (
          <div className="col-span-4 tablet-lg:col-span-6 tablet-lg:col-start-7 row-start-2 pb-3 px-3 tablet-lg:px-6 tablet-lg:pb-0">
            <Exhibition />
          </div>
        )} */}
      </div>
    </div>
  )
}

export default Banners
