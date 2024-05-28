import { Issues } from "../../../../lib/types"
import { useEffect, useState } from "react"
import { getAllIssues } from "../../../../lib/utils"
import { IssuesSelect } from "../../../../lib/railTypes"

interface IssueSelectProps {
  currentIssueSlug: string
}

const IssueSelect = (props: IssueSelectProps) => {
  const { currentIssueSlug } = props
  const [allIssues, setAllIssues] = useState<IssuesSelect[] | undefined>(undefined)
  const [selectedIssueSlug, setSelectedIssueSlug] = useState<string | undefined>(currentIssueSlug)

  useEffect(() => {
    const fetchData = async () => {
      const issues = !allIssues ? getAllIssues() : Promise.resolve(allIssues)
      // Fetch all the data in parallel
      const [fetchedIssues] = await Promise.all([issues])
      // Update the state with the fetched data as it becomes available
      setAllIssues(fetchedIssues)
    }
    // Call the fetchData function and handle any errors
    fetchData().catch((error) => console.error("Failed to fetch data:", error))
  }, [allIssues])

  if (!allIssues) {
    return <div className="loading_issue_select"></div>
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
    <>
      <select id="issue_select" value={selectedIssueSlug} onChange={handleIssueChange}>
        {allIssues.map((issue: IssuesSelect) => {
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
