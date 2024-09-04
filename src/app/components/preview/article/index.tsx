"use client"
import ContributorsBox from "../../article/contributors"
import { ArticlePreviewProps } from "@/app/preview/article/[slug]/page"
import { useState, useEffect } from "react"
import Password from "../password"
import PreviewInfo from "../previewInfo"
import ArticleHead from "../../article/articleHead"
import ArticleBody from "../../article/articleBody"
import PreviewHeader from "../previewHead"
import parse from "html-react-parser"
import BookshopWidget from "../../article/bookshop"

const ArticlePreview = (props: ArticlePreviewProps) => {
  const { articleData, isStudioPreview, previewPassword, directusUrl } = props
  const { contributors } = articleData

  // cookieSlug is the cookie that gets set after you enter the password
  const cookieSlug = `rail_preview_${articleData.slug}`
  const [password, setPassword] = useState("")
  const [isViewable, setIsViewable] = useState(false)
  const [passwordError, setPasswordError] = useState<string | undefined>()

  console.log("First isStudioPreview: ", isStudioPreview)
  // the previewCookie is set on a per-article basis
  // this way, writers will have to enter the password for each article they want to preview
  // the isStudioPreview param is set to `true` when you are logged in to Directus
  // if either of these cookies are set, the article will be viewable
  useEffect(() => {
    // get the URL of the current page
    const currentUrl = window.location.href
    console.log("currentUrl: ", currentUrl)

    // Read the cookie
    const cookies = document.cookie.split(";").map((cookie) => cookie.trim())
    const previewCookie = cookies.find((cookie) => cookie.includes(cookieSlug))
    const directus_session_token = cookies.find((cookie) => cookie.includes(`directus_session_token`))
    console.log("directus_session_token: ", directus_session_token)

    // If the Preview Password has been previously entered, the preview cookie should be set
    // then the article should be viewable
    if (previewCookie) {
      console.log("previewCookie found: ", previewCookie)
      setIsViewable(true)
    }
    // If the Preview Password has been previously entered, the preview cookie should be set
    if (isViewable) {
      console.log("isViewable: ", isViewable)
      setIsViewable(true)
    }
    if (currentUrl.includes("draftMode")) {
      console.log("currentUrl contains draftMode!")
      setIsViewable(true)
    }
    if (isStudioPreview) {
      console.log("isStudioPreview: ", isStudioPreview)
      setIsViewable(true)
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

  const previewURL = `${process.env.NEXT_PUBLIC_BASE_URL}/preview/article/${articleData.slug}/`
  return (
    <>
      <div className="paper">
        <main>
          <div className="grid-container">
            <PreviewHeader previewURL={previewURL} />
            <div className="grid-row grid-gap-3">
              <div className="grid-col-12 tablet-lg:grid-col-8 desktop-lg:grid-col-9">
                <article className="article">
                  <ArticleHead {...props} />
                  <ArticleBody {...props} preview={true} />
                  {articleData.endnote && (
                    <div className="content">
                      <div className="endnote">
                        <span className="line"></span>
                        {parse(articleData.endnote)}
                      </div>
                    </div>
                  )}
                  <BookshopWidget {...articleData} />
                  {contributors && contributors.length > 0 && (
                    <div className="content">
                      <ContributorsBox contributors={contributors} />
                    </div>
                  )}
                </article>
              </div>
              {isStudioPreview && (
                <div className="grid-col-12 tablet-lg:grid-col-4 desktop-lg:grid-col-3">
                  <PreviewInfo articleData={articleData} directusUrl={directusUrl} />
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default ArticlePreview
