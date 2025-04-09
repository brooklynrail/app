"use client"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Exhibitions, ExhibitionsImages } from "@/lib/types"
import { getPermalink, PageType } from "@/lib/utils"
import parse from "html-react-parser"
import { formatCurators } from "../exhibition/head"

const ExhibitionSkeleton = () => {
  return (
    <div className="flex flex-col space-y-3 px-6">
      {/* Header */}
      <div className="w-48 h-6 bg-gray-200 dark:bg-zinc-600 animate-pulse rounded" />

      <div className="flex space-x-6">
        <div className="w-full h-full flex flex-col space-y-3 tablet-lg:mt-3">
          {/* Title */}
          <div className="w-64 h-10 bg-gray-200 dark:bg-zinc-600 animate-pulse rounded" />
          <div className="w-60 h-10 bg-gray-200 dark:bg-zinc-600 animate-pulse rounded" />
          {/* Curator line */}
          <div className="w-36 h-5 bg-gray-200 dark:bg-zinc-600 animate-pulse rounded" />
          {/* Show details */}
          <div className="h-8 w-36 bg-gray-200 dark:bg-zinc-600 animate-pulse rounded" />
        </div>

        {/* Image placeholder */}
        <div className="w-36 h-24 tablet-lg:w-60 tablet-lg:h-40 flex-shrink-0 overflow-hidden flex items-center justify-center">
          <div className="w-full h-full bg-gray-200 dark:bg-zinc-600 animate-pulse rounded" />
        </div>
      </div>
    </div>
  )
}

const Exhibition = () => {
  const [exhibition, setExhibition] = useState<Exhibitions | null>(null)

  useEffect(() => {
    const fetchExhibition = async () => {
      const response = await fetch(`/api/exhibitions`)
      const data = await response.json()
      if (!data || !Array.isArray(data)) {
        setExhibition(null)
        return
      }
      setExhibition(data[0])
    }
    void fetchExhibition()
  }, [])

  if (!exhibition) {
    return <ExhibitionSkeleton />
  }

  const title = exhibition.title
  const kicker = exhibition.kicker
  const exhibition_images = exhibition.exhibition_images
  const opening_details = exhibition.opening_details
  const opening_date = exhibition.opening_date
  const location = exhibition.location
  const curatorString = formatCurators(exhibition.curators)
  const startDate = exhibition.start_date
  const endDate = exhibition.end_date

  const formatExhibitionDate = (startDate: string, endDate: string) => {
    const start = new Date(startDate)
    const end = new Date(endDate)

    const sameYear = start.getFullYear() === end.getFullYear()
    const startStr = start.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: sameYear ? undefined : "numeric",
    })
    const endStr = end.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })

    return `${startStr}–${endStr}`
  }

  const exhibitionDate = formatExhibitionDate(startDate, endDate)

  const permalink = getPermalink({
    type: PageType.Exhibition,
    slug: exhibition.slug,
  })

  const isOpeningDateTodayOrFuture = (opening_date: string) => {
    const openingDate = new Date(opening_date)
    // Set time to start of day for both dates to compare just the dates
    openingDate.setHours(0, 0, 0, 0)

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return openingDate >= today
  }
  const curators = curatorString ? `Curated by ${curatorString}` : ""

  return (
    <div className="">
      <div className="pl-3 tablet-lg:px-6 flex space-x-3 tablet-lg:hidden overflow-x-hidden">
        <h3 className="text-sm tablet-lg:text-lg font-medium text-nowrap">
          <Link href="/exhibitions">Current Exhibition:</Link>
        </h3>
        <Link href="/exhibitions" className="block">
          <div className="relative flex overflow-x-hidden">
            <div
              className="whitespace-nowrap text-sm tablet-lg:text-lg font-light"
              style={{
                animation: "marquee 15s linear infinite",
              }}
            >
              <span className="px-3 italic">{title}</span>
              <span className="px-3">{curators}</span>
              <span className="px-3">{exhibitionDate}</span>
              {location && <span className="px-1.5">{location}</span>}
            </div>

            <div
              className="absolute top-0 whitespace-nowrap text-sm tablet-lg:text-lg font-light"
              style={{
                animation: "marquee2 15s linear infinite",
              }}
            >
              <span className="px-3 italic">{title}</span>
              <span className="px-3">{curators}</span>
              <span className="px-3">{exhibitionDate}</span>
              {location && <span className="px-1.5">{location}</span>}
            </div>

            <style>{`
              @keyframes marquee {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-100%); }
              }
              @keyframes marquee2 {
                0% { transform: translateX(100%); }
                100% { transform: translateX(0%); }
              }
            `}</style>
          </div>
        </Link>
      </div>

      <div className="hidden tablet-lg:flex flex-col space-y-3 px-3 tablet-lg:px-6 z-10">
        <div className="flex flex-col space-y-3 h-full">
          <h3 className="w-full text-sm tablet-lg:text-lg font-medium">
            <Link href="/exhibitions">Current Exhibition: {kicker}</Link>
          </h3>

          <div className="flex space-x-6">
            <div className={`w-full h-full flex flex-col space-y-3`}>
              <h3 className={`text-xl tablet-lg:text-4xl font-light italic hover:underline`}>
                <Link href={permalink}>{title}</Link>
              </h3>
              {curatorString && <p className="text-sm tablet-lg:text-lg font-normal">Curated by {curatorString}</p>}
              <div className="text-xs tablet-lg:text-sm font-normal">
                {exhibitionDate}
                <br />
                {location && location}
              </div>
              {opening_date && isOpeningDateTodayOrFuture(opening_date) && (
                <div className="text-xs tablet-lg:text-sm font-normal">{parse(opening_details)}</div>
              )}
              <div className="flex flex-wrap gap-x-3 w-full pt-3">
                <Link
                  href={`/exhibitions`}
                  className={`p-1.5 rounded-sm text-center uppercase font-medium text-xs border rail-border`}
                >
                  All Exhibitions
                </Link>
              </div>
            </div>

            <div className="w-36 h-24 tablet-lg:w-60 tablet-lg:h-40 flex-shrink-0 overflow-hidden flex items-center justify-center">
              {exhibition_images && <ExhibitionSlideshow exhibition_images={exhibition_images} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ExhibitionSlideshow = ({ exhibition_images }: { exhibition_images: ExhibitionsImages[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!exhibition_images || exhibition_images.length === 0) {
    return null
  }

  // Auto advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((current) => (current === exhibition_images.length - 1 ? 0 : current + 1))
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [exhibition_images.length])

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {exhibition_images.map((image: ExhibitionsImages, index: number) => {
        if (!image.directus_files_id) {
          return null
        }

        const src = `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${image.directus_files_id.filename_disk}`
        const alt = image.directus_files_id.caption || ""

        return (
          <div
            key={index}
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-2000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={src}
              alt={alt}
              width={image.directus_files_id.width}
              height={image.directus_files_id.height}
              className="object-contain w-full h-full"
              sizes="192px"
            />
          </div>
        )
      })}
    </div>
  )
}

export default Exhibition
