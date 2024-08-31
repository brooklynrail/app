"use client"
import IssueRail from "../issueRail"
import Footer from "../footer"
import CoversPopup from "../issueRail/coversPopup"
import { Ads } from "../../../../lib/types"
import { ArticleProps } from "@/app/[year]/[month]/[section]/[slug]/page"
import ContributorsBox from "./contributors"
import { getAds, getPermalink, PageType } from "../../../../lib/utils"
import Link from "next/link"
import { useEffect, useState } from "react"
import ArticleHead from "./articleHead"
import ArticleBody from "./articleBody"
import parse from "html-react-parser"
import NextPrev from "./nextPrev"
import Ad970 from "../ads/ad970"
import BookshopWidget from "./bookshop"

const Article = (props: ArticleProps) => {
  const { articleData, thisIssueData } = props
  const { contributors, endnote, section } = articleData
  const [currentAds, setCurrentAds] = useState<Ads[] | undefined>(undefined)

  useEffect(() => {
    const fetchData = async () => {
      if (!currentAds) {
        const ads = getAds()
        // Fetch all the data in parallel
        const [fetchedAds] = await Promise.all([ads])
        // Update the state with the fetched data as it becomes available
        setCurrentAds(fetchedAds)
      }
    }

    // Call the fetchData function and handle any errors
    fetchData().catch((error) => console.error("Failed to fetch Ad data on Article page:", error))
  }, [currentAds])

  const issueClass = `issue-${thisIssueData.slug.toLowerCase()}`

  const issuePermalink = getPermalink({
    year: thisIssueData.year,
    month: thisIssueData.month,
    type: PageType.Issue,
  })

  return (
    <>
      <div className={`paper ${issueClass}`}>
        <main>
          <div className="grid-container">
            <div className="grid-row grid-gap-3">
              <div className="grid-col-12 tablet-lg:grid-col-4 desktop-lg:grid-col-3">
                <IssueRail thisIssueData={thisIssueData} />
              </div>

              <div className="grid-col-12 tablet-lg:grid-col-8 desktop-lg:grid-col-9">
                <header id="article_header">
                  <Link className="mobile_nav_btn" href={issuePermalink}>
                    <i className="fas fa-angle-double-left"></i> <span>{props.thisIssueData.title}</span> Issue
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

                <Ad970 currentAds={currentAds} />

                <article className="article">
                  <NextPrev {...props} currentSection={section} />
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
                  <div className="content allcontributors">
                    <ContributorsBox contributors={contributors} />
                  </div>
                  <NextPrev {...props} currentSection={section} />
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
