/* eslint max-lines: 0 */
import { ArticlesContributors, ArticlesIssues, Contributors, DirectusFiles, Issues } from "../../../lib/types"
import { IssueInfoProps } from "@/pages/[year]/[month]/info"
import Image from "next/image"
import isEqual from "lodash.isequal"
import { useEffect, useState } from "react"
import { getIssueData } from "../../../lib/utils"

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
        <Image src={src} width={width} height={height} alt={alt} sizes="30vw" />
        {desc}
      </div>
    )
    return image
  })

  return <div className="issue-covers">{allCovers}</div>
}

interface TableRowProps {
  label: string
  data: any
  oldData: any
  oldOrder?: number | string
  skip: boolean
}

const TableRow = (props: TableRowProps) => {
  const { label, data, oldData, oldOrder, skip } = props
  // check if data and oldData are the same value
  const skipped = skip ? "skipped" : ""
  // a function to remove the featured_image prop from the object that is passed in
  const removeImage = (obj: any) => {
    // First, check if the object and the nested properties exist
    if (obj && obj.props && "featured_image" in obj.props) {
      // Create a shallow copy of the object
      const newObj = { ...obj }
      // Create a shallow copy of the props and delete 'featured_image'
      const newProps = { ...newObj.props }
      delete newProps.featured_image
      // Assign the newProps back to the newObj
      newObj.props = newProps
      // Return the modified object
      return newObj
    }
    // Return the original object if no modifications are made
    return obj
  }
  const compareData = data
  const compareOldData = oldData

  const diff = isEqual(removeImage(compareData), removeImage(compareOldData))
    ? `same ${skipped}`
    : `different ${skipped}`
  return (
    <tr className={diff}>
      <th>{label}</th>
      <td>{data}</td>
      {oldOrder && <th>{oldOrder}</th>}
      <td>{oldData}</td>
    </tr>
  )
}
interface FeaturedImageProps {
  path: string
}
interface TablePromoProps {
  section: string
  title: string
  bylines: (string | undefined)[]
  featured_image: DirectusFiles | undefined
  details?: string
}
const TablePromo = (props: TablePromoProps) => {
  const { section, title, bylines, featured_image, details } = props

  let image = null
  if (featured_image && featured_image.width) {
    image = (
      <Image
        src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}${featured_image.filename_disk}`}
        fill
        style={{
          objectFit: "contain",
        }}
        alt="The Brooklyn Rail"
        sizes="30vw"
      />
    )
  }
  if (featured_image && !featured_image.width) {
    const oldFeaturedImage = featured_image as unknown as FeaturedImageProps
    if (oldFeaturedImage.path != null) {
      image = (
        <Image
          src={`https://storage.googleapis.com/rail-legacy-media/production${oldFeaturedImage.path}`}
          alt="The Brooklyn Rail"
          fill
          style={{
            objectFit: "contain",
          }}
          sizes="30vw"
        />
      )
    }
  }

  return (
    <div className="table-promo">
      <div>
        <span className="section">{section}</span>
        <span className="title">{title}</span>
        <span className="bylines">By {bylines}</span>
        <span className="details">{details}</span>
      </div>
      <div className="featured_image">{image}</div>
    </div>
  )
}
interface ArticleListProps {
  articles: ArticlesIssues[]
  railIssueData: any
}
const ArticleList = (props: ArticleListProps) => {
  const { articles, railIssueData } = props
  const old = railIssueData

  const getbylines = (contributors: ArticlesContributors[] | Contributors[]) => {
    const people = contributors.map((contributor: any, i: number) => {
      if (contributor.contributors_id == null) {
        return ""
      }
      const separator = i === contributors.length - 1 ? "" : ", "
      const { first_name, last_name } = contributor.contributors_id
      const byline: string = `${first_name} ${last_name}${separator}`
      return byline
    })
    return people
  }
  const getSection = (name: string, newId: number, oldId?: number) => {
    if (oldId && newId === oldId) {
      return `${name}`
    }
    if (oldId && newId != oldId) {
      return `${name} (${oldId} | ${newId})`
    }

    return `${name}`
  }

  const list = articles.map((articleItem: ArticlesIssues, i: number) => {
    const newBylines = getbylines(articleItem.articles_slug.contributors)
    const oldBylines = getbylines(old.articles[i].articles_slug.contributors)
    const section = getSection(
      articleItem.articles_slug.sections[0].sections_id.name,
      articleItem.articles_slug.sections[0].sections_id.old_id,
    )
    const oldSection = getSection(
      articleItem.articles_slug.sections[0].sections_id.name,
      articleItem.articles_slug.sections[0].sections_id.old_id,
      old.articles[i].articles_slug.old_section_id,
    )
    const featured_image = articleItem.articles_slug.featured_image
    const details = `${articleItem.articles_slug.images.length} images`
    const oldDetails = `${old.articles[i].articles_slug.images.length} images`
    const newArticle = (
      <TablePromo
        section={section}
        title={articleItem.articles_slug.title}
        bylines={newBylines}
        featured_image={featured_image}
        details={details}
      />
    )
    const oldArticleOrder = old.articles[i].order
    const oldArticle = (
      <TablePromo
        section={oldSection}
        title={old.articles[i].articles_slug.title}
        bylines={oldBylines}
        featured_image={old.articles[i].articles_slug.featured_image}
        details={oldDetails}
      />
    )
    const key = `a-${i}`

    if (i == 0) {
      return (
        <TableRow
          label={``}
          data={`Count: ${articles.length}`}
          oldOrder={`--`}
          oldData={`Count: ${old.articles.length}`}
          skip={false}
          key={key}
        />
      )
    } else {
      return (
        <TableRow
          label={String(articleItem.order)}
          data={newArticle}
          oldData={oldArticle}
          oldOrder={oldArticleOrder}
          skip={false}
          key={`old-${key}`}
        />
      )
    }
  })

  return <>{list}</>
}
const IssueInfo = (props: IssueInfoProps) => {
  const { permalink, issueBasics } = props

  const year = issueBasics.year
  const month: number = issueBasics.month
  const [railIssueData, setRailIssueData] = useState<any>(undefined)
  const [issueData, setIssueData] = useState<Issues | undefined>(undefined)

  useEffect(() => {
    const fetchData = async () => {
      const issueDataPromise = !issueData ? getIssueData({ year, month, slug: undefined }) : Promise.resolve(issueData)

      // Fetch all the data in parallel
      const [fetchedIssueData] = await Promise.all([issueDataPromise])

      // Update the state with the fetched data as it becomes available
      setIssueData(fetchedIssueData)
    }

    // Call the fetchData function and handle any errors
    fetchData().catch((error) => console.error("Failed to fetch data:", error))
  }, [issueData, setIssueData, month, year])

  useEffect(() => {
    async function fetchData() {
      try {
        // const data = await getRailIssueApi(year.toString(), month.toString())
        const api = `${process.env.NEXT_PUBLIC_BASE_URL}/api/railIssue?year=${year}&month=${month}`
        const response = await fetch(api)
        const data = await response.json()
        setRailIssueData(data)
      } catch (error) {
        console.error("Failed to fetch data:", error)
        // You might want to set some error state here to show an error message in your UI
      }
    }

    fetchData().catch((error) => {
      console.error("Failed to run fetchData:", error)
    })
  }, [year, month])

  if (!railIssueData || !issueData) {
    return <div>Loading...</div>
  }

  const {
    cover_1,
    cover_2,
    cover_3,
    cover_4,
    cover_5,
    cover_6,
    title,
    slug,
    special_issue,
    issue_number,
    old_id,
    articles,
  } = issueData
  const coverImageProps = { cover_1, cover_2, cover_3, cover_4, cover_5, cover_6 }

  // console.log("currentIssue", currentIssue)
  // console.log("articles", articles)
  // console.log("currentSections", currentSections)
  // console.log("railIssueData", railIssueData)

  const old = railIssueData

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
                        <TableRow label="title" data={title} oldData={old.title} skip={false} />
                        <TableRow
                          label="permalink"
                          data={permalink}
                          oldData={`https://brooklynrail.org/${old.slug}/`}
                          skip={true}
                        />
                        <TableRow label="slug" data={slug} oldData={old.slug} skip={false} />
                        <TableRow label="old_id" data={String(old_id)} oldData={String(old.old_id)} skip={false} />
                        <TableRow label="year" data={String(year)} oldData={String(old.year)} skip={false} />
                        <TableRow label="month" data={month} oldData={old.month} skip={false} />
                        <TableRow label="issue_number:" data={issue_number} oldData={old.issue_number} skip={true} />
                        <TableRow
                          label="special issue:"
                          data={special_issue ? "true" : "false"}
                          oldData={old.special_issue ? "true" : "false"}
                          skip={false}
                        />

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
                      <tbody>{articles && <ArticleList articles={articles} railIssueData={railIssueData} />}</tbody>
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
