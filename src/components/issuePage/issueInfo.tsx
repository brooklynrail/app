import { DirectusFiles } from "../../../lib/types"
import { IssuePageProps } from "@/pages"
import { IssueInfoProps } from "@/pages/[year]/[month]/info"
import Image from "next/image"

interface IssueCoversProps {
  cover_1: DirectusFiles | undefined
  cover_2: DirectusFiles | undefined
  cover_3: DirectusFiles | undefined
  cover_4: DirectusFiles | undefined
  cover_5: DirectusFiles | undefined
  cover_6: DirectusFiles | undefined
}

const IssueCovers = (props: IssueCoversProps) => {
  const { cover_1, cover_2, cover_3, cover_4, cover_5, cover_6 } = props
  const covers = [cover_1, cover_2, cover_3, cover_4, cover_5, cover_6]
  // for each props, if it exists, render it
  const allCovers = covers.map((cover: any, i: number) => {
    if (cover == null || cover == undefined) {
      return
    }

    const width = (cover.width * 75) / cover.height
    const height = (cover.height * width) / cover.width
    const src = `${process.env.NEXT_PUBLIC_IMAGE_PATH}${cover.filename_disk}`
    const alt = cover.description ? cover.description.replace(/(<([^>]+)>)/gi, "") : "The Brooklyn Rail"
    const desc = cover.description ? (
      <figcaption dangerouslySetInnerHTML={{ __html: `<strong>Cover ${i + 1}:</strong> ${cover.description}` }} />
    ) : null
    const image = (
      <div key={`cover-${i}`} className="cover">
        <Image src={src} width={width} height={height} alt={alt} />
        {desc}
      </div>
    )
    return image
  })

  return <div className="issue-covers">{allCovers}</div>
}
const IssueInfo = (props: IssueInfoProps) => {
  const { currentIssue, permalink, currentSections, railIssueData } = props
  const {
    cover_1,
    cover_2,
    cover_3,
    cover_4,
    cover_5,
    cover_6,
    year,
    month,
    title,
    slug,
    special_issue,
    issue_number,
    old_id,
    articles,
  } = currentIssue
  const coverImageProps = { cover_1, cover_2, cover_3, cover_4, cover_5, cover_6 }
  return <>TKTK</>
  // console.log("currentIssue", currentIssue)
  // console.log("articles", articles)
  // console.log("currentSections", currentSections)
  // console.log("railIssueData", railIssueData)

  const old = railIssueData

  const row = function (label: string, data: any, oldData: any, skip: boolean, key?: string) {
    // check if data and oldData are the same value
    const skipped = skip ? "skipped" : ""
    const diff = String(data) === String(oldData) ? `same ${skipped}` : `different ${skipped}`
    return (
      <tr className={diff} key={key}>
        <th>{label}</th>
        <td>{data}</td>
        <td>{oldData}</td>
      </tr>
    )
  }

  const articlesList = articles.map((article: any, i: number) => {
    const key = `article-${i}`
    return <>{row(article.order, article.articles_slug.title, old.articles[i].articles_slug.title, false, key)}</>
  })

  return (
    <>
      <div className="paper">
        <div className="hatbox"></div>
        <div className="wrapper home">
          <section id="main">
            <div className="grid-container grid-container-desktop">
              <div className="grid-row grid-gap-4">
                <div className="grid-col-12">
                  <div className="issue-info">
                    <h1>Issue: {title}</h1>

                    <table>
                      <thead>
                        <tr>
                          <th></th>
                          <th>New site</th>
                          <th>Old site</th>
                        </tr>
                      </thead>
                      <tbody>
                        {row("title", title, old.title, false)}
                        {row("permalink", permalink, `https://brooklynrail.org/${old.slug}/`, true)}
                        {row("slug", slug, old.slug, false)}
                        {row("old_id", old_id, old.old_id, false)}
                        {row("year", year, old.year, false)}
                        {row("month", month < 10 ? `0${String(month)}` : String(month), old.month, false)}
                        {row("issue_number:", issue_number, old.issue_number, true)}
                        {row(
                          "special issue:",
                          special_issue ? "true" : "false",
                          old.special_issue ? "true" : "false",
                          false,
                        )}
                        <tr>
                          <th>covers:</th>
                          <td>
                            <IssueCovers {...coverImageProps} />
                          </td>
                          <td>
                            <IssueCovers {...coverImageProps} />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="issue-info">
                    <h1>Articles</h1>
                    <table>
                      <thead>
                        <tr>
                          <th></th>
                          <th>New Count: {articles ? articles.length : "no articles"}</th>
                          <th>Old Count: {old.articles.length}</th>
                        </tr>
                      </thead>
                      <tbody>{articlesList}</tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default IssueInfo
