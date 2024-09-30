"use client"
import { TributePageProps } from "@/app/tribute/[tributeSlug]/page"
import Title, { TitleType } from "../collections/promos/title"
import parse from "html-react-parser"
import ArticleBody from "../article/articleBody"
import NextPrev, { NextPrevType } from "../nextPrev"
import Bylines, { BylineType } from "../collections/promos/bylines"
import TributeWriters from "./writers"
import { useArticleContext } from "@/app/context/ArticleProvider"
import { useEffect, useRef } from "react"
import { title } from "process"

const TributeBody = (props: TributePageProps) => {
  const { thisTributeData } = props
  const { summary } = thisTributeData

  const { currentArticle, setArticleRef } = useArticleContext()
  const articleRef = useRef<HTMLDivElement>(null)

  // Pass the ref to the global context on mount
  useEffect(() => {
    setArticleRef(articleRef.current)
  }, [setArticleRef])

  const publishedOn =
    thisTributeData?.published &&
    new Date(thisTributeData.published).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

  // list all of the editors, separated by commas and an "and" before the last editor
  const editedBy = thisTributeData.editors.reduce((acc, editor, index) => {
    const editorName = `${editor.contributors_id?.first_name ?? ""} ${editor.contributors_id?.last_name ?? ""}`
    if (index === thisTributeData.editors.length - 1) {
      return `${acc} and ${editorName}`
    } else if (index === thisTributeData.editors.length - 2) {
      return `${acc}${editorName}, `
    } else {
      return `${acc}${editorName}, `
    }
  }, "")

  // get all of the Issue Titles that are used in the thisTributeData.articles.issue.title
  const getIssueTitles = Array.from(new Set(thisTributeData.articles.map((article) => article.issue.title)))

  // List the issue titles. use the Oxford comma rules and wrap each title in a span tag
  const issueCount = getIssueTitles.length
  const issueTitles = getIssueTitles.reduce((acc, title, index) => {
    const issueTitle = `<span className="uppercase">${title}</span>`
    if (index === getIssueTitles.length - 1) {
      return `${acc} and ${issueTitle}`
    } else if (index === getIssueTitles.length - 2) {
      return `${acc}${issueTitle}, `
    } else {
      return `${acc}${issueTitle}, `
    }
  }, "")

  console.log("issueTitles", issueTitles)
  return (
    <div className="py-3 px-6 tablet:px-9" ref={articleRef}>
      <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3">
        <div className="col-span-4 tablet-lg:col-span-3 tablet-lg:border-r-[1px] rail-border">
          <div className="sticky top-0 tablet-lg:overflow-y-auto tablet-lg:h-screen">
            <div className="divide-y-[1px] rail-divide tablet-lg:mr-3 pb-12">
              <aside className="text-sm tablet-lg:pl-3 pb-3 tablet-lg:py-3">{summary && parse(summary)}</aside>

              <TributeWriters
                currentSlug={currentArticle.slug}
                articles={thisTributeData.articles}
                tributeSlug={thisTributeData.slug}
              />
              <div className="text-xs py-6 px-3 space-y-1">
                <p>
                  “{thisTributeData.title} {thisTributeData.deck}”
                </p>
                <p>
                  Published on {publishedOn} and printed in the {parse(issueTitles)}{" "}
                  {issueCount > 1 ? "issues" : "issue"} of The Brooklyn Rail.
                </p>
                <p>Edited by {editedBy}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Article Section */}
        <div className="col-span-4 tablet-lg:col-span-9">
          <div className="py-3 pb-9">
            {!currentArticle.hide_title && <Title title={currentArticle.title} type={TitleType.TributeArticle} />}
            <Bylines
              article={currentArticle}
              type={BylineType.TributeArticle}
              asTitle={true}
              hideBy={true}
              linked={true}
            />
          </div>
          <ArticleBody articleData={currentArticle} />

          <NextPrev
            articles={thisTributeData.articles}
            currentSlug={currentArticle.slug}
            parentCollection={thisTributeData}
            type={NextPrevType.Tributes}
          />
        </div>
      </div>
    </div>
  )
}

export default TributeBody
