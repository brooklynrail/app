import parse from "html-react-parser"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getPermalink, PageType } from "@/lib/utils"

export enum CollectionType {
  Section = "section",
  Tribute = "tribute",
  Page = "page",
}

export interface NavigationProps {
  id: string
  name: string
  slug: string
  type: string
}

const CurrentNavigation = () => {
  const [navigation, setNavigation] = useState<NavigationProps[] | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const navigationResponse = await fetch(`/api/navigation/`, {
          next: { revalidate: 3600, tags: ["homepage"] },
        })
        const navigationData = await navigationResponse.json()
        if (navigationData) {
          setNavigation(navigationData)
          setLoading(false)
        } else {
          console.error("Fetched data is not an array")
        }
      } catch (error) {
        console.error("Failed to fetch Global Settings data:", error)
      }
    }

    void fetchData()
  }, []) // Empty dependency array to ensure the fetch only runs once

  if (loading || !navigation) {
    return <div>Loading...</div>
  }

  const allNav = navigation.map((navItem: NavigationProps, i: number) => {
    const permalink = (() => {
      switch (navItem.type) {
        case CollectionType.Section:
          return getPermalink({
            sectionSlug: navItem.slug,
            type: PageType.SuperSection,
          })
        case CollectionType.Tribute:
          return getPermalink({
            tributeSlug: navItem.slug,
            type: PageType.Tribute,
          })
        default:
          return null
      }
    })()

    if (!permalink) {
      return null
    }

    return (
      <li key={`menu-${navItem.id}`} className="text-center">
        <Link href={permalink} className="py-3 block text-sm font-bold uppercase text-center">
          {parse(navItem.name)}
        </Link>
      </li>
    )
  })

  const allPages = navigation.map((navItem: NavigationProps, i: number) => {
    const permalink = (() => {
      switch (navItem.type) {
        case CollectionType.Page:
          if (navItem.slug == `about`) {
            // Example path: /about
            return getPermalink({
              type: PageType.Page,
              slug: navItem.slug,
            })
          } else {
            // Example path: /about/staff
            return getPermalink({
              type: PageType.ChildPage,
              slug: navItem.slug,
            })
          }

        default:
          return null
      }
    })()

    if (!permalink) {
      return null
    }

    return (
      <li key={`menu-${navItem.slug}`} className="">
        <Link href={permalink} className="block text-sm font-bold">
          {parse(navItem.name)}
        </Link>
      </li>
    )
  })

  return (
    <>
      <ul className="divide-y rail-divide">
        {allNav}
        <li className="text-center">
          <Link
            href={`https://intranslation.brooklynrail.org/`}
            className="py-3 block text-sm font-bold uppercase text-center"
          >
            InTranslation
          </Link>
        </li>
      </ul>
      <div className="py-3 bg-slate-100 dark:bg-zinc-700 pb-48">
        <ul className="py-3 block text-sm font-bold px-9 space-y-3">
          {allPages}
          <li className="">
            <Link className="flex space-x-2 w-full" href={`/subscribe`} prefetch={false}>
              <span>Sign up for our newsletter</span>
            </Link>
          </li>
          <li className="">
            <Link className="flex space-x-2 w-full" href={`/instagram`} prefetch={false}>
              <span>Follow us on Instagram</span>
            </Link>
          </li>
          <li className="">
            <Link className="flex space-x-2 w-full" href={`/store`} prefetch={false}>
              <span>Visit our store</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default CurrentNavigation
