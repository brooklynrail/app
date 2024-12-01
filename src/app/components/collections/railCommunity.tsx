"use client"
import { useCallback, useEffect } from "react"
import { useState } from "react"
import { Collections, Organizations } from "../../../../lib/types"
import { usePostHog } from "posthog-js/react"
import Image from "next/image"
import Link from "next/link"

const CollectionRailCommunity = (collection: Collections) => {
  const [randomOrgs, setRandomOrgs] = useState<Organizations[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const posthog = usePostHog()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orgsResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/organizations/?onlySponsors=true`)
        const orgs = await orgsResponse.json()
        console.log("orgs", orgs)

        if (Array.isArray(orgs) && orgs.length > 0) {
          const shuffledOrgs = orgs.sort(() => 0.5 - Math.random())
          setRandomOrgs(shuffledOrgs)
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

    fetchData()
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
        <div className="flex w-full overflow-hidden min-h-[147px]">
          <ul className="flex justify-center items-center space-x-4">
            <OrgSkeleton />
            <OrgSkeleton />
            <OrgSkeleton />
          </ul>
        </div>
      )
    }

    return (
      <div className="flex w-full overflow-hidden min-h-[100px]">
        <div className="animate-marquee flex whitespace-nowrap">
          <ul className="flex items-center space-x-9 shrink-0 pl-9">
            {randomOrgs?.map((org: Organizations, i: number) => renderOrgItem(org, i))}
            {randomOrgs?.map((org: Organizations, i: number) => renderOrgItem(org, i, true))}
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
      <li key={`org-${org.id}-${i}${isDuplicate ? "-duplicate" : ""}`} className="flex-none" aria-hidden={isDuplicate}>
        <Link
          href={org.url}
          target="_blank"
          onClick={() => !isDuplicate && handleOrgEvent("click", org, i + 1)}
          tabIndex={isDuplicate ? -1 : undefined}
        >
          <Image
            src={src}
            width={scaledWidth}
            height={100}
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
      <div className="flex flex-col py-3 pb-6 bg-white">
        <p className="pb-0.5 text-[11px] text-center leading-4 uppercase text-slate-400">Rail Community</p>
        {renderAds()}
      </div>
    </div>
  )
}

const OrgSkeleton = () => (
  <li className="flex-none animate-pulse">
    <div className="w-[147px] h-[147px] bg-zinc-600/50 rounded" />
  </li>
)

export default CollectionRailCommunity
