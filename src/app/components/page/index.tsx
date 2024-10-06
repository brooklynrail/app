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
import ThemeToggle from "../themeToggle"
import { useTheme } from "../theme"
import { PopupProvider } from "../issueRail/popupProvider"
import Paper from "../paper"

const Page = (props: PageProps) => {
  const { thisIssueData, pagesData } = props
  const { theme, setTheme } = useTheme()

  return (
    <PopupProvider>
      <Paper pageClass="paper-page">
        <main className="px-3 desktop:max-w-screen-widescreen mx-auto">
          <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3 gap-x-6 desktop-lg:gap-x-12">
            <aside className="hidden tablet-lg:block col-span-4 tablet-lg:col-span-4 desktop-lg:col-span-3">
              <IssueRail thisIssueData={thisIssueData} />
            </aside>

            <div className="col-span-4 tablet-lg:col-span-8 desktop-lg:col-span-9">
              <Header type={HeaderType.Default} />

              <article className="pb-12">
                <PageHead {...props} />
                <PageNav pages={pagesData} />
                <PageBody {...props} />
                <MapEmbed {...props} />
              </article>
            </div>
          </div>
        </main>
        <Footer />
      </Paper>
      <ThemeToggle {...{ theme, setTheme }} />
      <CoversPopup />
    </PopupProvider>
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
    <div className="w-card-lg bg-neutral-200 dark:bg-zinc-400 text-zinc-900 p-3 float-right mb-9 ml-6 mt-3">
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
