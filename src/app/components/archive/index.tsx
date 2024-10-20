"use client"
import Image from "next/image"
import Link from "next/link"
import { stripHtml } from "string-strip-html"
import { Articles, Homepage, Issues } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import Paper, { PaperType } from "../paper"

export interface PromoProps {
  currentArticles: Articles[]
  year: number
  month: number
}

export interface ArchivePageProps {
  navData: Homepage
  issues: Issues[]
  permalink: string
}

const ArchivePage = (props: ArchivePageProps) => {
  const { issues, navData } = props

  // list all Issues
  const issueList = issues.map((issue: Issues) => {
    const { id, issue_number, special_issue, title, cover_1 } = issue
    if (!cover_1 || !cover_1.filename_disk) {
      return null
    }

    const permalink = getPermalink({
      issueSlug: issue.slug,
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
        <li key={index} className="flex-none">
          <Link href={permalink} title={`Visit ${stripHtml(title).result}`}>
            <Image
              priority
              id={`cover-${index + 1}`}
              src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}${cover.filename_disk}`}
              width={150}
              height={150}
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
      <li key={id} className="pt-3">
        <div className="issueDetails">
          <h4 className="text-xs uppercase">Issue #{issue_number}</h4>
          <h3 className="text-md font-bold uppercase">
            <Link href={permalink} title={`Visit ${stripHtml(title).result}`}>
              {title}
            </Link>
          </h3>
        </div>
        <ul className="py-3 flex space-x-3 overflow-x-auto">{coversList}</ul>
      </li>
    )
  })

  return (
    <Paper pageClass="paper-archive" type={PaperType.Default} navData={navData}>
      <main id="main" className="">
        <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3">
          <div className="col-span-4 tablet-lg:col-span-12"></div>
        </div>
      </main>
    </Paper>
  )
}

export default ArchivePage
