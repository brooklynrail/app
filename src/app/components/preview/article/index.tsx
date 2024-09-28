"use client"
import ContributorsBox from "../../article/contributors"
import { ArticlePreviewProps } from "@/app/preview/article/[id]/page"
import { useState, useEffect } from "react"
import Password from "../password"
import PreviewInfo from "../previewInfo"
import ArticleHead from "../../article/articleHead"
import ArticleBody from "../../article/articleBody"
import PreviewHeader from "../previewHead"
import parse from "html-react-parser"
import BookshopWidget from "../../article/bookshop"
import Title, { TitleType } from "../../collections/promos/title"
import Bylines, { BylineType } from "../../collections/promos/bylines"

const ArticlePreview = (props: ArticlePreviewProps) => {
  const { articleData, isEnabled, previewPassword, directusUrl } = props

  const { contributors } = articleData

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
  return (
    <>
      <div className="paper">
        <main className="desktop:max-w-screen-widescreen mx-auto">
          <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3 gap-x-">
            <aside className="col-span-4 tablet-lg:col-span-12">
              <PreviewHeader previewURL={previewURL} />
              <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3 gap-x-">
                <div className="col-span-4 tablet-lg:col-span-9">
                  <article className="py-12">
                    {isTribute ? (
                      <div className="py-3 pb-9">
                        <Title title={articleData.title} type={TitleType.TributeArticle} />
                        <Bylines article={articleData} type={BylineType.TributeArticle} linked={true} hideBy={true} />
                      </div>
                    ) : (
                      <ArticleHead {...props} />
                    )}
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
                  <div className="col-span-4 tablet-lg:col-span-3">
                    <PreviewInfo articleData={articleData} directusUrl={directusUrl} />
                  </div>
                )}
              </div>
            </aside>
          </div>
        </main>
      </div>
    </>
  )
}

export default ArticlePreview
