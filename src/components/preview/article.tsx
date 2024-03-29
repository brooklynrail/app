import ContributorsBox from "../article/contributors"
import { ArticleBody, ArticleHead } from "../article"
import { ArticlePreviewProps } from "@/pages/preview/[slug]"
import Link from "next/link"
import { useState, useEffect } from "react"
import Password from "./password"

const ArticlePreview = (props: ArticlePreviewProps) => {
  const { article } = props
  const { contributors } = article

  const cookieSlug = `rail_preview_${article.slug}`
  const [password, setPassword] = useState("")
  const [isViewable, setIsViewable] = useState(false)

  // the previewCookie is set on a per-article basis
  // this way, writers will have to enter the password for each article they want to preview
  // the directusCookie is set when you are logged in to Directus
  // if either of these cookies are set, the article will be viewable
  useEffect(() => {
    const previewCookie = document.cookie.split(";").some((item) => item.trim().startsWith(`${cookieSlug}=`))
    const directusCookie = document.cookie.split(";").some((item) => item.trim().startsWith("directus_session_token="))
    const prerenderCookie = document.cookie.split(";").some((item) => item.trim().startsWith(`__prerender_bypass=`))
    console.log("document", document)
    console.log("document.cookie", document.cookie)
    console.log("previewCookie", previewCookie)
    console.log("directusCookie", directusCookie)
    console.log("prerenderCookie", prerenderCookie)
    if (previewCookie || prerenderCookie) {
      setIsViewable(true)
    }
  }, [cookieSlug])

  const handlePasswordSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    // Check if the entered password is correct
    if (password === "pizza") {
      // Redirect to the article preview
      setIsViewable(true)
      // set a cookie
      document.cookie = `${cookieSlug}=true; path=/; max-age=3600; samesite=strict; secure`
    } else {
      // Show an error message for incorrect password
      alert("Incorrect password. Please try again.")
    }
  }

  const passwordProps = { password, setPassword, handlePasswordSubmit }

  if (!isViewable) {
    return (
      <>
        {`yes ${isViewable}`}
        <Password {...passwordProps} />
      </>
    )
  }

  const previewURL = `${process.env.NEXT_PUBLIC_BASE_URL}/preview/${article.slug}`

  return (
    <>
      <div className="paper">
        <div className="hatbox"></div>

        <main>
          <div className="grid-container">
            <div className="grid-row grid-gap-3">
              <div className="grid-col-12">
                <header id="article_header" className="preview">
                  <nav className="preview">
                    <svg
                      className="br-logo"
                      width="71"
                      height="68"
                      viewBox="0 0 71 68"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect x="0.347168" y="0.101562" width="70" height="67.2903" rx="5" fill="#292323" />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M24.4377 54.635C30.4565 54.635 33.8306 52.6562 33.8306 47.5014V39.3141C33.8306 32.2561 29.3204 31.5183 28.8864 31.5183C31.0845 31.5183 33.5455 29.74 33.4663 24.6227V21.3579C33.4663 14.8023 30.7734 12.748 23.7014 12.748H11.8633V54.635H24.4377Z"
                        fill="white"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M58.8894 26.8083V21.3579C58.8894 14.8023 56.6336 12.748 50.7333 12.748H36.9214V54.635H44.5896V37.8962L47.6912 37.8981C49.805 37.8981 50.7529 39.2926 50.7529 41.1445V54.635H59.8265C59.8265 54.635 58.8875 53.6871 58.8875 51.5859C58.8875 49.484 58.8875 40.8666 58.8875 40.8666C58.8875 34.1258 54.4698 34.1118 54.0358 34.1118C56.3073 34.1118 58.8894 32.3811 58.8894 26.8083Z"
                        fill="white"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M25.1879 26.8246C25.1879 27.8556 24.2394 28.4684 22.751 28.4684H19.5315L19.5334 19.4551H22.7744C24.6753 19.4551 25.1898 20.1821 25.1898 21.2524L25.1879 26.8246Z"
                        fill="#292323"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M19.5316 35.2969H22.6333C23.4874 35.2969 26.2424 35.2962 26.2424 38.4684C26.2424 38.4684 26.2424 41.926 26.2424 45.2809C26.2424 48.0324 22.8835 48.054 22.5274 48.054C20.0892 48.054 19.4746 48.054 19.4746 48.054L19.5316 35.2969Z"
                        fill="#292323"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M50.7258 28.7595C50.7258 30.6095 49.6772 31.4279 48.4099 31.4279H44.6125L44.6144 19.4492H48.356C50.0453 19.4492 50.7271 20.4586 50.7271 21.992L50.7258 28.7595Z"
                        fill="#292323"
                      />
                    </svg>
                    <h2>Preview</h2>
                    <Link className={`preview-url`} href={previewURL} target="_blank">
                      {previewURL}
                    </Link>
                  </nav>
                </header>
              </div>
            </div>
            <div className="grid-row grid-gap-3">
              <div className="grid-col-12 tablet-lg:grid-col-8 desktop-lg:grid-col-9">
                <article className="article">
                  <ArticleHead {...props} />
                  <ArticleBody {...props} />
                  <ContributorsBox contributors={contributors} />
                </article>
              </div>
              <div className="grid-col-12 tablet-lg:grid-col-4 desktop-lg:grid-col-3">
                <div className="preview-info">Article info: TKTK</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default ArticlePreview
