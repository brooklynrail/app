"use client"
import { useState, useEffect } from "react"
import Password from "../password"
import PreviewHeader from "../previewHead"
import Paper from "../../paper"
import ExhibitionPageBody from "../../exhibition/exhibitionPageBody"
import PreviewInfo from "./previewInfo"
import { ExhibitionPreviewProps } from "@/app/preview/exhibition/[id]/page"

const ExhibitionPreview = (props: ExhibitionPreviewProps) => {
  const { exhibitionData, isEnabled, previewPassword, directusUrl, navData } = props

  // cookieSlug is the cookie that gets set after you enter the password
  const cookieSlug = `rail_preview_${exhibitionData.slug}`
  const [password, setPassword] = useState("")
  const [isViewable, setIsViewable] = useState(false)
  const [isStudioPreview, setIsStudioPreview] = useState(false)
  const [passwordError, setPasswordError] = useState<string | undefined>()

  // the previewCookie is set on a per-article basis
  // this way, writers will have to enter the password for each article they want to preview
  // the isStudioPreview param is set to `true` when you are logged in to Directus
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
      document.cookie = `${cookieSlug}=true; path=/; max-age=3600; SameSite=None; Secure`
    } else {
      // Show an error message for incorrect password
      setPasswordError("Incorrect password")
    }
  }

  const passwordProps = { password, passwordError, setPassword, handlePasswordSubmit }

  if (!isViewable) {
    return <Password {...passwordProps} />
  }

  const previewURL = `${process.env.NEXT_PUBLIC_BASE_URL}/preview/exhibition/${exhibitionData.id}/`
  return (
    <Paper pageClass={`theme-exhibitions`} hidePopup={true} navData={navData} previewURL={previewURL}>
      <main className="px-6">
        <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3">
          <div className="col-span-4 tablet-lg:col-span-12">
            {isStudioPreview && (
              <div className="py-2 flex flex-col space-y-6">
                <PreviewInfo exhibitionData={exhibitionData} directusUrl={directusUrl} />
              </div>
            )}
          </div>
        </div>
        <ExhibitionPageBody {...props} navData={navData} />
      </main>
    </Paper>
  )
}

export default ExhibitionPreview
