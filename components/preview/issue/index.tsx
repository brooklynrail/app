"use client"
import { IssuePreviewProps } from "@/lib/railTypes"
import IssuePage from "../../issuePage"
import Password from "../password"

const IssuePreview = (props: IssuePreviewProps) => {
  const { thisIssueData, isEnabled, previewPassword, navData } = props

  const cookieSlug = `rail_preview_${thisIssueData.slug}`

  const previewURL = `${process.env.NEXT_PUBLIC_BASE_URL}/preview/issue/${thisIssueData.id}`
  return (
    <Password previewPassword={previewPassword} cookieSlug={cookieSlug} isEnabled={isEnabled}>
      <IssuePage {...props} navData={navData} previewURL={previewURL} />
    </Password>
  )
}

export default IssuePreview
