import Link from "next/link"
import { Issues, Sections } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"

interface KickerProps {
  kicker?: string | null
  currentIssue?: Issues
  currentSection?: Sections
}
const Kicker = (props: KickerProps) => {
  const { kicker, currentIssue, currentSection } = props
  if (!currentIssue || !currentSection) {
    return <></>
  }
  const { year, month } = currentIssue

  const sectionPermalink = getPermalink({
    year: year,
    month: month,
    section: currentSection.slug,
    type: PageType.Section,
  })

  if (!currentSection && !kicker) {
    return <></>
  }
  return (
    <h6 className="kicker">
      {currentSection && (
        <>
          <Link href={sectionPermalink} title={`Go to the ${currentSection.name} section`}>
            {currentSection.name}
          </Link>
          <span className="divider"></span>
        </>
      )}
      {kicker && <span>{kicker}</span>}
    </h6>
  )
}
export default Kicker
