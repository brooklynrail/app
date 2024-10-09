"use client"
import { PageLayout } from "@/app/page"
import AdsTile from "../ads/adsTile"
import IssueSelect from "./issueSelect"
import CurrentSections from "./currentSections"
import RailPartners from "./railPartners"
import RailProjects from "./railProjects"
import Ad970 from "../ads/ad970"
import { Articles, Issues } from "../../../../lib/types"
import Link from "next/link"
import IssueLayout from "./layout/issue"
import SectionLayout from "./layout/section"
import { CoverImage } from "../issueRail/coverImage"
import PreviewHeader from "../preview/previewHead"
import TableOfContentsPage from "./layout/tableOfContentsPage"
import Header, { HeaderType } from "../header"
import Paper from "../paper"
import { IssuePageProps } from "@/app/issues/[issueSlug]/page"

export interface PromoProps {
  currentArticles: Articles[]
  year: number
  month: number
  thisIssueData: Issues
}

const IssuePage = (props: IssuePageProps) => {
  const { thisIssueData, currentSection, issueSections, previewURL, allIssues, tributesData } = props

  const { slug } = thisIssueData
  const issueClass = `issue-${slug.toLowerCase()}`

  let layout
  switch (props.layout) {
    case PageLayout.Section:
      layout = (
        <SectionLayout thisIssueData={thisIssueData} currentSection={currentSection} tributesData={tributesData} />
      )
      break
    case PageLayout.TableOfContents:
      layout = <TableOfContentsPage {...props} />
      break
    default:
      layout = <IssueLayout {...props} />
      break
  }

  return (
    <Paper pageClass={`paper-issue ${issueClass}`}>
      {previewURL && <PreviewHeader previewURL={previewURL} />}

      <div className="px-0 desktop:w-desktop mx-auto">
        <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3 tablet-lg:gap-6">
          <div className="col-span-4 tablet-lg:col-span-12">
            <div className="px-3">
              <Header type={HeaderType.Default} />
              <Ad970 />
            </div>
          </div>
        </div>

        <div className="col-span-4 hidden tablet-lg:block tablet-lg:col-span-2">
          <div className="flex flex-col space-y-2 pl-3">
            <IssueSelect currentIssueSlug={slug} allIssues={allIssues} />
            <CoverImage thisIssueData={thisIssueData} />
            <CurrentSections issueSections={issueSections} thisIssueData={thisIssueData} />
          </div>
          <div className="py-4 flex flex-col space-y-2 pl-3">
            <Link
              className="font-medium text-sm py-1 text-center inline-block border-[1px] rail-border-solid rounded-sm"
              href="/search"
              title="Search All Issues"
            >
              <span>Search</span> <i className="fas fa-search"></i>
            </Link>
            <Link
              className="font-medium text-sm py-1 text-center inline-block border-[1px] rail-border-solid rounded-sm"
              href="/archive"
              title="View Archive"
            >
              <span>View Archive</span>
            </Link>
            <RailProjects />
            <RailPartners />
          </div>
        </div>
        <div className="col-span-4 tablet-lg:col-span-8">
          <div className="px-3 tablet-lg:px-0">{layout}</div>
        </div>
        <div className="hidden tablet-lg:block col-span-4 tablet-lg:col-span-2">
          <div className="pr-3">
            <AdsTile />
          </div>
        </div>
      </div>
    </Paper>
  )
}

export default IssuePage
