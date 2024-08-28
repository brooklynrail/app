"use client"
import IssueRail from "../issueRail"
import Footer from "../footer"
import CoversPopup from "../issueRail/coversPopup"
import { Issues } from "../../../../lib/types"
import { getIssueData, getSpecialIssueData } from "../../../../lib/utils"
import Link from "next/link"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { PageProps } from "@/app/[...slug]/page"
import PageHead from "./pageHead"
import PageBody from "./pageBody"

const Page = (props: PageProps) => {
  const { issueBasics } = props

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
        const [fetchedIssueData] = await Promise.all([sections, issueDataPromise])

        // Update the state with the fetched data as it becomes available
        setIssueData(fetchedIssueData)
      }
    }

    // Call the fetchData function and handle any errors
    fetchData().catch((error) => console.error("Failed to fetch data on Article page:", error))
  }, [issueBasics, issueData, setIssueData])

  return (
    <>
      <div className={`paper`}>
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

                <article className="article article-page">
                  <PageHead {...props} />
                  <div id="page-nav">
                    <ul>
                      <li>
                        <Link href="/notefrompub">A Note from the Publisher</Link>
                      </li>
                      <li>
                        <Link href="/about">
                          About the <em>Rail</em>
                        </Link>
                      </li>
                      <li>
                        <Link href="/history">History</Link>
                      </li>
                      <li>
                        <Link href="/staff">Staff</Link>
                      </li>
                      <li>
                        <Link href="/our-supporters">Supporters</Link>
                      </li>
                      <li>
                        <Link href="/contributors">Contributors</Link>
                      </li>
                      <li>
                        <Link href="/submissions">Submission guidelines</Link>
                      </li>
                    </ul>

                    <ul>
                      <li>
                        <Link href="/donate">
                          Donate to the <em>Rail</em>
                        </Link>
                      </li>
                      <li>
                        <Link href="/subscribe">Subscribe</Link>
                      </li>
                      <li>
                        <Link href="/submissions">Find the Rail in print</Link>
                      </li>
                      <li>
                        <Link href="/advertise">Advertise</Link>
                      </li>
                      <li>
                        <Link href="/newsletter">Sign up for our newsletter</Link>
                      </li>
                      <li>
                        <Link href="/contact">Contact Us</Link>
                      </li>
                    </ul>
                  </div>
                  <section className="content">
                    <PageBody {...props} />
                    <p>
                      <iframe
                        src="https://www.google.com/maps/d/u/0/embed?mid=1d9gC__bvp0PFNyo2ygOKqsxTKeWeY5dU"
                        width="640"
                        height="480"
                        sandbox=""
                        allow="allow-scripts"
                      ></iframe>
                    </p>
                  </section>
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

export default Page
