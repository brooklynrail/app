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

export default SectionPoetry
