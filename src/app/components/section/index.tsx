"use client"

import { useState } from "react"
import { Articles, Sections } from "../../../../lib/types"
import Header, { HeaderType } from "../header"
import Paper from "../paper"
import SectionArt from "./art"
import SectionHead from "./head"
import SectionDefault from "./default"
import SectionArtSeen from "./artseen"

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

const Section = (props: SectionProps) => {
  const { sectionData, permalink, articlesData } = props
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [allArticles, setAllArticles] = useState<Articles[]>(articlesData)

  const all = (() => {
    switch (sectionData.slug) {
      case SectionType.Art:
        return <SectionArt sectionData={sectionData} articlesData={allArticles} permalink={permalink} />
      case SectionType.ArtSeen:
        return <SectionArtSeen sectionData={sectionData} articlesData={allArticles} permalink={permalink} />
      default:
        return <SectionDefault sectionData={sectionData} articlesData={allArticles} permalink={permalink} />
    }
  })()

  const limit = 16 * 2
  // Function to load more events
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
      setAllArticles((prev) => [...prev, ...newArticles])
      setCurrentPage((prev) => prev + 1)
    } catch (error) {
      console.error("Failed to load more events:", error)
    }
  }

  return (
    <Paper pageClass="paper-section">
      <Header type={HeaderType.Alt} />

      <main className="divide-y rail-divide">
        <SectionHead title={sectionData.name} permalink={permalink} />
        <div className="divide-y rail-divide">{all}</div>
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
