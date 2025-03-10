"use client"
import { HomepagePreviewProps } from "@/app/preview/homepage/page"
import HomePage from "../../homepage"
import Password from "../password"

const HomepagePreview = (props: HomepagePreviewProps) => {
  const { currentIssue, previewPassword, isEnabled, homepageHeaderData } = props
  const cookieSlug = `rail_preview_${currentIssue.slug}`

  const previewURL = `${process.env.NEXT_PUBLIC_BASE_URL}/preview/homepage/`
  return (
    <Password previewPassword={previewPassword} cookieSlug={cookieSlug} isEnabled={isEnabled}>
      <HomePage {...props} previewURL={previewURL} homepageHeaderData={homepageHeaderData} />
    </Password>
  )
}

export default HomepagePreview
