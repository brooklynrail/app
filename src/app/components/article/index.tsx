"use client"
import IssueRail from "../issueRail"
import Footer from "../footer"
import CoversPopup from "../issueRail/coversPopup"
import { Issues, Sections } from "../../../../lib/types"
import { ArticleProps } from "@/app/[year]/[month]/[section]/[slug]/page"
import ContributorsBox from "./contributors"
import { getIssueData, getSpecialIssueData } from "../../../../lib/utils"
import Link from "next/link"
import NextPrev from "./nextPrev"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import ArticleHead from "./articleHead"
import ArticleBody from "./articleBody"

const Article = (props: ArticleProps) => {
  const { articleData, issueBasics, currentSection } = props
  const { contributors } = articleData

  const issueClass = `issue-${issueBasics.slug.toLowerCase()}`

  const [issueSections, setIssueSections] = useState<Sections[] | undefined>(undefined)
  const [issueData, setIssueData] = useState<Issues | undefined>(undefined)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/sections?issueId=${issueBasics.id}`, {
        next: { revalidate: 10 },
      })
      const sections = await res.json()

      // TODO: Refactor this to use a single function to fetch issue data from APIs
      let issueDataPromise
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

    // Call the fetchData function and handle any errors
    fetchData().catch((error) => console.error("Failed to fetch data:", error))
  }, [issueBasics, issueSections, setIssueSections, issueData, setIssueData])

  return (
    <>
      <div className={`paper ${issueClass}`}>
        <div className="hatbox"></div>

        <main>
          <div className="grid-container">
            <div className="grid-row grid-gap-3">
              <div className="grid-col-12 tablet-lg:grid-col-4 desktop-lg:grid-col-3">
                <IssueRail currentIssueData={issueData} />
              </div>

              <div className="grid-col-12 tablet-lg:grid-col-8 desktop-lg:grid-col-9">
                <header id="article_header">
                  <Link className="mobile_nav_btn" href="">
                    <i className="fas fa-angle-double-left"></i> <span>{props.issueBasics.title}</span> Issue
                  </Link>

                  <nav>
                    <div>
                      <Link className="btn search" href="/search" title="Search the Rail">
                        <i className="fas fa-search"></i>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                      </Link>
                    </div>
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
                  <NextPrev {...props} currentSection={currentSection} issueData={issueData} />
                  <ArticleHead {...props} />
                  <ArticleBody {...props} />

                  <ContributorsBox contributors={contributors} />
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

export default Article
