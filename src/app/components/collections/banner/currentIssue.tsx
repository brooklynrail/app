"use client"

import Link from "next/link"
import { Collections, Issues } from "../../../../../lib/types"
import { CoverImages } from "./coverImages"

interface BannerCurrentIssueProps {
  collection: Collections
  currentIssue: Issues
}

const BannerCurrentIssue = (props: BannerCurrentIssueProps) => {
  const { collection, currentIssue } = props

  const { title } = currentIssue
  return (
    <div key={collection.id} className="col-span-4 tablet:col-span-3 py-3 pb-6 pr-6 bg-white bg-opacity-10">
      <div className="grid grid-cols-3 gap-3 gap-x-6">
        <div className="col-span-3 row-start-1">
          <h3 className="text-md font-medium">
            <span className="uppercase">Out now:</span> {title} Issue
          </h3>
        </div>
        <div className="col-span-2 row-start-2">
          <div className="bg-fuchsia-500 w-full h-full">
            <CoverImages currentIssue={currentIssue} />
          </div>
        </div>
        <div className="col-span-1 row-start-2">
          <div className="flex flex-col space-y-1">
            <Link href="/issues" className="py-1 px-0.5 text-center border rail-border uppercase font-medium text-xs">
              <button className="uppercase">Free</button>
            </Link>
            <Link href="/issues" className="py-1 text-center uppercase font-medium text-xs">
              <button className="uppercase">Past Issues</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
export default BannerCurrentIssue
