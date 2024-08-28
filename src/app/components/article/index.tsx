"use client"
import IssueRail from "../issueRail"
import Footer from "../footer"
import CoversPopup from "../issueRail/coversPopup"
import { Articles, Issues, Sections } from "../../../../lib/types"
import { ArticleProps } from "@/app/[year]/[month]/[section]/[slug]/page"
import ContributorsBox from "./contributors"
import { getIssueData, getSpecialIssueData } from "../../../../lib/utils"
import Link from "next/link"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import ArticleHead from "./articleHead"
import ArticleBody from "./articleBody"
import parse from "html-react-parser"
import Script from "next/script"

const Article = (props: ArticleProps) => {
  const { articleData, issueBasics } = props
  const { contributors, endnote } = articleData

  const issueClass = `issue-${issueBasics.slug.toLowerCase()}`

  const [issueSections, setIssueSections] = useState<Sections[] | undefined>(undefined)
  const [issueData, setIssueData] = useState<Issues | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/sections?issueId=${issueBasics.id}`, {
        next: { revalidate: 10 },
      })
      const sections = await res.json()
      // TODO: Refactor this to use a single function to fetch issue data from APIs
      let issueDataPromise
      if (!issueData) {
        if (issueBasics.special_issue) {
          issueDataPromise = !issueData ? getSpecialIssueData({ slug: issueBasics.slug }) : Promise.resolve(issueData)
        } else {
          issueDataPromise = !issueData
            ? getIssueData({ year: issueBasics.year, month: issueBasics.month })
            : Promise.resolve(issueData)
        }
        // Fetch all the data in parallel
        const [fetchedSections, fetchedIssueData] = await Promise.all([sections, issueDataPromise])
        // Update the state with the fetched data as it becomes available
        setIssueSections(fetchedSections)
        setIssueData(fetchedIssueData)
      }
    }
    // Call the fetchData function and handle any errors
    fetchData().catch((error) => console.error("Failed to fetch data on Article page:", error))
  }, [issueBasics, issueSections, setIssueSections, issueData, setIssueData])

  return (
    <>
      <div className={`paper ${issueClass}`}>
        <div className="hatbox"></div>

        <main>
          <div className="grid-container">
            <div className="grid-row grid-gap-3">
              <div className="grid-col-12 tablet-lg:grid-col-4 desktop-lg:grid-col-3">
                <IssueRail currentIssueBasics={issueBasics} />
              </div>

              <div className="grid-col-12 tablet-lg:grid-col-8 desktop-lg:grid-col-9">
                <header id="article_header">
                  <Link className="mobile_nav_btn" href="">
                    <i className="fas fa-angle-double-left"></i> <span>{props.issueBasics.title}</span> Issue
                  </Link>

                  <nav>
                    <div>
                      <Link
                        className="btn btn-sm donate"
                        href="https://brooklynrail.org/donate?a"
                        title="Donate to the Brooklyn Rail"
                      >
                        <span>Donate</span>
                      </Link>
                    </div>
                  </nav>
                </header>

                <div className="ad ad_970">
                  <p>Advertisement</p>
                  <div></div>
                </div>

                <article className="article">
                  {/* <NextPrev {...props} currentSection={currentSection} issueData={issueData} /> */}
                  <ArticleHead {...props} />
                  <ArticleBody {...props} />
                  {endnote && (
                    <div className="content">
                      <div className="endnote">
                        <span className="line"></span>
                        {parse(endnote)}
                      </div>
                    </div>
                  )}
                  <BookshopWidget {...articleData} />
                  <div className="content">
                    <ContributorsBox contributors={contributors} />
                  </div>
                </article>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
      <CoversPopup />
    </>
  )
}

export const BookshopWidget = (props: Articles) => {
  const { isbn } = props

  if (!isbn) {
    return <></>
  }
  console.log("isbn ==============", isbn)
  return (
    <div>
      <Script
        src={`https://bookshop.org/widgets.js`}
        data-type={`book_button`}
        data-affiliate-id={`24114`}
        data-sku={isbn}
        strategy="lazyOnload"
        onError={(e: Error) => {
          console.error("Script failed to load", e)
        }}
      />
    </div>
  )
}

export default Article
