import { IssuePageProps } from "@/app/issues/[issueSlug]/page"
import SubscribeAd from "../subscribeAd"
import TableOfContents from "../tableOfContents"

const TableOfContentsPage = (props: IssuePageProps) => {
  const { thisIssueData, issueSections, permalink } = props
  const currentSections = issueSections

  const { year, month } = thisIssueData
  const tocProps = { thisIssueData, currentSections, permalink, year, month }

  return (
    <div className="grid-col-8">
      <div className="grid-row">
        <TableOfContents {...tocProps} />
      </div>
      <SubscribeAd />
    </div>
  )
}

export default TableOfContentsPage
