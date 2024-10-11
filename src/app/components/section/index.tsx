"use client"

import { useState } from "react"
import { Articles, Sections } from "../../../../lib/types"
import { LeadPromoArt, PromosArt } from "../collections/art"
import Header, { HeaderType } from "../header"
import Paper from "../paper"
import Frame from "./frame"
import SectionHead from "./head"

export interface SectionProps {
  sectionData: Sections
  articlesData: Articles[]
  permalink: string
}

const Section = (props: SectionProps) => {
  const { sectionData, permalink, articlesData } = props
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [allArticles, setAllArticles] = useState<Articles[]>(articlesData)

  // Utility function to split array into groups
  const groupArray = (array: Articles[], groupSize: number) => {
    const groups = []
    for (let i = 0; i < array.length; i += groupSize) {
      groups.push(array.slice(i, i + groupSize))
    }
    return groups
  }

  // Split articles into groups of 4
  const articleGroups = groupArray(allArticles, 4).map((group, index) => {
    const leadArticle = group[0]
    const restOfArticles = group.slice(1)
    return (
      <Frame
        key={index}
        LeadPromo={<LeadPromoArt article={leadArticle} />}
        Promos={<PromosArt articles={restOfArticles} />}
        alt={index % 2 !== 0}
      />
    )
  })

  const limit = 16 * 2
  // Function to load more events
  const loadMoreArticles = async () => {
    try {
      const newArticlesResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/sections/?slug=${sectionData.slug}&limit=${limit}&offset=${currentPage * limit}`,
      )
      const newEvents = await newArticlesResponse.json()
      if (!Array.isArray(newEvents)) {
        throw new Error("Fetched data is not an array")
      }
      if (newEvents.length < limit) {
        setHasMore(false)
      }
      setAllArticles((prev) => [...prev, ...newEvents])
      setCurrentPage((prev) => prev + 1)
    } catch (error) {
      console.error("Failed to load more events:", error)
    }
  }

  return (
    <Paper pageClass="paper-section">
      <header role="banner">
        <div className="grid grid-cols-4 tablet:grid-cols-12 gap-4 desktop:gap-3 gap-y-4">
          <div className="col-span-12">
            <Header type={HeaderType.Alt} />
          </div>
        </div>
      </header>

      <main className="">
        <SectionHead title={sectionData.name} permalink={permalink} />
        <div className="divide-y rail-divide">{articleGroups}</div>
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
