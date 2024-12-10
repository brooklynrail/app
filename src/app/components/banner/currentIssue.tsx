"use client"
import parse from "html-react-parser"
import Link from "next/link"
import { CoverImages } from "./coverImages"
import { Issues } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import styles from "./banner.module.scss"
interface BannerCurrentIssueProps {
  currentIssue: Issues
}

const CurrentIssue = (props: BannerCurrentIssueProps) => {
  const { currentIssue } = props

  const issuePermalink = getPermalink({
    issueSlug: currentIssue.slug,
    type: PageType.Issue,
  })

  return (
    <div
      id="current-issue"
      className={`banner-card col-span-4 tablet-lg:col-span-6 pt-3 px-3 tablet-lg:px-6 tablet-lg:pt-0 order-last tablet-lg:order-first`}
    >
      <div className="flex flex-col space-y-3 h-full">
        <div className="w-full">
          <h3 className="text-sm tablet-lg:text-lg font-medium">
            Current Issue: <Link href={issuePermalink}>{currentIssue.title}</Link>
          </h3>
          <p className="text-xs">We print and distribute free copies of The Brooklyn Rail ten times a year.</p>
        </div>

        <div className="flex space-x-6 h-full">
          <div className="w-[14rem] desktop-lg:w-[12.5rem] max-h-[18rem] flex-none h-full pb-3">
            <CoverImages currentIssue={currentIssue} clickToIssue={true} priority={true} />
          </div>

          <div className="space-y-3">
            <div className={`${styles.summary} text-lg desktop:text-xl`}>{parse(currentIssue.summary)}</div>
            <div className="flex items-center space-y-1">
              <Link
                href={`/about/where-to-find-us/`}
                className={`py-1 text-center uppercase font-medium text-xs border rail-border px-0.5 flex justify-center w-full`}
              >
                <button className="uppercase">{`Find a Copy`}</button>
              </Link>
              <Link
                href={`https://shop.brooklynrail.org/collections/issues`}
                className={`py-1 text-center uppercase font-medium text-xs flex justify-center w-full`}
              >
                <button className="uppercase hover:underline">{`Buy a Copy`}</button>
              </Link>
              <Link
                href={`/archive/`}
                className={`py-1 text-center uppercase font-medium text-xs flex justify-center w-full`}
              >
                <button className="uppercase hover:underline">{`Past Issues`}</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CurrentIssue
