"use client"
import { HomepagePreviewProps } from "@/lib/railTypes"
import { useEffect, useState } from "react"
import HomePage from "../../homepage"
import Password from "../password"

const HomepagePreview = (props: HomepagePreviewProps) => {
  const { currentIssue, permalink, previewPassword, directusUrl, isEnabled } = props
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
      <HomePage {...props} previewURL={previewURL} />
    </Password>
  )
}

export default HomepagePreview
