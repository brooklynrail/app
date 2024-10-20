"use client"
import { Articles, Homepage, Issues } from "../../../../lib/types"
import GoogleCSE from "../googleCSE"
import Paper, { PaperType } from "../paper"

export interface PromoProps {
  currentArticles: Articles[]
  year: number
  month: number
}

export interface SearchPageProps {
  navData: Homepage
  issues: Issues[]
  permalink: string
}

const SearchPage = (props: SearchPageProps) => {
  const { navData } = props
  return (
    <Paper pageClass="paper-search" type={PaperType.Default} navData={navData}>
      <div className="px-3 desktop:w-desktop mx-auto">
        <section id="main" className="py-9 h-screen">
          <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3">
            <div className="col-span-4 tablet-lg:col-span-12">
              <GoogleCSE />
            </div>
          </div>
        </section>
      </div>
    </Paper>
  )
}

export default SearchPage
