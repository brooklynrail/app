import { Articles, DirectusFiles, DirectusUsers } from "../../../../lib/types"
import Image from "next/image"
import parse from "html-react-parser"
import { stripHtml } from "string-strip-html"
import PromoBuilder from "./promoBuilder"
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
  const desc = caption ? <figcaption className="text-xs">{parse(caption)}</figcaption> : null

  // the dimensions of the preview image
  const width = props.fullWidth ? 450 : 200
  const height = props.fullWidth ? 450 : 200
  // the dimensions of the original image
  const dimensions = (
    <p className="text-[10px]">
      {props.image.width} x {props.image.height}
    </p>
  )

  return (
    <div className="">
      <div className="">
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
  const { first_name, last_name, avatar, date, permalink } = props
  const profileImg = avatar ? `${process.env.NEXT_PUBLIC_IMAGE_PATH}${avatar}` : ""
  const status = props.status === "published" ? "text-green-600 uppercase" : "text-red-600 uppercase"
  const statusText = props.status === "published" ? "Published" : "Draft"
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

  return (
    <div className="bg-slate-300 p-3 flex space-x-3">
      <Image
        className="rounded-full flex-none h-10 w-10"
        src={profileImg}
        alt={`${first_name} ${last_name}`}
        width={45}
        height={45}
      />
      <p className="text-xs">
        <strong className={`block ${status}`}>{statusText}</strong>
        <span className={`block`}>{`Last updated by ${first_name} ${last_name}`}</span>
        <em className={`block`}>
          {today == newdate ? `Today` : `${newdate}`} at {time}
        </em>
        {permalink && (
          <Link className={`block py-0.5 text-blue-600`} target="_blank" href={permalink}>
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

  const downstreamTitle = title_tag ? stripHtml(title_tag).result : stripHtml(title).result
  const downstreamSummary = stripHtml(excerpt).result

  const truncateString = (str: string, maxLength: number) => {
    if (str.length <= maxLength) {
      return str
    }
    return str.slice(0, maxLength) + "..."
  }

  return (
    <div className="bg-slate-200 my-6 h-screen overflow-y-auto sticky top-0">
      {user_updated && typeof user_updated !== "string" && (
        <EditorInfo {...user_updated} date={date_updated} status={status} permalink={permalink} />
      )}
      <div className="p-3 text-sm space-y-6">
        <div className="">
          <h4 className="text-xs uppercase pb-2">Section</h4>
          <p className="font-bold">{section.name}</p>
        </div>
        <div className="">
          <h4 className="text-xs uppercase pb-2">Title</h4>
          <p className="text-md font-light">{parse(title)}</p>
        </div>

        <div className="">
          <h4 className="text-xs uppercase pb-2">Excerpt</h4>
          <div className="font-serif">{parse(excerpt)}</div>
        </div>

        {featured_image && (
          <div className="">
            <h4 className="text-xs uppercase pb-2">Featured Image</h4>
            <PreviewImage order={1} image={featured_image} directusUrl={props.directusUrl} showShortcode={false} />
          </div>
        )}

        <div className="bg-white p-3">
          <h4 className="text-xs uppercase pb-2">Google Preview</h4>
          <div className="flex flex-col space-y-2">
            <div className="flex space-x-2 items-center">
              <div className="w-7 h-7 bg-gray-200 rounded-full overflow-hidden flex justify-center items-center">
                <Image
                  className="w-4 h-4 "
                  src="https://brooklynrail.org/favicon.ico"
                  width={24}
                  height={24}
                  alt="Google Preview"
                />
              </div>
              <div className="flex flex-col leading-4">
                <p className="text-[14px]">The Brooklyn Rail</p>
                <p className="text-[12px]">https://brooklynrail.org/url-goes-here</p>
              </div>
            </div>
            <div className="">
              <p className="font-[Arial] font-bold text-blue-700">{truncateString(downstreamTitle, 54)}</p>
              <p className="font-[Arial] text-xs text-gray-600">{truncateString(downstreamSummary, 155)}</p>
            </div>
          </div>
        </div>

        {slideshow_image && (
          <div className="block slideshow-image">
            <h4 className="text-xs uppercase">Slideshow Image</h4>
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
            <h4 className="text-xs uppercase">Promo Banner Image</h4>
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
          <div className="">
            <h4 className="text-xs uppercase">Promo Thumb Image</h4>
            <PreviewImage order={1} image={promo_thumb} directusUrl={props.directusUrl} showShortcode={false} />
          </div>
        )}

        <PromoBuilder />
      </div>
    </div>
  )
}

export default PreviewInfo
