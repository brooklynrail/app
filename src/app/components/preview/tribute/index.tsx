"use client"
import { useState, useEffect } from "react"
import Password from "../password"
import TributePage from "../../tributePage"
import { TributePreviewProps } from "@/app/preview/tribute/[id]/page"
import { getPermalink, PageType } from "../../../../../lib/utils"

const TributePreview = (props: TributePreviewProps) => {
  const { tributeData, isEnabled, previewPassword, articleData } = props
  const cookieSlug = `rail_preview_${tributeData.slug}`
  const [password, setPassword] = useState("")
  const [isViewable, setIsViewable] = useState(false)
  const [isStudioPreview, setIsStudioPreview] = useState(false)
  const [passwordError, setPasswordError] = useState<string | undefined>()

  // the previewCookie is set on a per-article basis
  // this way, writers will have to enter the password for each article they want to preview
  // the directusCookie is set when you are logged in to Directus
  // if either of these cookies are set, the article will be viewable
  useEffect(() => {
    // get the URL of the current page
    const currentUrl = window.location.href

    // Read the cookie
    const cookies = document.cookie.split(";").map((cookie) => cookie.trim())
    const previewCookie = cookies.find((cookie) => cookie.includes(cookieSlug))

    // If the Preview Password has been previously entered, the preview cookie should be set
    // then the article should be viewable
    if (previewCookie) {
      setIsViewable(true)
    }
    // If the Preview Password has been previously entered, the preview cookie should be set
    if (isViewable) {
      setIsViewable(true)
    }

    if (currentUrl.includes("draftMode")) {
      setIsViewable(true)
      setIsStudioPreview(true)
    }
    if (isEnabled) {
      setIsViewable(true)
      setIsStudioPreview(true)
    }
  }, [isStudioPreview, isViewable])

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

  const permalink = getPermalink({
    tributeSlug: tributeData.slug,
    type: PageType.Tribute,
  })

  const previewURL = `${process.env.NEXT_PUBLIC_BASE_URL}/preview/tribute/${tributeData.id}`
  return (
    <TributePage
      thisTributeData={tributeData}
      articleData={articleData}
      previewURL={previewURL}
      permalink={permalink}
    />
  )
}

export default TributePreview
