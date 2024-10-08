"use client"

import { Articles, Sections } from "../../../../lib/types"
import { LeadPromoArt, PromosArt } from "../collections/art"
import Header, { HeaderType } from "../header"
import Paper from "../paper"
import Frame from "./frame"
import SectionHead from "./head"

export interface SectionProps {
  sectionData: Sections
  permalink: string
}

const Section = (props: SectionProps) => {
  const { sectionData, permalink } = props

  // Utility function to split array into groups
  const groupArray = (array: Articles[], groupSize: number) => {
    const groups = []
    for (let i = 0; i < array.length; i += groupSize) {
      groups.push(array.slice(i, i + groupSize))
    }
    return groups
  }

  // Split articles into groups of 4
  const articleGroups = groupArray(sectionData.articles, 4).map((group, index) => {
    console.log(group[0])
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

  return (
    <Paper pageClass="paper-search">
      <header role="banner">
        <div className="grid grid-cols-4 tablet:grid-cols-12 gap-4 desktop:gap-3 gap-y-4">
          <div className="col-span-12">
            <Header type={HeaderType.Default} />
          </div>
        </div>
      </header>

      <main className="">
        <SectionHead title={sectionData.name} permalink={permalink} />
        {articleGroups}
      </main>
    </Paper>
  )
}

export default Section
