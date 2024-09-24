import { Issues } from "../../../../lib/types"
import { useState } from "react"

interface IssueSelectProps {
  currentIssueSlug: string
  allIssues: Issues[]
}

const IssueSelect = (props: IssueSelectProps) => {
  const { currentIssueSlug, allIssues } = props
  const [selectedIssueSlug, setSelectedIssueSlug] = useState<string | undefined>(currentIssueSlug)

  const handleIssueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value
    // check for the issue
    const selectedIssue = allIssues.find((issue) => issue.slug === selectedValue)
    if (selectedIssue) {
      // set the path if the issue is a special issue
      const path = selectedIssue.special_issue ? `special/${selectedIssue.slug}` : selectedIssue.slug
      // Set the selected issue slug
      setSelectedIssueSlug(selectedIssue.slug)
      window.location.href = `/issues/${path}/`
    }
  }

  return (
    <>
      <select
        id=""
        value={selectedIssueSlug}
        onChange={handleIssueChange}
        className="leading-4 border-[1px] border-black border-solid rounded-sm uppercase font-medium text-sm p-0.5"
      >
        {allIssues.map((issue: Issues) => {
          if (!issue.slug) {
            return <></>
          }
          return (
            <option key={issue.slug} value={issue.slug}>
              {issue.title}
            </option>
          )
        })}
      </select>
    </>
  )
}

export default IssueSelect
