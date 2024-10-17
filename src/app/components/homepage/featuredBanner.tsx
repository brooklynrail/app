"use client"
import { HomePageProps } from "@/app/page"
import Header, { HeaderType } from "../header"
import { Articles, Collections, HomepageBanners, HomepageCollections, Issues } from "../../../../lib/types"
import Paper from "../paper"
import CollectionArt from "../collections/art"
import CollectionArtSeen from "../collections/artSeen"
import CollectionBooks from "../collections/books"
import CollectionPoetry from "../collections/poetry"
import BannerCurrentIssue from "../collections/banner/currentIssue"
import BannerExhibitions from "../collections/banner/exhibitions"
import BannerNewSocialEnvironment from "../collections/banner/newSocialEnvironment"

enum BannerType {
  CurrentIssue = "Current Issue",
  TheNewSocialEnvironment = "The New Social Environment",
  Exhibitions = "Exhibitions",
}

interface BannerProps {
  banners: HomepageBanners[]
  currentIssue: Issues
}

const FeaturedBanner = (props: BannerProps) => {
  const { banners, currentIssue } = props

  const allBanners = banners.map((item: HomepageBanners, index: number) => {
    const banner = item.collections_id
    if (!banner) {
      return null
    }

    const first = index === 0
    const last = index === banners.length - 1

    switch (banner.banner_type) {
      case BannerType.CurrentIssue:
        return <BannerCurrentIssue key={index} banner={banner} currentIssue={currentIssue} first={first} last={last} />
      case BannerType.Exhibitions:
        return <BannerExhibitions key={index} banner={banner} first={first} last={last} />
      case BannerType.TheNewSocialEnvironment:
        return <BannerNewSocialEnvironment key={index} banner={banner} first={first} last={last} />
      default:
        return null
    }
  })
  return (
    <div className="bg-gradient-to-l from-[#EF4444] to-[#CFCFE0] dark:from-indigo-700">
      <div className="grid grid-cols-4 tablet:grid-cols-12">{allBanners}</div>
    </div>
  )
}

export default FeaturedBanner