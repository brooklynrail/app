import { Articles, ArticlesFiles, DirectusFiles, DirectusUsers } from "../../../../lib/types"
import Image from "next/image"
import parse from "html-react-parser"
import { stripHtml } from "string-strip-html"
import { useState } from "react"
import Link from "next/link"

interface PreviewImageProps {
  image: DirectusFiles
  fullWidth?: boolean
  directusUrl: string
  showShortcode: boolean
  order: number
}
const PreviewImage = (props: PreviewImageProps) => {
  const { showShortcode, order } = props
  const { filename_disk, caption, shortcode_key, id } = props.image
  const src = `${process.env.NEXT_PUBLIC_IMAGE_PATH}${filename_disk}`
  const desc = caption ? <figcaption>{parse(caption)}</figcaption> : null
  const shortcodeKey = shortcode_key
    ? `[img name="${shortcode_key}" type="lg" /]`
    : `[img name="img${order + 1}" type="lg" /]`

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

  return (
    <div className="preview-image">
      <div className="imgbox">
        <div>
          <Image src={src} width={width} height={height} alt={caption ? caption : ""} sizes="30vw" />
          {dimensions}
        </div>

        <div className="tools">
          {desc}
          <Link href={imageEditURL} title="Edit this image" target="_blank">
            <button>edit</button>
          </Link>
          {showShortcode && (
            <div className="shortcode">
              <code>{shortcodeKey}</code>
            </div>
          )}
        </div>
      </div>
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
        return <PreviewImage key={i} order={i} image={img} directusUrl={props.directusUrl} showShortcode={true} />
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

      {featured_image && (
        <div className="block">
          <h4>Featured Image</h4>
          <PreviewImage order={1} image={featured_image} directusUrl={props.directusUrl} showShortcode={false} />
        </div>
      )}
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
      <div className="block">
        <h4>Article Images</h4>
        <div className="all-images">{allImages}</div>
      </div>
      <PromoBuilder />
    </div>
  )
}

const PromoBuilder = () => {
  const [type, setType] = useState("artseen")
  const [venue, setVenue] = useState("")
  const [showTitle, setShowTitle] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [city, setCity] = useState("")
  const [url, setUrl] = useState("")

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setter(event.target.value)
    }
  const handleSelectChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) => (event: React.ChangeEvent<HTMLSelectElement>) => {
      setter(event.target.value)
    }

  // [promo type="free-text"]<h6>New York</h6><a href="URL" title="Venue"><strong>Venue</strong></a><br/><em>ShowTitle</em><br/>Jun 1, 2024 &ndash; Aug 30, 2024[/promo]
  const generatePromoCode = () => {
    const h6 = type === "art" && city !== "" ? `<h6>${city}</h6>` : `<h6>On View</h6>`
    const location = type === "artseen" && city !== "" ? `<br/>${city}` : ""
    if (url === "") {
      return `[promo type="free-text"]${h6}<strong>${venue}</strong><br/><em>${showTitle}</em><br/>${startDate}&ndash;${endDate}${location}[/promo]`
    } else {
      return `[promo type="free-text"]${h6}<a href="${url}" title="${venue}"><strong>${venue}</strong></a><br/><em>${showTitle}</em><br/>${startDate}&ndash;${endDate}${location}[/promo]`
    }
  }

  return (
    <div className="block promo-builder">
      <h4>Promo Builder</h4>
      <div>
        <div className="field">
          <label htmlFor="type">Type</label>
          <select id="type" value={type} onChange={handleSelectChange(setType)}>
            <option value="art">Art</option>
            <option value="artseen">Artseen</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="venue">Venue:</label>
          <input type="text" id="venue" placeholder="venue" value={venue} onChange={handleInputChange(setVenue)} />
        </div>
        <div className="field">
          <label htmlFor="artist">Show title (optional):</label>
          <input
            type="text"
            id="showTitle"
            placeholder="show title"
            value={showTitle}
            onChange={handleInputChange(setShowTitle)}
          />
        </div>
        <div className="field">
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="text"
            id="startDate"
            placeholder="start date"
            value={startDate}
            onChange={handleInputChange(setStartDate)}
          />
        </div>
        <div className="field">
          <label htmlFor="endDate">End Date:</label>
          <input
            type="text"
            id="endDate"
            placeholder="end date"
            value={endDate}
            onChange={handleInputChange(setEndDate)}
          />
        </div>
        <div className="field">
          <label htmlFor="url">City</label>
          <input type="text" id="city" placeholder="city" value={city} onChange={handleInputChange(setCity)} />
        </div>
        <div className="field">
          <label htmlFor="url">URL:</label>
          <input type="text" id="url" placeholder="URL" value={url} onChange={handleInputChange(setUrl)} />
        </div>
      </div>
      <div className="generated">
        <pre>
          <code>
            <code>{generatePromoCode()}</code>
          </code>
        </pre>
      </div>
    </div>
  )
}

export default PreviewInfo
