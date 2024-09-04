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

  // the previewCookie is set on a per-article basis
  // this way, writers will have to enter the password for each article they want to preview
  // the directusCookie is set when you are logged in to Directus
  // if either of these cookies are set, the article will be viewable
  useEffect(() => {
    // Read the cookie
    const cookies = document.cookie.split(";").map((cookie) => cookie.trim())
    const previewCookie = cookies.find((cookie) => cookie.includes(cookieSlug))
    const directusCookie = cookies.find((cookie) => cookie.includes("directus_session_token"))
    console.log("====================================")
    console.log("Cookies", cookies)
    console.log("previewCookie", previewCookie)
    console.log("directusCookie", directusCookie)
    console.log("isStudioPreview", isStudioPreview)
    // If the cookie is set, show the article
    if (previewCookie || directusCookie) {
      console.log("Preview cookie found", previewCookie)
      console.log("Directus cookie found", directusCookie)
      setIsViewable(true)
    }
    if (isViewable) {
      console.log("isViewable mode enabled")
      setIsViewable(true)
    }
    if (isStudioPreview) {
      console.log("Studio Preview mode enabled")
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
              <div className="grid-col-12 tablet-lg:grid-col-4 desktop-lg:grid-col-3">
                <PreviewInfo articleData={articleData} directusUrl={directusUrl} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default ArticlePreview
