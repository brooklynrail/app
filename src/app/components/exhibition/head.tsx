"use client"
import Link from "next/link"
import { getPermalink, PageType } from "../../../../lib/utils"
import parse from "html-react-parser"
import { ExhibitionProps } from "@/app/exhibition/[slug]/page"

const Head = (props: ExhibitionProps) => {
  const { exhibitionData } = props
  const { kicker, title, deck, start_date, end_date, summary, show_details, opening_details, location_map } =
    exhibitionData

  const isFutureExhibition = new Date(end_date) > new Date()

  // Format dates for exhibition
  const startDate = new Date(start_date)
  const endDate = new Date(end_date)

  // Simple date formatting - you may want to create a specific exhibition date formatter
  const dateString = `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`

  const exhibitionsPermalink = getPermalink({
    type: PageType.Exhibition,
  })

  return (
    <article className="h-entry py-6 tablet-lg:py-12">
      <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3 gap-y-9 tablet-lg:gap-y-16 desktop:gap-y-20">
        <div className="col-span-4 tablet-lg:col-span-12">
          <div className="flex flex-col space-y-3 tablet-lg:space-y-6">
            <p className="flex space-x-3 text-xs tablet-lg:text-sm">
              <span className="uppercase font-normal">
                <Link href={exhibitionsPermalink}>{kicker}</Link>
              </span>
            </p>
            <div className="flex flex-col space-y-3 tablet-lg:space-y-6">
              <h1 className="text-5xl tablet-lg:text-6xl desktop:text-7xl font-light italic p-name">{parse(title)}</h1>
              {deck && <p className="text-xl tablet-lg:text-3xl font-normal">{parse(deck)}</p>}
              <div className="max-w-screen-tablet flex flex-col space-y-3 tablet-lg:space-y-6">
                {show_details && (
                  <div className="text-lg tablet:text-xl tablet-lg:text-2xl font-light p-summary">
                    {parse(show_details)}
                  </div>
                )}
                {opening_details && (
                  <div className="text-lg tablet:text-xl tablet-lg:text-lg font-light">{parse(opening_details)}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default Head
