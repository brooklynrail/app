"use client"

import { useCallback, useEffect } from "react"
import { useState } from "react"
import { Collections, Organizations } from "@/lib/types"
import { usePostHog } from "posthog-js/react"
import Image from "next/image"
import Link from "next/link"
import styles from "./collection.module.scss"

const CollectionRailCommunity = (collection: Collections) => {
  const [randomOrgs, setRandomOrgs] = useState<Organizations[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const posthog = usePostHog()

  // Helper function to shuffle array
  const shuffleArray = (array: Organizations[]) => {
    return [...array].sort(() => Math.random() - 0.5)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orgsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/organizations/?onlySponsors=true`, {
          next: { revalidate: 36000, tags: ["organizations"] },
        })
        const orgs = await orgsResponse.json()

        if (Array.isArray(orgs) && orgs.length > 0) {
          // Save original shuffled list
          const firstShuffle = shuffleArray(orgs)
          setRandomOrgs(firstShuffle)
        } else {
          setRandomOrgs(null)
        }
      } catch (error) {
        console.error("Failed to fetch Organizations data:", error)
        setRandomOrgs(null)
      } finally {
        setIsLoading(false)
      }
    }

    void fetchData()
  }, [])

  const handleOrgEvent = useCallback(
    (action: "impression" | "click", org: Organizations, position: number) => {
      const { slug, name } = org

      // PostHog tracking
      if (posthog) {
        posthog.capture(`${action}_community_sponsor`, {
          slug,
          name,
        })
      }
    },
    [posthog],
  )

  if (!isLoading && !randomOrgs) {
    return null
  }

  const renderAds = () => {
    if (isLoading) {
      return (
        <div className="flex w-full overflow-hidden min-h-[100px]">
          <ul className="flex w-full justify-center items-center space-x-4">
            <OrgSkeleton />
            <OrgSkeleton />
            <OrgSkeleton />
          </ul>
        </div>
      )
    }

    return (
      <div className={`overflow-hidden`}>
        <div className={`${styles.marquee_text}`}>
          <ul className={`${styles.marquee_text_track}`}>
            {randomOrgs?.map((org: Organizations, i: number) => renderOrgItem(org, i))}
            {randomOrgs?.map((org: Organizations, i: number) => renderOrgItem(org, i, true))}
          </ul>
        </div>
      </div>
    )
  }

  const renderOrgItem = (org: Organizations, i: number, isDuplicate: boolean = false) => {
    if (!org.logo || !org.url) {
      return null
    }

    const orgImage = org.logo
    const width = orgImage.width ?? 0
    const height = orgImage.height ?? 0
    const src = `${process.env.NEXT_PUBLIC_IMAGE_PATH}${orgImage.filename_disk}`
    const size = 147
    const scaledWidth = width > size ? size : width
    const scaledHeight = width > size ? (size * height) / width : (height * scaledWidth) / width

    return (
      <li
        key={`org-${org.id}-${i}${isDuplicate ? "-duplicate" : ""}`}
        className="flex-none flex items-center justify-center"
        aria-hidden={isDuplicate}
      >
        <Link
          href={org.url}
          target="_blank"
          onClick={() => !isDuplicate && handleOrgEvent("click", org, i + 1)}
          tabIndex={isDuplicate ? -1 : undefined}
        >
          <Image
            src={src}
            width={scaledWidth}
            height={scaledHeight}
            sizes="20vw"
            alt={org.name}
            onLoad={() => !isDuplicate && handleOrgEvent("impression", org, i + 1)}
          />
        </Link>
      </li>
    )
  }

  return (
    <div key={collection.id} className="collection">
      <div className="flex flex-col py-3 pb-6 bg-white space-y-1.5">
        <p className="pb-0.5 text-[11px] text-center leading-4 uppercase text-slate-400">Rail Community</p>
        {renderAds()}
      </div>
    </div>
  )
}

const OrgSkeleton = () => (
  <li className="flex-none animate-pulse">
    <div className="w-[147px] h-[100px] bg-zinc-600/50 rounded" />
  </li>
)

export default CollectionRailCommunity
