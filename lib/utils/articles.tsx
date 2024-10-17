import { Issues, Sections } from "../types"

export const checkYearMonthSection = (
  section: Sections,
  issue: Issues,
  year: string,
  month: string,
  sectionSlug: string,
) => {
  const articleYear = issue.year.toString()
  const articleMonth = issue.month.toString().padStart(2, "0")
  const articleSection = section.slug

  if (year !== articleYear || month !== articleMonth || sectionSlug !== articleSection) {
    return false
  }
  return true
}
