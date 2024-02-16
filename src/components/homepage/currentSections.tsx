import { Issues, Sections } from "../../../lib/types"

interface CurrentSectionsProps {
  currentIssue: Issues
  currentSections: Array<Sections>
}

const CurrentSections = (props: CurrentSectionsProps) => {
  const { currentIssue, currentSections } = props
  const { year, month } = currentIssue
  const dateSlug = `${year}/${month}`

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
