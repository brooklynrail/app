"use client"

import Link from "next/link"
import { CollectionLinks, Collections, Issues } from "../../../../../lib/types"
import { getPermalink, PageType } from "../../../../../lib/utils"
import { CoverImages } from "./coverImages"

interface BannerCurrentIssueProps {
  banner: Collections
  currentIssue: Issues
  first: boolean
  last: boolean
}

const BannerCurrentIssue = (props: BannerCurrentIssueProps) => {
  const { banner, currentIssue } = props

  const first = props.first ? "pl-3 tablet:pl-6" : ""
  const last = props.last ? "pr-3 tablet:pr-6" : ""

  const links =
    banner.links &&
    banner.links.map((link: CollectionLinks, i: number) => {
      const first = i === 0 ? "border border-dotted border-indigo-50 dark:border-indigo-50 px-0.5" : ""
      return (
        <Link
          key={i}
          href={link.url}
          className={`py-1 text-center text-indigo-50 dark:text-indigo-50 uppercase font-medium text-xs ${first} flex justify-center w-full`}
        >
          <button className="uppercase hover:underline">{link.text}</button>
        </Link>
      )
    })

  const issuePermalink = getPermalink({
    issueSlug: currentIssue.slug,
    type: PageType.Issue,
  })

  return (
    <div
      id="current-issue"
      key={banner.id}
      className={`col-span-4 tablet:col-span-3 py-3 pb-6 px-3 tablet:px-6 bg-zinc-800 bg-opacity-70 ${first} ${last}`}
    >
      <div className="grid grid-cols-3 gap-3 tablet:gap-x-6">
        <div className="col-span-3 row-start-1">
          <h3 className="text-sm tablet-lg:text-md font-medium text-white">
            <Link href={issuePermalink}>
              <span className="uppercase">{banner.title}:</span> {currentIssue.title} Issue
            </Link>
          </h3>
        </div>
        <div className="col-span-2 row-start-2">
          <div className="w-full h-full">
            <CoverImages currentIssue={currentIssue} clickToIssue={true} priority={true} />
          </div>
        </div>
        {links && (
          <div className="col-span-1 row-start-2">
            <div className="flex flex-col items-center space-y-1">{links}</div>
          </div>
        )}
      </div>
    </div>
  )
}
export default BannerCurrentIssue
