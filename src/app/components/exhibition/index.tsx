"use client"
import Paper from "../paper"
import { ExhibitionProps } from "@/app/exhibition/[slug]/page"
import Head from "./head"
import ExhibitionSections from "./pageSections"

const ExhibitionPage = (props: ExhibitionProps) => {
  const { exhibitionData, navData } = props
  const { end_date } = exhibitionData

  // It is in the future if the end date is greater than the current date
  const isFutureEvent = new Date(end_date) > new Date()

  return (
    <Paper pageClass="theme-exhibitions" navData={navData}>
      <main className="px-3 desktop:max-w-screen-widescreen mx-auto h-event">
        <Head {...props} />
        <ExhibitionSections {...props} />
      </main>
    </Paper>
  )
}

export default ExhibitionPage
