"use client"
import parse from "html-react-parser"
import Link from "next/link"
import { stripHtml } from "string-strip-html"
import { Homepage, Issues } from "@/lib/types"
import { getPermalink, PageType } from "@/lib/utils"
import Paper from "../paper"
import IssueHead from "../issuePage/head"
import { useEffect, useState } from "react"
import { useBreakpoints } from "@/app/hooks/useBreakpoints"
import style from "./archive.module.scss"
import { CoverImages } from "../banner/coverImages"

export interface ArchivePageProps {
  navData: Homepage
  issues: Issues[]
  permalink: string
}

const ArchivePage = (props: ArchivePageProps) => {
  const { issues, navData } = props
  const currentBreakpoint = useBreakpoints()
  const [groupCount, setGroupCount] = useState(1)

  useEffect(() => {
    const calculateGroupNumber = () => {
      switch (currentBreakpoint) {
        case "tablet":
          return 2
        case "tablet-lg":
          return 3
        case "desktop":
        case "desktop-lg":
        case "widescreen":
          return 4
        default:
          return 1
      }
    }
    setGroupCount(calculateGroupNumber())
  }, [currentBreakpoint])

  // Utility function to split array into groups for grid layout
  const groupArray = (array: Issues[], groupSize: number) => {
    const groups = []
    for (let i = 0; i < array.length; i += groupSize) {
      groups.push(array.slice(i, i + groupSize))
    }
    return groups
  }

  const articleGroups = groupArray(issues, groupCount).map((group, i) => (
    <div key={`archive-group-${i}`} className="grid grid-cols-4 tablet:grid-cols-12 divide-x rail-divide px-6">
      <IssueBoxes issues={group} />
    </div>
  ))

  return (
    <Paper pageClass="" navData={navData}>
      <main id="main" className="">
        <IssueHead title={`All Issues`} allIssues={issues} />
        <div className="divide-y rail-divide">{articleGroups}</div>
      </main>
    </Paper>
  )
}

const IssueBoxes = ({ issues }: { issues: Issues[] }) => {
  return (
    <>
      {issues.map((issue: Issues) => {
        const { id, issue_number, special_issue, title, cover_1, summary } = issue
        if (!cover_1 || !cover_1.filename_disk) {
          return null
        }

        const permalink = getPermalink({
          issueSlug: issue.slug,
          type: PageType.Issue,
        })

        return (
          <div key={id} className="col-span-4 tablet-lg:col-span-3">
            <div className="p-3 py-6 space-y-6">
              <div className="space-y-3">
                <div className="">
                  <h3 className="text-lg font-bold uppercase">
                    <Link href={permalink} title={`Visit ${stripHtml(title).result}`}>
                      {title}
                    </Link>
                  </h3>
                </div>
                <div className="h-[300px]">
                  <CoverImages currentIssue={issue} clickToIssue={true} priority={false} />
                </div>
              </div>
              {summary && <div className={`${style.summary} text-xl`}>{parse(summary)}</div>}
            </div>
          </div>
        )
      })}
    </>
  )
}

export default ArchivePage
