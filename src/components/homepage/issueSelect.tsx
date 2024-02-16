import { Issues } from "../../../lib/types"
import { useState } from "react"

interface IssueSelectProps {
  allIssues: Array<Issues>
}

const IssueSelect = (props: IssueSelectProps) => {
  const { allIssues } = props
  const [selectedIssue, setSelectedIssue] = useState<Issues>(allIssues[0])

  const handleIssueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value
    const selectedIssue = allIssues.find((issue) => issue.slug === selectedValue)
    if (selectedIssue) {
      setSelectedIssue(selectedIssue)
      window.location.href = selectedValue
    }
  }

  if (!selectedIssue.slug || !Array.isArray(allIssues)) return null
  return (
    <select id="issue_select" value={selectedIssue.slug} onChange={handleIssueChange}>
      {allIssues.map((issue) => {
        if (!issue.slug) return <></>
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
