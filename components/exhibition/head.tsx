"use client"
import parse from "html-react-parser"
import Link from "next/link"
import { Exhibitions, ExhibitionsPeople1, People } from "@/lib/types"
import { getPermalink, PageType } from "@/lib/utils"
import { Artists } from "./sectionBlock"

interface ExhibitionHeadProps {
  exhibitionData: Exhibitions
}

// Format curators as a comma-separated string with Oxford comma
export const formatCurators = (curators: ExhibitionsPeople1[] | any[]) => {
  if (!curators || curators.length === 0) {
    return null
  }

  const curatorNames = curators
    .filter((curator) => curator?.people_id?.display_name)
    .map((curator) => curator.people_id.display_name)

  if (curatorNames.length === 0) {
    return null
  }
  if (curatorNames.length === 1) {
    return curatorNames[0]
  }
  if (curatorNames.length === 2) {
    return `${curatorNames[0]} and ${curatorNames[1]}`
  }

  // For 3+ curators, use Oxford comma
  const allButLast = curatorNames.slice(0, -1)
  const last = curatorNames[curatorNames.length - 1]
  return `${allButLast.join(", ")}, and ${last}`
}

const Head = (props: ExhibitionHeadProps) => {
  const {
    kicker,
    title,
    deck,
    end_date,
    dedication,
    show_details,
    opening_details,
    curators,
    artists,
    show_artists_list,
    video_cover,
    cover_image,
    location_map,
  } = props.exhibitionData

  // Format dates for exhibition
  const endDate = new Date(end_date)

  const exhibitionsPermalink = getPermalink({
    type: PageType.Exhibitions,
  })

  const currentDate = new Date()

  // Only show opening details if the exhibition hasn't ended yet
  const showOpeningDetails = endDate && currentDate <= endDate

  const curatorString = formatCurators(curators)

  const videoCover = video_cover ? `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${video_cover?.filename_disk}` : ""

  const coverImage = cover_image ? `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${cover_image?.filename_disk}` : ""

  const headclasses = videoCover
    ? "h-entry py-6 tablet-lg:py-12 relative w-full grid min-h-[100vh]"
    : "h-entry py-6 tablet-lg:py-12 relative w-full grid min-h-[fit-content]"

  return (
    <>
      <section className={headclasses}>
        {videoCover && (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={coverImage}
            className=" z-0 absolute top-0 bottom-0 left-0 right-0 w-full h-full object-cover transform"
            style={{
              objectPosition: "center 25%",
            }}
          >
            <source src={videoCover} type="video/mp4" />
          </video>
        )}

        <div className="desktop:max-w-screen-desktop-lg mx-auto px-3 w-full">
          <div className="z-10 relative grid grid-cols-4 tablet-lg:grid-cols-12 gap-3 gap-y-9 tablet-lg:gap-y-16 desktop:gap-y-20">
            <div className="col-span-4 tablet-lg:col-span-12">
              <div className="flex flex-col space-y-3 tablet-lg:space-y-6">
                <p className="flex space-x-3 text-sm tablet-lg:text-md uppercase font-normal">
                  <Link href={exhibitionsPermalink}>Exhibitions</Link>
                  {kicker && (
                    <>
                      <span className="border-l rail-border"></span>
                      <span>{kicker}</span>
                    </>
                  )}
                </p>
                <div className="flex flex-col space-y-3 tablet-lg:space-y-6">
                  <h1 className="-ml-[3px] tablet:-ml-[5px] text-5xl tablet-lg:text-6xl desktop:text-7xl font-light p-name">
                    {parse(title)}
                  </h1>
                  {deck && <p className="text-xl tablet-lg:text-3xl font-normal">{parse(deck)}</p>}
                  {curatorString && (
                    <p className="text-xl tablet-lg:text-2xl font-normal">Curated by {curatorString}</p>
                  )}
                  <div className="max-w-screen-tablet flex flex-col space-y-3 tablet-lg:space-y-6">
                    {show_details && (
                      <div className="text-lg font-light p-summary">
                        {parse(show_details)}
                        {location_map && (
                          <>
                            <Link className="underline" href={location_map}>
                              Map
                            </Link>
                          </>
                        )}
                      </div>
                    )}

                    {showOpeningDetails && (
                      <div className="text-lg tablet:text-xl tablet-lg:text-lg font-light">
                        {parse(opening_details)}
                      </div>
                    )}
                    {show_artists_list && artists && (
                      <div className="text-lg tablet:text-xl tablet-lg:text-lg font-light">
                        <span className="">Featuring work by:</span>
                        <div className="font-medium">
                          <Artists {...props.exhibitionData} />
                        </div>
                      </div>
                    )}
                    {dedication && <p className="pt-6 text-lg font-light">{parse(dedication)}</p>}
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
