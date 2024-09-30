"use client"
import { TributePageProps } from "@/app/tribute/[tributeSlug]/page"
import Title, { TitleType } from "../collections/promos/title"
import parse from "html-react-parser"
import ArticleBody, { BodyTypes } from "../article/articleBody"
import NextPrev, { NextPrevType } from "../nextPrev"
import Bylines, { BylineType } from "../collections/promos/bylines"
import TributeWriters from "./writers"
import { useArticleContext } from "@/app/context/ArticleProvider"
import { useEffect, useRef } from "react"
import { getPermalink, PageType } from "../../../../lib/utils"

const TributeBody = (props: TributePageProps) => {
  const { thisTributeData } = props
  const { summary } = thisTributeData

  const { currentArticle, setArticleRef } = useArticleContext()
  const articleRef = useRef<HTMLDivElement>(null)

  const permalink = getPermalink({
    tributeSlug: thisTributeData.slug,
    slug: currentArticle.slug,
    type: PageType.TributeArticle,
  })

  // Pass the ref to the global context on mount
  useEffect(() => {
    setArticleRef(articleRef.current)
  }, [setArticleRef])

  return (
    <div className="py-3 px-6 tablet:px-9" ref={articleRef}>
      <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3">
        <div className="col-span-4 tablet-lg:col-span-3 tablet-lg:border-r-[1px] rail-border">
          <div className="sticky top-0 tablet-lg:overflow-y-auto tablet-lg:h-screen">
            <div className="divide-y-[1px] rail-divide tablet-lg:mr-3 pb-3 tablet-lg:pb-12 flex flex-col">
              <aside className="text-sm tablet-lg:pl-3 pb-3 tablet-lg:py-3">{summary && parse(summary)}</aside>

              <TributeWriters
                currentSlug={currentArticle.slug}
                articles={thisTributeData.articles}
                tributeSlug={thisTributeData.slug}
              />
              <div className="hidden tablet-lg:block">
                <PublishInfo thisTributeData={thisTributeData} />
              </div>
            </div>
          </div>
        </div>

        {/* Main Article Section */}
        <div className="col-span-4 tablet-lg:col-span-9">
          <ArticleBody
            articles={thisTributeData.articles}
            articleData={currentArticle}
            thisIssueData={currentArticle.issue}
            permalink={permalink}
            currentSection={currentArticle.section}
            type={BodyTypes.Tribute}
          />
          <div className="block tablet-lg:hidden">
            <PublishInfo thisTributeData={thisTributeData} />
          </div>
        </div>
      </div>
    </div>
  )
}
interface PublishInfoProps {
  thisTributeData: TributePageProps["thisTributeData"]
}
const PublishInfo = (props: PublishInfoProps) => {
  const { thisTributeData } = props
  const publishedOn =
    thisTributeData?.published &&
    new Date(thisTributeData.published).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

  // list all of the editors, separated by commas and an "and" before the last editor if there are more than one
  const editedBy = thisTributeData.editors.reduce((acc, editor, index) => {
    const editorName = `${editor.contributors_id?.first_name ?? ""} ${editor.contributors_id?.last_name ?? ""}`
    if (thisTributeData.editors.length === 1) {
      return editorName
    } else if (index === thisTributeData.editors.length - 1) {
      return `${acc}, and ${editorName}`
    } else if (index === thisTributeData.editors.length - 2) {
      return `${acc}${editorName}`
    } else {
      return `${acc}${editorName}, `
    }
  }, "")

  // get all of the Issue Titles that are used in the thisTributeData.articles.issue.title
  const getIssueTitles = Array.from(new Set(thisTributeData.articles.map((article) => article.issue.title)))

  // Look through the thisTributeData.articles and check if any of the articles are marked as in print
  const isInPrint = thisTributeData.articles.some((article) => article.in_print)
  // List the issue titles. use the Oxford comma rules and wrap each title in a span tag
  const issueCount = getIssueTitles.length
  const issueTitles = getIssueTitles.reduce((acc, title, index) => {
    const issueTitle = `<span className="uppercase">${title}</span>`
    if (issueCount === 1) {
      return issueTitle
    } else if (index === getIssueTitles.length - 1) {
      return `${acc} and ${issueTitle}`
    } else if (index === getIssueTitles.length - 2 && issueCount === 2) {
      return `${acc} ${issueTitle}`
    } else if (index === getIssueTitles.length - 2) {
      return `${acc}${issueTitle}, `
    } else {
      return `${acc}${issueTitle}, `
    }
  }, "")

  return (
    <div className="text-xs py-6 tablet:px-3 space-y-2">
      <p>
        “{thisTributeData.title} {thisTributeData.deck}”
      </p>
      <p>
        Published on {publishedOn}{" "}
        {isInPrint &&
          `and printed in the ${parse(issueTitles)} ${issueCount > 1 ? "issues" : "issue"} of The
        Brooklyn Rail`}
        .
      </p>
      {editedBy && <p>Edited by {editedBy}.</p>}
    </div>
  )
}

export default TributeBody
