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
import CoversPopup from "../issueRail/coversPopup"

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
              <Header type={HeaderType.Alt} />
              <Ad970 />
            </div>
          </div>
        </div>

        <div className="col-span-4 tablet-lg:col-span-12">
          <div className="py-3 mx-3 my-0 px-3 bg-indigo-500 text-white text-sm flex justify-between items-center space-x-3">
            <p>
              <Link href="/events">
                Daily Conversations on <strong>The New Social Environment</strong>
              </Link>
            </p>
            <div className="flex flex-col-reverse tablet-lg:flex-row tablet-lg:space-x-3">
              <Link
                className="mt-1 tablet-lg:mt-0 border border-white border-dotted text-center py-1 px-3 text-xs uppercase text-nowrap"
                href="/events#past"
              >
                Past events
              </Link>
              <Link
                className="bg-zinc-100 text-indigo-500 font-medium py-1 px-3 text-xs text-center uppercase text-nowrap"
                href="/events"
              >
                Join
              </Link>
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
      <CoversPopup />
    </Paper>
  )
}

export default IssuePage
