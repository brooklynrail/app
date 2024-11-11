"use client"
import { Issues } from "../../../../lib/types"
import CurrentIssue from "./currentIssue"
import Exhibitions from "./exhibitions"
import NewSocialEnvironment from "./newSocialEnvironment"
import styles from "./banner.module.scss"

interface BannerProps {
  currentIssue: Issues
}

const FeaturedBanner = (props: BannerProps) => {
  const { currentIssue } = props

  return (
    <div className={`bg-[#C0DDDA]`}>
      <div
        className={`grid grid-cols-4 tablet-lg:grid-cols-12 divide-y-reverse divide-y tablet-lg:divide-y-0 tablet-lg:divide-x rail-divide py-3 ${styles.banner}`}
      >
        <CurrentIssue currentIssue={currentIssue} />
        <Exhibitions />
        <NewSocialEnvironment />
      </div>
    </div>
  )
}

export default FeaturedBanner
