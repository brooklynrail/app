"use client"
import { ExhibitionsProps } from "@/app/exhibitions/page"
import Paper from "../paper"
import ExhibitionCard from "./exhibitionCard"

const ExhibitionsPage = (props: ExhibitionsProps) => {
  const { allExhibitions, navData, permalink } = props

  return (
    <Paper pageClass={``} navData={navData}>
      <main className="space-y-16 h-event">
        <header className="pt-20 desktop:max-w-screen-desktop-lg mx-auto px-3">
          <h1 className="font-bold text-4xl tablet-lg:text-5xl">Exhibitions</h1>
        </header>
        {allExhibitions.map((exhibition) => (
          <ExhibitionCard key={exhibition.id} exhibition={exhibition} />
        ))}
      </main>
    </Paper>
  )
}

export default ExhibitionsPage
