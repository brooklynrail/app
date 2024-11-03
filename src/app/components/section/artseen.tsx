"use client"

import { useEffect, useState } from "react"
import { SectionProps } from "."
import { Articles } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import Bylines, { BylineType } from "../collections/promos/bylines"
import Title from "../collections/promos/title"
import FeaturedImage from "../featuredImage"
import { useBreakpoints } from "@/app/hooks/useBreakpoints"

// Group articles by issue
const groupByIssue = (articles: Articles[]) => {
  return articles.reduce((acc: Record<string, Articles[]>, article) => {
    const issueId = article.issue.id // or any unique identifier for the issue
    if (!acc[issueId]) {
      acc[issueId] = []
    }
    acc[issueId].push(article)
    return acc
  }, {})
}

const SectionArtSeen = (props: SectionProps) => {
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
          return 4
        default:
          return 1
      }
    }
    setGroupCount(calculateGroupNumber())
  }, [currentBreakpoint])

  // Group articles by their respective issue
  const articlesByIssue = groupByIssue(articlesData)

  return (
    <div className="divide-y rail-divide">
      {Object.keys(articlesByIssue).map((issueId, index) => {
        const issueArticles = articlesByIssue[issueId]
        const issueTitle = issueArticles[0]?.issue.title || "Untitled Issue" // Assuming issue title is the same for all articles in the issue

        // Utility function to split array into groups for grid layout
        const groupArray = (array: Articles[], groupSize: number) => {
          const groups = []
          for (let i = 0; i < array.length; i += groupSize) {
            groups.push(array.slice(i, i + groupSize))
          }
          return groups
        }

        const articleGroups = groupArray(issueArticles, groupCount).map((group, i) => {
          const priority = index === 0 && i < 3 ? true : false
          return (
            <div
              key={`group-${group[0].id}`}
              className="grid grid-cols-4 tablet:grid-cols-12 divide-x rail-divide py-3 px-3"
            >
              <Promos articles={group} priority={priority} />
            </div>
          )
        })

        return (
          <div key={index} className="divide-y rail-divide">
            <div className="px-6 py-3">
              <h2 className="text-2xl font-bold uppercase">{issueTitle}</h2>
            </div>
            {articleGroups}
          </div>
        )
      })}
    </div>
  )
}

interface PromoProps {
  articles: Articles[]
  priority: boolean
}

const Promos = (props: PromoProps) => {
  const articles = props.articles.map((article, i = 1) => {
    const { issue, section, title, featured_artwork, featured_image } = article
    const artwork = featured_artwork ? featured_artwork : featured_image
    const permalink = getPermalink({
      year: issue.year,
      month: issue.month,
      section: section.slug,
      slug: article.slug,
      type: PageType.Article,
    })

    return (
      <div key={article.id} className={`col-span-4 tablet:col-span-6 tablet-lg:col-span-4 desktop:col-span-3`}>
        <div className="p-3 flex flex-col space-y-6">
          {artwork && (
            <FeaturedImage
              priority={props.priority}
              image={artwork}
              title={title}
              hideCaption={true}
              permalink={permalink}
            />
          )}
          <div className="flex flex-col space-y-3">
            <Title title={article.title} permalink={permalink} classes="text-md tablet:text-xl font-light" />
            <Bylines article={article} type={BylineType.Default} />
          </div>
        </div>
      </div>
    )
  })

  return <>{articles}</>
}

export default SectionArtSeen
