"use client"
import { useState, useEffect } from "react"
import Password from "../password"
import IssuePage from "../../issuePage"
import { IssuePreviewProps } from "@/app/preview/issue/[id]/page"
import HomePage from "../../homepage"
import { HomePageProps } from "@/app/page"
import { HomepagePreviewProps } from "@/app/preview/homepage/page"

const HomepagePreview = (props: HomepagePreviewProps) => {
  const { homepageData, banners, currentIssue, permalink, previewPassword, directusUrl, isEnabled } = props
  const [isStudioPreview, setIsStudioPreview] = useState(false)
  const cookieSlug = `rail_preview_${currentIssue.slug}`

  useEffect(() => {
    if (window.location.href.includes("draftMode")) {
      setIsStudioPreview(true)
    }
  }, [])

  const previewURL = `${process.env.NEXT_PUBLIC_BASE_URL}/preview/homepage/`
  return (
    <Password previewPassword={previewPassword} cookieSlug={cookieSlug} isEnabled={isEnabled}>
      <HomePage {...props} />
    </Password>
  )
}

export default HomepagePreview
