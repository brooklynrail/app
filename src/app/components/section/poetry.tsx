"use client"
import { useBreakpoints } from "@/app/hooks/useBreakpoints"
import { useEffect, useState } from "react"
import { SectionProps } from "."
import { Articles } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import Bylines, { BylineType } from "../collections/promos/bylines"
import PoetryCard from "../collections/promos/poetryCard"
import Title from "../collections/promos/title"
import Link from "next/link"

const SectionPoetry = (props: SectionProps) => {
  const { articlesData } = props
  const currentBreakpoint = useBreakpoints()
  const [groupCount, setGroupCount] = useState(1)

  useEffect(() => {
    const calculateGroupNumber = () => {
      switch (currentBreakpoint) {
        case "tablet":
          return 2
        case "tablet-lg":
          return 3
        case "desktop":
        case "desktop-lg":
        case "widescreen":
          return 3
        default:
          return 1
      }
    }
    setGroupCount(calculateGroupNumber())
  }, [currentBreakpoint])

  // Utility function to split array into groups
  const groupArray = (array: Articles[], groupSize: number) => {
    const groups = []
    for (let i = 0; i < array.length; i += groupSize) {
      groups.push(array.slice(i, i + groupSize))
    }
    return groups
  }

  const articleGroups = groupArray(articlesData, groupCount).map((group, i) => (
    <div className="grid grid-cols-4 tablet:grid-cols-12 divide-x rail-divide py-3 px-3">
      <Promos articles={group} />
    </div>
  ))

  return <div className="divide-y rail-divide">{articleGroups}</div>
}

interface PromoProps {
  articles: Articles[]
}

const Promos = (props: PromoProps) => {
  const articles = props.articles.map((article, i = 1) => {
    const { issue, section } = article
    const permalink = getPermalink({
      year: issue.year,
      month: issue.month,
      section: section.slug,
      slug: article.slug,
      type: PageType.Article,
    })

    return (
      <div key={i} className={`col-span-4 tablet:col-span-6 tablet-lg:col-span-4`}>
        <div className="p-3 flex flex-col space-y-6">
          <div className="flex flex-col space-y-3">
            <Link href={permalink}>
              <div className="flex justify-between items-start">
                <Title title={article.title} classes="text-3xl tablet:text-4xl font-light font-serif" />
                <Arrow />
              </div>
            </Link>
            <Bylines article={article} type={BylineType.Default} />
          </div>
          <PoetryCard {...article} />
        </div>
      </div>
    )
  })

  return <>{articles}</>
}

export const Arrow = () => {
  return (
    <svg
      className="mt-1 flex-none"
      width="64"
      height="36"
      viewBox="0 0 64 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M49.7071 18.7071C50.0976 18.3166 50.0976 17.6834 49.7071 17.2929L43.3431 10.9289C42.9526 10.5384 42.3195 10.5384 41.9289 10.9289C41.5384 11.3195 41.5384 11.9526 41.9289 12.3431L47.5858 18L41.9289 23.6569C41.5384 24.0474 41.5384 24.6805 41.9289 25.0711C42.3195 25.4616 42.9526 25.4616 43.3431 25.0711L49.7071 18.7071ZM15 19H49V17H15V19Z"
        fill="#18181B"
      />
    </svg>
  )
}

export default SectionPoetry
