"use client"
import { IssuePageProps } from "@/app/issues/[issueSlug]/page"
import parse from "html-react-parser"
import { Articles, Issues } from "../../../../lib/types"
import { CoverImages } from "../collections/banner/coverImages"
import Paper from "../paper"
import CoversPopup from "./coversPopup"
import IssueHead from "./head"
import TableOfContents from "./tableOfContents"

export interface PromoProps {
  currentArticles: Articles[]
  year: number
  month: number
  thisIssueData: Issues
}

const IssuePage = (props: IssuePageProps) => {
  const { thisIssueData, issueSections, previewURL, permalink, navData, allIssues, currentSection } = props

  const currentSections = issueSections
  const { year, month } = thisIssueData

  // if currentSection, filter articles to only show articles from that section
  const allArticles = thisIssueData.articles || []
  const articles = currentSection
    ? allArticles.filter((article) => article.section.slug === currentSection.slug)
    : allArticles

  const tocProps = {
    articles: articles,
    issueSlug: thisIssueData.slug,
    currentSections,
    permalink,
    year,
    month,
  }

  const summary = thisIssueData.summary
  const credits = thisIssueData.credits

  return (
    <Paper pageClass={``} navData={navData} previewURL={previewURL}>
      <main className="divide-y rail-divide">
        <IssueHead title={thisIssueData.title} allIssues={allIssues} currentIssueSlug={thisIssueData.slug} />

        <div className="px-6">
          <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3 gap-y-9 tablet-lg:divide-x tablet-lg:rail-divide">
            <div className="col-span-4 tablet-lg:col-span-4 desktop:col-span-3">
              <div className="space-y-6">
                <div className="h-[300px] py-3 pr-3">
                  <CoverImages currentIssue={thisIssueData} clickToIssue={false} priority={true} />
                </div>
                {summary && <div className="text-lg">{parse(summary)}</div>}
                {credits && <div className="text-sm">{parse(credits)}</div>}
                <PublishInfo thisIssueData={thisIssueData} />
              </div>
            </div>
            <div className="col-span-4 tablet-lg:col-span-8 desktop:col-span-9">
              {currentSection ? <TableOfContents {...tocProps} /> : <TableOfContents {...tocProps} />}
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
    <div className="pb-20 text-sm space-y-2 text-zinc-700 dark:text-slate-100">
      <p>
        The “{thisIssueData.title}” Issue of the Brooklyn Rail was published on {publishedOn}.
      </p>
    </div>
  )
}

export default IssuePage
