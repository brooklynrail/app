import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { usePopup } from "./popupProvider"
import { Articles, ArticlesIssues, ArticlesSections, DirectusFiles, Issues, Sections } from "../../../lib/types"
import { ArticleProps } from "@/pages/[year]/[month]/[section]/[slug]"
import { PageType, getPermalink } from "../../../lib/utils"

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

interface ArticleListProps {
  sectionArticles: Array<Articles>
  year: number
  month: number
}

const ArticleList = (props: ArticleListProps) => {
  const { sectionArticles, year, month } = props
  const list = sectionArticles.map((article: any, i: number) => {
    const permalink = getPermalink({
      year: year,
      month: month,
      section: article.sections[0].sections_id.slug,
      slug: article.slug,
      type: PageType.Article,
    })
    return (
      <li key={i}>
        <h4>
          <Link href={`${permalink}`}>
            <span dangerouslySetInnerHTML={{ __html: article.title }} />
          </Link>
        </h4>
        <Bylines contributors={article.contributors} />
      </li>
    )
  })
  return list
}

const IssueArticles = (props: ArticleProps) => {
  const { currentArticles, sections, currentIssue } = props
  const { year, month } = currentIssue
  // Create a map where each key is a section ID and each value is an array of articles for that section
  const articlesBySection = currentArticles.reduce((acc: any, article: Articles) => {
    const sectionId = article.sections[0].sections_id.id
    if (!acc[sectionId]) {
      acc[sectionId] = []
    }
    acc[sectionId].push(article)
    return acc
  }, {})

  return (
    <>
      {sections.map((section: Sections, i: number) => {
        // Check if there are articles for this section
        const sectionArticles = articlesBySection[section.id]
        if (!sectionArticles || sectionArticles.length === 0) {
          return null // Skip rendering this section
        }

        return (
          <div key={i}>
            <h3>{section.name}</h3>
            <ul>
              <ArticleList sectionArticles={sectionArticles} year={year} month={month} />
            </ul>
          </div>
        )
      })}
    </>
  )
}

interface CoverImagesProps {
  cover_1?: DirectusFiles
  cover_2?: DirectusFiles
  cover_3?: DirectusFiles
  cover_4?: DirectusFiles
  cover_5?: DirectusFiles
  cover_6?: DirectusFiles
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
    if (!cover_1 || !!cover_1.width === false || !!cover_1.height === false) {
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

interface IssueRailProps {
  currentIssue: Issues
  sections: Sections[]
}

const IssueRail = (props: ArticleProps) => {
  const { currentIssue } = props
  const { slug, title, cover_1, cover_2, cover_3, cover_4, cover_5, cover_6 } = currentIssue
  const coverImageProps = { cover_1, cover_2, cover_3, cover_4, cover_5, cover_6 }

  return (
    <section id="rail">
      <header id="rail-header">
        <h2>
          <Link href="/">
            <img src="/images/brooklynrail-logo.svg" alt="The Brooklyn Rail" title="Brooklyn Rail Home" />
          </Link>
        </h2>
      </header>

      <header className="issue-header">
        <h3 className="issue-name">
          <Link href={`/${slug}/`}>{title}</Link>
        </h3>

        <Link className="archive" href="/archive" title="All Issues Archive">
          <span>All Issues</span> <i className="fas fa-angle-double-right"></i>
        </Link>
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
                    <Link href="/where-to-find-us">
                      <strong>
                        Find <em>the RAIL</em> in print
                      </strong>
                    </Link>
                  </p>
                  <p>
                    <Link
                      href="https://shop.brooklynrail.org/products/subscription"
                      title="Subscribe to the Rail in Print"
                    >
                      <strong>Subscribe now</strong>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <IssueArticles {...props} />
      </nav>
    </section>
  )
}
export default IssueRail
