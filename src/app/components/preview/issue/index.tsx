"use client"
import { useState, useEffect } from "react"
import Password from "../password"
import { IssuePreviewProps } from "@/app/preview/issue/[year]/[month]/page"
import IssuePage from "../../issuePage"
import { PageLayout } from "@/app/page"

const IssuePreview = (props: IssuePreviewProps) => {
  const { thisIssueData, isEnabled, previewPassword } = props
  const cookieSlug = `rail_preview_${thisIssueData.slug}`
  const [password, setPassword] = useState("")
  const [isViewable, setIsViewable] = useState(false)
  const [passwordError, setPasswordError] = useState<string | undefined>()

  // the previewCookie is set on a per-article basis
  // this way, writers will have to enter the password for each article they want to preview
  // the directusCookie is set when you are logged in to Directus
  // if either of these cookies are set, the article will be viewable
  useEffect(() => {
    // Read the cookie
    if (isEnabled) {
      setIsViewable(true)
    }
  }, [isEnabled])

  const handlePasswordSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    // Check if the `password` is the same as `previewPassword`
    if (password === previewPassword) {
      // Redirect to the article preview
      setIsViewable(true)
      // set a cookie
      document.cookie = `${cookieSlug}=true; path=/; max-age=3600; samesite=strict; secure`
    } else {
      // Show an error message for incorrect password
      setPasswordError("Incorrect password")
    }
  }

  const passwordProps = { password, passwordError, setPassword, handlePasswordSubmit }

  if (!isViewable) {
    return <Password {...passwordProps} />
  }

  const previewURL = `${process.env.NEXT_PUBLIC_BASE_URL}/preview/issue/${thisIssueData.year}/${thisIssueData.month}`
  return (
    <>
      <IssuePage {...props} layout={PageLayout.Issue} previewURL={previewURL} />
    </>
  )
}

export default IssuePreview
