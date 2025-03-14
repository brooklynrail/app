"use client"
import parse from "html-react-parser"
import Link from "next/link"
import { CoverImages } from "./coverImages"
import { HomepageBanners, Issues } from "@/lib/types"
import { getPermalink, PageType } from "@/lib/utils"
import styles from "./banner.module.scss"
interface BannerCurrentIssueProps {
  currentIssue: Issues
  banner: HomepageBanners
}

const CurrentIssue = (props: BannerCurrentIssueProps) => {
  const { currentIssue, banner } = props

  const issuePermalink = getPermalink({
    issueSlug: currentIssue.slug,
    type: PageType.Issue,
  })

  if (!banner.collections_id) {
    return null
  }

  const bannerTitle = banner.collections_id.title.replace("{{current_issue}}", currentIssue.title)
  const bannerDescription = banner.collections_id.description

  return (
    <div
      id="current-issue"
      className={`banner-card col-span-4 tablet-lg:col-span-6 pt-3 px-3 tablet-lg:px-6 tablet-lg:pt-0 order-last tablet-lg:order-first`}
    >
      <div className="flex flex-col space-y-3 h-full">
        <div className="w-full">
          <h3 className="text-sm tablet-lg:text-lg font-medium">
            <Link href={issuePermalink}>{bannerTitle}</Link>
          </h3>
          {bannerDescription && <div className="text-xs">{parse(bannerDescription)}</div>}
        </div>

        <div className="flex space-x-6 h-full">
          <div className="w-[10rem] desktop-lg:w-[12.5rem] max-h-[12rem] desktop-lg:max-h-[18rem] flex-none h-full pb-3">
            <CoverImages currentIssue={currentIssue} clickToIssue={true} priority={true} />
          </div>

          <div className="flex flex-col space-y-6 flex-1 min-w-0">
            <div
              className={`${styles.summary} w-full text-md tablet:text-lg desktop-lg:text-xl overflow-wrap-anywhere`}
            >
              {parse(currentIssue.summary)}
            </div>
            <div className="hidden tablet:flex flex-wrap gap-x-3 gap-y-1.5 w-full">
              <Link
                href={`/about/where-to-find-us/`}
                className={`p-1.5 rounded-sm text-center uppercase font-medium text-xs border rail-border`}
              >
                Find a free copy of the Rail
              </Link>
              <Link
                href={`https://shop.brooklynrail.org/collections/issues`}
                className={`p-1.5 text-center uppercase font-medium text-xs`}
              >
                Buy a Copy
              </Link>
              <Link href={`/archive/`} className={`p-1.5 text-center uppercase font-medium text-xs`}>
                Past Issues
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CurrentIssue
