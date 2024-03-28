import { Issues } from "../../../lib/types"
import { useState } from "react"

interface IssueSelectProps {
  allIssues: Array<Issues>
  currentIssueSlug?: string
}

const IssueSelect = (props: IssueSelectProps) => {
  const { allIssues, currentIssueSlug } = props
  const [selectedIssueSlug, setSelectedIssueSlug] = useState<string>(
    currentIssueSlug ? currentIssueSlug : allIssues[0].slug,
  )

  const handleIssueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value
    const selectedIssue = allIssues.find((issue) => issue.slug === selectedValue)
    if (selectedIssue) {
      setSelectedIssueSlug(selectedIssue.slug)
      window.location.href = `/${selectedValue}`
    }
  }

  if (!selectedIssueSlug || !Array.isArray(allIssues)) {
    return null
  }
  return (
    <select id="issue_select" value={selectedIssueSlug} onChange={handleIssueChange}>
      {allIssues.map((issue) => {
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
  )
}

export default IssueSelect
