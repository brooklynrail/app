"use client"
import { ExhibitionsProps } from "@/lib/railTypes"
import Paper from "../paper"
import ExhibitionCard from "./exhibitionCard"

const ExhibitionsPage = (props: ExhibitionsProps) => {
  const { allExhibitions, navData, permalink } = props

  return (
    <Paper pageClass={`theme-exhibitions`} navData={navData}>
      <main className="px-3 tablet-lg:px-6 pb-12 desktop:max-w-screen-widescreen mx-auto divide-y rail-divide">
        <div className="space-y-9 divide-y rail-divide">
          <div className="pt-9 flex flex-col tablet-lg:flex-row tablet-lg:justify-between tablet-lg:items-end space-y-3 tablet-lg:space-y-0">
            <h1 className="font-bold text-4xl tablet-lg:text-5xl">Exhibitions</h1>
          </div>
          <div className="divide-y rail-divide">
            {allExhibitions.map((exhibition) => {
              if (!exhibition.featured_image) {
                return null
              }
              return <ExhibitionCard key={exhibition.id} exhibition={exhibition} />
            })}
          </div>
        </div>
      </main>
    </Paper>
  )
}

export default ExhibitionsPage
