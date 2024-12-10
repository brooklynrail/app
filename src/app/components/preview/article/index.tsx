"use client"
import { ArticlePreviewProps } from "@/app/preview/article/[id]/page"
import { useEffect, useState } from "react"
import ArticleHead from "../../article/articleHead"
import ArticleBody from "../../article/articleBody"
import Bylines, { BylineType } from "../../collections/promos/bylines"
import Title, { TitleType } from "../../collections/promos/title"
import Paper from "../../paper"
import Password from "../password"
import PreviewInfo from "./previewInfo"

const ArticlePreview = (props: ArticlePreviewProps) => {
  const { articleData, isEnabled, previewPassword, directusUrl, navData } = props

  // cookieSlug is the cookie that gets set after you enter the password
  const cookieSlug = `rail_preview_${articleData.slug}`
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

  const isTribute = articleData.tribute
  const previewURL = `${process.env.NEXT_PUBLIC_BASE_URL}/preview/article/${articleData.id}/`
  const showAd = isStudioPreview && isViewable

  return (
    <Paper pageClass={`theme-${articleData.section.slug}`} hidePopup={true} navData={navData} previewURL={previewURL}>
      <main className="">
        <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3 gap-x-3 px-3">
          <div className="col-span-4 tablet-lg:col-span-9">
            <article className="px-3 py-3">
              {isTribute ? (
                <div className="py-3 pb-9">
                  {!articleData.hide_title && <Title title={articleData.title} type={TitleType.TributeArticle} />}
                  <Bylines
                    article={articleData}
                    type={BylineType.TributeArticle}
                    asTitle={true}
                    hideBy={true}
                    linked={true}
                  />
                </div>
              ) : (
                <ArticleHead {...{ permalink: previewURL, articleData, currentSection: articleData.section }} />
              )}
              <div className="grid grid-cols-4 tablet-lg:grid-cols-8 desktop-lg:grid-cols-9 gap-3">
                <div className="col-span-4 tablet-lg:col-span-8 desktop-lg:col-span-9 space-y-12">
                  <ArticleBody articleData={articleData} showAd={showAd} />
                </div>
              </div>
            </article>
          </div>
          {isStudioPreview && (
            <div className="col-span-4 tablet-lg:col-span-3">
              <PreviewInfo articleData={articleData} directusUrl={directusUrl} />
            </div>
          )}
        </div>
      </main>
    </Paper>
  )
}

export default ArticlePreview
