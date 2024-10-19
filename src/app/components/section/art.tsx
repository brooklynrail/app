"use client"

import { SectionProps } from "."
import { Articles } from "../../../../lib/types"
import { LeadPromoArt, PromosArt } from "../collections/art"
import Frame from "../frames/frame"

const SectionArt = (props: SectionProps) => {
  const { articlesData } = props

  // Utility function to split array into groups
  const groupArray = (array: Articles[], groupSize: number) => {
    const groups = []
    for (let i = 0; i < array.length; i += groupSize) {
      groups.push(array.slice(i, i + groupSize))
    }
    return groups
  }

  // Split articles into groups of 4
  const articleGroups = groupArray(articlesData, 4).map((group, index) => {
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
  return articleGroups
}

export default SectionArt
