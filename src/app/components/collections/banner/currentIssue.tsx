"use client"

import Link from "next/link"
import { CollectionLinks, Collections, Issues } from "../../../../../lib/types"
import { CoverImages } from "./coverImages"

interface BannerCurrentIssueProps {
  banner: Collections
  currentIssue: Issues
  first: boolean
  last: boolean
}

const BannerCurrentIssue = (props: BannerCurrentIssueProps) => {
  const { banner, currentIssue } = props

  const first = props.first ? "pl-6" : ""
  const last = props.last ? "pr-6" : ""

  const links =
    banner.links &&
    banner.links.map((link: CollectionLinks, i: number) => {
      const first = i === 0 ? "border border-dotted border-zinc-800 dark:border-indigo-50 px-0.5" : ""
      return (
        <Link
          href={link.url}
          className={`py-1 text-center text-zinc-800 dark:text-indigo-50 uppercase font-medium text-xs ${first}`}
        >
          <button className="uppercase hover:underline">{link.text}</button>
        </Link>
      )
    })

  return (
    <div
      key={banner.id}
      className={`col-span-4 tablet:col-span-3 py-3 pb-6 px-6 bg-indigo-50 bg-opacity-20 ${first} ${last}`}
    >
      <div className="grid grid-cols-3 gap-3 gap-x-6">
        <div className="col-span-3 row-start-1">
          <h3 className="text-md font-medium">
            <span className="uppercase">{banner.title}:</span> {currentIssue.title} Issue
          </h3>
        </div>
        <div className="col-span-2 row-start-2">
          <div className="w-full h-full">
            <CoverImages currentIssue={currentIssue} />
          </div>
        </div>
        {links && (
          <div className="col-span-1 row-start-2">
            <div className="flex flex-col space-y-1">{links}</div>
          </div>
        )}
      </div>
    </div>
  )
}
export default BannerCurrentIssue
