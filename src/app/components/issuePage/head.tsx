"use client"

import { Issues } from "../../../../lib/types"
import IssueSelect from "./issueSelect"

interface IssueHeadProps {
  title: string
  allIssues: Issues[]
  currentIssueSlug?: string
}

const IssueHead = (props: IssueHeadProps) => {
  const { title, allIssues, currentIssueSlug } = props

  return (
    <div className="px-6 sticky top-0 z-10 rail-bg">
      <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3">
        <div className="col-span-4 tablet-lg:col-span-12">
          <div className="flex items-center py-3 pt-6 pb-5 space-x-9">
            <h2 className="text-2xl tablet:text-4xl font-bold">{title}</h2>
            <IssueSelect currentIssueSlug={currentIssueSlug} allIssues={allIssues} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default IssueHead
