"use client"
import IssueRail from "../issueRail"
import Footer from "../footer"
import CoversPopup from "../issueRail/coversPopup"
import Link from "next/link"
import { PageProps } from "@/app/[...slug]/page"
import PageHead from "./pageHead"
import PageBody from "./pageBody"

const Page = (props: PageProps) => {
  const { thisIssueData } = props

  return (
    <>
      <div className={`paper`}>
        <main>
          <div className="grid-container">
            <div className="grid-row grid-gap-3">
              <div className="grid-col-12 tablet-lg:grid-col-4 desktop-lg:grid-col-3">
                <IssueRail thisIssueData={thisIssueData} />
              </div>

              <div className="grid-col-12 tablet-lg:grid-col-8 desktop-lg:grid-col-9">
                <header id="article_header">
                  <Link className="mobile_nav_btn" href="">
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
