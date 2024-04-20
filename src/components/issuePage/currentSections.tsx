import Link from "next/link"
import { Issues, Sections } from "../../../lib/types"
import { PageType, getPermalink, getSectionsByIssueId } from "../../../lib/utils"
import { useEffect, useState } from "react"

interface CurrentSectionsProps {
  currentIssue: Issues
  year: number
  month: number
}

const CurrentSections = (props: CurrentSectionsProps) => {
  const { currentIssue, year, month } = props
  const sectionsToRemove = ["publishersmessage", "editorsmessage"]

  const [currentSections, setCurrentSections] = useState<Array<Sections> | undefined>(undefined)

  useEffect(() => {
    async function fetchData() {
      try {
        // Get only the sections that are used in the articles in the current issue
        const allSections = await getSectionsByIssueId(currentIssue.id)
        setCurrentSections(allSections)
      } catch (error) {
        console.error("Failed to fetch allSections:", error)
      }
    }
    fetchData().catch((error) => {
      console.error("Failed to run fetchData:", error)
    })
  }, [setCurrentSections, currentSections, currentIssue.id])

  const issuePermalink = getPermalink({
    year: year,
    month: month,
    type: PageType.Issue,
  })

  const sections = currentSections ? (
    currentSections.map((section: Sections, i: number) => {
      const sectionPermalink = getPermalink({
        year: year,
        month: month,
        section: section.slug,
        type: PageType.Section,
      })
      if (sectionsToRemove.includes(section.slug)) {
        return
      }
      return (
        <li key={`${i}-${year}/${month}/${section.slug}/`}>
          <Link href={sectionPermalink} title={`Go to the ${section.name} section`}>
            {section.name}
          </Link>
        </li>
      )
    })
  ) : (
    <p>loading...</p>
  )

  return (
    <>
      <div className="issue_sections">
        <ul>
          <li>
            <Link href={issuePermalink} title="Go to the Issue home">
              Issue Home
            </Link>
          </li>
          {sections}
        </ul>
      </div>
    </>
  )
}

export default CurrentSections
