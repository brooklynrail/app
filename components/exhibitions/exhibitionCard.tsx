"use client"
import Image from "next/image"
import Link from "next/link"
import parse from "html-react-parser"
import { Exhibitions } from "@/lib/types"
import { getPermalink, PageType } from "@/lib/utils"
import { Artists } from "../exhibition/sectionBlock"
interface ExhibitionCardProps {
  exhibition: Exhibitions
}
const ExhibitionCard = (props: ExhibitionCardProps) => {
  const { title, end_date, start_date, kicker, featured_image, show_artists_list, artists, opening_details } =
    props.exhibition

  // Format dates for exhibition
  const startDate = new Date(start_date)
  const endDate = new Date(end_date)

  // Format dates with en dash
  const showDates = `${startDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  })}–${endDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })}`

  const permalink = getPermalink({
    type: PageType.Exhibition,
    slug: props.exhibition.slug,
  })

  const featured = featured_image && `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${featured_image.filename_disk}`

  const currentDate = new Date()

  // Only show opening details if the exhibition hasn't ended yet
  const showOpeningDetails = endDate && currentDate <= endDate

  return (
    <section className="relative py-6 tablet:py-12">
      <div className="">
        <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3">
          <div className="col-span-4 tablet-lg:col-span-7">
            <div className="space-y-3 tablet-lg:space-y-6">
              <div className="space-y-0.5">
                {kicker && <p className="text-sm tablet-lg:text-lg font-medium">{kicker}</p>}
                <h2 className="py-3 text-4xl tablet-lg:text-5xl font-light">
                  <Link href={permalink} title={title}>
                    {title}
                  </Link>
                </h2>
              </div>

              <p className="text-xl font-light">{showDates}</p>
              <div className="space-y-6">
                {showOpeningDetails && <div className="text-xl font-light tablet:pr-12">{parse(opening_details)}</div>}

                {show_artists_list && artists && (
                  <div className="text-md font-light tablet:pr-12">
                    <span className="">Featuring work by:</span>
                    <div className="font-light">
                      <Artists {...props.exhibition} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {featured && (
            <div className="col-span-4 tablet:col-span-5">
              <div className="py-2 tablet:py-0">
                <Link className="block" href={permalink} title={title}>
                  <Image src={featured} alt={title} width={800} height={800} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ExhibitionCard
