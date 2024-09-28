"use client"
import IssueRail from "../issueRail"
import Footer from "../footer"
import CoversPopup from "../issueRail/coversPopup"
import Link from "next/link"
import { PageProps } from "@/app/about/[slug]/page"
import PageHead from "./pageHead"
import PageBody from "./pageBody"
import MapEmbed from "./map"
import { Pages } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import parse from "html-react-parser"
import Header, { HeaderType } from "../header"

const Page = (props: PageProps) => {
  const { thisIssueData, pagesData } = props

  return (
    <>
      <div className={`paper`}>
        <main>
          <div className="grid-container">
            <div className="grid-row grid-gap-3">
              <div className="grid-col-12 hidden tablet-lg:block tablet-lg:grid-col-4 desktop-lg:grid-col-3">
                <IssueRail thisIssueData={thisIssueData} />
              </div>

              <div className="grid-col-12 tablet-lg:grid-col-8 desktop-lg:grid-col-9">
                <Header type={HeaderType.Article} />

                <article className="article article-page">
                  <PageHead {...props} />
                  <PageNav pages={pagesData} />
                  <PageBody {...props} />
                  <MapEmbed {...props} />
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

interface PageNavProps {
  pages: Pages[]
}

const PageNav = (props: PageNavProps) => {
  const { pages } = props
  const allPages = pages.map((page) => {
    const pageURL = getPermalink({
      slug: page.slug,
      type: PageType.Page,
    })
    const childPageURL = getPermalink({
      slug: page.slug,
      type: PageType.ChildPage,
    })

    return (
      <li key={page.slug}>
        <Link href={page.slug === "about" ? pageURL : childPageURL}>{parse(page.title)}</Link>
      </li>
    )
  })

  return (
    <div id="page-nav">
      <ul>{allPages}</ul>
      <ul>
        <li>
          <Link href="/contributors">Contributors</Link>
        </li>
        <li>
          <Link href="/donate">
            Donate to the <em>Rail</em>
          </Link>
        </li>
        <li>
          <Link href="/subscribe">Subscribe</Link>
        </li>
        <li>
          <Link href="/newsletter">Sign up for our newsletter</Link>
        </li>
      </ul>
    </div>
  )
}

export default Page
