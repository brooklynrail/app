"use client"
import { ArticleProps } from "@/app/[year]/[month]/[section]/[slug]/page"
import parse from "html-react-parser"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Articles } from "../../../../../lib/types"
import { getPermalink, PageType } from "../../../../../lib/utils"
import { getCurrentIssueSection } from "../../../../../lib/utils/articles"
import Bylines, { BylineType } from "../../collections/promos/bylines"
import Title from "../../collections/promos/title"
import NextPrev, { NextPrevType } from "../../nextPrev"
import ArticleBody from "../articleBody"
import ArticleHead from "../articleHead"

const ArticleCriticsPage = (props: ArticleProps) => {
  const { articleData, currentSection, thisIssueData, permalink } = props
  const { issue } = articleData
  const [thisSection, setThisSection] = useState<Articles[] | undefined>(undefined)

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
    <div className="">
      <div className="grid grid-cols-4 tablet-lg:grid-cols-12 tablet-lg:divide-x tablet-lg:rail-divide">
        <div className="hidden tablet-lg:block col-span-4 tablet-lg:col-span-3 tablet-lg:pr-3">
          <div className="py-3 divide-y rail-divide sticky top-10 overflow-x-auto h-screen">
            <div className="pb-60">
              <GuestCriticPrompt thisSection={thisSection} currentSlug={articleData.slug} />
              <CriticsPageList thisSection={thisSection} currentSlug={articleData.slug} />
            </div>
          </div>
        </div>
        <div className="col-span-4 tablet-lg:col-span-9 tablet-lg:pl-3">
          <div className="divide-y rail-divide pb-6">
            <NextPrev
              parentCollection={thisIssueData}
              articles={thisIssueData.articles}
              currentSlug={articleData.slug}
              type={NextPrevType.Issues}
            />

            <div className="grid grid-cols-4 tablet-lg:grid-cols-9">
              <div className="col-span-4 tablet-lg:col-span-9">
                <ArticleHead {...{ permalink, thisIssueData, currentSection, articleData }} />
              </div>
              <div className="col-span-4 tablet-lg:col-span-9 space-y-12">
                <ArticleBody articleData={articleData} showAd={true} />
              </div>
            </div>

            <NextPrev
              parentCollection={thisIssueData}
              articles={thisIssueData.articles}
              currentSlug={articleData.slug}
              type={NextPrevType.Issues}
            />
          </div>
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
  return <div className="p-3 pr-0 text-sm">{parse(featuredArticle.excerpt)}</div>
}

const CriticsPageList = (props: GuestCriticProps) => {
  const { thisSection, currentSlug } = props
  if (!thisSection) {
    return <div>Loading...</div>
  }

  return (
    <ul className="divide-y rail-divide">
      {thisSection.map((article, index) => {
        const permalink = getPermalink({
          year: article.issue.year,
          month: article.issue.month,
          section: article.section.slug,
          slug: article.slug,
          type: PageType.Article,
        })
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
  )
}

export default ArticleCriticsPage
