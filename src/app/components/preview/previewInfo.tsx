import { Articles, ArticlesFiles, DirectusFiles, DirectusUsers } from "../../../../lib/types"
import Image from "next/image"
import parse from "html-react-parser"
import { stripHtml } from "string-strip-html"
import PromoBuilder from "./promoBuilder"
import { get } from "http"
import { getPermalink, PageType } from "../../../../lib/utils"
import Link from "next/link"

interface PreviewImageProps {
  image: DirectusFiles
  fullWidth?: boolean
  directusUrl: string
  showShortcode: boolean
  order: number
}
const PreviewImage = (props: PreviewImageProps) => {
  const { filename_disk, caption } = props.image
  const src = `${process.env.NEXT_PUBLIC_IMAGE_PATH}${filename_disk}`
  const desc = caption ? <figcaption>{parse(caption)}</figcaption> : null

  // the dimensions of the preview image
  const width = props.fullWidth ? 450 : 200
  const height = props.fullWidth ? 450 : 200
  // the dimensions of the original image
  const dimensions = (
    <p className="dimensions">
      {props.image.width} x {props.image.height}
    </p>
  )

  return (
    <div className="preview-image">
      <div className="imgbox">
        <Image src={src} width={width} height={height} alt={caption ? caption : ""} sizes="30vw" />
        {dimensions}
        {desc}
      </div>
    </div>
  )
}

interface EditorInfoProps {
  date: string
  status: string
  permalink: string | null
}
const EditorInfo = (props: DirectusUsers & EditorInfoProps) => {
  const { first_name, last_name, avatar, date, status, permalink } = props
  const profileImg = avatar ? `${process.env.NEXT_PUBLIC_IMAGE_PATH}${avatar}` : ""
  const today = new Date().toLocaleString("en-US", {
    month: "short",
    day: "numeric",
  })
  const newdate = new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
  })
  const time = new Date(date).toLocaleString("en-US", {
    hour: "2-digit",
    minute: "numeric",
    hour12: false,
  })

  console.log("permalink", permalink)

  return (
    <div className="editor">
      <Image className="avatar" src={profileImg} alt={`${first_name} ${last_name}`} width={45} height={45} />
      <p>
        <strong className={`status status-${status}`}>{status}</strong>
        <span>{`Last updated by ${first_name} ${last_name}`}</span>
        <em>
          {today == newdate ? `Today` : `${newdate}`} at {time}
        </em>
        {permalink && (
          <Link target="_blank" href={permalink}>
            LIVE URL »
          </Link>
        )}
      </p>
    </div>
  )
}

interface PreviewInfoProps {
  directusUrl: string
  articleData: Articles
}

const PreviewInfo = (props: PreviewInfoProps) => {
  const {
    status,
    excerpt,
    images,
    title,
    section,
    title_tag,
    user_updated,
    date_updated,
    featured_image,
    slideshow_image,
    promo_thumb,
    promo_banner,
    issue,
    slug,
  } = props.articleData

  const permalink =
    status === "published"
      ? getPermalink({
          slug: slug,
          year: issue.year,
          month: issue.month,
          section: section.slug,
          type: PageType.Article,
        })
      : null

  return (
    <div className="preview-info">
      {user_updated && typeof user_updated !== "string" && (
        <div className="block updated">
          <EditorInfo {...user_updated} date={date_updated} status={status} permalink={permalink} />
        </div>
      )}
      <div className="block">
        <h4>Title</h4>
        <p className="title">{parse(title)}</p>
      </div>

      <div className="block">
        <h4>Excerpt</h4>
        {parse(excerpt)}
      </div>

      <div className="block">
        <h4>Section</h4>
        <p>{section.name}</p>
      </div>

      {featured_image && (
        <div className="block">
          <h4>Featured Image</h4>
          <PreviewImage order={1} image={featured_image} directusUrl={props.directusUrl} showShortcode={false} />
        </div>
      )}

      <div className="block">
        <h4>SEO Title</h4>
        <p>{title_tag ? stripHtml(title_tag).result : stripHtml(title).result}</p>
      </div>
      <hr />
      {slideshow_image && (
        <div className="block slideshow-image">
          <h4>Slideshow Image</h4>
          <PreviewImage
            order={1}
            image={slideshow_image}
            fullWidth={true}
            directusUrl={props.directusUrl}
            showShortcode={false}
          />
        </div>
      )}
      {promo_banner && (
        <div className="block slideshow-image">
          <h4>Promo Banner Image</h4>
          <PreviewImage
            order={1}
            image={promo_banner}
            fullWidth={true}
            directusUrl={props.directusUrl}
            showShortcode={false}
          />
        </div>
      )}
      {promo_thumb && (
        <div className="block">
          <h4>Promo Thumb Image</h4>
          <PreviewImage order={1} image={promo_thumb} directusUrl={props.directusUrl} showShortcode={false} />
        </div>
      )}

      <PromoBuilder />
    </div>
  )
}

export default PreviewInfo
