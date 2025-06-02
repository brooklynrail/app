"use client"
import { Homepage, Issues } from "@/lib/types"
import CurrentIssue from "./currentIssue"
import NewSocialEnvironment from "./newSocialEnvironment"
import Exhibition from "./exhibitions"
import { EventsBreakDetails } from "@/lib/railTypes"

interface BannerProps {
  currentIssue: Issues
  homepageHeaderData: Homepage
  eventsBreakDetails: EventsBreakDetails
}

enum BannerType {
  CurrentIssue = "Current Issue",
  NewSocialEnvironment = "The New Social Environment",
  Exhibition = "Exhibition",
}

const Banners = ({ currentIssue, homepageHeaderData, eventsBreakDetails }: BannerProps) => {
  // Early return if no banners
  if (!homepageHeaderData.banners?.length) {
    return null
  }

  // Get valid banners
  const validBanners = homepageHeaderData.banners.filter((banner) => banner.collections_id?.banner_type)

  const currentIssueBanner = validBanners.find(
    (banner) => banner.collections_id?.banner_type === BannerType.CurrentIssue,
  )
  const newSocialEnvironmentBanner = validBanners.find(
    (banner) => banner.collections_id?.banner_type === BannerType.NewSocialEnvironment,
  )
  const exhibitionBanner = validBanners.find((banner) => banner.collections_id?.banner_type === BannerType.Exhibition)

  // If validBanners is empty
  // or if validBanners does not contain Current Issue
  // or if validBanners does not contain New Social Environment
  // then return null
  if (validBanners.length === 0 || !currentIssueBanner || !newSocialEnvironmentBanner) {
    return <></>
  }

  // Render layout
  return (
    <div className="bg-white dark:bg-zinc-700 border-b rail-border">
      <div className="grid grid-cols-4 tablet-lg:grid-cols-12 auto-rows-auto divide-y rail-divide">
        {/* Top banner */}
        {exhibitionBanner && newSocialEnvironmentBanner && (
          <div className="col-span-12 h-auto py-1.5">
            <NewSocialEnvironment
              banner={newSocialEnvironmentBanner}
              eventsBreakDetails={eventsBreakDetails}
              layout="wide"
            />
          </div>
        )}

        {/* Bottom row */}
        <div className="col-span-12 h-auto">
          <div className="grid grid-cols-4 tablet-lg:grid-cols-12 auto-rows-auto tablet-lg:divide-x rail-divide">
            <div className="col-span-4 tablet-lg:col-span-6 py-3 order-last tablet-lg:order-first">
              <CurrentIssue currentIssue={currentIssue} banner={currentIssueBanner} />
            </div>
            <div className="col-span-4 tablet-lg:col-span-6 py-3 order-first tablet-lg:order-last border-b tablet-lg:border-b-0 rail-border">
              {exhibitionBanner ? (
                <Exhibition />
              ) : (
                <NewSocialEnvironment
                  banner={newSocialEnvironmentBanner}
                  eventsBreakDetails={eventsBreakDetails}
                  layout="narrow"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banners
