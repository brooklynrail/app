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
      // Set the selected issue slug
      setSelectedIssueSlug(selectedIssue.slug)
      window.location.href = `/issues/${selectedIssue.slug}/`
    }
  }

  return (
    <>
      <select
        id=""
        value={selectedIssueSlug}
        onChange={handleIssueChange}
        className="border rail-border rounded-sm uppercase font-medium text-md p-1"
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
