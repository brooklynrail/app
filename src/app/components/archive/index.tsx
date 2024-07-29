"use client"
import Header from "../issuePage/header"
import { Articles, Issues } from "../../../../lib/types"
import Image from "next/image"
import { stripHtml } from "string-strip-html"
import Link from "next/link"
import { getPermalink, PageType } from "../../../../lib/utils"

export interface PromoProps {
  currentArticles: Articles[]
  year: number
  month: number
}

export interface ArchivePageProps {
  issues: Issues[]
  permalink: string
}

const ArchivePage = (props: ArchivePageProps) => {
  const { issues } = props

  // list all Issues
  const issueList = issues.map((issue: Issues) => {
    const { id, issue_number, special_issue, title, cover_1 } = issue
    if (!cover_1 || !cover_1.filename_disk) {
      return null
    }

    const permalink = getPermalink({
      year: issue.year,
      month: issue.month,
      type: PageType.Issue,
    })

    const allCovers = [issue.cover_1, issue.cover_2, issue.cover_3, issue.cover_4, issue.cover_5, issue.cover_6]
    // render all covers if the cover exists
    const coversList = allCovers.map((cover, index) => {
      if (!cover || !cover.filename_disk) {
        return null
      }

      const alt = cover.caption ? stripHtml(cover.caption).result : `${title} — The Brooklyn Rail`

      return (
        <li key={index} className="cover">
          <Link href={permalink} title={`Visit ${stripHtml(title).result}`}>
            <Image
              priority
              id={`cover-${index + 1}`}
              src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}${cover.filename_disk}`}
              width={100}
              height={100}
              sizes="12vw"
              style={{
                height: "auto",
              }}
              alt={alt}
            />
          </Link>
        </li>
      )
    })

    return (
      <li key={id} className="issue">
        <div className="issueDetails">
          <h6>Issue #{issue_number}</h6>
          <h3>
            <Link href={permalink} title={`Visit ${stripHtml(title).result}`}>
              {title}
            </Link>
          </h3>
        </div>
        <ul className="coversList">{coversList}</ul>
      </li>
    )
  })

  return (
    <>
      <div className={`paper`}>
        <div className="hatbox"></div>
        <div className="wrapper home">
          <header role="banner">
            <div className="grid-container grid-container-desktop">
              <div className="grid-row">
                <div className="grid-col-12">
                  <Header />
                </div>
              </div>
            </div>
          </header>

          <section id="main" className="issues-archive">
            <div className="grid-container grid-container-desktop">
              <div className="grid-row grid-gap-3">
                <div className="grid-col-12">
                  <h1>The Brooklyn Rail Archives</h1>
                  <ul>{issueList}</ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default ArchivePage
