"use client"
import parse from "html-react-parser"
import Link from "next/link"
import { Pages } from "@/lib/types"
import { getPermalink, PageType } from "@/lib/utils"

interface PageNavProps {
  pages: Pages[]
  currentSlug: string
}

const PageNav = (props: PageNavProps) => {
  const { pages, currentSlug } = props

  const allPages = pages.map((page, i: number) => {
    const pageURL = getPermalink({
      slug: page.slug,
      type: PageType.Page,
    })
    const childPageURL = getPermalink({
      slug: page.slug,
      type: PageType.ChildPage,
    })

    const current = page.slug === currentSlug ? "bg-white dark:bg-zinc-700" : ""

    return (
      <li key={page.slug} className="font-bold">
        <Link className={`py-2 px-3 block ${current}`} href={page.slug === "about" ? pageURL : childPageURL}>
          {parse(page.title)}
        </Link>
      </li>
    )
  })

  return <ul className="divide-y rail-divide">{allPages}</ul>
}

export default PageNav
