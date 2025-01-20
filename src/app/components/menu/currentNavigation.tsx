import parse from "html-react-parser"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getPermalink, PageType } from "../../../../lib/utils"

enum CollectionType {
  Section = "section",
  Tribute = "tribute",
  Page = "page",
}

interface NavigationProps {
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
        const navigationResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/navigation/`, {
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

    fetchData()
  }, []) // Empty dependency array to ensure the fetch only runs once

  if (loading || !navigation) return <div>Loading...</div>

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

  return (
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
  )
}

export default CurrentNavigation
