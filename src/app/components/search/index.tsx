"use client"
import Header from "../issuePage/header"
import { Articles, Issues } from "../../../../lib/types"
import Image from "next/image"
import { stripHtml } from "string-strip-html"
import Link from "next/link"
import { getPermalink, PageType } from "../../../../lib/utils"
import Footer from "../footer"
import GoogleCSE from "../googleCSE"

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
  const { issues } = props

  return (
    <>
      <div className={`paper`}>
        <div className="wrapper home">
          <header role="banner">
            <div className="grid-container grid-container-desktop">
              <div className="grid-row">
                <div className="grid-col-12">
                  <Header />
                </div>
              </div>
            </div>
          </header>

          <section id="main" className="issues-archive">
            <div className="grid-container grid-container-desktop">
              <div className="grid-row grid-gap-3">
                <div className="grid-col-12">
                  <h1>Search</h1>
                  <GoogleCSE />
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default SearchPage
