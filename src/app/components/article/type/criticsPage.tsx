"use client"
import { ArticleProps } from "@/app/[year]/[month]/[section]/[slug]/page"
import parse from "html-react-parser"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Articles } from "../../../../../lib/types"
import { getPermalink, PageType } from "../../../../../lib/utils"
import { getCurrentIssueSection } from "../../../../../lib/utils/articles"
import Bylines, { BylineType } from "../../collections/promos/bylines"
import Title, { TitleType } from "../../collections/promos/title"
import { PaperType } from "../../paper"
import ArticleBody from "../articleBody"

const ArticleCriticsPage = (props: ArticleProps) => {
  const { articleData, permalink, currentSection, navData } = props
  const { body_text, images, endnote, contributors, issue } = articleData
  const [thisSection, setThisSection] = useState<Articles[] | undefined>(undefined)
  const type = currentSection.slug === "criticspage" ? PaperType.CriticsPage : PaperType.Default

  useEffect(() => {
    const fetchData = async () => {
      if (!thisSection) {
        const sectionData = await getCurrentIssueSection({ issueSlug: issue.slug, sectionSlug: "criticspage" })
        // Fetch all the data in parallel
        const [fetchedSection] = await Promise.all([sectionData])
        // Update the state with the fetched data as it becomes available
        fetchedSection && setThisSection(fetchedSection)
      }
    }
    // Call the fetchData function and handle any errors
    fetchData().catch((error) => console.error("Failed to fetch section data:", error))
  }, [thisSection])

  return (
    <div className="py-3">
      <div className="grid grid-cols-4 tablet-lg:grid-cols-12 divide-x rail-divide">
        <div className="col-span-4 tablet-lg:col-span-3 pr-3">
          <div className="py-3 divide-y rail-divide sticky top-10 h-screen">
            <GuestCriticPrompt thisSection={thisSection} currentSlug={articleData.slug} />
            <CriticsPageList thisSection={thisSection} currentSlug={articleData.slug} />
          </div>
        </div>
        <div className="col-span-4 tablet-lg:col-span-9 pl-3">
          <ArticleBody {...props} />
        </div>
      </div>
    </div>
  )
}

interface GuestCriticProps {
  thisSection?: Articles[]
  currentSlug?: string
}

const GuestCriticPrompt = (props: GuestCriticProps) => {
  const { thisSection } = props
  if (!thisSection) {
    return <div>Loading...</div>
  }

  // get the first article where featured is true, if none, get the first article in the array
  const featuredArticle = thisSection.find((article) => article.featured === true) || thisSection[0]
  return <div className="p-3 pr-0 text-sm sticky top-0">{parse(featuredArticle.excerpt)}</div>
}

const CriticsPageList = (props: GuestCriticProps) => {
  const { thisSection, currentSlug } = props
  if (!thisSection) {
    return <div>Loading...</div>
  }

  return (
    <div className="overflow-y-auto h-full pb-60">
      <div className="">
        <ul className="divide-y rail-divide">
          {thisSection.map((article, index) => {
            const permalink = getPermalink({
              year: article.issue.year,
              month: article.issue.month,
              section: article.section.slug,
              slug: article.slug,
              type: PageType.Article,
            })
            console.log("article", article)
            console.log("permalink", permalink)

            const isCurrent = currentSlug === article.slug ? "bg-white dark:bg-zinc-700" : ""
            return (
              <li key={`item-${index}`} className={`${isCurrent} pl-3 py-1 desktop:py-2 space-y-3`}>
                <Link href={permalink} className="flex flex-col space-y-1">
                  <Bylines asTitle={true} hideBy={true} article={article} type={BylineType.CriticsPageList} />
                  <Title title={article.title} classes="pl-3 font-medium font-sans text-sm" />
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default ArticleCriticsPage
