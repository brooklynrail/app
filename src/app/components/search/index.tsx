"use client"
import { Articles, Homepage, Issues } from "../../../../lib/types"
import Paper from "../paper"
import SearchField from "./searchBox"

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
    <Paper pageClass="" navData={navData}>
      <div className="">
        <section id="main" className="tablet-lg:py-9">
          <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3">
            <div className="col-span-4 tablet-lg:col-span-10 tablet-lg:col-start-2 desktop-lg:col-span-6 desktop-lg:col-start-4">
              <SearchField />
            </div>
          </div>
        </section>
      </div>
    </Paper>
  )
}

export default SearchPage
