import { Issues } from "../../../../lib/types"
import { useState } from "react"

interface IssueSelectProps {
  allIssues?: Issues[]
  currentIssueSlug?: string
}

const IssueSelect = (props: IssueSelectProps) => {
  const { allIssues, currentIssueSlug } = props

  const [selectedIssueSlug, setSelectedIssueSlug] = useState<string | undefined>(
    currentIssueSlug ? currentIssueSlug : undefined,
  )

  if (!selectedIssueSlug || !Array.isArray(allIssues)) {
    return null
  }

  if (!allIssues || !selectedIssueSlug) {
    return <>Loading...</>
  }

  const handleIssueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value
    // check for the issue
    const selectedIssue = allIssues.find((issue) => issue.slug === selectedValue)
    if (selectedIssue) {
      // set the path if the issue is a special issue
      const path = selectedIssue.special_issue ? `special/${selectedIssue.slug}` : selectedIssue.slug
      // Set the selected issue slug
      setSelectedIssueSlug(selectedIssue.slug)
      window.location.href = `/${path}/`
    }
  }

  // sort allIssues by the issue_number, largest to smallest
  allIssues.sort((a, b) => b.issue_number - a.issue_number)
  return (
    <select id="issue_select" value={selectedIssueSlug} onChange={handleIssueChange}>
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
  )
}

export default IssueSelect
