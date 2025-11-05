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
  const [exhibitions, setExhibitions] = useState<Exhibitions[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const fetchExhibitions = async () => {
      const response = await fetch(`/api/exhibitions`)
      const data = await response.json()
      if (!data || !Array.isArray(data)) {
        setExhibitions([])
        return
      }

      // Filter exhibitions where end_date >= today
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const activeExhibitions = data.filter((exhibition: Exhibitions) => {
        if (!exhibition.end_date) {
          return false
        }
        const endDate = new Date(exhibition.end_date)
        endDate.setHours(0, 0, 0, 0)
        return endDate >= today
      })

      setExhibitions(activeExhibitions)
    }
    void fetchExhibitions()
  }, [])

  // Auto advance exhibitions
  useEffect(() => {
    if (exhibitions.length <= 1) {
      return
    }

    const timer = setInterval(() => {
      setCurrentIndex((current) => (current === exhibitions.length - 1 ? 0 : current + 1))
    }, 5000) // Change exhibition every 5 seconds

    return () => clearInterval(timer)
  }, [exhibitions.length])

  if (!exhibitions || exhibitions.length === 0) {
    return <ExhibitionSkeleton />
  }

  const exhibition = exhibitions[currentIndex]

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

  return (
    <div className="">
      {/* Mobile view */}
      <div className="pl-3 tablet-lg:px-6 flex space-x-3 tablet-lg:hidden overflow-x-hidden">
        <h3 className="text-sm tablet-lg:text-lg font-medium text-nowrap">
          <Link href={permalink}>{exhibitions.length > 1 ? "Current Exhibitions:" : "Current Exhibition:"}</Link>
        </h3>
        <div className="flex-1 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {exhibitions.map((ex) => {
              const exCuratorString = formatCurators(ex.curators)
              const exCurators = exCuratorString ? `Curated by ${exCuratorString}` : ""
              const exStartDate = ex.start_date
              const exEndDate = ex.end_date
              const exDate = formatExhibitionDate(exStartDate, exEndDate)
              const exLocation = ex.location
              const exPermalink = getPermalink({
                type: PageType.Exhibition,
                slug: ex.slug,
              })

              return (
                <Link
                  key={ex.id}
                  href={exPermalink}
                  className="flex-none w-full whitespace-nowrap text-sm tablet-lg:text-lg font-light"
                >
                  <span className="px-3 italic">{ex.title}</span>
                  <span className="px-3">{exCurators}</span>
                  <span className="px-3">{exDate}</span>
                  {exLocation && <span className="px-1.5">{exLocation}</span>}
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* Desktop view */}
      <div className="hidden tablet-lg:flex flex-col space-y-3 px-3 tablet-lg:px-6 z-10">
        <div className="flex flex-col space-y-3 h-full">
          <h3 className="w-full text-sm tablet-lg:text-lg font-medium">
            <Link href={permalink}>
              {exhibitions.length > 1 ? "Current Exhibitions:" : "Current Exhibition:"} {exhibition.kicker}
            </Link>
          </h3>

          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {exhibitions.map((ex) => {
                const exCuratorString = formatCurators(ex.curators)
                const exStartDate = ex.start_date
                const exEndDate = ex.end_date
                const exDate = formatExhibitionDate(exStartDate, exEndDate)
                const exLocation = ex.location
                const exOpeningDate = ex.opening_date
                const exOpeningDetails = ex.opening_details
                const exPermalink = getPermalink({
                  type: PageType.Exhibition,
                  slug: ex.slug,
                })

                return (
                  <div key={ex.id} className="flex space-x-6 flex-none w-full">
                    <div className={`w-full h-full flex flex-col space-y-3`}>
                      <h3 className={`text-xl tablet-lg:text-4xl font-light italic hover:underline`}>
                        <Link href={exPermalink}>{ex.title}</Link>
                      </h3>
                      {exCuratorString && (
                        <p className="text-sm tablet-lg:text-lg font-normal">Curated by {exCuratorString}</p>
                      )}
                      <div className="text-xs tablet-lg:text-sm font-normal">
                        {exDate}
                        <br />
                        {exLocation && exLocation}
                      </div>
                      {exOpeningDate && isOpeningDateTodayOrFuture(exOpeningDate) && (
                        <div className="text-xs tablet-lg:text-sm font-normal">{parse(exOpeningDetails)}</div>
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
                      {ex.exhibition_images && <ExhibitionSlideshow exhibition_images={ex.exhibition_images} />}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Navigation dots - only show when more than one exhibition */}
          {exhibitions.length > 1 && (
            <div className="flex justify-center gap-3 pt-3">
              {exhibitions.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? "bg-slate-900 dark:bg-slate-50" : "bg-slate-400"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to exhibition ${index + 1}`}
                />
              ))}
            </div>
          )}
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
