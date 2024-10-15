"use client"

import Link from "next/link"
import { CollectionLinks, Collections } from "../../../../../lib/types"
import parse from "html-react-parser"

interface BannerNewSocialEnvironmentProps {
  banner: Collections
  first: boolean
  last: boolean
}

const BannerNewSocialEnvironment = (props: BannerNewSocialEnvironmentProps) => {
  const { banner } = props

  const first = props.first ? "pl-6" : ""
  const last = props.last ? "pr-6" : ""

  const links =
    banner.links &&
    banner.links.map((link: CollectionLinks, i: number) => {
      const first = i === 0 ? "border border-dotted border-indigo-50 px-0.5" : ""
      return (
        <Link href={link.url} className={`py-1 text-center text-indigo-50 uppercase font-medium text-xs ${first}`}>
          <button className="uppercase hover:underline">{link.text}</button>
        </Link>
      )
    })

  return (
    <div
      key={banner.id}
      className={`col-span-4 tablet:col-span-6 py-3 pb-6 px-6 bg-zinc-700 bg-opacity-70 ${first} ${last}`}
    >
      <div className="grid grid-cols-6 gap-3 gap-x-6">
        <div className="col-span-6 row-start-1">
          <h3 className="text-md font-medium text-indigo-50">
            <span className="">{parse(banner.title)}</span>
          </h3>
        </div>
        <div className="col-span-5 row-start-2">
          <div className="bg-white bg-opacity-30 w-full h-full">TKTK</div>
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
export default BannerNewSocialEnvironment
