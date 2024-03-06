import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { usePopup } from "./popupProvider"

const Bylines = ({ contributors }: any) => {
  return (
    <cite>
      {contributors.map((contributor: any, i: number) => {
        const isLast = i === contributors.length - 1
        const isFirst = i === 0
        let separator = ", "

        if (contributors.length > 2 && isLast) {
          separator = ", and "
        } else if (contributors.length === 2 && isLast) {
          separator = " and "
        } else if (isLast) {
          separator = ""
        }

        return (
          <span key={i}>
            {!isFirst && separator}
            {contributor.contributors_id.first_name} {contributor.contributors_id.last_name}
          </span>
        )
      })}
    </cite>
  )
}

const ArticleList = ({ articles, sections }: any) => {
  // Create a map where each key is a section ID and each value is an array of articles for that section
  const articlesBySection = articles.reduce((acc: any, article: any) => {
    const sectionId = article.articles_slug.sections[0].sections_id.id
    if (!acc[sectionId]) {
      acc[sectionId] = []
    }
    acc[sectionId].push(article)
    return acc
  }, {})

  return (
    <>
      {sections.map((section: any, i: number) => {
        // Check if there are articles for this section
        const sectionArticles = articlesBySection[section.id]
        if (!sectionArticles || sectionArticles.length === 0) {
          return null // Skip rendering this section
        }

        return (
          <div key={i}>
            <h3>{section.name}</h3>
            <ul>
              {sectionArticles.map((article: any, j: number) => (
                <li key={j}>
                  <h4>
                    <Link href={`/2023/12/${section.slug}/${article.articles_slug.slug}`}>
                      <span dangerouslySetInnerHTML={{ __html: article.articles_slug.title }} />
                    </Link>
                  </h4>
                  <Bylines contributors={article.articles_slug.contributors} />
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </>
  )
}

interface CoverImagesProps {
  cover_1: any
  cover_2: any
  cover_3: any
  cover_4: any
  cover_5: any
  cover_6: any
}

export const CoverImage = (props: CoverImagesProps) => {
  const { cover_1, cover_2, cover_3, cover_4, cover_5, cover_6 } = props
  const covers = [cover_1, cover_2, cover_3, cover_4, cover_5, cover_6]

  const { setShowPopup, setImages } = usePopup()

  const handleClick = async (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault()
    setImages(covers)
    setShowPopup(true)
  }

  const FirstCover = () => {
    if (!cover_1) {
      return <></>
    }
    const width = (cover_1.width * 200) / cover_1.height
    const height = (cover_1.height * width) / cover_1.width
    const src = `${process.env.NEXT_PUBLIC_IMAGE_PATH}${cover_1.filename_disk}`
    const alt = cover_1.description ? cover_1.description.replace(/(<([^>]+)>)/gi, "") : "The Brooklyn Rail"

    return (
      <div>
        <Image
          src={src}
          width={width}
          height={height}
          alt={alt}
          onClick={(e: React.MouseEvent<Element, MouseEvent>) => handleClick(e)}
        />
      </div>
    )
  }

  return (
    <div className={`issue-covers`}>
      <FirstCover />
    </div>
  )
}

const IssueRail = (props: any) => {
  const primaryIssue = props.issues[0]
  const { slug, title, articles, cover_1, cover_2, cover_3, cover_4, cover_5, cover_6 } = primaryIssue
  const coverImageProps = { cover_1, cover_2, cover_3, cover_4, cover_5, cover_6 }

  return (
    <section id="rail">
      <header id="rail-header">
        <h2>
          <a href="/">
            <img src="/images/brooklynrail-logo.svg" alt="The Brooklyn Rail" title="Brooklyn Rail Home" />
          </a>
        </h2>
      </header>

      <header className="issue-header">
        <h3 className="issue-name">
          <Link href={`/${slug}/`}>{title}</Link>
        </h3>

        <a className="archive" href="/archive" title="All Issues Archive">
          <span>All Issues</span> <i className="fas fa-angle-double-right"></i>
        </a>
      </header>

      <nav className="issue-index">
        <div className="issue-details">
          <div className="grid-row">
            <div className="grid-col-6">
              <CoverImage {...coverImageProps} />
            </div>
            <div className="grid-col-6">
              <div className="issue-links">
                <div className="related">
                  <p>
                    <a href="/where-to-find-us">
                      <strong>
                        Find <em>the RAIL</em> in print
                      </strong>
                    </a>
                  </p>
                  <p>
                    <a
                      href="https://shop.brooklynrail.org/products/subscription"
                      title="Subscribe to the Rail in Print"
                    >
                      <strong>Subscribe now</strong>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ArticleList articles={articles} sections={props.sections} />
      </nav>
    </section>
  )
}
export default IssueRail
