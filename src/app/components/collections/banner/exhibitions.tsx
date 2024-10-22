"use client"

import Link from "next/link"
import { CollectionLinks, Collections } from "../../../../../lib/types"
import parse from "html-react-parser"
import style from "./banner.module.scss"

interface BannerExhibitionsProps {
  banner: Collections
  first: boolean
  last: boolean
}
const BannerExhibitions = (props: BannerExhibitionsProps) => {
  const { banner } = props
  const { title, description } = banner

  const first = props.first ? "pl-6" : ""
  const last = props.last ? "pr-6" : ""

  const primary_link = banner.links && banner.links[0]

  const links =
    banner.links &&
    banner.links.map((link: CollectionLinks, i: number) => {
      const first = i === 0 ? "border border-dotted border-indigo-50 px-0.5" : ""
      return (
        <Link
          key={i}
          href={link.url}
          className={`py-1 text-center uppercase font-medium text-indigo-50 text-xs ${first}`}
        >
          <button className="uppercase hover:underline">{link.text}</button>
        </Link>
      )
    })

  return (
    <div
      key={banner.id}
      className={`col-span-4 tablet:col-span-3 py-3 pb-6 px-6 bg-zinc-800 bg-opacity-80 ${first} ${last}`}
    >
      <div className="grid grid-cols-3 gap-3 gap-x-6">
        <div className="col-span-3 row-start-1">
          <h3 className="text-sm tablet-lg:text-md text-indigo-50 font-medium">
            {primary_link ? (
              <Link href={primary_link.url}>
                <span className="">{parse(title)}</span>
              </Link>
            ) : (
              <span className="">{parse(title)}</span>
            )}
          </h3>
        </div>
        {description && (
          <div className="col-span-2 row-start-2">
            <div className={`w-full h-full ${style.description} text-indigo-50`}>
              {primary_link ? <Link href={primary_link.url}>{parse(description)}</Link> : parse(description)}
            </div>
          </div>
        )}
        {links && (
          <div className="col-span-1 row-start-2">
            <div className="flex flex-col space-y-1">{links}</div>
          </div>
        )}
      </div>
    </div>
  )
}
export default BannerExhibitions
