"use client"
import parse from "html-react-parser"
import { getPermalink, PageType } from "../../../../lib/utils"
import { Events } from "../../../../lib/types"
import Link from "next/link"
import Image from "next/image"
import { useBreakpoints } from "@/app/hooks/useBreakpoints"
import { useEffect, useState } from "react"

const PastEventCard = ({ event }: { event: Events }) => {
  const { title, slug, deck, start_date, type, series, youtube_id } = event

  const currentBreakpoint = useBreakpoints()
  const [colWidth, setColWidth] = useState("")

  useEffect(() => {
    const calculateGroupNumber = () => {
      switch (currentBreakpoint) {
        case "tablet-lg":
          return "tablet-lg:col-span-4"
        case "desktop":
          return "tablet-lg:col-span-4"
        case "desktop-lg":
          return "tablet-lg:col-span-3"
        case "widescreen":
          return "tablet-lg:col-span-3"
        default:
          return ""
      }
    }
    const newColWidth = calculateGroupNumber()
    if (newColWidth !== colWidth) {
      setColWidth(newColWidth)
    }
  }, [currentBreakpoint, colWidth])

  const eventDate = new Date(start_date)
  const eventyear = eventDate.getFullYear()
  const eventmonth = eventDate.getMonth() + 1
  const eventday = eventDate.getDate()

  const permalink = getPermalink({
    type: PageType.Event,
    eventYear: eventyear,
    eventMonth: eventmonth,
    eventDay: eventday,
    slug: slug,
  })

  // format the start_date as Monday, October 7
  const startDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(eventDate)

  const youtube_image = `https://i.ytimg.com/vi/${youtube_id}/mqdefault.jpg`

  return (
    <div className={`col-span-4 ${colWidth} p-3 last:pr-0 first:pl-0`}>
      <div className="">
        <div className="flex flex-col space-y-3 tablet-lg:space-y-6">
          <Image src={youtube_image} alt={title} width={800} height={800} />
          <div className="flex flex-col space-y-2">
            <p className="flex space-x-3 text-xs">
              {type && <span className="uppercase text-nowrap font-normal">{parse(type)}</span>}
              {series && <span className="border-l rail-border"></span>}
              {series && <span className="">#{series}</span>}
            </p>

            <h2 className="text-2xl font-medium">
              <Link href={permalink}>{title}</Link>
            </h2>
            {deck && <p className="text-lg font-light">{parse(deck)}</p>}
          </div>
          <p className="text-xs">{startDate}</p>
        </div>
      </div>
    </div>
  )
}

export default PastEventCard
