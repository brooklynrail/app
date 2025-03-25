"use client"
import Link from "next/link"
import style from "./banner.module.scss"
import { useEffect, useState } from "react"
import { Exhibitions } from "@/lib/types"
import { getPermalink, PageType } from "@/lib/utils"
import parse from "html-react-parser"
const Exhibition = () => {
  const [exhibition, setExhibition] = useState<Exhibitions | null>(null)

  useEffect(() => {
    const fetchExhibition = async () => {
      const response = await fetch(`/api/exhibitions`)
      const data = await response.json()
      if (!data || !Array.isArray(data)) {
        setExhibition(null)
      }
      setExhibition(data[0])
    }
    void fetchExhibition()
  }, [])

  console.log(exhibition)

  if (!exhibition) {
    return <div>Loading...</div>
  }

  const title = exhibition.title
  const kicker = exhibition.kicker
  const featured_image = exhibition.featured_image
  const show_details = exhibition.show_details
  const opening_details = exhibition.opening_details
  const permalink = getPermalink({
    type: PageType.Exhibition,
    slug: exhibition.slug,
  })

  return (
    <div className="grid grid-cols-3 gap-3 tablet-lg:gap-x-6 border-t border-dotted border-zinc-800 pt-3">
      <div className="col-span-3 row-start-1">
        <h3 className="text-sm tablet-lg:text-lg font-medium">
          <Link href={permalink}>
            <span className="">Exhibitions</span>
          </Link>
        </h3>
      </div>

      <div className="col-span-2 row-start-2">
        <div className={`w-full h-full`}>
          <div className="text-xs uppercase font-light">{kicker}</div>

          <h3 className={`${style.exhibition_title}`}>
            <Link href={permalink}>{title}</Link>
          </h3>
          <div className="show-details">{parse(show_details)}</div>
        </div>
      </div>

      <div className="col-span-1 row-start-2">
        <div className="flex flex-col items-center justify-center space-y-1">
          <Link
            href={permalink}
            className={`py-1 text-center uppercase font-medium text-xs border rail-border px-0.5 flex justify-center w-full`}
          >
            <button className="uppercase">Visit</button>
          </Link>
          <Link
            href={permalink}
            className={`py-1 text-center uppercase font-medium text-xs flex justify-center w-full`}
          >
            <button className="uppercase">All Exhibitions</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
export default Exhibition
