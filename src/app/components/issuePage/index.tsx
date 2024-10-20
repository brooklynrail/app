"use client"
import { IssuePageProps } from "@/app/issues/[issueSlug]/page"
import { Articles, Issues } from "../../../../lib/types"
import { CoverImages } from "../collections/banner/coverImages"
import Header, { HeaderType } from "../header"
import Paper from "../paper"
import PreviewHeader from "../preview/previewHead"
import SectionHead from "../section/head"
import TableOfContents from "./tableOfContents"
import CoversPopup from "../issueRail/coversPopup"
import parse from "html-react-parser"

export interface PromoProps {
  currentArticles: Articles[]
  year: number
  month: number
  thisIssueData: Issues
}

const IssuePage = (props: IssuePageProps) => {
  const { thisIssueData, issueSections, previewURL, permalink } = props

  const { slug } = thisIssueData
  const issueClass = `issue-${slug.toLowerCase()}`
  const currentSections = issueSections
  const { year, month } = thisIssueData
  const tocProps = { thisIssueData, currentSections, permalink, year, month }

  const summary = thisIssueData.summary
  const credits = thisIssueData.credits

  return (
    <Paper pageClass={`paper-issue ${issueClass}`}>
      {previewURL && <PreviewHeader previewURL={previewURL} />}
      <Header type={HeaderType.Alt} />
      <main className="divide-y rail-divide">
        <SectionHead title={thisIssueData.title} permalink={permalink} />

        <div className="px-6">
          <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3 gap-y-9 tablet-lg:divide-x tablet-lg:rail-divide">
            <div className="col-span-4 tablet-lg:col-span-4 desktop:col-span-3">
              <div className="space-y-6">
                <div className="h-[300px] py-3 pr-3">
                  <CoverImages currentIssue={thisIssueData} clickToIssue={false} />
                </div>
                {summary && <div className="text-lg">{parse(summary)}</div>}
                {credits && <div className="text-sm">{parse(credits)}</div>}
                <PublishInfo thisIssueData={thisIssueData} />
              </div>
            </div>
            <div className="col-span-4 tablet-lg:col-span-8 desktop:col-span-9">
              <TableOfContents {...tocProps} />
            </div>
          </div>
        </div>
      </main>
      <CoversPopup />
    </Paper>
  )
}

interface PublishInfoProps {
  thisIssueData: Issues
}
const PublishInfo = (props: PublishInfoProps) => {
  const { thisIssueData } = props
  const publishedOn =
    thisIssueData?.published &&
    new Date(thisIssueData.published).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

  return (
    <div className="text-sm space-y-2 text-zinc-700 dark:text-slate-100">
      <p>
        The “{thisIssueData.title}” Issue of the Brooklyn Rail was published on {publishedOn}.
      </p>
    </div>
  )
}

export default IssuePage
