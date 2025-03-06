"use client"
import { useState, useEffect } from "react"
import Password from "../password"
import IssuePage from "../../issuePage"
import { IssuePreviewProps } from "@/app/preview/issue/[id]/page"

const IssuePreview = (props: IssuePreviewProps) => {
  const { thisIssueData, isEnabled, previewPassword, navData } = props
  const [isStudioPreview, setIsStudioPreview] = useState(false)
  const cookieSlug = `rail_preview_${thisIssueData.slug}`

  useEffect(() => {
    if (window.location.href.includes("draftMode")) {
      setIsStudioPreview(true)
    }
  }, [])

  const previewURL = `${process.env.NEXT_PUBLIC_BASE_URL}/preview/issue/${thisIssueData.id}`
  return (
    <Password previewPassword={previewPassword} cookieSlug={cookieSlug} isEnabled={isEnabled}>
      <IssuePage {...props} navData={navData} previewURL={previewURL} />
    </Password>
  )
}

export default IssuePreview
