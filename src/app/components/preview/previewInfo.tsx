import { Articles, ArticlesFiles, DirectusFiles, DirectusUsers } from "../../../../lib/types"
import Image from "next/image"
import parse from "html-react-parser"
import { stripHtml } from "string-strip-html"
import { useEffect, useState } from "react"
import Link from "next/link"

interface PreviewImageProps {
  image: DirectusFiles
  fullWidth?: boolean
  directusUrl: string
  showShortcode: boolean
  key: number
}
const PreviewImage = (props: PreviewImageProps) => {
  const { showShortcode, key } = props
  const { filename_disk, caption, shortcode_key, id } = props.image
  const src = `${process.env.NEXT_PUBLIC_IMAGE_PATH}${filename_disk}`
  const desc = caption ? <figcaption>{parse(caption)}</figcaption> : null
  const shortcodeKey = shortcode_key
    ? `[img name="${shortcode_key}" type="lg" /]`
    : `[img name="img${key}" type="lg" /]`
  const [isCopied, setIsCopied] = useState(false)

  // the URL to edit the image in Directus
  const imageEditURL = `${props.directusUrl}/admin/files/${id}`

  // the dimensions of the preview image
  const width = props.fullWidth ? 450 : 200
  const height = props.fullWidth ? 450 : 200
  // the dimensions of the original image
  const dimensions = (
    <p className="dimensions">
      {props.image.width} x {props.image.height}
    </p>
  )

  // const handleClick = async (e: React.MouseEvent<Element, MouseEvent>) => {
  //   e.preventDefault()
  //   if (shortcodeKey) {
  //     // await navigator.clipboard.writeText(shortcodeKey)
  //     setIsCopied(true)
  //   }
  // }

  useEffect(() => {
    // wait 5 seconds and then reset the isCopied state
    setTimeout(() => {
      setIsCopied(false)
    }, 3500)
  }, [setIsCopied])

  return (
    <div className="preview-image">
      <div className="imgbox">
        <Image src={src} width={width} height={height} alt={caption ? caption : ""} sizes="30vw" />

        <div className="tools">
          {desc}
          {dimensions}
          <Link href={imageEditURL} title="Edit this image" target="_blank">
            <button>edit</button>
          </Link>
        </div>
      </div>

      {showShortcode && (
        <div className="shortcode">
          <code>{shortcodeKey}</code>
        </div>
      )}
    </div>
  )
}

interface EditorInfoProps {
  date: string
}
const EditorInfo = (props: DirectusUsers & EditorInfoProps) => {
  const { first_name, last_name, avatar, date } = props
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

  return (
    <div className="editor">
      <Image className="avatar" src={profileImg} alt={`${first_name} ${last_name}`} width={35} height={35} />
      <p>
        <strong>Draft</strong>
        <span>{`Last updated by ${first_name} ${last_name}`}</span>
        <em>
          {today == newdate ? `Today` : `${newdate}`} at {time}
        </em>
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
    excerpt,
    images,
    title,
    title_tag,
    user_updated,
    date_updated,
    featured_image,
    slideshow_image,
    promo_thumb,
    promo_banner,
  } = props.articleData
  const allImages = images
    ? images.map((image: ArticlesFiles, i: number) => {
        if (!image.directus_files_id || typeof image.directus_files_id === "string") {
          return <></>
        }
        const img = image.directus_files_id
        return <PreviewImage key={i} image={img} directusUrl={props.directusUrl} showShortcode={true} />
      })
    : null

  return (
    <div className="preview-info">
      {user_updated && typeof user_updated !== "string" && (
        <div className="block updated">
          <EditorInfo {...user_updated} date={date_updated} />
        </div>
      )}

      <div className="block">
        <h4>Title</h4>
        <p className="title">{parse(title)}</p>
      </div>

      <div className="block">
        <h4>Featured Image</h4>
        {featured_image ? (
          <PreviewImage key={1} image={featured_image} directusUrl={props.directusUrl} showShortcode={false} />
        ) : null}
      </div>

      <div className="block">
        <h4>Excerpt</h4>
        {parse(excerpt)}
      </div>

      <div className="block">
        <h4>SEO Title</h4>
        <p className="title">{title_tag ? stripHtml(title_tag).result : stripHtml(title).result}</p>
      </div>

      <hr />

      {slideshow_image && (
        <div className="block slideshow-image">
          <h4>Slideshow Image</h4>
          <PreviewImage
            key={1}
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
            key={1}
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
          <PreviewImage key={1} image={promo_thumb} directusUrl={props.directusUrl} showShortcode={false} />
        </div>
      )}

      <div className="block">
        <h4>Article Images</h4>
        <div className="all-images">{allImages}</div>
      </div>
    </div>
  )
}

export default PreviewInfo
