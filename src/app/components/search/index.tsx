"use client"
import { Articles, Issues } from "../../../../lib/types"
import GoogleCSE from "../googleCSE"
import Header, { HeaderType } from "../header"
import Paper from "../paper"

export interface PromoProps {
  currentArticles: Articles[]
  year: number
  month: number
}

export interface SearchPageProps {
  issues: Issues[]
  permalink: string
}

const SearchPage = (props: SearchPageProps) => {
  return (
    <Paper pageClass="paper-search">
      <div className="px-3 desktop:w-desktop mx-auto">
        <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3">
          <div className="col-span-4 tablet-lg:col-span-12">
            <Header type={HeaderType.Issue} />
          </div>
        </div>

        <section id="main" className="py-9 h-screen">
          <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3">
            <div className="col-span-4 tablet-lg:col-span-12">
              <Header type={HeaderType.Default} />
              <GoogleCSE />
            </div>
          </div>
        </section>
      </div>
    </Paper>
  )
}

export default SearchPage
