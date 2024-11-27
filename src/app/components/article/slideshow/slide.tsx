"use client"
import { ArticlesFiles } from "../../../../../lib/types"
import { stripHtml } from "string-strip-html"
import Image from "next/image"
import styles from "./slideshow.module.scss"

interface SlideProps {
  image: ArticlesFiles
  index: number
  selectedIndex: number
  articleTitle: string
}

const Slide = ({ image, index, selectedIndex, articleTitle }: SlideProps) => {
  if (!image.directus_files_id) {
    return null
  }

  // Extract image metadata from the Directus file
  const { filename_disk, caption, width, height } = image.directus_files_id
  const altText = caption ? stripHtml(caption).result : stripHtml(articleTitle).result
  const src = `${process.env.NEXT_PUBLIC_IMAGE_PATH}${filename_disk}`

  return (
    <div key={index} className={`${styles.embla__slide} ${selectedIndex === index ? styles.embla__slide_active : ""}`}>
      <Image
        src={src}
        width={width}
        height={height}
        sizes="33vw"
        style={{
          width: "auto",
          height: "100%",
          objectFit: "contain",
        }}
        alt={altText}
      />
    </div>
  )
}

export default Slide
