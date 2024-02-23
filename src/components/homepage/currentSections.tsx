import { Issues, Sections } from "../../../lib/types"

interface CurrentSectionsProps {
  currentIssue: Issues
  currentSections: Array<Sections>
  dateSlug: string
}

const CurrentSections = (props: CurrentSectionsProps) => {
  const { dateSlug, currentSections } = props
  const sectionsToRemove = ["publishersmessage", "editorsmessage"]

  return (
    <>
      <div className="issue_sections">
        <ul>
          <li>
            <a href={`/${dateSlug}/`} title="Go to the Issue home">
              Issue Home
            </a>
          </li>
          {currentSections.map((section: any, i: number) => {
            if (sectionsToRemove.includes(section.slug)) {
              return
            }
            return (
              <li key={`${i}-${dateSlug}/${section.slug}/`}>
                <a href={`/${dateSlug}/${section.slug}/`} title={`Go to the ${section.name} section`}>
                  {section.name}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default CurrentSections
