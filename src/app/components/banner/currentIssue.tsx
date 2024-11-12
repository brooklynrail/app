"use client"

import Link from "next/link"
import { CoverImages } from "./coverImages"
import { Issues } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"

interface BannerCurrentIssueProps {
  currentIssue: Issues
}

const CurrentIssue = (props: BannerCurrentIssueProps) => {
  const { currentIssue } = props

  // const first = props.first ? "pl-3 tablet-lg:pl-6" : ""
  // const last = props.last ? "pr-3 tablet-lg:pr-6" : ""

  const issuePermalink = getPermalink({
    issueSlug: currentIssue.slug,
    type: PageType.Issue,
  })

  return (
    <div
      id="current-issue"
      className={`banner-card col-span-4 tablet-lg:col-span-3 pt-3 px-3 tablet-lg:px-6 tablet-lg:py-0 order-last tablet-lg:order-first`}
    >
      <div className="grid grid-cols-3 gap-3 tablet-lg:gap-x-6">
        <div className="col-span-3 row-start-1">
          <h3 className="text-sm tablet-lg:text-lg font-medium">
            <Link href={issuePermalink}>{currentIssue.title} Issue</Link>
          </h3>
        </div>
        <div className="col-span-2 row-start-2">
          <div className="w-full h-full pb-3">
            <CoverImages currentIssue={currentIssue} clickToIssue={true} priority={true} />
          </div>
        </div>

        <div className="col-span-1 row-start-2">
          <div className="flex flex-col items-center space-y-1">
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
  )
}
export default CurrentIssue
