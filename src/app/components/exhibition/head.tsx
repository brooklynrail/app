"use client"
import Link from "next/link"
import { getPermalink, PageType } from "../../../../lib/utils"
import parse from "html-react-parser"
import { Exhibitions, ExhibitionsPeople1 } from "../../../../lib/types"
import { Artists, processContent } from "./sectionBlock"

interface ExhibitionHeadProps {
  exhibitionData: Exhibitions
}

const Head = (props: ExhibitionHeadProps) => {
  const {
    kicker,
    title,
    deck,
    start_date,
    end_date,
    dedication,
    show_details,
    opening_details,
    curators,
    artists,
    video_cover,
    cover_image,
  } = props.exhibitionData

  const isFutureExhibition = new Date(end_date) > new Date()

  // Format dates for exhibition
  const startDate = new Date(start_date)
  const endDate = new Date(end_date)

  // Simple date formatting - you may want to create a specific exhibition date formatter
  const dateString = `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`

  const exhibitionsPermalink = getPermalink({
    type: PageType.Exhibition,
  })

  const currentDate = new Date()

  // Only show opening details if the exhibition hasn't ended yet
  const showOpeningDetails = endDate && currentDate <= endDate

  // Format curators as a comma-separated string with Oxford comma
  const formatCurators = () => {
    if (!curators || curators.length === 0) return null

    const curatorNames = curators
      .filter((curator) => curator?.people_id?.display_name)
      .map((curator) => curator.people_id.display_name)

    if (curatorNames.length === 0) return null
    if (curatorNames.length === 1) return curatorNames[0]
    if (curatorNames.length === 2) return `${curatorNames[0]} and ${curatorNames[1]}`

    // For 3+ curators, use Oxford comma
    const allButLast = curatorNames.slice(0, -1)
    const last = curatorNames[curatorNames.length - 1]
    return `${allButLast.join(", ")}, and ${last}`
  }

  const curatorString = formatCurators()

  const videoCover = video_cover ? `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${video_cover?.filename_disk}` : ""

  const coverImage = cover_image ? `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${cover_image?.filename_disk}` : ""

  console.log("videoCover", videoCover)

  return (
    <>
      <section className="h-entry py-6 tablet-lg:py-12 relative w-full h-screen">
        {videoCover && (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={coverImage}
            className="z-0 absolute top-0 bottom-0 left-0 right-0 w-full h-full object-cover transform"
            style={{
              objectPosition: "center 25%",
            }}
          >
            <source src={videoCover} type="video/mp4" />
          </video>
        )}
        <div className="desktop:max-w-screen-desktop-lg mx-auto px-3">
          <div className="z-10 relative grid grid-cols-4 tablet-lg:grid-cols-12 gap-3 gap-y-9 tablet-lg:gap-y-16 desktop:gap-y-20">
            <div className="col-span-4 tablet-lg:col-span-12">
              <div className="flex flex-col space-y-3 tablet-lg:space-y-6">
                <p className="flex space-x-3 text-sm tablet-lg:text-md">
                  <span className="uppercase font-normal">
                    <Link href={exhibitionsPermalink}>{kicker}</Link>
                  </span>
                </p>
                <div className="flex flex-col space-y-3 tablet-lg:space-y-6">
                  <h1 className="text-5xl tablet-lg:text-6xl desktop:text-7xl font-light p-name">{parse(title)}</h1>
                  {deck && <p className="text-xl tablet-lg:text-3xl font-normal">{parse(deck)}</p>}
                  {curatorString && (
                    <p className="text-xl tablet-lg:text-2xl font-normal">Curated by {curatorString}</p>
                  )}
                  <div className="max-w-screen-tablet flex flex-col space-y-3 tablet-lg:space-y-6">
                    {show_details && (
                      <div className="text-lg font-light p-summary">
                        {processContent(show_details, props.exhibitionData)}
                      </div>
                    )}
                    {showOpeningDetails && (
                      <div className="text-lg tablet:text-xl tablet-lg:text-lg font-light">
                        {processContent(opening_details, props.exhibitionData)}
                      </div>
                    )}
                    {artists && (
                      <div className="text-lg tablet:text-xl tablet-lg:text-lg font-light">
                        <span className="">Featuring work by:</span>
                        <div className="font-medium">
                          <Artists {...props.exhibitionData} />
                        </div>
                      </div>
                    )}
                    {dedication && <p className="text-lg font-normal">{parse(dedication)}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Head
