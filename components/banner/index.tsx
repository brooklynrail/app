"use client"
import { Homepage, Issues } from "@/lib/types"
import CurrentIssue from "./currentIssue"
import NewSocialEnvironment from "./newSocialEnvironment"

interface BannerProps {
  currentIssue: Issues
  homepageHeaderData: Homepage
}

enum BannerType {
  CurrentIssue = "Current Issue",
  NewSocialEnvironment = "The New Social Environment",
}

const Banners = (props: BannerProps) => {
  const { currentIssue, homepageHeaderData } = props

  if (!homepageHeaderData.banners) {
    return <></>
  }

  const allBanners = homepageHeaderData.banners
    .map((banner, index) => {
      if (!banner.collections_id) {
        return <></>
      }
      switch (banner.collections_id.banner_type) {
        case BannerType.CurrentIssue:
          return <CurrentIssue key={`current-issue-${index}`} currentIssue={currentIssue} banner={banner} />
        case BannerType.NewSocialEnvironment:
          return <NewSocialEnvironment key={`social-env-${index}`} banner={banner} />
        default:
          return <></>
      }
    })
    .filter(Boolean)

  if (allBanners.length === 0) {
    return <></>
  }

  return (
    <div className={`bg-white dark:bg-zinc-700 border-b rail-border`}>
      <div
        className={`grid grid-cols-4 tablet-lg:grid-cols-12 divide-y tablet-lg:divide-y-0 tablet-lg:divide-x tablet-lg:divide-x-reverse rail-divide py-3`}
      >
        {allBanners}
      </div>
    </div>
  )
}

export default Banners
