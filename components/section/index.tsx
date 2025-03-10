"use client"
import { Suspense, useEffect, useState } from "react"
import { Articles, Homepage, Sections } from "@/lib/types"
import Paper from "../paper"
import SectionArt from "./art"
import SectionCriticsPage from "./criticsPage"
import SectionDefault, { LayoutMode } from "./default"
import SectionHead from "./head"
import SectionPoetry from "./poetry"
import { usePageContext } from "../pageContext"

interface NavProps {
  navData: Homepage
}
export interface SectionProps {
  sectionData: Sections
  articlesData: Articles[]
  permalink: string
}

enum SectionType {
  Art = "art",
  ArtSeen = "artseen",
  CriticsPage = "criticspage",
  Poetry = "poetry",
}

const Section = (props: SectionProps & NavProps) => {
  const { sectionData, permalink, articlesData, navData } = props
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [layoutMode, setLayoutMode] = useState<LayoutMode>(LayoutMode.Grid)
  const { setCurrentContext } = usePageContext()
  const [articles, setArticles] = useState<Articles[]>(articlesData)

  useEffect(() => {
    setCurrentContext("section")
    // return () => setCurrentContext(null) // Clear context on unmount if needed
  }, [setCurrentContext])

  let hasMultipleLayouts = false

  const allArticles = (() => {
    switch (sectionData.slug) {
      case SectionType.Art:
        return <SectionArt sectionData={sectionData} articlesData={articles} permalink={permalink} />
      case SectionType.ArtSeen:
        hasMultipleLayouts = true
        return (
          <SectionDefault
            sectionData={sectionData}
            articlesData={articles}
            permalink={permalink}
            layoutMode={layoutMode}
            grouped={true}
            framedImage={true}
          />
        )
      case SectionType.CriticsPage:
        return <SectionCriticsPage sectionData={sectionData} articlesData={articles} permalink={permalink} />
      case SectionType.Poetry:
        return <SectionPoetry sectionData={sectionData} articlesData={articles} permalink={permalink} />
      default:
        hasMultipleLayouts = true
        return (
          <SectionDefault
            sectionData={sectionData}
            articlesData={articles}
            permalink={permalink}
            layoutMode={layoutMode}
            grouped={false}
            framedImage={false}
          />
        )
    }
  })()

  const limit = 16 * 2
  const loadMoreArticles = async () => {
    try {
      const newArticlesResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sections/?slug=${sectionData.slug}&limit=${limit}&offset=${currentPage * limit}`,
      )
      const newArticles = await newArticlesResponse.json()
      if (!Array.isArray(newArticles)) {
        throw new Error("Fetched data is not an array")
      }
      if (newArticles.length < limit) {
        setHasMore(false)
      }
      setArticles((prev) => [...prev, ...newArticles])
      setCurrentPage((prev) => prev + 1)
    } catch (error) {
      console.error("Failed to load more articles:", error)
    }
  }

  return (
    <Paper pageClass={`theme-${sectionData.slug}`} navData={navData}>
      <main className="divide-y rail-divide">
        <Suspense fallback={<div>Loading...</div>}>
          <SectionHead
            title={sectionData.name}
            description={sectionData.description}
            sponsor={sectionData.sponsor}
            permalink={permalink}
            hasMultipleLayouts={hasMultipleLayouts}
            layoutMode={layoutMode}
            setLayoutMode={setLayoutMode}
          />
        </Suspense>

        <Suspense fallback={<div>Loading articles...</div>}>
          <div className="divide-y rail-divide">{allArticles}</div>
        </Suspense>

        <Suspense fallback={<div>Loading...</div>}>
          {hasMore && (
            <div className="text-center py-6 pb-12">
              <button
                onClick={loadMoreArticles}
                className="bg-indigo-500 text-white text-xl uppercase px-4 py-2 rounded-sm shadow-lg hover:bg-indigo-600 hover:underline hover:underline-offset-2"
              >
                Load more
              </button>
            </div>
          )}
        </Suspense>
      </main>
    </Paper>
  )
}

export default Section
