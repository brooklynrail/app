"use client"

import { useState } from "react"
import { Articles, Homepage, Sections } from "../../../../lib/types"
import Paper, { PaperType } from "../paper"
import SectionArt from "./art"
import SectionHead from "./head"
import SectionDefault from "./default"
import SectionArtSeen from "./artseen"

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
}

const Section = (props: SectionProps & NavProps) => {
  const { sectionData, permalink, articlesData, navData } = props
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [articles, setArticles] = useState<Articles[]>(articlesData)

  const allArticles = (() => {
    switch (sectionData.slug) {
      case SectionType.Art:
        return <SectionArt sectionData={sectionData} articlesData={articles} permalink={permalink} />
      case SectionType.ArtSeen:
        return <SectionArtSeen sectionData={sectionData} articlesData={articles} permalink={permalink} />
      default:
        return <SectionDefault sectionData={sectionData} articlesData={articles} permalink={permalink} />
    }
  })()

  const limit = 16 * 2
  const loadMoreArticles = async () => {
    try {
      const newArticlesResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/sections/?slug=${sectionData.slug}&limit=${limit}&offset=${currentPage * limit}`,
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
      console.error("Failed to load more events:", error)
    }
  }

  const type = sectionData.slug === "criticspage" ? PaperType.CriticsPage : PaperType.Default

  return (
    <Paper pageClass={`paper-section paper-section-${sectionData.slug}`} type={type} navData={navData}>
      <main className="divide-y rail-divide">
        <SectionHead title={sectionData.name} description={sectionData.description} permalink={permalink} />

        <div className="divide-y rail-divide">{allArticles}</div>

        {hasMore && (
          <div className="text-center py-6 pb-12">
            <button
              onClick={loadMoreArticles}
              className="bg-indigo-500 text-white text-xl uppercase px-4 py-2 rounded-md shadow-md hover:bg-indigo-600 hover:underline hover:underline-offset-2"
            >
              Load more
            </button>
          </div>
        )}
      </main>
    </Paper>
  )
}

export default Section
