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
import NextPrev from "./nextPrev"

const Article = (props: ArticleProps) => {
  const { articleData, issueBasics } = props
  const { contributors, endnote, section } = articleData

  const issueClass = `issue-${issueBasics.slug.toLowerCase()}`

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
                  <div className="content">
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

export const BookshopWidget = (props: Articles) => {
  const { isbn } = props

  if (!isbn) {
    return <></>
  }
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
