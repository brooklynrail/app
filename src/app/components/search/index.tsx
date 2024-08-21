"use client"
import algoliasearch from "algoliasearch/lite"
import { SearchBox, Hits, Highlight, RefinementList } from "react-instantsearch"
import { InstantSearchNext } from "react-instantsearch-nextjs"
import Header from "../issuePage/header"

const SearchComponent = () => {
  const searchClient = algoliasearch("0CHGEIFI8H", "11faa68caa470343e6c136306c8214df")

  function Hit({ hit }: any) {
    return (
      <article>
        <h1>
          <Highlight attribute="title" hit={hit} />
        </h1>
        <p>{hit.slug}</p>
      </article>
    )
  }

  return (
    <InstantSearchNext indexName="issues" searchClient={searchClient} insights routing>
      <SearchBox />
      <RefinementList attribute="issue" />
      <Hits hitComponent={Hit} />
    </InstantSearchNext>
  )
}

const SearchPage = () => {
  return (
    <>
      <div className={`paper`}>
        <div className="hatbox"></div>
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
                  <h1>The Brooklyn Rail Search</h1>
                  <SearchComponent />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default SearchPage
