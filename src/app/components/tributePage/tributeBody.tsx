"use client"
import { TributePageProps } from "@/app/tribute/[tributeSlug]/page"
import parse from "html-react-parser"
import TributeBody, { BodyTypes } from "../article/tributeBody"
import TributeWriters from "./writers"
import { useEffect, useRef } from "react"
import { getPermalink, PageType } from "../../../../lib/utils"
import { useArticleState } from "@/app/hooks/useArticleState"
import NextPrev, { NextPrevType } from "../nextPrev"

const TributeBodyBlock = (props: TributePageProps) => {
  const { thisTributeData, articleData, currentArticleSlug } = props
  const { summary } = thisTributeData
  const { currentArticle, switchArticle } = useArticleState(articleData, thisTributeData.articles)

  // Create a ref to keep track of the article content area
  const articleContentRef = useRef<HTMLDivElement | null>(null)

  // Effect to scroll to the top of the article content whenever the currentArticle changes
  useEffect(() => {
    if (currentArticleSlug != undefined) {
      if (articleContentRef.current) {
        articleContentRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
  }, [currentArticle])

  const permalink = getPermalink({
    tributeSlug: thisTributeData.slug,
    slug: currentArticle.slug,
    type: PageType.TributeArticle,
  })

  return (
    <div className="py-3 px-6 tablet:px-9" ref={articleContentRef}>
      <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3">
        <div className="col-span-4 tablet-lg:col-span-3 tablet-lg:border-r-[1px] rail-border">
          <div className="sticky top-0 tablet-lg:overflow-y-auto tablet-lg:h-screen">
            <div className="divide-y-[1px] rail-divide tablet-lg:mr-3 pb-0 tablet-lg:pb-12 flex flex-col">
              <aside className="text-sm tablet-lg:pl-3 pb-3 tablet-lg:py-3">{summary && parse(summary)}</aside>

              <TributeWriters
                currentSlug={currentArticle.slug}
                articles={thisTributeData.articles}
                tributeSlug={thisTributeData.slug}
                switchArticle={switchArticle}
              />
              <div className="hidden tablet-lg:block">
                <PublishInfo thisTributeData={thisTributeData} />
              </div>
            </div>
          </div>
        </div>

        {/* Main Article Section */}
        <div className="col-span-4 tablet-lg:col-span-9">
          <NextPrev
            parentCollection={thisTributeData}
            articles={thisTributeData.articles}
            currentSlug={articleData.slug}
            type={NextPrevType.Tributes}
            switchArticle={switchArticle}
          />
          <TributeBody
            articles={thisTributeData.articles}
            articleData={currentArticle}
            thisIssueData={currentArticle.issue}
            permalink={permalink}
            currentSection={currentArticle.section}
            type={BodyTypes.Tribute}
            switchArticle={switchArticle}
          />
          <div className="py-3 border-t rail-border">
            <NextPrev
              parentCollection={thisTributeData}
              articles={thisTributeData.articles}
              currentSlug={articleData.slug}
              type={NextPrevType.Tributes}
              switchArticle={switchArticle}
            />
          </div>
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

export default TributeBodyBlock
