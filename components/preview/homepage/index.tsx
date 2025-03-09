"use client"
import { HomepagePreviewProps } from "@/lib/railTypes"
import HomePage from "../../homepage"
import Password from "../password"

const HomepagePreview = (props: HomepagePreviewProps) => {
  const { currentIssue, previewPassword, isEnabled } = props
  const cookieSlug = `rail_preview_${currentIssue.slug}`

  const previewURL = `${process.env.NEXT_PUBLIC_BASE_URL}/preview/homepage/`
  return (
    <Password previewPassword={previewPassword} cookieSlug={cookieSlug} isEnabled={isEnabled}>
      <HomePage {...props} previewURL={previewURL} />
    </Password>
  )
}

export default HomepagePreview
