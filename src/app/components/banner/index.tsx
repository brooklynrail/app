"use client"
import { Issues } from "../../../../lib/types"
import CurrentIssue from "./currentIssue"
import Exhibitions from "./exhibitions"
import NewSocialEnvironment from "./newSocialEnvironment"

interface BannerProps {
  currentIssue: Issues
}

const FeaturedBanner = (props: BannerProps) => {
  const { currentIssue } = props

  return (
    <div className={`bg-white dark:bg-zinc-600 border-b rail-border`}>
      <div
        className={`grid grid-cols-4 tablet-lg:grid-cols-12 divide-y-reverse divide-y tablet-lg:divide-y-0 tablet-lg:divide-x rail-divide py-3`}
      >
        <CurrentIssue currentIssue={currentIssue} />
        <NewSocialEnvironment />
      </div>
    </div>
  )
}

export default FeaturedBanner
